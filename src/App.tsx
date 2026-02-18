import { useState, useRef, useEffect, useCallback } from 'react';
import { v1Epochs, v2Epochs, v3Epochs, v4Epochs, versions, datasetGenCode, augmentationCode, v4TrainingCode } from './data';
import type { EpochData } from './data';

// ===================================================================
//  REUSABLE COMPONENTS
// ===================================================================

function Chart({ data, lines, height = 240, yLabel = '', formatY = (v: number) => v.toFixed(3), annotations }: {
  data: Record<string, number>[];
  lines: { key: string; color: string; label: string; dashed?: boolean }[];
  height?: number;
  yLabel?: string;
  formatY?: (v: number) => string;
  annotations?: { epoch: number; label: string; color: string }[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number; y: number; epoch: number;
    values: { label: string; color: string; value: number }[];
  } | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const width = container.clientWidth;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(2, 2);

    const pad = { top: 20, right: 20, bottom: 30, left: 58 };
    const cw = width - pad.left - pad.right;
    const ch = height - pad.top - pad.bottom;

    let yMin = Infinity, yMax = -Infinity;
    for (const d of data) {
      for (const l of lines) {
        const v = d[l.key];
        if (v !== undefined && !isNaN(v)) { yMin = Math.min(yMin, v); yMax = Math.max(yMax, v); }
      }
    }
    const yPad = (yMax - yMin) * 0.1 || 0.01;
    yMin -= yPad; yMax += yPad;

    const xS = (i: number) => pad.left + (i / Math.max(data.length - 1, 1)) * cw;
    const yS = (v: number) => pad.top + ch - ((v - yMin) / (yMax - yMin)) * ch;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = '#1F2937'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (ch / 5) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(width - pad.right, y); ctx.stroke();
      ctx.fillStyle = '#6B7280'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText(formatY(yMax - ((yMax - yMin) / 5) * i), pad.left - 5, y + 3);
    }

    ctx.fillStyle = '#6B7280'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    const step = Math.max(1, Math.floor(data.length / 10));
    for (let i = 0; i < data.length; i += step) ctx.fillText(String(i + 1), xS(i), height - 5);

    ctx.save(); ctx.translate(12, pad.top + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#4B5563'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(yLabel, 0, 0); ctx.restore();

    // Annotation lines
    if (annotations) {
      for (const ann of annotations) {
        const x = xS(ann.epoch - 1);
        ctx.strokeStyle = ann.color; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = ann.color; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
        ctx.fillText(ann.label, x, pad.top - 5);
      }
    }

    for (const line of lines) {
      ctx.strokeStyle = line.color; ctx.lineWidth = 2;
      if (line.dashed) ctx.setLineDash([6, 4]); else ctx.setLineDash([]);
      ctx.beginPath(); let started = false;
      for (let i = 0; i < data.length; i++) {
        const v = data[i][line.key];
        if (v === undefined || isNaN(v)) continue;
        const x = xS(i), y = yS(v);
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    }
  }, [data, lines, height, formatY, yLabel, annotations]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  const handleMouse = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = container.clientWidth;
    const pad = { left: 58, right: 20 };
    const cw = w - pad.left - pad.right;
    const idx = Math.round(((x - pad.left) / cw) * (data.length - 1));
    if (idx < 0 || idx >= data.length) { setTooltip(null); return; }
    setTooltip({
      x: e.clientX - rect.left, y: e.clientY - rect.top, epoch: idx + 1,
      values: lines.map(l => ({ label: l.label, color: l.color, value: data[idx][l.key] ?? 0 })),
    });
  };

  return (
    <div ref={containerRef} className="relative w-full" onMouseLeave={() => setTooltip(null)}>
      <canvas ref={canvasRef} className="w-full cursor-crosshair" onMouseMove={handleMouse} />
      {tooltip && (
        <div className="absolute z-10 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-xs pointer-events-none shadow-xl"
          style={{ left: Math.min(tooltip.x + 12, (containerRef.current?.clientWidth ?? 300) - 210), top: Math.max(tooltip.y - 80, 5) }}>
          <div className="text-gray-400 mb-1 font-semibold">Epoch {tooltip.epoch}</div>
          {tooltip.values.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: v.color }} />
              <span className="text-gray-300">{v.label}:</span>
              <span className="text-white font-mono font-semibold">{formatY(v.value)}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center mt-2">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-4 h-0.5 rounded" style={{
              backgroundColor: l.dashed ? 'transparent' : l.color,
              borderTop: l.dashed ? `2px dashed ${l.color}` : 'none'
            }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2.5 border-b border-gray-700">
        <span className="text-sm text-gray-300 font-mono">{title}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-xs px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors cursor-pointer">
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed bg-[#0d1117] max-h-[500px]">
        <code className="text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

function Section({ title, icon, children, defaultOpen = true, badge }: {
  title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean; badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-700/50 rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-700/20 transition-colors cursor-pointer">
        <span className="text-xl">{icon}</span>
        <span className="text-lg font-semibold text-white flex-1">{title}</span>
        {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">{badge}</span>}
        <span className="text-gray-500 text-sm transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

function Stat({ label, value, sub, color = 'emerald' }: { label: string; value: string; sub?: string; color?: string }) {
  const c: Record<string, string> = {
    emerald: 'text-emerald-400', blue: 'text-blue-400', purple: 'text-purple-400',
    yellow: 'text-yellow-400', red: 'text-red-400', cyan: 'text-cyan-400',
    green: 'text-green-400', orange: 'text-orange-400',
  };
  return (
    <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-semibold">{label}</div>
      <div className={`text-xl font-bold font-mono ${c[color] || 'text-white'}`}>{value}</div>
      {sub && <div className="text-[10px] text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
    }`}>{children}</button>
  );
}

const pct = (v: number) => (v * 100).toFixed(1) + '%';
const f4 = (v: number) => v.toFixed(4);
const f2 = (v: number) => v.toFixed(2);

// ===================================================================
//  MAIN APP
// ===================================================================
export default function App() {
  const [chartTab, setChartTab] = useState<string>('accuracy');
  const [codeTab, setCodeTab] = useState<string>('v4train');

  const v4 = versions[3];
  const maxEpochs = Math.max(v1Epochs.length, v2Epochs.length, v3Epochs.length, v4Epochs.length);

  // Build all-version overlay data
  const allVersionAccData = Array.from({ length: maxEpochs }, (_, i) => ({
    v1t: v1Epochs[i]?.trainPolicyAcc ?? NaN,
    v1v: v1Epochs[i]?.valPolicyAcc ?? NaN,
    v2v: v2Epochs[i]?.valPolicyAcc ?? NaN,
    v3v: v3Epochs[i]?.valPolicyAcc ?? NaN,
    v4t: v4Epochs[i]?.trainPolicyAcc ?? NaN,
    v4v: v4Epochs[i]?.valPolicyAcc ?? NaN,
  }));

  const allVersionLossData = Array.from({ length: maxEpochs }, (_, i) => ({
    v1: v1Epochs[i]?.valLoss ?? NaN,
    v2: v2Epochs[i]?.valLoss ?? NaN,
    v3: v3Epochs[i]?.valLoss ?? NaN,
    v4: v4Epochs[i]?.valLoss ?? NaN,
  }));

  const gapData = (epochs: EpochData[]) => epochs.map(d => ({
    gap: (d.trainPolicyAcc - d.valPolicyAcc) * 100,
  }));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">♟️</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">ChessNet — Training Journey V1→V4</h1>
              <p className="text-gray-400 text-sm mt-1">V1 → V2 → V3 → V4 • From 19.2% to 37.0% Val Accuracy • Full Pipeline</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {versions.map(v => (
              <div key={v.version} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gray-700/50 bg-gray-800/50">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                <span className="text-gray-300 font-semibold">{v.version}</span>
                <span className="text-gray-500">{v.label}</span>
                <span className="font-mono font-bold" style={{ color: v.color }}>{pct(v.bestValPolicyAcc)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* ===== EXECUTIVE SUMMARY ===== */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl shrink-0">🏆</div>
            <div>
              <h2 className="text-xl font-bold text-emerald-400 mb-2">Final Model: V4 — {pct(v4.bestValPolicyAcc)} Val Accuracy, {pct(v4.overfitGap)} Overfit Gap</h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Over 4 iterations, we went from a heavily overfitting baseline (V1: 19.2% val acc, 22% gap) to a well-regularized model
                (V4: 37.0% val acc, 0.66% gap). The journey involved fixing the dataset (V2), upgrading architecture with SE blocks (V3),
                and fine-tuning training dynamics (V4). The model now extracts nearly all learnable signal from 5,000 Stockfish games
                — the next step is more data.
              </p>
            </div>
          </div>
        </div>

        {/* ===== V4 KEY METRICS ===== */}
        <Section title="V4 Final Results" icon="📊" badge={`Best: Epoch ${v4.bestEpoch}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <Stat label="Val Policy Acc" value={pct(v4.bestValPolicyAcc)} sub={`Train: ${pct(v4.finalTrainPolicyAcc)}`} color="emerald" />
            <Stat label="Overfit Gap" value={pct(v4.overfitGap)} sub="Lowest ever" color="cyan" />
            <Stat label="Val Loss" value={f4(v4.bestValLoss)} sub="Best of all versions" color="blue" />
            <Stat label="Val Value MSE" value={f4(v4.bestValValueMSE)} sub="Fixed from V3" color="green" />
            <Stat label="Val Policy Loss" value={f4(v4.bestValPolicyLoss)} sub={`Train: ${f4(v4.bestTrainPolicyLoss)}`} color="purple" />
            <Stat label="Epochs" value={`${v4.bestEpoch}/${v4.epochsTrained}`} sub={`of ${v4.epochs} max`} color="yellow" />
          </div>
        </Section>

        {/* ===== FULL VERSION COMPARISON ===== */}
        <Section title="Complete Version Comparison" icon="📋" defaultOpen={true}>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-2 text-gray-400 font-medium sticky left-0 bg-gray-800/80 backdrop-blur z-10 min-w-[140px]">Metric</th>
                  {versions.map(v => (
                    <th key={v.version} className="text-center py-2 px-2 font-medium min-w-[85px]" style={{ color: v.color }}>
                      {v.version}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {([
                  { label: '🎯 Val Policy Accuracy', key: 'bestValPolicyAcc', fmt: pct, best: 3 },
                  { label: '📉 Val Loss', key: 'bestValLoss', fmt: f4, best: 3 },
                  { label: '📊 Val Value MSE', key: 'bestValValueMSE', fmt: f4, best: 3 },
                  { label: '⚖️ Overfit Gap', key: 'overfitGap', fmt: pct, best: 3 },
                  { label: '🏋️ Train Policy Acc', key: 'finalTrainPolicyAcc', fmt: pct, best: -1 },
                  { label: '🔄 Best Epoch', key: 'bestEpoch', fmt: (v: number) => String(v), best: -1 },
                  { label: '📚 Epochs Trained', key: 'epochsTrained', fmt: (v: number) => String(v), best: -1 },
                ] as { label: string; key: string; fmt: (v: number) => string; best: number }[]).map((row) => (
                  <tr key={row.key} className="hover:bg-gray-800/20">
                    <td className="py-2 px-2 text-gray-300 font-medium sticky left-0 bg-gray-800/50 backdrop-blur z-10">{row.label}</td>
                    {versions.map((v, i) => {
                      const val = (v as unknown as Record<string, number>)[row.key];
                      return (
                        <td key={v.version} className={`py-2 px-2 text-center font-mono ${i === row.best ? 'font-bold text-emerald-400' : 'text-gray-400'}`}>
                          {row.fmt(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Config rows */}
                <tr className="border-t-2 border-gray-600"><td colSpan={5} className="py-2 px-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold sticky left-0 bg-gray-800/50">Dataset</td></tr>
                {([
                  { label: 'Games', vals: ['100', '5,000', '5,000', '5,000'] },
                  { label: 'Positions', vals: ['593K', '765K', '765K', '765K'] },
                  { label: 'Encoding', vals: ['8×8×13', '8×8×19', '8×8×19', '8×8×19'] },
                  { label: 'Policy Targets', vals: ['One-hot', 'Soft 5-PV', 'Soft 5-PV', 'Soft 5-PV'] },
                  { label: 'Augmentation', vals: ['None', 'Pre-flip', 'On-the-fly', 'On-the-fly'] },
                ] as { label: string; vals: string[] }[]).map(row => (
                  <tr key={row.label} className="hover:bg-gray-800/20">
                    <td className="py-1.5 px-2 text-gray-400 sticky left-0 bg-gray-800/50 backdrop-blur z-10">{row.label}</td>
                    {row.vals.map((v, i) => <td key={i} className="py-1.5 px-2 text-center text-gray-400 font-mono">{v}</td>)}
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-600"><td colSpan={5} className="py-2 px-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold sticky left-0 bg-gray-800/50">Architecture</td></tr>
                {([
                  { label: 'Res Blocks', vals: ['10', '10', '12+SE(4)', '12+SE(4)'] },
                  { label: 'Policy Head', vals: ['Conv(2)', 'Conv(32)', 'Conv(64)', 'Conv(64)'] },
                  { label: 'Value Head', vals: ['128→1', '128→1', '256→64→1', '256→D→64→D→1'] },
                ] as { label: string; vals: string[] }[]).map(row => (
                  <tr key={row.label} className="hover:bg-gray-800/20">
                    <td className="py-1.5 px-2 text-gray-400 sticky left-0 bg-gray-800/50 backdrop-blur z-10">{row.label}</td>
                    {row.vals.map((v, i) => <td key={i} className="py-1.5 px-2 text-center text-gray-400 font-mono">{v}</td>)}
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-600"><td colSpan={5} className="py-2 px-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold sticky left-0 bg-gray-800/50">Training</td></tr>
                {([
                  { label: 'LR Schedule', vals: ['ReduceLR', 'ReduceLR', 'Cosine+WU', 'Cosine+WU'] },
                  { label: 'Peak LR', vals: ['1e-4', '3e-4', '3e-4', '3e-4'] },
                  { label: 'Value Weight', vals: ['1.0', '5.0', '5.0', '4.0'] },
                  { label: 'Label Smooth', vals: ['0.10', '0.05', '0.05', '0.03'] },
                  { label: 'Grad Clip', vals: ['1.0', '1.0', '0.5', '0.5'] },
                  { label: 'Value Dropout', vals: ['—', '—', '—', '0.2×2'] },
                ] as { label: string; vals: string[] }[]).map(row => (
                  <tr key={row.label} className="hover:bg-gray-800/20">
                    <td className="py-1.5 px-2 text-gray-400 sticky left-0 bg-gray-800/50 backdrop-blur z-10">{row.label}</td>
                    {row.vals.map((v, i) => <td key={i} className="py-1.5 px-2 text-center text-gray-400 font-mono">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== TRAINING CURVES ===== */}
        <Section title="Training Curves" icon="📈" defaultOpen={true}>
          <div className="flex gap-2 flex-wrap">
            {[
              ['accuracy', 'V4 Accuracy'], ['loss', 'V4 Loss'], ['gap', 'V4 Overfit Gap'],
              ['value', 'V4 Value MSE'], ['lr', 'V4 Learning Rate'],
              ['allAcc', 'All Versions Accuracy'], ['allLoss', 'All Versions Loss'],
              ['allGap', 'All Versions Gap'],
            ].map(([key, label]) => (
              <TabButton key={key} active={chartTab === key} onClick={() => setChartTab(key)}>{label}</TabButton>
            ))}
          </div>

          {chartTab === 'accuracy' && (
            <Chart
              data={v4Epochs.map(d => ({ train: d.trainPolicyAcc, val: d.valPolicyAcc }))}
              lines={[
                { key: 'train', color: '#3B82F6', label: 'Train' },
                { key: 'val', color: '#10B981', label: 'Val' },
              ]}
              annotations={[{ epoch: 30, label: 'Best', color: '#10B981' }]}
              yLabel="Accuracy" formatY={v => pct(v)} height={280}
            />
          )}
          {chartTab === 'loss' && (
            <Chart
              data={v4Epochs.map(d => ({ train: d.trainLoss, val: d.valLoss }))}
              lines={[
                { key: 'train', color: '#3B82F6', label: 'Train Loss' },
                { key: 'val', color: '#F59E0B', label: 'Val Loss' },
              ]}
              annotations={[{ epoch: 30, label: 'Best', color: '#10B981' }]}
              yLabel="Loss" formatY={f2} height={280}
            />
          )}
          {chartTab === 'gap' && (
            <Chart
              data={gapData(v4Epochs)}
              lines={[{ key: 'gap', color: '#06B6D4', label: 'Overfit Gap (Train − Val)' }]}
              yLabel="Gap %" formatY={v => v.toFixed(1) + '%'} height={280}
            />
          )}
          {chartTab === 'value' && (
            <Chart
              data={v4Epochs.map(d => ({ train: d.trainValueMSE, val: d.valValueMSE }))}
              lines={[
                { key: 'train', color: '#8B5CF6', label: 'Train Value MSE' },
                { key: 'val', color: '#EC4899', label: 'Val Value MSE' },
              ]}
              yLabel="MSE" formatY={f4} height={280}
            />
          )}
          {chartTab === 'lr' && (
            <Chart
              data={v4Epochs.map(d => ({ lr: d.lr ?? 0 }))}
              lines={[{ key: 'lr', color: '#F59E0B', label: 'Learning Rate' }]}
              yLabel="LR" formatY={v => v.toExponential(1)} height={280}
            />
          )}
          {chartTab === 'allAcc' && (
            <>
              <Chart
                data={allVersionAccData}
                lines={[
                  { key: 'v1t', color: '#EF4444', label: 'V1 Train', dashed: true },
                  { key: 'v1v', color: '#EF4444', label: 'V1 Val' },
                  { key: 'v2v', color: '#F59E0B', label: 'V2 Val' },
                  { key: 'v3v', color: '#8B5CF6', label: 'V3 Val' },
                  { key: 'v4t', color: '#10B981', label: 'V4 Train', dashed: true },
                  { key: 'v4v', color: '#10B981', label: 'V4 Val' },
                ]}
                yLabel="Accuracy" formatY={v => pct(v)} height={300}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {versions.map(v => (
                  <div key={v.version} className="rounded-xl p-3 border border-gray-700/50" style={{ backgroundColor: v.color + '08' }}>
                    <div className="font-bold text-sm" style={{ color: v.color }}>{v.version}: {pct(v.bestValPolicyAcc)}</div>
                    <div className="text-gray-500 text-[10px]">{v.label} — Gap: {pct(v.overfitGap)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {chartTab === 'allLoss' && (
            <Chart
              data={allVersionLossData}
              lines={[
                { key: 'v1', color: '#EF4444', label: 'V1' },
                { key: 'v2', color: '#F59E0B', label: 'V2' },
                { key: 'v3', color: '#8B5CF6', label: 'V3' },
                { key: 'v4', color: '#10B981', label: 'V4' },
              ]}
              yLabel="Val Loss" formatY={f2} height={300}
            />
          )}
          {chartTab === 'allGap' && (
            <>
              <Chart
                data={Array.from({ length: maxEpochs }, (_, i) => ({
                  v1: v1Epochs[i] ? (v1Epochs[i].trainPolicyAcc - v1Epochs[i].valPolicyAcc) * 100 : NaN,
                  v2: v2Epochs[i] ? (v2Epochs[i].trainPolicyAcc - v2Epochs[i].valPolicyAcc) * 100 : NaN,
                  v3: v3Epochs[i] ? (v3Epochs[i].trainPolicyAcc - v3Epochs[i].valPolicyAcc) * 100 : NaN,
                  v4: v4Epochs[i] ? (v4Epochs[i].trainPolicyAcc - v4Epochs[i].valPolicyAcc) * 100 : NaN,
                }))}
                lines={[
                  { key: 'v1', color: '#EF4444', label: 'V1' },
                  { key: 'v2', color: '#F59E0B', label: 'V2' },
                  { key: 'v3', color: '#8B5CF6', label: 'V3' },
                  { key: 'v4', color: '#10B981', label: 'V4' },
                ]}
                yLabel="Overfit Gap %" formatY={v => v.toFixed(1) + '%'} height={300}
              />
              <div className="bg-gray-800/40 rounded-xl p-4 text-sm text-gray-400">
                <strong className="text-white">V1's catastrophic overfitting</strong> (22% gap) vs <strong className="text-emerald-400">V4's near-zero gap</strong> (0.66%)
                tells the complete story: data quality + architecture + regularization all compound. V1 memorized; V4 generalizes.
              </div>
            </>
          )}
        </Section>

        {/* ===== VERSION-BY-VERSION ANALYSIS ===== */}
        <Section title="Version-by-Version: What Changed & Why" icon="🔬" defaultOpen={true}>
          {/* V1→V2 */}
          <div className="rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 px-5 py-3 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-red-400 font-bold">V1</span>
                <span className="text-gray-500">→</span>
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-yellow-400 font-bold">V2</span>
                <span className="text-gray-500 text-sm ml-2">+9.0% val accuracy</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">DATA FIX</span>
              </div>
            </div>
            <div className="p-5 space-y-3 text-sm text-gray-300">
              <p><strong className="text-white">Problem:</strong> 100 games with one-hot policy targets. Model memorized the training set — train accuracy hit 41% while val flatlined at 19%.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-yellow-400 font-semibold text-xs mb-1">50× More Games</div>
                  <div className="text-gray-400 text-xs">100 → 5,000 games. Each game generates ~76 unique positions analyzed by Stockfish at depth 12.</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-yellow-400 font-semibold text-xs mb-1">Soft Multi-PV Targets</div>
                  <div className="text-gray-400 text-xs">Top-5 moves with softmax distribution (τ=200). Reward multiple good moves instead of just #1.</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-yellow-400 font-semibold text-xs mb-1">19-Plane Encoding</div>
                  <div className="text-gray-400 text-xs">Added castling rights (4 planes), en-passant (1 plane), halfmove clock (1 plane). 13→19 channels.</div>
                </div>
              </div>
            </div>
          </div>

          {/* V2→V3 */}
          <div className="rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 px-5 py-3 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-yellow-400 font-bold">V2</span>
                <span className="text-gray-500">→</span>
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-purple-400 font-bold">V3</span>
                <span className="text-gray-500 text-sm ml-2">+6.5% val accuracy</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">ARCHITECTURE</span>
              </div>
            </div>
            <div className="p-5 space-y-3 text-sm text-gray-300">
              <p><strong className="text-white">Problem:</strong> 9.8% overfit gap and val accuracy plateauing. Same data — architecture was the bottleneck.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-purple-400 font-semibold text-xs mb-1">SE Blocks + 12 Layers</div>
                  <div className="text-gray-400 text-xs">Squeeze-and-Excitation channel attention in every residual block. Dynamic feature weighting per position.</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-purple-400 font-semibold text-xs mb-1">CosineDecay + Warmup</div>
                  <div className="text-gray-400 text-xs">5-epoch warmup → cosine decay to 1e-6. Smooth LR reduction instead of jarring ReduceLR staircase.</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-purple-400 font-semibold text-xs mb-1">On-the-fly Augmentation</div>
                  <div className="text-gray-400 text-xs">50% horizontal flip per sample per epoch. Different each time → no memorizable augmented copies.</div>
                </div>
              </div>
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 text-xs text-gray-400">
                <strong className="text-yellow-400">Issue discovered:</strong> Value head regressed (MSE 0.0166→0.0205) due to value_loss_weight=5.0 causing gradient instability with cosine decay. Val value MSE showed massive spikes (up to 0.39).
              </div>
            </div>
          </div>

          {/* V3→V4 */}
          <div className="rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500/10 to-emerald-500/10 px-5 py-3 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-purple-400 font-bold">V3</span>
                <span className="text-gray-500">→</span>
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-emerald-400 font-bold">V4</span>
                <span className="text-gray-500 text-sm ml-2">+2.3% val accuracy</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">FINAL TUNING</span>
              </div>
            </div>
            <div className="p-5 space-y-3 text-sm text-gray-300">
              <p><strong className="text-white">Goal:</strong> Fix value head regression, reduce remaining overfit gap, squeeze out final gains from the same dataset.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-emerald-400 font-semibold text-xs mb-1">Value Weight: 5.0 → 4.0</div>
                  <div className="text-gray-400 text-xs">Reduced gradient pressure on value head. Val value MSE fixed: 0.0205→0.0174. Spikes eliminated.</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-emerald-400 font-semibold text-xs mb-1">Label Smoothing: 0.05 → 0.03</div>
                  <div className="text-gray-400 text-xs">Lower smoothing preserves more of the multi-PV soft target signal. Better policy gradient quality.</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                  <div className="text-emerald-400 font-semibold text-xs mb-1">Double Value Dropout (0.2)</div>
                  <div className="text-gray-400 text-xs">Two dropout layers in value head (after 256 and 64). Closed the train-val value MSE gap.</div>
                </div>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-xs text-gray-400">
                <strong className="text-emerald-400">Result:</strong> All metrics improved. Overfit gap collapsed to 0.66% (from 1.08%). Value head fully recovered. Policy accuracy hit a new best. The model is now data-limited, not architecture-limited.
              </div>
            </div>
          </div>
        </Section>

        {/* ===== IMPROVEMENT JOURNEY ===== */}
        <Section title="Accuracy Improvement Breakdown" icon="📐" defaultOpen={true}>
          <div className="space-y-2">
            {[
              { from: 'V1', to: 'V2', gain: 9.0, cause: 'Data (50× games, soft targets, 19-plane encoding)', color: '#F59E0B', total: 28.2 },
              { from: 'V2', to: 'V3', gain: 6.5, cause: 'Architecture (SE blocks, cosine LR, on-the-fly aug)', color: '#8B5CF6', total: 34.7 },
              { from: 'V3', to: 'V4', gain: 2.3, cause: 'Tuning (value weight, label smooth, value dropout)', color: '#10B981', total: 37.0 },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-16 text-right text-xs font-mono text-gray-500">{step.from}→{step.to}</div>
                <div className="flex-1 relative h-8 bg-gray-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3 text-xs font-bold text-white"
                    style={{ width: `${(step.gain / 18) * 100}%`, backgroundColor: step.color + 'CC', minWidth: '100px' }}>
                    +{step.gain.toFixed(1)}%
                  </div>
                </div>
                <div className="w-28 text-xs text-gray-400 hidden md:block">{step.cause.split('(')[0]}</div>
                <div className="w-12 text-right text-xs font-mono font-bold" style={{ color: step.color }}>{step.total}%</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-800/40 rounded-xl p-4 text-sm text-gray-400 mt-3">
            <strong className="text-white">Diminishing returns pattern:</strong> +9.0% → +6.5% → +2.3%. Each iteration extracts less because the model increasingly saturates on 5,000 games.
            The 0.66% overfit gap confirms the model has learned nearly everything this dataset can teach. The next big jump requires <strong className="text-emerald-400">20K+ games</strong>.
          </div>
        </Section>

        {/* ===== V4 EPOCH TABLE ===== */}
        <Section title="V4 Epoch-by-Epoch Results" icon="📋" defaultOpen={false}>
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-[11px] font-mono">
              <thead className="sticky top-0 bg-gray-900 z-10">
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-2 px-1.5 text-left">#</th>
                  <th className="py-2 px-1.5">LR</th>
                  <th className="py-2 px-1.5">Train Loss</th>
                  <th className="py-2 px-1.5">Val Loss</th>
                  <th className="py-2 px-1.5">Train Acc</th>
                  <th className="py-2 px-1.5">Val Acc</th>
                  <th className="py-2 px-1.5">Gap</th>
                  <th className="py-2 px-1.5">Train VMSE</th>
                  <th className="py-2 px-1.5">Val VMSE</th>
                </tr>
              </thead>
              <tbody>
                {v4Epochs.map((d) => {
                  const gap = d.trainPolicyAcc - d.valPolicyAcc;
                  const isBest = d.epoch === 30;
                  return (
                    <tr key={d.epoch} className={`border-b border-gray-800/30 ${isBest ? 'bg-emerald-500/10' : 'hover:bg-gray-800/20'}`}>
                      <td className={`py-1 px-1.5 ${isBest ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>{d.epoch}</td>
                      <td className="py-1 px-1.5 text-gray-500 text-center">{d.lr ? d.lr.toExponential(1) : '—'}</td>
                      <td className="py-1 px-1.5 text-center text-gray-300">{d.trainLoss.toFixed(3)}</td>
                      <td className="py-1 px-1.5 text-center text-gray-300">{d.valLoss.toFixed(3)}</td>
                      <td className="py-1 px-1.5 text-center text-blue-400">{pct(d.trainPolicyAcc)}</td>
                      <td className={`py-1 px-1.5 text-center ${isBest ? 'text-emerald-400 font-bold' : 'text-emerald-400/70'}`}>{pct(d.valPolicyAcc)}</td>
                      <td className={`py-1 px-1.5 text-center ${gap * 100 < 1 ? 'text-green-400' : gap * 100 < 3 ? 'text-cyan-400' : 'text-yellow-400'}`}>{(gap * 100).toFixed(1)}%</td>
                      <td className="py-1 px-1.5 text-center text-purple-400/70">{d.trainValueMSE.toFixed(4)}</td>
                      <td className={`py-1 px-1.5 text-center ${d.valValueMSE > 0.1 ? 'text-red-400' : 'text-pink-400/70'}`}>{d.valValueMSE.toFixed(4)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== REPORT CARD ===== */}
        <Section title="Report Card: V1 → V4" icon="📝" defaultOpen={true}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Component</th>
                  {versions.map(v => (
                    <th key={v.version} className="text-center py-2 px-3 font-medium" style={{ color: v.color }}>{v.version}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {[
                  { c: 'Policy Accuracy',    grades: ['D', 'B-', 'B+', 'A-'] },
                  { c: 'Overfit Control',     grades: ['F', 'B', 'A+', 'A+'] },
                  { c: 'Value Head',          grades: ['B+', 'A-', 'B', 'A-'] },
                  { c: 'Architecture',        grades: ['C+', 'B', 'A-', 'A-'] },
                  { c: 'LR Schedule',         grades: ['C', 'C+', 'A-', 'A'] },
                  { c: 'Data Pipeline',       grades: ['D', 'A-', 'A', 'A'] },
                  { c: 'Training Stability',  grades: ['C', 'B+', 'B-', 'A-'] },
                  { c: 'Overall',             grades: ['C-', 'B+', 'A-', 'A'] },
                ].map((r, i) => {
                  const gc = (g: string) => {
                    if (g.startsWith('A')) return 'text-emerald-400';
                    if (g.startsWith('B')) return 'text-green-400';
                    if (g.startsWith('C')) return 'text-yellow-400';
                    if (g.startsWith('D')) return 'text-orange-400';
                    return 'text-red-400';
                  };
                  const isLast = i === 7;
                  return (
                    <tr key={i} className={isLast ? 'border-t-2 border-gray-600 bg-gray-800/20' : ''}>
                      <td className={`py-2 px-3 ${isLast ? 'font-bold text-white' : 'text-gray-300'}`}>{r.c}</td>
                      {r.grades.map((g, j) => (
                        <td key={j} className={`py-2 px-3 text-center font-bold text-lg ${gc(g)}`}>{g}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== ARCHITECTURE DIAGRAM ===== */}
        <Section title="Final Model Architecture" icon="🏗️" defaultOpen={false}>
          <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/30">
            <div className="flex flex-col items-center gap-1 text-xs font-mono">
              {[
                { label: 'Input', detail: '(8, 8, 19)', color: '#6B7280' },
                { label: 'Conv2D 128 + BN + ReLU', detail: 'Stem', color: '#3B82F6' },
                { label: '12× Residual + SE(ratio=4)', detail: '128 filters, 3×3, L2=1e-4', color: '#8B5CF6' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="rounded-lg px-6 py-2 border text-center" style={{ borderColor: b.color + '60', backgroundColor: b.color + '15', color: b.color }}>
                    <div className="font-bold">{b.label}</div>
                    <div className="text-[10px] opacity-70">{b.detail}</div>
                  </div>
                  {i < 2 && <div className="w-px h-3 bg-gray-600" />}
                </div>
              ))}
              <div className="w-px h-3 bg-gray-600" />
              <div className="text-gray-500 text-[10px]">↙ ↘</div>
              <div className="flex gap-8 items-start mt-1">
                <div className="flex flex-col items-center gap-1">
                  {[
                    { label: 'Conv2D 64, 1×1', color: '#10B981' },
                    { label: 'BN + ReLU + Flatten', color: '#10B981' },
                    { label: 'Dropout(0.3)', color: '#10B981' },
                    { label: 'Dense(4096, softmax)', color: '#10B981' },
                  ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="rounded px-3 py-1 border text-center" style={{ borderColor: b.color + '40', backgroundColor: b.color + '10', color: b.color }}>
                        {b.label}
                      </div>
                      {i < 3 && <div className="w-px h-1 bg-gray-700" />}
                    </div>
                  ))}
                  <div className="text-emerald-500 font-bold mt-1">POLICY HEAD</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  {[
                    { label: 'Conv2D 4, 1×1', color: '#EC4899' },
                    { label: 'BN + ReLU + Flatten', color: '#EC4899' },
                    { label: 'Dense(256) + Drop(0.2)', color: '#EC4899' },
                    { label: 'Dense(64) + Drop(0.2)', color: '#EC4899' },
                    { label: 'Dense(1, tanh)', color: '#EC4899' },
                  ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="rounded px-3 py-1 border text-center" style={{ borderColor: b.color + '40', backgroundColor: b.color + '10', color: b.color }}>
                        {b.label}
                      </div>
                      {i < 4 && <div className="w-px h-1 bg-gray-700" />}
                    </div>
                  ))}
                  <div className="text-pink-500 font-bold mt-1">VALUE HEAD</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== DATASET DETAILS ===== */}
        <Section title="Dataset Pipeline" icon="🗄️" defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30">
              <h4 className="text-white font-semibold text-sm mb-3">Generation</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between"><span>Engine</span><span className="text-white font-mono">Stockfish (depth 12)</span></div>
                <div className="flex justify-between"><span>Games</span><span className="text-white font-mono">5,000</span></div>
                <div className="flex justify-between"><span>Multi-PV</span><span className="text-white font-mono">5 variations</span></div>
                <div className="flex justify-between"><span>Exploration</span><span className="text-white font-mono">25% (first 50 moves)</span></div>
                <div className="flex justify-between"><span>Opening</span><span className="text-white font-mono">4-10 random moves</span></div>
                <div className="flex justify-between"><span>Moves/game</span><span className="text-white font-mono">~76 avg (80 max)</span></div>
                <div className="flex justify-between"><span>Raw positions</span><span className="text-white font-mono">382,440</span></div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30">
              <h4 className="text-white font-semibold text-sm mb-3">Augmentation & Encoding</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between"><span>Static augmentation</span><span className="text-white font-mono">Horizontal flip (2×)</span></div>
                <div className="flex justify-between"><span>Online augmentation</span><span className="text-white font-mono">50% flip per sample</span></div>
                <div className="flex justify-between"><span>Total positions</span><span className="text-white font-mono">764,880</span></div>
                <div className="flex justify-between"><span>Board planes</span><span className="text-white font-mono">19 channels</span></div>
                <div className="flex justify-between"><span>Policy encoding</span><span className="text-white font-mono">from×64 + to (4096)</span></div>
                <div className="flex justify-between"><span>Value encoding</span><span className="text-white font-mono">tanh(score/600) × STM</span></div>
                <div className="flex justify-between"><span>Policy temperature</span><span className="text-white font-mono">τ = 200</span></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/40 rounded-xl p-4">
            <h4 className="text-white font-semibold text-sm mb-2">Board Encoding (19 planes)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {[
                'P0-5: White pieces (P,N,B,R,Q,K)',
                'P6-11: Black pieces (P,N,B,R,Q,K)',
                'P12: Turn (1=White, 0=Black)',
                'P13: White O-O right',
                'P14: White O-O-O right',
                'P15: Black O-O right',
                'P16: Black O-O-O right',
                'P17: En-passant square',
                'P18: Halfmove clock / 100',
              ].map((p, i) => (
                <div key={i} className="bg-gray-800/50 rounded px-2 py-1.5 text-gray-400 font-mono">{p}</div>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== SOURCE CODE ===== */}
        <Section title="Complete Source Code" icon="💻" defaultOpen={false}>
          <div className="flex gap-2 flex-wrap mb-4">
            <TabButton active={codeTab === 'v4train'} onClick={() => setCodeTab('v4train')}>V4 Training Script</TabButton>
            <TabButton active={codeTab === 'datagen'} onClick={() => setCodeTab('datagen')}>Dataset Generator</TabButton>
            <TabButton active={codeTab === 'augment'} onClick={() => setCodeTab('augment')}>Augmentation Script</TabButton>
          </div>
          {codeTab === 'v4train' && <CodeBlock code={v4TrainingCode} title="train_chess_v4.py — Final Training Script" />}
          {codeTab === 'datagen' && <CodeBlock code={datasetGenCode} title="generate_dataset_v2.py — Dataset Generation" />}
          {codeTab === 'augment' && <CodeBlock code={augmentationCode} title="augment_dataset.py — Post-Generation Flip" />}
        </Section>


        {/* Roadmap section removed */}


        {/* ===== FOOTER ===== */}
        <div className="text-center text-gray-600 text-xs py-8 border-t border-gray-800 space-y-1">
          <div className="text-gray-400 font-semibold">Chess AI Training Pipeline — Complete Documentation</div>
          <div>V1 (100 games) → V2 (5K games) → V3 (SE + Cosine) → V4 (Final) • 764,880 positions • 12 ResBlocks + SE</div>
          <div>Val Accuracy: 19.2% → 28.2% → 34.7% → 37.0% • Overfit Gap: 22.0% → 9.8% → 1.1% → 0.66%</div>
        </div>

      </div>
    </div>
  );
}
