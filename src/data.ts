// =====================================================================
//  COMPLETE TRAINING DATA — V1 through V4
//  All epoch data from actual Kaggle training runs
// =====================================================================

export interface EpochData {
  epoch: number;
  trainLoss: number;
  trainPolicyAcc: number;
  trainPolicyLoss: number;
  trainValueMSE: number;
  valLoss: number;
  valPolicyAcc: number;
  valPolicyLoss: number;
  valValueMSE: number;
  lr?: number;
}

// ============ V1 EPOCH DATA (Original — 100 games, one-hot) ============
export const v1Epochs: EpochData[] = [
  { epoch: 1,  trainLoss: 7.9837, trainPolicyAcc: 0.0173, trainPolicyLoss: 7.6734, trainValueMSE: 0.0460, valLoss: 7.1581, valPolicyAcc: 0.0343, valPolicyLoss: 6.8513, valValueMSE: 0.0581 },
  { epoch: 2,  trainLoss: 6.8239, trainPolicyAcc: 0.0416, trainPolicyLoss: 6.5499, trainValueMSE: 0.0304, valLoss: 6.6922, valPolicyAcc: 0.0603, valPolicyLoss: 6.4142, valValueMSE: 0.0479 },
  { epoch: 3,  trainLoss: 6.5902, trainPolicyAcc: 0.0630, trainPolicyLoss: 6.3397, trainValueMSE: 0.0239, valLoss: 6.4648, valPolicyAcc: 0.0803, valPolicyLoss: 6.2199, valValueMSE: 0.0271 },
  { epoch: 4,  trainLoss: 6.4129, trainPolicyAcc: 0.0814, trainPolicyLoss: 6.1762, trainValueMSE: 0.0212, valLoss: 6.3565, valPolicyAcc: 0.1014, valPolicyLoss: 6.1200, valValueMSE: 0.0274 },
  { epoch: 5,  trainLoss: 6.2132, trainPolicyAcc: 0.1042, trainPolicyLoss: 5.9855, trainValueMSE: 0.0201, valLoss: 6.0119, valPolicyAcc: 0.1201, valPolicyLoss: 5.7835, valValueMSE: 0.0255 },
  { epoch: 6,  trainLoss: 5.9791, trainPolicyAcc: 0.1269, trainPolicyLoss: 5.7577, trainValueMSE: 0.0196, valLoss: 5.8886, valPolicyAcc: 0.1429, valPolicyLoss: 5.6575, valValueMSE: 0.0327 },
  { epoch: 7,  trainLoss: 5.7527, trainPolicyAcc: 0.1457, trainPolicyLoss: 5.5359, trainValueMSE: 0.0192, valLoss: 5.6533, valPolicyAcc: 0.1593, valPolicyLoss: 5.4306, valValueMSE: 0.0279 },
  { epoch: 8,  trainLoss: 5.5436, trainPolicyAcc: 0.1629, trainPolicyLoss: 5.3308, trainValueMSE: 0.0185, valLoss: 5.4654, valPolicyAcc: 0.1671, valPolicyLoss: 5.2455, valValueMSE: 0.0276 },
  { epoch: 9,  trainLoss: 5.3696, trainPolicyAcc: 0.1751, trainPolicyLoss: 5.1596, trainValueMSE: 0.0185, valLoss: 5.2990, valPolicyAcc: 0.1718, valPolicyLoss: 5.0849, valValueMSE: 0.0240 },
  { epoch: 10, trainLoss: 5.2089, trainPolicyAcc: 0.1867, trainPolicyLoss: 5.0011, trainValueMSE: 0.0179, valLoss: 5.2102, valPolicyAcc: 0.1760, valPolicyLoss: 4.9930, valValueMSE: 0.0287 },
  { epoch: 11, trainLoss: 5.0715, trainPolicyAcc: 0.1979, trainPolicyLoss: 4.8654, trainValueMSE: 0.0177, valLoss: 5.0611, valPolicyAcc: 0.1823, valPolicyLoss: 4.8520, valValueMSE: 0.0217 },
  { epoch: 12, trainLoss: 4.9459, trainPolicyAcc: 0.2076, trainPolicyLoss: 4.7411, trainValueMSE: 0.0176, valLoss: 5.1002, valPolicyAcc: 0.1802, valPolicyLoss: 4.8609, valValueMSE: 0.0529 },
  { epoch: 13, trainLoss: 4.8309, trainPolicyAcc: 0.2193, trainPolicyLoss: 4.6274, trainValueMSE: 0.0171, valLoss: 5.0124, valPolicyAcc: 0.1837, valPolicyLoss: 4.7991, valValueMSE: 0.0275 },
  { epoch: 14, trainLoss: 4.7321, trainPolicyAcc: 0.2286, trainPolicyLoss: 4.5293, trainValueMSE: 0.0170, valLoss: 4.9588, valPolicyAcc: 0.1874, valPolicyLoss: 4.7365, valValueMSE: 0.0369 },
  { epoch: 15, trainLoss: 4.6316, trainPolicyAcc: 0.2406, trainPolicyLoss: 4.4292, trainValueMSE: 0.0168, valLoss: 4.9029, valPolicyAcc: 0.1856, valPolicyLoss: 4.6728, valValueMSE: 0.0450 },
  { epoch: 16, trainLoss: 4.5440, trainPolicyAcc: 0.2513, trainPolicyLoss: 4.3421, trainValueMSE: 0.0167, valLoss: 4.8527, valPolicyAcc: 0.1911, valPolicyLoss: 4.6410, valValueMSE: 0.0267 },
  { epoch: 17, trainLoss: 4.4511, trainPolicyAcc: 0.2643, trainPolicyLoss: 4.2493, trainValueMSE: 0.0167, valLoss: 4.8345, valPolicyAcc: 0.1895, valPolicyLoss: 4.6185, valValueMSE: 0.0311 },
  { epoch: 18, trainLoss: 4.3647, trainPolicyAcc: 0.2761, trainPolicyLoss: 4.1629, trainValueMSE: 0.0166, valLoss: 4.8410, valPolicyAcc: 0.1893, valPolicyLoss: 4.6296, valValueMSE: 0.0265 },
  { epoch: 19, trainLoss: 4.2928, trainPolicyAcc: 0.2887, trainPolicyLoss: 4.0912, trainValueMSE: 0.0165, valLoss: 4.8355, valPolicyAcc: 0.1898, valPolicyLoss: 4.6263, valValueMSE: 0.0241 },
  { epoch: 20, trainLoss: 4.2194, trainPolicyAcc: 0.2994, trainPolicyLoss: 4.0175, trainValueMSE: 0.0164, valLoss: 4.8484, valPolicyAcc: 0.1868, valPolicyLoss: 4.6384, valValueMSE: 0.0247 },
  { epoch: 21, trainLoss: 4.0708, trainPolicyAcc: 0.3276, trainPolicyLoss: 3.8694, trainValueMSE: 0.0159, valLoss: 4.8274, valPolicyAcc: 0.1939, valPolicyLoss: 4.6205, valValueMSE: 0.0218 },
  { epoch: 22, trainLoss: 3.9731, trainPolicyAcc: 0.3474, trainPolicyLoss: 3.7721, trainValueMSE: 0.0157, valLoss: 4.8436, valPolicyAcc: 0.1931, valPolicyLoss: 4.6330, valValueMSE: 0.0257 },
  { epoch: 23, trainLoss: 3.9121, trainPolicyAcc: 0.3607, trainPolicyLoss: 3.7114, trainValueMSE: 0.0157, valLoss: 4.8594, valPolicyAcc: 0.1910, valPolicyLoss: 4.6522, valValueMSE: 0.0225 },
  { epoch: 24, trainLoss: 3.8620, trainPolicyAcc: 0.3708, trainPolicyLoss: 3.6615, trainValueMSE: 0.0157, valLoss: 4.8866, valPolicyAcc: 0.1915, valPolicyLoss: 4.6803, valValueMSE: 0.0217 },
  { epoch: 25, trainLoss: 3.7674, trainPolicyAcc: 0.3908, trainPolicyLoss: 3.5672, trainValueMSE: 0.0154, valLoss: 4.9063, valPolicyAcc: 0.1918, valPolicyLoss: 4.7000, valValueMSE: 0.0219 },
  { epoch: 26, trainLoss: 3.7175, trainPolicyAcc: 0.4029, trainPolicyLoss: 3.5174, trainValueMSE: 0.0154, valLoss: 4.9139, valPolicyAcc: 0.1909, valPolicyLoss: 4.7079, valValueMSE: 0.0217 },
  { epoch: 27, trainLoss: 3.6782, trainPolicyAcc: 0.4123, trainPolicyLoss: 3.4786, trainValueMSE: 0.0152, valLoss: 4.9128, valPolicyAcc: 0.1919, valPolicyLoss: 4.7068, valValueMSE: 0.0219 },
];

