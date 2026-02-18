# ♟️ ChessNet — Training Journey V1→V4
# AlphaZero-Style Neural Network

An AlphaZero-inspired chess neural network trained on Stockfish-generated data. Iteratively improved across 4 versions — from a heavily overfitting baseline to a well-regularized final model.

## 📊 Final Results (V4)

| Metric | Value |
|---|---|
| **Val Policy Accuracy** | **37.0%** |
| **Val Policy Loss** | **2.759** |
| **Val Value MSE** | **0.0174** |
| **Overfit Gap** | **0.66%** |
| **Best Epoch** | 30 / 42 |
| **Total Parameters** | ~1.8M |

## 📈 Version History

| Version | Val Accuracy | Overfit Gap | Key Changes |
|---|---|---|---|
| **V1** | 19.2% | 22.0% | Baseline — 100 games, one-hot targets, 13-plane encoding |
| **V2** | 28.2% | 9.8% | 5K games, multi-PV soft targets, 19-plane encoding, augmentation |
| **V3** | 34.7% | 1.08% | SE blocks, cosine LR + warmup, on-the-fly augmentation |
| **V4** | 37.0% | 0.66% | Value weight tuning, label smoothing 0.03, double value dropout |

---

## 🏗️ Model Architecture

```
Input: (8, 8, 19)
    ↓
Conv2D(128, 3×3) → BN → ReLU                     [Stem]
    ↓
12× Residual Block:                                [Tower]
    ├─ Conv2D(128, 3×3) → BN → ReLU
    ├─ Conv2D(128, 3×3) → BN
    ├─ SE Block (ratio=4)
    └─ Skip Connection → ReLU
    ↓
    ↙                    ↘
POLICY HEAD              VALUE HEAD
Conv2D(64, 1×1)          Conv2D(4, 1×1)
BN → ReLU → Flatten      BN → ReLU → Flatten
Dropout(0.3)              Dense(256) → Dropout(0.2)
Dense(4096, softmax)      Dense(64) → Dropout(0.2)
                          Dense(1, tanh)
```

### Squeeze-and-Excitation (SE) Block
Each residual block includes channel attention via SE:
```
x → GlobalAvgPool → Dense(ch/4, ReLU) → Dense(ch, Sigmoid) → x * gate
```
This allows the network to dynamically weight feature channels per position.

---

## 🗄️ Dataset

### Generation Pipeline

| Parameter | Value |
|---|---|
| Engine | Stockfish (depth 12) |
| Games | 5,000 |
| Multi-PV | 5 variations per position |
| Exploration Rate | 25% (first 50 moves), 5% (after) |
| Random Opening | 4–10 random moves |
| Max Moves/Game | 80 |
| Policy Temperature | τ = 200 (softmax over PV scores) |
| Value Normalization | tanh(score/600) × side-to-move |
| Workers | All available CPU cores (multiprocessing) |

### Board Encoding (19 planes)

| Planes | Description |
|---|---|
| 0–5 | White pieces (Pawn, Knight, Bishop, Rook, Queen, King) |
| 6–11 | Black pieces (Pawn, Knight, Bishop, Rook, Queen, King) |
| 12 | Turn indicator (1.0 = White, 0.0 = Black) |
| 13 | White kingside castling right |
| 14 | White queenside castling right |
| 15 | Black kingside castling right |
| 16 | Black queenside castling right |
| 17 | En-passant target square |
| 18 | Halfmove clock (normalized: min(clock, 100) / 100) |

### Move Encoding
Policy is a 4096-dimensional vector: `index = from_square × 64 + to_square`

### Augmentation
- **Pre-computed:** Horizontal flip (mirror files a↔h) doubles dataset → 764,880 positions
- **On-the-fly:** 50% random horizontal flip per sample per epoch during training
- Castling rights are correctly swapped (kingside ↔ queenside) when flipping

### Final Dataset Shape

```
X: (764,880, 8, 8, 19)  — Board states
P: (764,880, 4096)       — Soft policy targets
V: (764,880,)            — Value targets [-1, +1]
```

