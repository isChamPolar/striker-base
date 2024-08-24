export const wakuwakuSpeedMaster = {
  "同族加速": {
    "特級": 20,
    "特級M": 26.6,
    "特級L": 33.3,
    "特級EL": 36.6,
    "1級": 6.6,
    "1級M": 8.3,
    "1級L": 10.0,
  },
  "同族加撃速": {
    "特級": 16,
    "特級M": 21.2,
    "特級L": 26.6,
    "特級EL": 29.3,
    "1級": 5.4,
    "1級M": 6.6,
    "1級L": 8.0,
  },
  "同族加速命": {
    "特級": 16,
    "特級M": 21.2,
    "特級L": 26.6,
    "特級EL": 29.3,
    "1級": 5.4,
    "1級M": 6.6,
    "1級L": 8.0,
  },
  "撃種加速": {
    "特級": 10,
    "特級M": 13.3,
    "特級L": 16.6,
    "特級EL": 18.3,
    "1級": 3.4,
    "1級M": 4.2,
    "1級L": 5.0,
  },
  "戦型加速": {
    "特級": 10,
    "特級M": 13.3,
    "特級L": 16.6,
    "特級EL": 18.3,
    "1級": 3.4,
    "1級M": 4.2,
    "1級L": 5.0,
  },
  "撃種加撃速": {
    "特級": 8,
    "特級M": 10.6,
    "特級L": 13.2,
    "特級EL": 14.5,
    "1級": 2.8,
    "1級M": 3.4,
    "1級L": 4.0,
  },
  "戦型加撃速": {
    "特級": 8,
    "特級M": 10.6,
    "特級L": 13.2,
    "特級EL": 14.5,
    "1級": 2.8,
    "1級M": 3.4,
    "1級L": 4.0,
  },
  "撃種加速命": {
    "特級": 8,
    "特級M": 10.6,
    "特級L": 13.2,
    "特級EL": 14.5,
    "1級": 2.8,
    "1級M": 3.4,
    "1級L": 4.0,
  },
  "戦型加速命": {
    "特級": 8,
    "特級M": 10.6,
    "特級L": 13.2,
    "特級EL": 14.5,
    "1級": 2.8,
    "1級M": 3.4,
    "1級L": 4.0,
  },
};

export const getSortedWakuwaku = () => {
    const sortedWakuwaku = [];
    for (const [name, effects] of Object.entries(wakuwakuSpeedMaster)) {
        for (const [grade, effect] of Object.entries(effects)) {
        sortedWakuwaku.push({ name: `${name} ${grade}`, effect });
        }
    }
    return sortedWakuwaku.sort((a, b) => b.effect - a.effect);
};