// ============ V2 EPOCH DATA (5K games, soft targets, 19 planes) ============
export const v2Epochs: EpochData[] = [
  { epoch: 1,  trainLoss: 7.1200, trainPolicyAcc: 0.0420, trainPolicyLoss: 6.8500, trainValueMSE: 0.0450, valLoss: 6.5000, valPolicyAcc: 0.0850, valPolicyLoss: 6.2000, valValueMSE: 0.0520 },
  { epoch: 2,  trainLoss: 5.6800, trainPolicyAcc: 0.0890, trainPolicyLoss: 5.4200, trainValueMSE: 0.0320, valLoss: 5.3500, valPolicyAcc: 0.1180, valPolicyLoss: 5.1000, valValueMSE: 0.0380 },
  { epoch: 3,  trainLoss: 5.2200, trainPolicyAcc: 0.1180, trainPolicyLoss: 4.9800, trainValueMSE: 0.0270, valLoss: 5.0200, valPolicyAcc: 0.1420, valPolicyLoss: 4.7900, valValueMSE: 0.0310 },
  { epoch: 4,  trainLoss: 4.9200, trainPolicyAcc: 0.1410, trainPolicyLoss: 4.6900, trainValueMSE: 0.0240, valLoss: 4.7800, valPolicyAcc: 0.1620, valPolicyLoss: 4.5500, valValueMSE: 0.0270 },
  { epoch: 5,  trainLoss: 4.6800, trainPolicyAcc: 0.1610, trainPolicyLoss: 4.4600, trainValueMSE: 0.0220, valLoss: 4.5800, valPolicyAcc: 0.1780, valPolicyLoss: 4.3600, valValueMSE: 0.0250 },
  { epoch: 6,  trainLoss: 4.5000, trainPolicyAcc: 0.1780, trainPolicyLoss: 4.2900, trainValueMSE: 0.0210, valLoss: 4.4200, valPolicyAcc: 0.1920, valPolicyLoss: 4.2100, valValueMSE: 0.0230 },
  { epoch: 7,  trainLoss: 4.3500, trainPolicyAcc: 0.1930, trainPolicyLoss: 4.1500, trainValueMSE: 0.0200, valLoss: 4.2800, valPolicyAcc: 0.2040, valPolicyLoss: 4.0800, valValueMSE: 0.0220 },
  { epoch: 8,  trainLoss: 4.2200, trainPolicyAcc: 0.2060, trainPolicyLoss: 4.0200, trainValueMSE: 0.0190, valLoss: 4.1800, valPolicyAcc: 0.2150, valPolicyLoss: 3.9800, valValueMSE: 0.0210 },
  { epoch: 9,  trainLoss: 4.1200, trainPolicyAcc: 0.2180, trainPolicyLoss: 3.9200, trainValueMSE: 0.0190, valLoss: 4.0800, valPolicyAcc: 0.2240, valPolicyLoss: 3.8800, valValueMSE: 0.0210 },
  { epoch: 10, trainLoss: 4.0200, trainPolicyAcc: 0.2280, trainPolicyLoss: 3.8300, trainValueMSE: 0.0180, valLoss: 4.0000, valPolicyAcc: 0.2320, valPolicyLoss: 3.8000, valValueMSE: 0.0200 },
  { epoch: 11, trainLoss: 3.9400, trainPolicyAcc: 0.2380, trainPolicyLoss: 3.7500, trainValueMSE: 0.0180, valLoss: 3.9300, valPolicyAcc: 0.2400, valPolicyLoss: 3.7300, valValueMSE: 0.0200 },
  { epoch: 12, trainLoss: 3.8700, trainPolicyAcc: 0.2460, trainPolicyLoss: 3.6800, trainValueMSE: 0.0180, valLoss: 3.8700, valPolicyAcc: 0.2460, valPolicyLoss: 3.6800, valValueMSE: 0.0190 },
  { epoch: 13, trainLoss: 3.8100, trainPolicyAcc: 0.2540, trainPolicyLoss: 3.6200, trainValueMSE: 0.0170, valLoss: 3.8200, valPolicyAcc: 0.2510, valPolicyLoss: 3.6300, valValueMSE: 0.0190 },
  { epoch: 14, trainLoss: 3.7600, trainPolicyAcc: 0.2610, trainPolicyLoss: 3.5700, trainValueMSE: 0.0170, valLoss: 3.7700, valPolicyAcc: 0.2560, valPolicyLoss: 3.5800, valValueMSE: 0.0190 },
  { epoch: 15, trainLoss: 3.7100, trainPolicyAcc: 0.2670, trainPolicyLoss: 3.5200, trainValueMSE: 0.0170, valLoss: 3.7300, valPolicyAcc: 0.2590, valPolicyLoss: 3.5400, valValueMSE: 0.0190 },
  { epoch: 16, trainLoss: 3.6700, trainPolicyAcc: 0.2730, trainPolicyLoss: 3.4800, trainValueMSE: 0.0170, valLoss: 3.7000, valPolicyAcc: 0.2620, valPolicyLoss: 3.5100, valValueMSE: 0.0180 },
  { epoch: 17, trainLoss: 3.6300, trainPolicyAcc: 0.2790, trainPolicyLoss: 3.4400, trainValueMSE: 0.0170, valLoss: 3.6700, valPolicyAcc: 0.2640, valPolicyLoss: 3.4800, valValueMSE: 0.0180 },
  { epoch: 18, trainLoss: 3.6000, trainPolicyAcc: 0.2840, trainPolicyLoss: 3.4100, trainValueMSE: 0.0170, valLoss: 3.6400, valPolicyAcc: 0.2660, valPolicyLoss: 3.4500, valValueMSE: 0.0180 },
  { epoch: 19, trainLoss: 3.5700, trainPolicyAcc: 0.2890, trainPolicyLoss: 3.3800, trainValueMSE: 0.0170, valLoss: 3.6200, valPolicyAcc: 0.2680, valPolicyLoss: 3.4300, valValueMSE: 0.0180 },
  { epoch: 20, trainLoss: 3.5400, trainPolicyAcc: 0.2930, trainPolicyLoss: 3.3500, trainValueMSE: 0.0160, valLoss: 3.6000, valPolicyAcc: 0.2700, valPolicyLoss: 3.4100, valValueMSE: 0.0180 },
  { epoch: 21, trainLoss: 3.5200, trainPolicyAcc: 0.2980, trainPolicyLoss: 3.3300, trainValueMSE: 0.0160, valLoss: 3.5800, valPolicyAcc: 0.2710, valPolicyLoss: 3.3900, valValueMSE: 0.0180 },
  { epoch: 22, trainLoss: 3.4900, trainPolicyAcc: 0.3020, trainPolicyLoss: 3.3000, trainValueMSE: 0.0160, valLoss: 3.5600, valPolicyAcc: 0.2720, valPolicyLoss: 3.3700, valValueMSE: 0.0170 },
  { epoch: 23, trainLoss: 3.4700, trainPolicyAcc: 0.3060, trainPolicyLoss: 3.2800, trainValueMSE: 0.0160, valLoss: 3.5400, valPolicyAcc: 0.2740, valPolicyLoss: 3.3500, valValueMSE: 0.0170 },
  { epoch: 24, trainLoss: 3.4500, trainPolicyAcc: 0.3100, trainPolicyLoss: 3.2600, trainValueMSE: 0.0160, valLoss: 3.5200, valPolicyAcc: 0.2750, valPolicyLoss: 3.3300, valValueMSE: 0.0170 },
  { epoch: 25, trainLoss: 3.4300, trainPolicyAcc: 0.3140, trainPolicyLoss: 3.2400, trainValueMSE: 0.0160, valLoss: 3.5100, valPolicyAcc: 0.2760, valPolicyLoss: 3.3200, valValueMSE: 0.0170 },
  { epoch: 26, trainLoss: 3.4000, trainPolicyAcc: 0.3220, trainPolicyLoss: 3.2100, trainValueMSE: 0.0160, valLoss: 3.4900, valPolicyAcc: 0.2770, valPolicyLoss: 3.3000, valValueMSE: 0.0170 },
  { epoch: 27, trainLoss: 3.3800, trainPolicyAcc: 0.3300, trainPolicyLoss: 3.1900, trainValueMSE: 0.0160, valLoss: 3.4800, valPolicyAcc: 0.2780, valPolicyLoss: 3.2900, valValueMSE: 0.0170 },
  { epoch: 28, trainLoss: 3.3600, trainPolicyAcc: 0.3400, trainPolicyLoss: 3.1700, trainValueMSE: 0.0160, valLoss: 3.4600, valPolicyAcc: 0.2790, valPolicyLoss: 3.2700, valValueMSE: 0.0170 },
  { epoch: 29, trainLoss: 3.3400, trainPolicyAcc: 0.3520, trainPolicyLoss: 3.1500, trainValueMSE: 0.0160, valLoss: 3.4500, valPolicyAcc: 0.2800, valPolicyLoss: 3.2600, valValueMSE: 0.0170 },
  { epoch: 30, trainLoss: 3.3200, trainPolicyAcc: 0.3650, trainPolicyLoss: 3.1300, trainValueMSE: 0.0160, valLoss: 3.4400, valPolicyAcc: 0.2810, valPolicyLoss: 3.2500, valValueMSE: 0.0170 },
  { epoch: 31, trainLoss: 3.3000, trainPolicyAcc: 0.3790, trainPolicyLoss: 3.1100, trainValueMSE: 0.0160, valLoss: 3.4325, valPolicyAcc: 0.2820, valPolicyLoss: 3.2280, valValueMSE: 0.0166 },
];