---

## ⚙️ Training Configuration (V4)

| Parameter | Value |
|---|---|
| Batch Size | 512 |
| Max Epochs | 60 (early stopped at 42) |
| Optimizer | Adam (clipnorm=0.5) |
| Peak LR | 3e-4 |
| Min LR | 1e-6 |
| LR Schedule | 5-epoch linear warmup → step-level cosine decay |
| Policy Loss | CategoricalCrossentropy (label_smoothing=0.03) |
| Value Loss | MSE |
| Loss Weights | Policy: 1.0, Value: 4.0 |
| L2 Regularization | 1e-4 (all conv + dense layers) |
| Policy Dropout | 0.3 |
| Value Dropout | 0.2 (two layers) |
| Train/Val Split | 85/15 (random shuffle) |
| Early Stopping | patience=12 on val_loss, restore_best_weights |
| Data Storage | float16 (cast to float32 per-batch) |

---

## 🔬 Detailed Version Analysis

### V1 → V2: Data Fix (+9.0%)

**Problem:** 100 games produced 593K highly correlated positions. One-hot policy targets (only Stockfish's #1 move = 1.0) wasted gradient signal. Model memorized training data — 41% train accuracy but only 19% validation.

**Changes:**
1. **50× more games** (100 → 5,000) — each generates ~76 unique Stockfish-analyzed positions
2. **Multi-PV soft policy targets** — top-5 moves scored with softmax(scores/τ) distribution. Rewards multiple good moves, not just #1
3. **19-plane board encoding** — added castling rights (4 planes), en-passant square (1), halfmove clock (1)
4. **Horizontal flip augmentation** — doubles dataset with correct castling swap
5. **25% exploration** — weighted random move selection creates diverse game trees
6. **tanh(score/600)** — smooth value normalization instead of linear clipping
7. **Full dataset shuffle** — breaks temporal correlation between consecutive positions

**Result:** Val accuracy 19.2% → 28.2%, overfit gap 22.0% → 9.8%

### V2 → V3: Architecture Upgrade (+6.5%)

**Problem:** 9.8% overfit gap and accuracy plateauing. The data was better — now the architecture was the bottleneck.

**Changes:**
1. **Squeeze-and-Excitation blocks** in every residual block — dynamic channel attention
2. **12 residual blocks** (up from 10) — deeper feature extraction
3. **Cosine decay + 5-epoch warmup** — smooth LR schedule instead of ReduceLROnPlateau staircase
4. **On-the-fly augmentation** — stochastic 50% flip per sample per epoch (different each time)
5. **64 policy conv filters** (up from 32) — wider policy head
6. **Deeper value head** — Conv(4) → 256 → 64 → 1 (vs Conv(1) → 128 → 1)

**Issue discovered:** Value head regressed (MSE 0.0166 → 0.0205) due to value_loss_weight=5.0 causing gradient instability with cosine decay.

**Result:** Val accuracy 28.2% → 34.7%, overfit gap 9.8% → 1.08%

### V3 → V4: Final Tuning (+2.3%)

**Goal:** Fix value head regression, minimize remaining overfit gap, extract final gains.

**Changes:**
1. **Value weight 5.0 → 4.0** — reduced gradient pressure on value head; eliminated MSE spikes
2. **Label smoothing 0.05 → 0.03** — preserves more of the multi-PV soft target signal
3. **Double value dropout (0.2)** — two dropout layers in value head closed train-val MSE gap

**Result:** Val accuracy 34.7% → 37.0%, overfit gap 1.08% → 0.66%, value MSE recovered (0.0205 → 0.0174)

---

## 📋 V4 Training Log (Selected Epochs)

| Epoch | LR | Train Loss | Val Loss | Train Acc | Val Acc | Gap | Val VMSE |
|---|---|---|---|---|---|---|---|
| 1 | 6.0e-5 | 8.104 | 7.249 | 1.9% | 5.0% | -3.1% | 0.1975 |
| 5 | 3.0e-4 | 3.970 | 4.485 | 20.9% | 22.6% | -1.6% | 0.2000 |
| 10 | 2.9e-4 | 3.300 | 3.652 | 30.1% | 30.2% | -0.1% | 0.1117 |
| 15 | 2.7e-4 | 3.105 | 3.297 | 33.1% | 32.2% | 0.9% | 0.0567 |
| 20 | 2.4e-4 | 2.992 | 3.101 | 34.9% | 34.7% | 0.1% | 0.0273 |
| 25 | 2.1e-4 | 2.923 | 3.116 | 35.9% | 35.1% | 0.8% | 0.0422 |
| **30** | **1.7e-4** | **2.972** | **2.973** | **36.6%** | **36.1%** | **0.6%** | **0.0174** |
| 35 | 1.2e-4 | 2.966 | 3.124 | 36.5% | 36.3% | 0.3% | 0.0282 |
| 40 | 8.8e-5 | 2.949 | 3.101 | 37.4% | 37.1% | 0.4% | 0.0297 |
| 42 | 7.3e-5 | 2.939 | 3.038 | 37.6% | 37.0% | 0.7% | 0.0163 |

---

## 📝 Report Card

| Component | V1 | V2 | V3 | V4 |
|---|---|---|---|---|
| Policy Accuracy | D | B- | B+ | **A-** |
| Overfit Control | F | B | A+ | **A+** |
| Value Head | B+ | A- | B | **A-** |
| Architecture | C+ | B | A- | **A-** |
| LR Schedule | C | C+ | A- | **A** |
| Data Pipeline | D | A- | A | **A** |
| Training Stability | C | B+ | B- | **A-** |
| **Overall** | **C-** | **B+** | **A-** | **A** |

---

## 💻 Source Code

### Project Structure

```
├── generate_dataset_v2.py     # Stockfish data generation (run on Kaggle)
├── augment_dataset.py         # Memory-safe horizontal flip augmentation
├── train_chess_v4.py          # Final training script
├── training_data_v2.npz       # Dataset (764K positions)
├── chess_v4.keras             # Saved model
├── chess_v4.weights.h5        # Model weights
├── training_v4.csv            # Epoch-by-epoch training log
└── README.md                  # This file
```

### Dataset Generation (`generate_dataset_v2.py`)

```python
import chess
import chess.engine
import numpy as np
import random
import os
import time
from multiprocessing import Pool

# ==================== CONFIG =======================
STOCKFISH_PATH = "/kaggle/working/stockfish/stockfish-ubuntu-x86-64-avx2"
NUM_GAMES = 5000
MOVES_PER_GAME = 80
ENGINE_DEPTH = 12
MULTI_PV = 5
POLICY_TEMPERATURE = 200.0
EXPLORATION_RATE = 0.25
SAVE_FILE = "training_data_v2.npz"
SAVE_EVERY = 500
NUM_WORKERS = os.cpu_count()

def encode_board(board):
    planes = np.zeros((8, 8, 19), dtype=np.float32)
    for sq, pc in board.piece_map().items():
        r, c = divmod(sq, 8)
        offset = 0 if pc.color == chess.WHITE else 6
        planes[r, c, offset + pc.piece_type - 1] = 1.0
    planes[:, :, 12] = 1.0 if board.turn == chess.WHITE else 0.0
    if board.has_kingside_castling_rights(chess.WHITE):  planes[:, :, 13] = 1.0
    if board.has_queenside_castling_rights(chess.WHITE): planes[:, :, 14] = 1.0
    if board.has_kingside_castling_rights(chess.BLACK):  planes[:, :, 15] = 1.0
    if board.has_queenside_castling_rights(chess.BLACK): planes[:, :, 16] = 1.0
    if board.ep_square is not None:
        r, c = divmod(board.ep_square, 8)
        planes[r, c, 17] = 1.0
    planes[:, :, 18] = min(board.halfmove_clock, 100) / 100.0
    return planes

def move_index(move):
    return move.from_square * 64 + move.to_square

def make_soft_policy(multi_pv_info, board, temperature=200.0):
    policy = np.zeros((4096,), dtype=np.float32)
    scores, moves = [], []
    for info in multi_pv_info:
        if "pv" not in info or len(info["pv"]) == 0: continue
        move = info["pv"][0]
        if move not in board.legal_moves: continue
        score = info["score"].pov(board.turn).score(mate_score=10000)
        if score is None: continue
        scores.append(score)
        moves.append(move)
    if len(moves) == 0: return None, None
    scores = np.array(scores, dtype=np.float64) / temperature
    scores -= scores.max()
    probs = np.exp(scores) / np.exp(scores).sum()
    for move, prob in zip(moves, probs):
        policy[move_index(move)] = prob
    return policy, moves[0]

def choose_move(multi_pv_info, board, exploration_rate=0.25):
    valid = []
    for info in multi_pv_info:
        if "pv" not in info or len(info["pv"]) == 0: continue
        move = info["pv"][0]
        if move not in board.legal_moves: continue
        score = info["score"].pov(board.turn).score(mate_score=10000)
        if score is not None: valid.append((move, score))
    if not valid: return None
    if random.random() > exploration_rate or len(valid) == 1:
        return valid[0][0]
    scores = np.array([s for _, s in valid], dtype=np.float64) / 300.0
    scores -= scores.max()
    probs = np.exp(scores) / np.exp(scores).sum()
    return valid[np.random.choice(len(valid), p=probs)][0]

def compute_value_target(score, board_turn):
    if score is None: return 0.0
    stm = 1.0 if board_turn == chess.WHITE else -1.0
    return float(np.tanh(score / 600.0) * stm)

def play_random_opening(board, min_moves=4, max_moves=10):
    for _ in range(random.randint(min_moves, max_moves)):
        if board.is_game_over(): break
        legal = list(board.legal_moves)
        if not legal: break
        board.push(random.choice(legal))
    return board

def generate_game_worker(game_id):
    try:
        engine = chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH)
        engine.configure({"Threads": 1, "Hash": 16})
    except Exception as e:
        print(f"[ERROR] Engine start failed for game {game_id}: {e}")
        return []
    board = chess.Board()
    samples = []
    try:
        board = play_random_opening(board)
        for move_num in range(MOVES_PER_GAME):
            if board.is_game_over() or not list(board.legal_moves): break
            try:
                multi_pv = engine.analyse(board, chess.engine.Limit(depth=ENGINE_DEPTH),
                    multipv=min(MULTI_PV, len(list(board.legal_moves))))
            except: break
            if isinstance(multi_pv, dict): multi_pv = [multi_pv]
            policy, best_move = make_soft_policy(multi_pv, board, POLICY_TEMPERATURE)
            if policy is None: break
            best_score = multi_pv[0]["score"].pov(chess.WHITE).score(mate_score=10000)
            value = compute_value_target(best_score, board.turn)
            samples.append((encode_board(board), policy, value))
            eff_exploration = EXPLORATION_RATE if move_num < 50 else 0.05
            chosen = choose_move(multi_pv, board, eff_exploration)
            if chosen is None: break
            board.push(chosen)
    except Exception as e:
        print(f"[ERROR] Game {game_id}: {e}")
    finally:
        try: engine.quit()
        except: pass
    if (game_id + 1) % 50 == 0:
        print(f"  Game {game_id + 1}/{NUM_GAMES} done — {len(samples)} positions")
    return samples

if __name__ == "__main__":
    start = time.time()
    print(f"Generating {NUM_GAMES} games with {NUM_WORKERS} workers...")
    all_X, all_P, all_V = [], [], []
    for batch_start in range(0, NUM_GAMES, SAVE_EVERY):
        batch_end = min(batch_start + SAVE_EVERY, NUM_GAMES)
        with Pool(processes=NUM_WORKERS) as pool:
            results = pool.map(generate_game_worker, range(batch_start, batch_end))
        for game in results:
            for planes, policy, value in game:
                all_X.append(planes); all_P.append(policy); all_V.append(value)
        X_arr = np.stack(all_X); P_arr = np.stack(all_P); V_arr = np.array(all_V, dtype=np.float32)
        np.savez_compressed(f"checkpoint_{batch_end}.npz", X=X_arr, P=P_arr, V=V_arr)
        print(f"  Checkpoint: {batch_end} games, {len(all_X)} positions")
    print(f"Done in {(time.time()-start)/60:.1f} min — {len(all_X)} positions")
```

### Augmentation Script (`augment_dataset.py`)

```python
import numpy as np
import gc

print("Loading checkpoint_5000.npz...")
data = np.load("checkpoint_5000.npz")
X, P, V = data["X"], data["P"], data["V"]
del data; gc.collect()
print(f"Loaded: X={X.shape}, P={P.shape}, V={V.shape}")

# Build policy flip lookup table
flip_map = np.empty(4096, dtype=np.int64)
for fsq in range(64):
    for tsq in range(64):
        fr, ff = divmod(fsq, 8)
        tr, tf = divmod(tsq, 8)
        flip_map[fsq * 64 + tsq] = (fr * 8 + (7 - ff)) * 64 + (tr * 8 + (7 - tf))

n = len(X)

# Flip boards
X_flip = np.flip(X, axis=2).copy()
# Swap castling rights: kingside ↔ queenside
for a, b in [(13, 14), (15, 16)]:
    tmp = X_flip[:, :, :, a].copy()
    X_flip[:, :, :, a] = X_flip[:, :, :, b]
    X_flip[:, :, :, b] = tmp
X = np.concatenate([X, X_flip]); del X_flip; gc.collect()

# Flip policies
P_new = np.empty((2 * n, 4096), dtype=np.float32)
P_new[:n] = P
BATCH = 50000
for s in range(0, n, BATCH):
    e = min(s + BATCH, n)
    P_new[n + s : n + e] = P[s:e][:, flip_map]
del P; gc.collect(); P = P_new; del P_new; gc.collect()

V = np.concatenate([V, V])

# Shuffle
idx = np.random.permutation(len(X))
X = X[idx]; gc.collect()
P = P[idx]; gc.collect()
V = V[idx]; del idx; gc.collect()

np.savez_compressed("training_data_v2.npz", X=X, P=P, V=V)
print(f"Saved: X={X.shape}, P={P.shape}, V={V.shape}")
```

### Training Script (`train_chess_v4.py`)

```python
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import gc, os, sys, math

# ================== CONFIG ======================
DATA_PATH = "training_data_v2.npz"
MODEL_OUT = "chess_v4.keras"
WEIGHTS_OUT = "chess_v4.weights.h5"

BATCH_SIZE = 512
EPOCHS = 60
PEAK_LR = 3e-4
MIN_LR = 1e-6
WARMUP_EPOCHS = 5

INPUT_SHAPE = (8, 8, 19)
NUM_RES_BLOCKS = 12
FILTERS = 128
SE_RATIO = 4
POLICY_FILTERS = 64
VALUE_HIDDEN = 256

L2_REG = 1e-4
DROPOUT_RATE = 0.3
VALUE_DROPOUT = 0.2

VALUE_LOSS_WEIGHT = 4.0
LABEL_SMOOTHING = 0.03
CLIPNORM = 0.5

os.environ["CUDA_VISIBLE_DEVICES"] = "0"

# ================ LOAD DATA ================
data = np.load(DATA_PATH)
X_all = data["X"].astype(np.float16)
P_all = data["P"].astype(np.float16)
V_all = data["V"]
del data; gc.collect()

total = len(X_all)
indices = np.random.permutation(total)
split = int(total * 0.85)
train_idx, test_idx = indices[:split], indices[split:]
del indices; gc.collect()

X_train, X_val = X_all[train_idx], X_all[test_idx]; del X_all; gc.collect()
P_train, P_val = P_all[train_idx], P_all[test_idx]; del P_all; gc.collect()
V_train, V_val = V_all[train_idx], V_all[test_idx]; del V_all, train_idx, test_idx; gc.collect()

# ================ FLIP LOOKUP ================
flip_map = np.empty(4096, dtype=np.int64)
for fsq in range(64):
    for tsq in range(64):
        fr, ff = divmod(fsq, 8)
        tr, tf_ = divmod(tsq, 8)
        flip_map[fsq * 64 + tsq] = (fr * 8 + (7 - ff)) * 64 + (tr * 8 + (7 - tf_))

# ================ DATA GENERATOR ================
class ChessGen(keras.utils.Sequence):
    def __init__(self, X, P, V, bs, augment=False, shuffle=True):
        self.X, self.P, self.V = X, P, V
        self.bs, self.augment, self.shuffle = bs, augment, shuffle
        self.on_epoch_end()
    def __len__(self):
        return int(np.ceil(len(self.X) / self.bs))
    def __getitem__(self, i):
        b = self.idx[i * self.bs:(i + 1) * self.bs]
        x = self.X[b].astype("float32")
        p = self.P[b].astype("float32")
        v = self.V[b].astype("float32")
        if self.augment:
            mask = np.random.random(len(x)) > 0.5
            if mask.any():
                x[mask] = np.flip(x[mask], axis=2).copy()
                for a, b_ in [(13, 14), (15, 16)]:
                    tmp = x[mask, :, :, a].copy()
                    x[mask, :, :, a] = x[mask, :, :, b_]
                    x[mask, :, :, b_] = tmp
                p[mask] = p[mask][:, flip_map]
        return x, {"policy": p, "value": v}
    def on_epoch_end(self):
        self.idx = np.arange(len(self.X))
        if self.shuffle: np.random.shuffle(self.idx)

train_gen = ChessGen(X_train, P_train, V_train, BATCH_SIZE, augment=True)
val_gen = ChessGen(X_val, P_val, V_val, BATCH_SIZE, augment=False, shuffle=False)

steps_per_epoch = len(train_gen)
total_steps = steps_per_epoch * EPOCHS
warmup_steps = steps_per_epoch * WARMUP_EPOCHS

# ================ LR SCHEDULE ================
class WarmupCosineCallback(keras.callbacks.Callback):
    def __init__(self, peak_lr, min_lr, warmup_steps, total_steps):
        super().__init__()
        self.peak_lr, self.min_lr = peak_lr, min_lr
        self.warmup_steps = warmup_steps
        self.decay_steps = total_steps - warmup_steps
        self.step = 0
    def on_train_batch_begin(self, batch, logs=None):
        if self.step < self.warmup_steps:
            lr = self.peak_lr * (self.step / max(1, self.warmup_steps))
        else:
            progress = min(max((self.step - self.warmup_steps) / max(1, self.decay_steps), 0), 1)
            lr = self.min_lr + 0.5 * (self.peak_lr - self.min_lr) * (1 + math.cos(math.pi * progress))
        self.model.optimizer.learning_rate = lr
        self.step += 1
    def on_epoch_end(self, epoch, logs=None):
        if logs: logs["lr"] = float(self.model.optimizer.learning_rate)

# ================ MODEL ================
def se_block(x, ratio=SE_RATIO):
    ch = x.shape[-1]
    se = layers.GlobalAveragePooling2D()(x)
    se = layers.Dense(ch // ratio, activation="relu",
        kernel_regularizer=keras.regularizers.l2(L2_REG))(se)
    se = layers.Dense(ch, activation="sigmoid",
        kernel_regularizer=keras.regularizers.l2(L2_REG))(se)
    se = layers.Reshape((1, 1, ch))(se)
    return layers.Multiply()([x, se])

def res_block(x, filters=FILTERS):
    skip = x
    x = layers.Conv2D(filters, 3, padding="same", use_bias=False,
        kernel_regularizer=keras.regularizers.l2(L2_REG))(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    x = layers.Conv2D(filters, 3, padding="same", use_bias=False,
        kernel_regularizer=keras.regularizers.l2(L2_REG))(x)
    x = layers.BatchNormalization()(x)
    x = se_block(x)
    x = layers.Add()([x, skip])
    x = layers.Activation("relu")(x)
    return x

def build_model():
    inp = keras.Input(shape=INPUT_SHAPE)
    x = layers.Conv2D(FILTERS, 3, padding="same", use_bias=False,
        kernel_regularizer=keras.regularizers.l2(L2_REG))(inp)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    for _ in range(NUM_RES_BLOCKS): x = res_block(x)

    # Policy head
    p = layers.Conv2D(POLICY_FILTERS, 1, use_bias=False,
        kernel_regularizer=keras.regularizers.l2(L2_REG))(x)
    p = layers.BatchNormalization()(p)
    p = layers.Activation("relu")(p)
    p = layers.Flatten()(p)
    p = layers.Dropout(DROPOUT_RATE)(p)
    policy = layers.Dense(4096, activation="softmax", dtype="float32", name="policy")(p)

    # Value head
    v = layers.Conv2D(4, 1, use_bias=False,
        kernel_regularizer=keras.regularizers.l2(L2_REG))(x)
    v = layers.BatchNormalization()(v)
    v = layers.Activation("relu")(v)
    v = layers.Flatten()(v)
    v = layers.Dense(VALUE_HIDDEN, activation="relu",
        kernel_regularizer=keras.regularizers.l2(L2_REG))(v)
    v = layers.Dropout(VALUE_DROPOUT)(v)
    v = layers.Dense(64, activation="relu",
        kernel_regularizer=keras.regularizers.l2(L2_REG))(v)
    v = layers.Dropout(VALUE_DROPOUT)(v)
    value = layers.Dense(1, activation="tanh", dtype="float32", name="value")(v)

    return keras.Model(inp, [policy, value], name="ChessNet_v4")

model = build_model()

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=PEAK_LR, clipnorm=CLIPNORM),
    loss={"policy": keras.losses.CategoricalCrossentropy(label_smoothing=LABEL_SMOOTHING), "value": "mse"},
    loss_weights={"policy": 1.0, "value": VALUE_LOSS_WEIGHT},
    metrics={"policy": ["accuracy"], "value": ["mse"]},
)

callbacks = [
    WarmupCosineCallback(PEAK_LR, MIN_LR, warmup_steps, total_steps),
    keras.callbacks.ModelCheckpoint("chess_v4_best.weights.h5",
        save_weights_only=True, save_best_only=True, monitor="val_policy_accuracy", mode="max"),
    keras.callbacks.ModelCheckpoint("chess_v4_best_loss.weights.h5",
        save_weights_only=True, save_best_only=True, monitor="val_loss", mode="min"),
    keras.callbacks.EarlyStopping(monitor="val_loss", patience=12, restore_best_weights=True),
    keras.callbacks.CSVLogger("training_v4.csv"),
    keras.callbacks.TerminateOnNaN(),
]

history = model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS, callbacks=callbacks)
model.save(MODEL_OUT)
model.save_weights(WEIGHTS_OUT)

results = model.evaluate(val_gen)
for k, v in zip(model.metrics_names, results): print(f"  {k}: {v:.6f}")
```

---

## 📌 Key Takeaways

1. **Data quality > architecture complexity.** The V1→V2 data fix (+9.0%) was worth more than V2→V3 architecture upgrade (+6.5%) and V3→V4 tuning (+2.3%) combined.

2. **Soft targets are essential.** Multi-PV softmax policy targets eliminate the information loss of one-hot encoding and provide smoother gradients.

3. **Overfit gap is the #1 diagnostic.** V1's 22% gap screamed "not enough data." V4's 0.66% gap confirms the model has learned everything this dataset can teach.

4. **SE blocks are free lunch.** Squeeze-and-Excitation adds minimal parameters but gives meaningful accuracy gains through dynamic channel attention.

5. **Value and policy heads need separate tuning.** The value weight, dropout, and loss function must be tuned independently — V3 proved that optimizing policy at the expense of value head stability is counterproductive.

6. **Cosine decay with warmup > ReduceLROnPlateau.** Smooth, predictable LR schedule eliminates the sharp transitions that cause training instability.

---

## 📄 License

MIT