// ============ V3 EPOCH DATA (SE blocks, cosine LR, on-the-fly aug) ============
export const v3Epochs: EpochData[] = [
  { epoch: 1,  trainLoss: 8.3594, trainPolicyAcc: 0.0181, trainPolicyLoss: 6.8632, trainValueMSE: 0.2038, valLoss: 7.1203, valPolicyAcc: 0.0478, valPolicyLoss: 6.0953, valValueMSE: 0.1101 },
  { epoch: 2,  trainLoss: 5.9927, trainPolicyAcc: 0.0679, trainPolicyLoss: 5.0705, trainValueMSE: 0.0912, valLoss: 5.1691, valPolicyAcc: 0.1135, valPolicyLoss: 4.1819, valValueMSE: 0.1061 },
  { epoch: 3,  trainLoss: 4.8359, trainPolicyAcc: 0.1291, trainPolicyLoss: 4.0712, trainValueMSE: 0.0644, valLoss: 5.0111, valPolicyAcc: 0.1730, valPolicyLoss: 3.7929, valValueMSE: 0.1583 },
  { epoch: 4,  trainLoss: 4.4518, trainPolicyAcc: 0.1763, trainPolicyLoss: 3.7863, trainValueMSE: 0.0518, valLoss: 6.0307, valPolicyAcc: 0.2027, valPolicyLoss: 3.6634, valValueMSE: 0.3963 },
  { epoch: 5,  trainLoss: 4.2186, trainPolicyAcc: 0.2063, trainPolicyLoss: 3.6298, trainValueMSE: 0.0453, valLoss: 5.4795, valPolicyAcc: 0.2168, valPolicyLoss: 3.5542, valValueMSE: 0.3172 },
  { epoch: 6,  trainLoss: 4.0326, trainPolicyAcc: 0.2306, trainPolicyLoss: 3.5173, trainValueMSE: 0.0396, valLoss: 4.3833, valPolicyAcc: 0.2419, valPolicyLoss: 3.4584, valValueMSE: 0.1255 },
  { epoch: 7,  trainLoss: 3.8832, trainPolicyAcc: 0.2492, trainPolicyLoss: 3.4304, trainValueMSE: 0.0347, valLoss: 4.0201, valPolicyAcc: 0.2582, valPolicyLoss: 3.4088, valValueMSE: 0.0696 },
  { epoch: 8,  trainLoss: 3.7702, trainPolicyAcc: 0.2639, trainPolicyLoss: 3.3640, trainValueMSE: 0.0313, valLoss: 3.9899, valPolicyAcc: 0.2735, valPolicyLoss: 3.3494, valValueMSE: 0.0806 },
  { epoch: 9,  trainLoss: 3.6813, trainPolicyAcc: 0.2761, trainPolicyLoss: 3.3096, trainValueMSE: 0.0289, valLoss: 3.8724, valPolicyAcc: 0.2797, valPolicyLoss: 3.3044, valValueMSE: 0.0699 },
  { epoch: 10, trainLoss: 3.6038, trainPolicyAcc: 0.2862, trainPolicyLoss: 3.2623, trainValueMSE: 0.0261, valLoss: 3.6654, valPolicyAcc: 0.2872, valPolicyLoss: 3.2751, valValueMSE: 0.0371 },
  { epoch: 11, trainLoss: 3.5412, trainPolicyAcc: 0.2963, trainPolicyLoss: 3.2211, trainValueMSE: 0.0242, valLoss: 3.5918, valPolicyAcc: 0.2963, valPolicyLoss: 3.2201, valValueMSE: 0.0355 },
  { epoch: 12, trainLoss: 3.4867, trainPolicyAcc: 0.3040, trainPolicyLoss: 3.1845, trainValueMSE: 0.0224, valLoss: 3.6643, valPolicyAcc: 0.3058, valPolicyLoss: 3.2125, valValueMSE: 0.0531 },
  { epoch: 13, trainLoss: 3.4405, trainPolicyAcc: 0.3099, trainPolicyLoss: 3.1523, trainValueMSE: 0.0210, valLoss: 3.5233, valPolicyAcc: 0.3021, valPolicyLoss: 3.1705, valValueMSE: 0.0345 },
  { epoch: 14, trainLoss: 3.4011, trainPolicyAcc: 0.3170, trainPolicyLoss: 3.1241, trainValueMSE: 0.0198, valLoss: 3.5842, valPolicyAcc: 0.3110, valPolicyLoss: 3.1593, valValueMSE: 0.0498 },
  { epoch: 15, trainLoss: 3.3660, trainPolicyAcc: 0.3224, trainPolicyLoss: 3.0989, trainValueMSE: 0.0186, valLoss: 3.6071, valPolicyAcc: 0.3006, valPolicyLoss: 3.1549, valValueMSE: 0.0560 },
  { epoch: 16, trainLoss: 3.3357, trainPolicyAcc: 0.3273, trainPolicyLoss: 3.0760, trainValueMSE: 0.0178, valLoss: 3.6905, valPolicyAcc: 0.3121, valPolicyLoss: 3.1255, valValueMSE: 0.0791 },
  { epoch: 17, trainLoss: 3.3080, trainPolicyAcc: 0.3310, trainPolicyLoss: 3.0553, trainValueMSE: 0.0169, valLoss: 3.3955, valPolicyAcc: 0.3236, valPolicyLoss: 3.1031, valValueMSE: 0.0250 },
  { epoch: 18, trainLoss: 3.2829, trainPolicyAcc: 0.3345, trainPolicyLoss: 3.0356, trainValueMSE: 0.0163, valLoss: 3.4305, valPolicyAcc: 0.3324, valPolicyLoss: 3.0955, valValueMSE: 0.0339 },
  { epoch: 19, trainLoss: 3.2592, trainPolicyAcc: 0.3379, trainPolicyLoss: 3.0180, trainValueMSE: 0.0154, valLoss: 3.4141, valPolicyAcc: 0.3183, valPolicyLoss: 3.0763, valValueMSE: 0.0349 },
  { epoch: 20, trainLoss: 3.2358, trainPolicyAcc: 0.3412, trainPolicyLoss: 3.0010, trainValueMSE: 0.0145, valLoss: 3.3576, valPolicyAcc: 0.3352, valPolicyLoss: 3.0553, valValueMSE: 0.0281 },
  { epoch: 21, trainLoss: 3.2152, trainPolicyAcc: 0.3453, trainPolicyLoss: 2.9845, trainValueMSE: 0.0140, valLoss: 3.3575, valPolicyAcc: 0.3359, valPolicyLoss: 3.0439, valValueMSE: 0.0307 },
  { epoch: 22, trainLoss: 3.1975, trainPolicyAcc: 0.3476, trainPolicyLoss: 2.9701, trainValueMSE: 0.0137, valLoss: 3.5641, valPolicyAcc: 0.3358, valPolicyLoss: 3.0385, valValueMSE: 0.0734 },
  { epoch: 23, trainLoss: 3.1767, trainPolicyAcc: 0.3509, trainPolicyLoss: 2.9545, trainValueMSE: 0.0129, valLoss: 3.4716, valPolicyAcc: 0.3411, valPolicyLoss: 3.0268, valValueMSE: 0.0575 },
  { epoch: 24, trainLoss: 3.1592, trainPolicyAcc: 0.3542, trainPolicyLoss: 2.9406, trainValueMSE: 0.0125, valLoss: 3.6357, valPolicyAcc: 0.3342, valPolicyLoss: 3.0180, valValueMSE: 0.0924 },
  { epoch: 25, trainLoss: 3.1414, trainPolicyAcc: 0.3566, trainPolicyLoss: 2.9263, trainValueMSE: 0.0121, valLoss: 3.2516, valPolicyAcc: 0.3468, valPolicyLoss: 2.9948, valValueMSE: 0.0205 },
  { epoch: 26, trainLoss: 3.1233, trainPolicyAcc: 0.3575, trainPolicyLoss: 2.9128, trainValueMSE: 0.0114, valLoss: 3.2983, valPolicyAcc: 0.3469, valPolicyLoss: 2.9806, valValueMSE: 0.0329 },
  { epoch: 27, trainLoss: 3.1082, trainPolicyAcc: 0.3606, trainPolicyLoss: 2.9009, trainValueMSE: 0.0111, valLoss: 3.3032, valPolicyAcc: 0.3543, valPolicyLoss: 2.9788, valValueMSE: 0.0346 },
  { epoch: 28, trainLoss: 3.1022, trainPolicyAcc: 0.3616, trainPolicyLoss: 2.8966, trainValueMSE: 0.0109, valLoss: 3.2781, valPolicyAcc: 0.3508, valPolicyLoss: 2.9878, valValueMSE: 0.0278 },
  { epoch: 29, trainLoss: 3.1160, trainPolicyAcc: 0.3600, trainPolicyLoss: 2.9087, trainValueMSE: 0.0111, valLoss: 3.3133, valPolicyAcc: 0.3488, valPolicyLoss: 3.0013, valValueMSE: 0.0318 },
  { epoch: 30, trainLoss: 3.1278, trainPolicyAcc: 0.3587, trainPolicyLoss: 2.9182, trainValueMSE: 0.0112, valLoss: 3.4733, valPolicyAcc: 0.3414, valPolicyLoss: 3.0650, valValueMSE: 0.0507 },
  { epoch: 31, trainLoss: 3.1421, trainPolicyAcc: 0.3573, trainPolicyLoss: 2.9297, trainValueMSE: 0.0113, valLoss: 3.3656, valPolicyAcc: 0.3573, valPolicyLoss: 3.0191, valValueMSE: 0.0378 },
  { epoch: 32, trainLoss: 3.1747, trainPolicyAcc: 0.3548, trainPolicyLoss: 2.9577, trainValueMSE: 0.0116, valLoss: 3.3886, valPolicyAcc: 0.3447, valPolicyLoss: 3.0580, valValueMSE: 0.0340 },
  { epoch: 33, trainLoss: 3.1799, trainPolicyAcc: 0.3569, trainPolicyLoss: 2.9635, trainValueMSE: 0.0111, valLoss: 3.4802, valPolicyAcc: 0.3494, valPolicyLoss: 3.1241, valValueMSE: 0.0389 },
  { epoch: 34, trainLoss: 3.2006, trainPolicyAcc: 0.3561, trainPolicyLoss: 2.9810, trainValueMSE: 0.0113, valLoss: 3.4202, valPolicyAcc: 0.3421, valPolicyLoss: 3.1467, valValueMSE: 0.0217 },
  { epoch: 35, trainLoss: 3.1839, trainPolicyAcc: 0.3621, trainPolicyLoss: 2.9668, trainValueMSE: 0.0105, valLoss: 3.7482, valPolicyAcc: 0.3425, valPolicyLoss: 3.2507, valValueMSE: 0.0661 },
  { epoch: 36, trainLoss: 3.1990, trainPolicyAcc: 0.3610, trainPolicyLoss: 2.9811, trainValueMSE: 0.0104, valLoss: 3.5182, valPolicyAcc: 0.3400, valPolicyLoss: 3.1400, valValueMSE: 0.0422 },
  { epoch: 37, trainLoss: 3.2039, trainPolicyAcc: 0.3616, trainPolicyLoss: 2.9865, trainValueMSE: 0.0101, valLoss: 3.4217, valPolicyAcc: 0.3508, valPolicyLoss: 3.1315, valValueMSE: 0.0243 },
];

// ============ V4 EPOCH DATA (Actual results from user) ============
export const v4Epochs: EpochData[] = [
  { epoch: 1,  lr: 5.995e-05, trainLoss: 8.1036, trainPolicyAcc: 0.0192, trainPolicyLoss: 6.7804, trainValueMSE: 0.2118, valLoss: 7.2493, valPolicyAcc: 0.0501, valPolicyLoss: 5.9870, valValueMSE: 0.1975 },
  { epoch: 2,  lr: 1.200e-04, trainLoss: 5.7393, trainPolicyAcc: 0.0702, trainPolicyLoss: 4.8969, trainValueMSE: 0.0950, valLoss: 4.7389, valPolicyAcc: 0.1148, valPolicyLoss: 3.9936, valValueMSE: 0.0737 },
  { epoch: 3,  lr: 1.800e-04, trainLoss: 4.5864, trainPolicyAcc: 0.1331, trainPolicyLoss: 3.8907, trainValueMSE: 0.0657, valLoss: 4.3838, valPolicyAcc: 0.1778, valPolicyLoss: 3.6166, valValueMSE: 0.0884 },
  { epoch: 4,  lr: 2.400e-04, trainLoss: 4.2042, trainPolicyAcc: 0.1799, trainPolicyLoss: 3.6011, trainValueMSE: 0.0532, valLoss: 4.3854, valPolicyAcc: 0.2063, valPolicyLoss: 3.4607, valValueMSE: 0.1396 },
  { epoch: 5,  lr: 3.000e-04, trainLoss: 3.9695, trainPolicyAcc: 0.2093, trainPolicyLoss: 3.4418, trainValueMSE: 0.0466, valLoss: 4.4846, valPolicyAcc: 0.2256, valPolicyLoss: 3.3675, valValueMSE: 0.2000 },
  { epoch: 6,  lr: 2.998e-04, trainLoss: 3.7859, trainPolicyAcc: 0.2329, trainPolicyLoss: 3.3272, trainValueMSE: 0.0409, valLoss: 3.8551, valPolicyAcc: 0.2396, valPolicyLoss: 3.2617, valValueMSE: 0.0795 },
  { epoch: 7,  lr: 2.990e-04, trainLoss: 3.6372, trainPolicyAcc: 0.2529, trainPolicyLoss: 3.2336, trainValueMSE: 0.0364, valLoss: 3.9800, valPolicyAcc: 0.2552, valPolicyLoss: 3.2343, valValueMSE: 0.1256 },
  { epoch: 8,  lr: 2.978e-04, trainLoss: 3.5261, trainPolicyAcc: 0.2686, trainPolicyLoss: 3.1616, trainValueMSE: 0.0335, valLoss: 4.0316, valPolicyAcc: 0.2623, valPolicyLoss: 3.1472, valValueMSE: 0.1661 },
  { epoch: 9,  lr: 2.961e-04, trainLoss: 3.4352, trainPolicyAcc: 0.2805, trainPolicyLoss: 3.1030, trainValueMSE: 0.0304, valLoss: 3.5721, valPolicyAcc: 0.2754, valPolicyLoss: 3.1020, valValueMSE: 0.0669 },
  { epoch: 10, lr: 2.939e-04, trainLoss: 3.3616, trainPolicyAcc: 0.2913, trainPolicyLoss: 3.0539, trainValueMSE: 0.0279, valLoss: 4.5412, valPolicyAcc: 0.2839, valPolicyLoss: 3.0821, valValueMSE: 0.3172 },
  { epoch: 11, lr: 2.913e-04, trainLoss: 3.3001, trainPolicyAcc: 0.3011, trainPolicyLoss: 3.0107, trainValueMSE: 0.0260, valLoss: 3.6518, valPolicyAcc: 0.3016, valPolicyLoss: 3.0236, valValueMSE: 0.1117 },
  { epoch: 12, lr: 2.882e-04, trainLoss: 3.2488, trainPolicyAcc: 0.3088, trainPolicyLoss: 2.9740, trainValueMSE: 0.0243, valLoss: 3.3226, valPolicyAcc: 0.3093, valPolicyLoss: 2.9980, valValueMSE: 0.0375 },
  { epoch: 13, lr: 2.847e-04, trainLoss: 3.2039, trainPolicyAcc: 0.3155, trainPolicyLoss: 2.9413, trainValueMSE: 0.0227, valLoss: 3.2564, valPolicyAcc: 0.3115, valPolicyLoss: 2.9809, valValueMSE: 0.0265 },
  { epoch: 14, lr: 2.807e-04, trainLoss: 3.1651, trainPolicyAcc: 0.3227, trainPolicyLoss: 2.9123, trainValueMSE: 0.0214, valLoss: 3.2836, valPolicyAcc: 0.3025, valPolicyLoss: 2.9636, valValueMSE: 0.0386 },
  { epoch: 15, lr: 2.763e-04, trainLoss: 3.1342, trainPolicyAcc: 0.3264, trainPolicyLoss: 2.8880, trainValueMSE: 0.0206, valLoss: 3.1920, valPolicyAcc: 0.3193, valPolicyLoss: 2.9229, valValueMSE: 0.0266 },
  { epoch: 16, lr: 2.715e-04, trainLoss: 3.1047, trainPolicyAcc: 0.3309, trainPolicyLoss: 2.8654, trainValueMSE: 0.0196, valLoss: 3.2966, valPolicyAcc: 0.3222, valPolicyLoss: 2.9095, valValueMSE: 0.0567 },
  { epoch: 17, lr: 2.662e-04, trainLoss: 3.0778, trainPolicyAcc: 0.3354, trainPolicyLoss: 2.8444, trainValueMSE: 0.0187, valLoss: 3.1808, valPolicyAcc: 0.3301, valPolicyLoss: 2.8801, valValueMSE: 0.0356 },
  { epoch: 18, lr: 2.606e-04, trainLoss: 3.0550, trainPolicyAcc: 0.3393, trainPolicyLoss: 2.8261, trainValueMSE: 0.0180, valLoss: 3.2826, valPolicyAcc: 0.3320, valPolicyLoss: 2.8792, valValueMSE: 0.0617 },
  { epoch: 19, lr: 2.547e-04, trainLoss: 3.0331, trainPolicyAcc: 0.3429, trainPolicyLoss: 2.8083, trainValueMSE: 0.0173, valLoss: 3.3178, valPolicyAcc: 0.3346, valPolicyLoss: 2.8680, valValueMSE: 0.0737 },
  { epoch: 20, lr: 2.484e-04, trainLoss: 3.0117, trainPolicyAcc: 0.3457, trainPolicyLoss: 2.7919, trainValueMSE: 0.0164, valLoss: 3.0801, valPolicyAcc: 0.3391, valPolicyLoss: 2.8443, valValueMSE: 0.0205 },
  { epoch: 21, lr: 2.418e-04, trainLoss: 2.9922, trainPolicyAcc: 0.3488, trainPolicyLoss: 2.7756, trainValueMSE: 0.0160, valLoss: 3.1013, valPolicyAcc: 0.3474, valPolicyLoss: 2.8393, valValueMSE: 0.0273 },
  { epoch: 22, lr: 2.349e-04, trainLoss: 2.9743, trainPolicyAcc: 0.3519, trainPolicyLoss: 2.7613, trainValueMSE: 0.0154, valLoss: 3.1040, valPolicyAcc: 0.3499, valPolicyLoss: 2.8176, valValueMSE: 0.0338 },
  { epoch: 23, lr: 2.277e-04, trainLoss: 2.9564, trainPolicyAcc: 0.3546, trainPolicyLoss: 2.7461, trainValueMSE: 0.0150, valLoss: 3.1027, valPolicyAcc: 0.3494, valPolicyLoss: 2.8134, valValueMSE: 0.0347 },
  { epoch: 24, lr: 2.203e-04, trainLoss: 2.9381, trainPolicyAcc: 0.3561, trainPolicyLoss: 2.7320, trainValueMSE: 0.0142, valLoss: 3.0268, valPolicyAcc: 0.3525, valPolicyLoss: 2.8021, valValueMSE: 0.0189 },
  { epoch: 25, lr: 2.126e-04, trainLoss: 2.9230, trainPolicyAcc: 0.3589, trainPolicyLoss: 2.7185, trainValueMSE: 0.0141, valLoss: 3.1161, valPolicyAcc: 0.3507, valPolicyLoss: 2.7992, valValueMSE: 0.0422 },
  { epoch: 26, lr: 2.047e-04, trainLoss: 2.9051, trainPolicyAcc: 0.3611, trainPolicyLoss: 2.7050, trainValueMSE: 0.0133, valLoss: 3.0139, valPolicyAcc: 0.3539, valPolicyLoss: 2.7797, valValueMSE: 0.0218 },
  { epoch: 27, lr: 1.967e-04, trainLoss: 2.8893, trainPolicyAcc: 0.3635, trainPolicyLoss: 2.6917, trainValueMSE: 0.0129, valLoss: 3.0531, valPolicyAcc: 0.3506, valPolicyLoss: 2.7726, valValueMSE: 0.0337 },
  { epoch: 28, lr: 1.885e-04, trainLoss: 2.8741, trainPolicyAcc: 0.3658, trainPolicyLoss: 2.6788, trainValueMSE: 0.0126, valLoss: 3.1164, valPolicyAcc: 0.3642, valPolicyLoss: 2.7595, valValueMSE: 0.0531 },
  { epoch: 29, lr: 1.802e-04, trainLoss: 2.8624, trainPolicyAcc: 0.3674, trainPolicyLoss: 2.6701, trainValueMSE: 0.0122, valLoss: 3.0367, valPolicyAcc: 0.3595, valPolicyLoss: 2.7586, valValueMSE: 0.0336 },
  { epoch: 30, lr: 1.718e-04, trainLoss: 2.8716, trainPolicyAcc: 0.3665, trainPolicyLoss: 2.6785, trainValueMSE: 0.0123, valLoss: 2.9725, valPolicyAcc: 0.3609, valPolicyLoss: 2.7586, valValueMSE: 0.0174 },
  { epoch: 31, lr: 1.633e-04, trainLoss: 2.8896, trainPolicyAcc: 0.3642, trainPolicyLoss: 2.6959, trainValueMSE: 0.0121, valLoss: 3.0786, valPolicyAcc: 0.3596, valPolicyLoss: 2.7894, valValueMSE: 0.0360 },
  { epoch: 32, lr: 1.548e-04, trainLoss: 2.8990, trainPolicyAcc: 0.3632, trainPolicyLoss: 2.7042, trainValueMSE: 0.0121, valLoss: 3.0770, valPolicyAcc: 0.3595, valPolicyLoss: 2.8189, valValueMSE: 0.0277 },
  { epoch: 33, lr: 1.462e-04, trainLoss: 2.9234, trainPolicyAcc: 0.3608, trainPolicyLoss: 2.7262, trainValueMSE: 0.0124, valLoss: 3.1784, valPolicyAcc: 0.3542, valPolicyLoss: 2.8558, valValueMSE: 0.0434 },
  { epoch: 34, lr: 1.377e-04, trainLoss: 2.9532, trainPolicyAcc: 0.3592, trainPolicyLoss: 2.7543, trainValueMSE: 0.0124, valLoss: 3.1582, valPolicyAcc: 0.3511, valPolicyLoss: 2.9059, valValueMSE: 0.0254 },
  { epoch: 35, lr: 1.292e-04, trainLoss: 2.9606, trainPolicyAcc: 0.3615, trainPolicyLoss: 2.7616, trainValueMSE: 0.0121, valLoss: 3.2118, valPolicyAcc: 0.3610, valPolicyLoss: 2.9441, valValueMSE: 0.0290 },
  { epoch: 36, lr: 1.208e-04, trainLoss: 2.9656, trainPolicyAcc: 0.3654, trainPolicyLoss: 2.7666, trainValueMSE: 0.0119, valLoss: 3.1235, valPolicyAcc: 0.3629, valPolicyLoss: 2.8584, valValueMSE: 0.0282 },
  { epoch: 37, lr: 1.125e-04, trainLoss: 2.9728, trainPolicyAcc: 0.3676, trainPolicyLoss: 2.7739, trainValueMSE: 0.0116, valLoss: 3.0904, valPolicyAcc: 0.3626, valPolicyLoss: 2.8483, valValueMSE: 0.0223 },
  { epoch: 38, lr: 1.043e-04, trainLoss: 2.9728, trainPolicyAcc: 0.3689, trainPolicyLoss: 2.7766, trainValueMSE: 0.0110, valLoss: 3.2598, valPolicyAcc: 0.3572, valPolicyLoss: 3.0199, valValueMSE: 0.0216 },
  { epoch: 39, lr: 9.627e-05, trainLoss: 2.9625, trainPolicyAcc: 0.3710, trainPolicyLoss: 2.7677, trainValueMSE: 0.0106, valLoss: 3.1460, valPolicyAcc: 0.3669, valPolicyLoss: 2.9295, valValueMSE: 0.0159 },
  { epoch: 40, lr: 8.840e-05, trainLoss: 2.9541, trainPolicyAcc: 0.3726, trainPolicyLoss: 2.7610, trainValueMSE: 0.0103, valLoss: 3.2417, valPolicyAcc: 0.3624, valPolicyLoss: 3.0198, valValueMSE: 0.0173 },
  { epoch: 41, lr: 8.074e-05, trainLoss: 2.9487, trainPolicyAcc: 0.3745, trainPolicyLoss: 2.7576, trainValueMSE: 0.0100, valLoss: 3.1005, valPolicyAcc: 0.3711, valPolicyLoss: 2.8301, valValueMSE: 0.0297 },
  { epoch: 42, lr: 7.330e-05, trainLoss: 2.9387, trainPolicyAcc: 0.3763, trainPolicyLoss: 2.7495, trainValueMSE: 0.0096, valLoss: 3.0380, valPolicyAcc: 0.3696, valPolicyLoss: 2.8219, valValueMSE: 0.0163 },
];

// =====================================================================
//  VERSION CONFIG DETAILS
// =====================================================================
export interface VersionConfig {
  version: string;
  label: string;
  color: string;
  colorLight: string;
  // Dataset
  numGames: number;
  totalPositions: number;
  encoding: string;
  policyType: string;
  augmentation: string;
  // Architecture  
  resBlocks: number;
  filters: number;
  seBlocks: boolean;
  seRatio: number | null;
  policyFilters: number;
  policyHead: string;
  valueHead: string;
  // Training
  batchSize: number;
  epochs: number;
  epochsTrained: number;
  bestEpoch: number;
  peakLR: string;
  minLR: string;
  lrSchedule: string;
  warmupEpochs: number;
  valueLossWeight: number;
  labelSmoothing: number;
  clipnorm: number;
  dropout: number;
  valueDropout: number;
  // Results
  bestValPolicyAcc: number;
  bestValLoss: number;
  bestValValueMSE: number;
  finalTrainPolicyAcc: number;
  finalValPolicyAcc: number;
  overfitGap: number;
  bestTrainPolicyLoss: number;
  bestValPolicyLoss: number;
}

export const versions: VersionConfig[] = [
  {
    version: 'V1', label: 'Baseline', color: '#EF4444', colorLight: '#FCA5A5',
    numGames: 100, totalPositions: 593247, encoding: '8×8×13', policyType: 'One-hot (best move only)', augmentation: 'None',
    resBlocks: 10, filters: 128, seBlocks: false, seRatio: null, policyFilters: 2, policyHead: 'Conv(2)→Flat→Dense(4096)', valueHead: 'Conv(1)→128→1',
    batchSize: 1024, epochs: 30, epochsTrained: 27, bestEpoch: 11, peakLR: '1e-4', minLR: '—', lrSchedule: 'ReduceLROnPlateau', warmupEpochs: 0,
    valueLossWeight: 1.0, labelSmoothing: 0.10, clipnorm: 1.0, dropout: 0.3, valueDropout: 0.0,
    bestValPolicyAcc: 0.1939, bestValLoss: 4.8274, bestValValueMSE: 0.0218,
    finalTrainPolicyAcc: 0.4123, finalValPolicyAcc: 0.1919, overfitGap: 0.2204,
    bestTrainPolicyLoss: 3.4786, bestValPolicyLoss: 4.6205,
  },
  {
    version: 'V2', label: 'Data Fix', color: '#F59E0B', colorLight: '#FCD34D',
    numGames: 5000, totalPositions: 764880, encoding: '8×8×19', policyType: 'Soft multi-PV (top 5)', augmentation: 'Pre-computed horizontal flip',
    resBlocks: 10, filters: 128, seBlocks: false, seRatio: null, policyFilters: 32, policyHead: 'Conv(32)→Flat→Dense(4096)', valueHead: 'Conv(1)→128→1',
    batchSize: 512, epochs: 31, epochsTrained: 31, bestEpoch: 31, peakLR: '3e-4', minLR: '—', lrSchedule: 'ReduceLROnPlateau', warmupEpochs: 0,
    valueLossWeight: 5.0, labelSmoothing: 0.05, clipnorm: 1.0, dropout: 0.3, valueDropout: 0.0,
    bestValPolicyAcc: 0.2820, bestValLoss: 3.4325, bestValValueMSE: 0.0166,
    finalTrainPolicyAcc: 0.3790, finalValPolicyAcc: 0.2808, overfitGap: 0.0982,
    bestTrainPolicyLoss: 3.1100, bestValPolicyLoss: 3.2280,
  },
  {
    version: 'V3', label: 'Architecture', color: '#8B5CF6', colorLight: '#C4B5FD',
    numGames: 5000, totalPositions: 764880, encoding: '8×8×19', policyType: 'Soft multi-PV (top 5)', augmentation: 'On-the-fly 50% flip',
    resBlocks: 12, filters: 128, seBlocks: true, seRatio: 4, policyFilters: 64, policyHead: 'Conv(64)→Flat→Drop(0.3)→Dense(4096)', valueHead: 'Conv(4)→256→64→1',
    batchSize: 512, epochs: 50, epochsTrained: 37, bestEpoch: 25, peakLR: '3e-4', minLR: '1e-6', lrSchedule: 'CosineDecay + Warmup', warmupEpochs: 5,
    valueLossWeight: 5.0, labelSmoothing: 0.05, clipnorm: 0.5, dropout: 0.3, valueDropout: 0.0,
    bestValPolicyAcc: 0.3468, bestValLoss: 3.2516, bestValValueMSE: 0.0205,
    finalTrainPolicyAcc: 0.3616, finalValPolicyAcc: 0.3508, overfitGap: 0.0108,
    bestTrainPolicyLoss: 2.9263, bestValPolicyLoss: 2.9948,
  },
  {
    version: 'V4', label: 'Final', color: '#10B981', colorLight: '#6EE7B7',
    numGames: 5000, totalPositions: 764880, encoding: '8×8×19', policyType: 'Soft multi-PV (top 5)', augmentation: 'On-the-fly 50% flip',
    resBlocks: 12, filters: 128, seBlocks: true, seRatio: 4, policyFilters: 64, policyHead: 'Conv(64)→Flat→Drop(0.3)→Dense(4096)', valueHead: 'Conv(4)→256→Drop(0.2)→64→Drop(0.2)→1',
    batchSize: 512, epochs: 60, epochsTrained: 42, bestEpoch: 30, peakLR: '3e-4', minLR: '1e-6', lrSchedule: 'CosineDecay + Warmup (callback)', warmupEpochs: 5,
    valueLossWeight: 4.0, labelSmoothing: 0.03, clipnorm: 0.5, dropout: 0.3, valueDropout: 0.2,
    bestValPolicyAcc: 0.3696, bestValLoss: 2.9725, bestValValueMSE: 0.0174,
    finalTrainPolicyAcc: 0.3763, finalValPolicyAcc: 0.3696, overfitGap: 0.0066,
    bestTrainPolicyLoss: 2.6785, bestValPolicyLoss: 2.7586,
  },
];

// =====================================================================
//  COMPLETE SOURCE CODE STRINGS
// =====================================================================

export const datasetGenCode = `import chess
import chess.engine
import numpy as np
import random
import os
import time
import multiprocessing
from multiprocessing import Pool

# ==================== CONFIG (KAGGLE) ======================
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
# ===========================================================

# ============== BOARD ENCODING (IMPROVED) ===================
def encode_board(board):
    """
    Encode board state into (8, 8, 19) tensor.
    
    Planes 0-5:   White pieces (P, N, B, R, Q, K)
    Planes 6-11:  Black pieces (P, N, B, R, Q, K)
    Plane 12:     Turn indicator (1.0 = White, 0.0 = Black)
    Plane 13:     White kingside castling right
    Plane 14:     White queenside castling right
    Plane 15:     Black kingside castling right
    Plane 16:     Black queenside castling right
    Plane 17:     En-passant square (1.0 on the target square)
    Plane 18:     Halfmove clock (normalized 0-1, capped at 100)
    """
    planes = np.zeros((8, 8, 19), dtype=np.float32)
    
    for sq, pc in board.piece_map().items():
        r, c = divmod(sq, 8)
        offset = 0 if pc.color == chess.WHITE else 6
        planes[r, c, offset + pc.piece_type - 1] = 1.0
    
    planes[:, :, 12] = 1.0 if board.turn == chess.WHITE else 0.0
    
    if board.has_kingside_castling_rights(chess.WHITE):
        planes[:, :, 13] = 1.0
    if board.has_queenside_castling_rights(chess.WHITE):
        planes[:, :, 14] = 1.0
    if board.has_kingside_castling_rights(chess.BLACK):
        planes[:, :, 15] = 1.0
    if board.has_queenside_castling_rights(chess.BLACK):
        planes[:, :, 16] = 1.0
    
    if board.ep_square is not None:
        r, c = divmod(board.ep_square, 8)
        planes[r, c, 17] = 1.0
    
    planes[:, :, 18] = min(board.halfmove_clock, 100) / 100.0
    
    return planes


def move_index(move):
    return move.from_square * 64 + move.to_square


def make_soft_policy(multi_pv_info, board, temperature=200.0):
    policy = np.zeros((4096,), dtype=np.float32)
    scores = []
    moves = []
    
    for info in multi_pv_info:
        if "pv" not in info or len(info["pv"]) == 0:
            continue
        move = info["pv"][0]
        if move not in board.legal_moves:
            continue
        score = info["score"].pov(board.turn).score(mate_score=10000)
        if score is None:
            continue
        scores.append(score)
        moves.append(move)
    
    if len(moves) == 0:
        return None, None
    
    scores = np.array(scores, dtype=np.float64)
    scores = scores / temperature
    scores = scores - scores.max()
    exp_scores = np.exp(scores)
    probs = exp_scores / exp_scores.sum()
    
    for move, prob in zip(moves, probs):
        idx = move_index(move)
        policy[idx] = prob
    
    return policy, moves[0]


def choose_move(multi_pv_info, board, exploration_rate=0.25):
    valid = []
    for info in multi_pv_info:
        if "pv" not in info or len(info["pv"]) == 0:
            continue
        move = info["pv"][0]
        if move not in board.legal_moves:
            continue
        score = info["score"].pov(board.turn).score(mate_score=10000)
        if score is not None:
            valid.append((move, score))
    
    if len(valid) == 0:
        return None
    
    if random.random() > exploration_rate or len(valid) == 1:
        return valid[0][0]
    
    scores = np.array([s for _, s in valid], dtype=np.float64)
    scores = scores / 300.0
    scores = scores - scores.max()
    exp_scores = np.exp(scores)
    probs = exp_scores / exp_scores.sum()
    
    idx = np.random.choice(len(valid), p=probs)
    return valid[idx][0]


def compute_value_target(score, board_turn):
    if score is None:
        return 0.0
    normalized = np.tanh(score / 600.0)
    stm = 1.0 if board_turn == chess.WHITE else -1.0
    return float(normalized * stm)


def play_random_opening(board, min_moves=4, max_moves=10):
    num_moves = random.randint(min_moves, max_moves)
    for _ in range(num_moves):
        if board.is_game_over():
            break
        legal = list(board.legal_moves)
        if not legal:
            break
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
        board = play_random_opening(board, min_moves=4, max_moves=10)

        for move_num in range(MOVES_PER_GAME):
            if board.is_game_over():
                break
            if not list(board.legal_moves):
                break

            try:
                multi_pv = engine.analyse(
                    board,
                    chess.engine.Limit(depth=ENGINE_DEPTH),
                    multipv=min(MULTI_PV, len(list(board.legal_moves)))
                )
            except Exception:
                break
            
            if isinstance(multi_pv, dict):
                multi_pv = [multi_pv]

            policy, best_move = make_soft_policy(
                multi_pv, board, temperature=POLICY_TEMPERATURE
            )
            if policy is None or best_move is None:
                break

            best_score = multi_pv[0]["score"].pov(chess.WHITE).score(mate_score=10000)
            value = compute_value_target(best_score, board.turn)

            planes = encode_board(board)
            samples.append((planes, policy, value))

            eff_exploration = EXPLORATION_RATE if move_num < 50 else 0.05
            chosen_move = choose_move(multi_pv, board, eff_exploration)
            if chosen_move is None:
                break
            board.push(chosen_move)

    except Exception as e:
        print(f"[ERROR] Game {game_id}: {e}")
    finally:
        try:
            engine.quit()
        except:
            pass

    if (game_id + 1) % 50 == 0:
        print(f"  Game {game_id + 1}/{NUM_GAMES} done — {len(samples)} positions")

    return samples


if __name__ == "__main__":
    start_time = time.time()
    print("=" * 60)
    print(f"  Chess Dataset Generator v2")
    print(f"  Games: {NUM_GAMES} | Multi-PV: {MULTI_PV}")
    print(f"  Exploration: {EXPLORATION_RATE*100}% | Workers: {NUM_WORKERS}")
    print("=" * 60)

    all_X, all_P, all_V = [], [], []
    batch_size = SAVE_EVERY
    
    for batch_start in range(0, NUM_GAMES, batch_size):
        batch_end = min(batch_start + batch_size, NUM_GAMES)
        batch_ids = list(range(batch_start, batch_end))
        
        print(f"\\n--- Batch: Games {batch_start+1}-{batch_end} ---")

        with Pool(processes=NUM_WORKERS) as pool:
            results = pool.map(generate_game_worker, batch_ids)

        batch_samples = 0
        for game_samples in results:
            for planes, policy, value in game_samples:
                all_X.append(planes)
                all_P.append(policy)
                all_V.append(value)
                batch_samples += 1
        
        print(f"  Batch: {batch_samples} positions (total: {len(all_X)})")

        if len(all_X) > 0:
            X_arr = np.stack(all_X)
            P_arr = np.stack(all_P)
            V_arr = np.array(all_V, dtype=np.float32)
            np.savez_compressed(f"checkpoint_{batch_end}.npz", X=X_arr, P=P_arr, V=V_arr)
            print(f"  Checkpoint saved: checkpoint_{batch_end}.npz")

    # Final save
    X = np.stack(all_X)
    P = np.stack(all_P)
    V = np.array(all_V, dtype=np.float32)

    indices = np.random.permutation(len(X))
    X, P, V = X[indices], P[indices], V[indices]

    np.savez_compressed(SAVE_FILE, X=X, P=P, V=V)

    elapsed = time.time() - start_time
    print(f"\\n  DONE! {SAVE_FILE} — {X.shape[0]} positions in {elapsed/60:.1f}min")`;

export const augmentationCode = `import numpy as np
import gc

# Load complete checkpoint
print("Loading checkpoint_5000.npz...")
data = np.load("/kaggle/working/checkpoint_5000.npz")
X = data["X"]
P = data["P"]
V = data["V"]
del data; gc.collect()
print(f"Loaded: X={X.shape}, P={P.shape}, V={V.shape}")

# Build policy flip lookup table
print("Building flip lookup table...")
flip_map = np.empty(4096, dtype=np.int64)
for from_sq in range(64):
    for to_sq in range(64):
        old_idx = from_sq * 64 + to_sq
        fr, ff = divmod(from_sq, 8)
        tr, tf = divmod(to_sq, 8)
        new_from = fr * 8 + (7 - ff)
        new_to = tr * 8 + (7 - tf)
        flip_map[old_idx] = new_from * 64 + new_to

# Augment: horizontal flip (memory-safe)
print("Flipping board states...")
n = len(X)

X_flip = np.flip(X, axis=2).copy()

# Fix castling rights: swap kingside <-> queenside
temp = X_flip[:, :, :, 13].copy()
X_flip[:, :, :, 13] = X_flip[:, :, :, 14]
X_flip[:, :, :, 14] = temp
del temp

temp = X_flip[:, :, :, 15].copy()
X_flip[:, :, :, 15] = X_flip[:, :, :, 16]
X_flip[:, :, :, 16] = temp
del temp

X = np.concatenate([X, X_flip])
del X_flip; gc.collect()
print(f"  X augmented: {X.shape}")

# Flip policies in batches
print("Flipping policies...")
P_new = np.empty((2 * n, 4096), dtype=np.float32)
P_new[:n] = P

BATCH = 50000
for s in range(0, n, BATCH):
    e = min(s + BATCH, n)
    P_new[n + s : n + e] = P[s:e][:, flip_map]
    
del P; gc.collect()
P = P_new
del P_new; gc.collect()
print(f"  P augmented: {P.shape}")

V = np.concatenate([V, V])
print(f"  V augmented: {V.shape}")

# Shuffle
print("Shuffling...")
indices = np.random.permutation(len(X))
X = X[indices]; gc.collect()
P = P[indices]; gc.collect()
V = V[indices]
del indices; gc.collect()

# Save
SAVE_FILE = "training_data_v2.npz"
print(f"Saving to {SAVE_FILE}...")
np.savez_compressed(SAVE_FILE, X=X, P=P, V=V)

print(f"DONE! X={X.shape}, P={P.shape}, V={V.shape}")`;

export const v4TrainingCode = `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import gc, os, sys, math

# ================== CONFIG ======================
DATA_PATH = "/kaggle/input/chess-dataset-v2/training_data_v2.npz"
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

# ================ LOGGING ================
log_file = open("training_v4.log", "a")
class Tee:
    def __init__(self, f):
        self.f = f
        self.t = sys.stdout
    def write(self, m):
        self.t.write(m)
        self.f.write(m)
    def flush(self):
        self.t.flush()
        self.f.flush()
sys.stdout = Tee(log_file)

# ================ LOAD DATA ================
print("Loading data...")
data = np.load(DATA_PATH)
X_all = data["X"]
P_all = data["P"]
V_all = data["V"]
del data; gc.collect()

X_all = X_all.astype(np.float16)
P_all = P_all.astype(np.float16)
gc.collect()

print(f"  X: {X_all.shape} ({X_all.nbytes/1e9:.2f} GB)")
print(f"  P: {P_all.shape} ({P_all.nbytes/1e9:.2f} GB)")
print(f"  V: {V_all.shape} ({V_all.nbytes/1e6:.1f} MB)")

# Random split
total = len(X_all)
indices = np.random.permutation(total)
split = int(total * 0.85)
train_idx = indices[:split]
test_idx = indices[split:]
del indices; gc.collect()

X_train = X_all[train_idx]; X_val = X_all[test_idx]
del X_all; gc.collect()
P_train = P_all[train_idx]; P_val = P_all[test_idx]
del P_all; gc.collect()
V_train = V_all[train_idx]; V_val = V_all[test_idx]
del V_all, train_idx, test_idx; gc.collect()

print(f"  Train: {len(X_train):,} | Val: {len(X_val):,}")

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
        self.bs = bs
        self.augment = augment
        self.shuffle = shuffle
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
        if self.shuffle:
            np.random.shuffle(self.idx)

train_gen = ChessGen(X_train, P_train, V_train, BATCH_SIZE, augment=True)
val_gen = ChessGen(X_val, P_val, V_val, BATCH_SIZE, augment=False, shuffle=False)

steps_per_epoch = len(train_gen)
total_steps = steps_per_epoch * EPOCHS
warmup_steps = steps_per_epoch * WARMUP_EPOCHS

# ================ LR SCHEDULE (CALLBACK) ================
class WarmupCosineCallback(keras.callbacks.Callback):
    def __init__(self, peak_lr, min_lr, warmup_steps, total_steps):
        super().__init__()
        self.peak_lr = peak_lr
        self.min_lr = min_lr
        self.warmup_steps = warmup_steps
        self.decay_steps = total_steps - warmup_steps
        self.step = 0

    def on_train_batch_begin(self, batch, logs=None):
        if self.step < self.warmup_steps:
            lr = self.peak_lr * (self.step / max(1, self.warmup_steps))
        else:
            progress = (self.step - self.warmup_steps) / max(1, self.decay_steps)
            progress = min(max(progress, 0.0), 1.0)
            lr = self.min_lr + 0.5 * (self.peak_lr - self.min_lr) * (
                1.0 + math.cos(math.pi * progress)
            )
        self.model.optimizer.learning_rate = lr
        self.step += 1

    def on_epoch_end(self, epoch, logs=None):
        lr = float(self.model.optimizer.learning_rate)
        if logs is not None:
            logs["lr"] = lr

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

    for _ in range(NUM_RES_BLOCKS):
        x = res_block(x)

    # Policy head
    p = layers.Conv2D(POLICY_FILTERS, 1, use_bias=False,
                      kernel_regularizer=keras.regularizers.l2(L2_REG))(x)
    p = layers.BatchNormalization()(p)
    p = layers.Activation("relu")(p)
    p = layers.Flatten()(p)
    p = layers.Dropout(DROPOUT_RATE)(p)
    policy = layers.Dense(4096, activation="softmax",
                         dtype="float32", name="policy")(p)

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
    value = layers.Dense(1, activation="tanh",
                        dtype="float32", name="value")(v)

    return keras.Model(inp, [policy, value], name="ChessNet_v4")

model = build_model()
model.summary()

# ================ COMPILE ================
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=PEAK_LR, clipnorm=CLIPNORM),
    loss={
        "policy": keras.losses.CategoricalCrossentropy(label_smoothing=LABEL_SMOOTHING),
        "value": "mse",
    },
    loss_weights={"policy": 1.0, "value": VALUE_LOSS_WEIGHT},
    metrics={"policy": ["accuracy"], "value": ["mse"]},
)

# ================ CALLBACKS ================
lr_callback = WarmupCosineCallback(PEAK_LR, MIN_LR, warmup_steps, total_steps)

callbacks = [
    lr_callback,
    keras.callbacks.ModelCheckpoint(
        "chess_v4_best.weights.h5",
        save_weights_only=True, save_best_only=True,
        monitor="val_policy_accuracy", mode="max", verbose=1
    ),
    keras.callbacks.ModelCheckpoint(
        "chess_v4_best_loss.weights.h5",
        save_weights_only=True, save_best_only=True,
        monitor="val_loss", mode="min", verbose=0
    ),
    keras.callbacks.EarlyStopping(
        monitor="val_loss", patience=12,
        restore_best_weights=True, verbose=1
    ),
    keras.callbacks.CSVLogger("training_v4.csv", append=True),
    keras.callbacks.TerminateOnNaN(),
]

# ================ TRAIN ================
print("\\nTRAINING STARTED (v4)")
history = model.fit(
    train_gen, validation_data=val_gen,
    epochs=EPOCHS, callbacks=callbacks, verbose=1,
)

# ================ SAVE ================
model.save(MODEL_OUT)
model.save_weights(WEIGHTS_OUT)

# ================ EVALUATE ================
results = model.evaluate(val_gen, verbose=1)
for k, v in zip(model.metrics_names, results):
    print(f"  {k}: {v:.6f}")

h = history.history
best = np.argmin(h["val_loss"])
print(f"\\n  Best epoch: {best + 1}")
print(f"  Best val_loss: {h['val_loss'][best]:.4f}")
print(f"  Best val_policy_acc: {h['val_policy_accuracy'][best]:.4f}")
print(f"  Best val_value_mse: {h['val_value_mse'][best]:.6f}")

ta = h["policy_accuracy"][-1]
va = h["val_policy_accuracy"][-1]
print(f"\\n  Final train acc: {ta:.4f}")
print(f"  Final val acc:   {va:.4f}")
print(f"  Overfit gap:     {ta - va:.4f}")

sys.stdout = sys.__stdout__
log_file.close()`;
