// ============================================
// CRICKET CITY — Cricket Knowledge Base
// Pre-populated data for AI agent to research players
// ============================================

export const CRICKET_KNOWLEDGE = {
  // ===== Players not yet in the city =====
  'Sunil Gavaskar': {
    id: 'gavaskar', name: 'Sunil Gavaskar', country: 'India', flag: '🇮🇳',
    role: 'Batter', born: 1949, debut: 1971, retired: 1987, image: '🏏',
    career: {
      test: { matches: 125, innings: 214, runs: 10122, avg: 51.12, sr: 42.0, hs: '236*', hundreds: 34, fifties: 45, wickets: 1, bestBowling: '1/34' },
      odi: { matches: 108, innings: 102, runs: 3092, avg: 35.13, sr: 60.0, hs: '103*', hundreds: 1, fifties: 27, wickets: 1, bestBowling: '1/5' }
    },
    records: [
      '🏆 First player to score 10,000 Test runs',
      '🏆 34 Test centuries — record at the time',
      '🏆 774 runs in a single debut Test series vs West Indies',
      '🏆 236* — Highest score by an Indian at the time',
      '🏆 Held the record for most Test runs for 19 years'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'West Indies', venue: 'Port of Spain', year: 1971, batting: { runs: 65, balls: 130, dots: 90, fours: 8, sixes: 0, sr: 50.0, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut — scored 65 in the first innings' },
      { num: 2, format: 'Test', opponent: 'West Indies', venue: 'Georgetown', year: 1971, batting: { runs: 116, balls: 230, dots: 160, fours: 14, sixes: 0, sr: 50.4, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 116* + 64* on debut series — scored 774 runs in the series!' },
      { num: 3, format: 'Test', opponent: 'West Indies', venue: 'Madras', year: 1983, batting: { runs: 236, balls: 425, dots: 310, fours: 25, sixes: 0, sr: 55.5, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 236* — Highest score, went past Bradman at the time as most Test centuries' }
    ]
  },
  'Ricky Ponting': {
    id: 'ponting', name: 'Ricky Ponting', country: 'Australia', flag: '🇦🇺',
    role: 'Batter', born: 1974, debut: 1995, retired: 2012, image: '🏏',
    career: {
      test: { matches: 168, innings: 287, runs: 13378, avg: 51.85, sr: 58.72, hs: '257', hundreds: 41, fifties: 62, wickets: 5, bestBowling: '1/0' },
      odi: { matches: 375, innings: 365, runs: 13704, avg: 42.03, sr: 80.39, hs: '164', hundreds: 30, fifties: 82, wickets: 3, bestBowling: '1/6' },
      t20i: { matches: 17, innings: 17, runs: 401, avg: 28.64, sr: 132.01, hs: '98*', hundreds: 0, fifties: 2 }
    },
    records: [
      '🏆 Most successful Test captain — 48 wins',
      '🏆 Led Australia to 3 consecutive World Cup finals (2003, 2007)',
      '🏆 41 Test centuries — 2nd most ever after Sachin',
      '🏆 27,483 international runs — 2nd most ever',
      '🏆 ICC Cricketer of the Year 2006, 2007'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Sri Lanka', venue: 'Perth', year: 1995, batting: { runs: 96, balls: 160, dots: 110, fours: 12, sixes: 0, sr: 60.0, dismissal: 'lbw' }, bowling: null, isRecord: false, note: 'Test debut — agonizingly fell 4 short of a century' },
      { num: 2, format: 'ODI', opponent: 'India', venue: 'Johannesburg', year: 2003, batting: { runs: 140, balls: 121, dots: 40, fours: 4, sixes: 8, sr: 115.7, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 140* in World Cup Final — Led Australia to 2003 World Cup glory' },
      { num: 3, format: 'Test', opponent: 'India', venue: 'Adelaide', year: 2003, batting: { runs: 257, balls: 458, dots: 320, fours: 34, sixes: 0, sr: 56.1, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 257 — Highest Test score, a marathon innings' }
    ]
  },
  'Kumar Sangakkara': {
    id: 'sanga', name: 'Kumar Sangakkara', country: 'Sri Lanka', flag: '🇱🇰',
    role: 'WK-Batter', born: 1977, debut: 2000, retired: 2015, image: '🧤',
    career: {
      test: { matches: 134, innings: 233, runs: 12400, avg: 57.4, sr: 54.08, hs: '319', hundreds: 38, fifties: 52, wickets: 0, bestBowling: '-' },
      odi: { matches: 404, innings: 380, runs: 14234, avg: 41.98, sr: 78.86, hs: '169', hundreds: 25, fifties: 93, wickets: 0, bestBowling: '-' },
      t20i: { matches: 56, innings: 53, runs: 1382, avg: 31.4, sr: 119.18, hs: '78', hundreds: 0, fifties: 8 }
    },
    records: [
      '🏆 319 — Highest Test score by a Sri Lankan',
      '🏆 4 consecutive centuries in World Cup 2015',
      '🏆 12,400 Test runs — 5th most ever',
      '🏆 Most dismissals by a WK in Test history (182)',
      '🏆 ICC Cricketer of the Year 2012'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'South Africa', venue: 'Durban', year: 2000, batting: { runs: 20, balls: 30, dots: 22, fours: 3, sixes: 0, sr: 66.6, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'Bangladesh', venue: 'Chittagong', year: 2014, batting: { runs: 319, balls: 447, dots: 310, fours: 35, sixes: 3, sr: 71.3, dismissal: 'declared' }, bowling: null, isRecord: true, note: '🏆 319 — Highest score by a Sri Lankan, broke Jayawardene\'s record' }
    ]
  },
  'Viv Richards': {
    id: 'vivrichards', name: 'Viv Richards', country: 'West Indies', flag: '🏝️',
    role: 'Batter', born: 1952, debut: 1974, retired: 1991, image: '👑',
    career: {
      test: { matches: 121, innings: 182, runs: 8540, avg: 50.23, sr: 70.0, hs: '291', hundreds: 24, fifties: 45, wickets: 32, bestBowling: '2/17' },
      odi: { matches: 187, innings: 167, runs: 6721, avg: 47.0, sr: 90.2, hs: '189*', hundreds: 11, fifties: 45, wickets: 118, bestBowling: '6/41' }
    },
    records: [
      '🏆 189* off 170 balls — Fastest ever World Cup century at the time',
      '🏆 24 Test centuries with a SR of 70 — revolutionary for the era',
      '🏆 Never lost a Test series as captain of West Indies',
      '🏆 291 — Highest Test score by a West Indian (at the time)',
      '🏆 Considered the most intimidating batsman ever'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'India', venue: 'Bangalore', year: 1974, batting: { runs: 4, balls: 12, dots: 10, fours: 0, sixes: 0, sr: 33.3, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'England', venue: 'St John\'s', year: 1976, batting: { runs: 291, balls: 386, dots: 240, fours: 38, sixes: 0, sr: 75.3, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 291 — Historic innings, asserted West Indian dominance' },
      { num: 3, format: 'ODI', opponent: 'England', venue: 'Manchester', year: 1984, batting: { runs: 189, balls: 170, dots: 60, fours: 21, sixes: 5, sr: 111.1, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 189* — One of the greatest ODI innings EVER, destroyed England in their home' }
    ]
  },
  'Glenn McGrath': {
    id: 'mcgrath', name: 'Glenn McGrath', country: 'Australia', flag: '🇦🇺',
    role: 'Bowler', born: 1970, debut: 1993, retired: 2007, image: '🎯',
    career: {
      test: { matches: 124, innings: 243, runs: 641, avg: 7.36, sr: 25.4, hs: '61', hundreds: 0, fifties: 1, wickets: 563, bestBowling: '8/24' },
      odi: { matches: 250, innings: 248, runs: 115, avg: 3.83, sr: 30.0, hs: '11', hundreds: 0, fifties: 0, wickets: 381, bestBowling: '7/15' }
    },
    records: [
      '🏆 4th highest Test wicket-taker ever (563)',
      '🏆 7/15 vs Namibia — Best World Cup bowling figures ever',
      '🏆 Most wickets in Ashes history (157)',
      '🏆 29 five-wicket hauls in Tests',
      '🏆 Most economical fast bowler of modern era'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'New Zealand', venue: 'Perth', year: 1993, batting: null, bowling: { overs: 20, maidens: 5, runs: 47, wickets: 2, noBalls: 0, wides: 0, economy: 2.35 }, isRecord: false, note: 'Test debut — showed his metronomic accuracy' },
      { num: 2, format: 'ODI', opponent: 'Namibia', venue: 'Potchefstroom', year: 2003, batting: null, bowling: { overs: 7, maidens: 4, runs: 15, wickets: 7, noBalls: 0, wides: 0, economy: 2.14 }, isRecord: true, note: '🏆 7/15 — Best bowling figures in a World Cup match EVER' }
    ]
  },
  'Dale Steyn': {
    id: 'steyn', name: 'Dale Steyn', country: 'South Africa', flag: '🇿🇦',
    role: 'Bowler', born: 1983, debut: 2004, retired: 2021, image: '⚡',
    career: {
      test: { matches: 93, innings: 175, runs: 1594, avg: 12.26, sr: 46.0, hs: '76', hundreds: 0, fifties: 1, wickets: 439, bestBowling: '7/51' },
      odi: { matches: 125, innings: 122, runs: 432, avg: 9.6, sr: 60.0, hs: '35', hundreds: 0, fifties: 0, wickets: 196, bestBowling: '6/39' },
      t20i: { matches: 47, innings: 47, runs: 39, avg: 4.87, sr: 78.0, hs: '12', hundreds: 0, fifties: 0, wickets: 64, bestBowling: '4/9' }
    },
    records: [
      '🏆 Held #1 ICC Test bowler ranking for a record 263 weeks',
      '🏆 Fastest South African to 200, 300, 400 Test wickets',
      '🏆 26 five-wicket hauls in Tests',
      '🏆 Best strike rate among fast bowlers with 400+ wickets',
      '🏆 ICC Test Player of the Year 2008'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'England', venue: 'Port Elizabeth', year: 2004, batting: null, bowling: { overs: 18, maidens: 2, runs: 78, wickets: 1, noBalls: 1, wides: 0, economy: 4.33 }, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'India', venue: 'Nagpur', year: 2010, batting: null, bowling: { overs: 16.3, maidens: 4, runs: 51, wickets: 7, noBalls: 0, wides: 0, economy: 3.09 }, isRecord: true, note: '🏆 7/51 — Career best, destroyed India at home' }
    ]
  },
  'Imran Khan': {
    id: 'imran', name: 'Imran Khan', country: 'Pakistan', flag: '🇵🇰',
    role: 'All-Rounder', born: 1952, debut: 1971, retired: 1992, image: '🦁',
    career: {
      test: { matches: 88, innings: 126, runs: 3807, avg: 37.69, sr: 52.0, hs: '136', hundreds: 6, fifties: 18, wickets: 362, bestBowling: '8/58' },
      odi: { matches: 175, innings: 160, runs: 3709, avg: 33.41, sr: 73.0, hs: '102*', hundreds: 1, fifties: 19, wickets: 182, bestBowling: '6/14' }
    },
    records: [
      '🏆 Led Pakistan to 1992 World Cup victory — "Cornered Tigers"',
      '🏆 362 Test wickets + 3807 Test runs — exceptional all-rounder',
      '🏆 8/58 — Best Test figures for Pakistan at the time',
      '🏆 Greatest Pakistani cricketer of all time',
      '🏆 Test average improved from 18 to 52 in later career — incredible transformation'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'England', venue: 'Edgbaston', year: 1971, batting: { runs: 5, balls: 15, dots: 12, fours: 0, sixes: 0, sr: 33.3, dismissal: 'bowled' }, bowling: { overs: 10, maidens: 2, runs: 30, wickets: 0, noBalls: 0, wides: 0, economy: 3.0 }, isRecord: false, note: 'Test debut at age 18' },
      { num: 2, format: 'ODI', opponent: 'England', venue: 'Melbourne', year: 1992, batting: { runs: 72, balls: 110, dots: 65, fours: 5, sixes: 1, sr: 65.4, dismissal: 'not out' }, bowling: { overs: 10, maidens: 1, runs: 43, wickets: 1, noBalls: 0, wides: 0, economy: 4.3 }, isRecord: true, note: '🏆 1992 WORLD CUP FINAL — 72* anchored the chase, Pakistan wins!' }
    ]
  },
  'Lasith Malinga': {
    id: 'malinga', name: 'Lasith Malinga', country: 'Sri Lanka', flag: '🇱🇰',
    role: 'Bowler', born: 1983, debut: 2004, retired: 2021, image: '🌊',
    career: {
      test: { matches: 30, innings: 57, runs: 268, avg: 7.44, sr: 35.0, hs: '46', hundreds: 0, fifties: 0, wickets: 101, bestBowling: '5/68' },
      odi: { matches: 226, innings: 220, runs: 519, avg: 5.51, sr: 68.0, hs: '25', hundreds: 0, fifties: 0, wickets: 338, bestBowling: '6/38' },
      t20i: { matches: 84, innings: 84, runs: 48, avg: 4.0, sr: 80.0, hs: '11*', hundreds: 0, fifties: 0, wickets: 107, bestBowling: '5/6' }
    },
    records: [
      '🏆 Only bowler with 2 hat-tricks in World Cup history',
      '🏆 Most wickets in T20I history (at retirement)',
      '🏆 4 wickets in 4 balls vs South Africa — unprecedented!',
      '🏆 Unique slinging action — most distinctive bowler ever',
      '🏆 338 ODI wickets — highest for Sri Lanka'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Australia', venue: 'Darwin', year: 2004, batting: null, bowling: { overs: 18, maidens: 3, runs: 68, wickets: 5, noBalls: 0, wides: 1, economy: 3.77 }, isRecord: true, note: '🏆 5/68 on debut! Instantly made headlines with his slingy action' },
      { num: 2, format: 'ODI', opponent: 'South Africa', venue: 'Providence', year: 2007, batting: null, bowling: { overs: 9, maidens: 0, runs: 49, wickets: 4, noBalls: 0, wides: 0, economy: 5.44 }, isRecord: true, note: '🏆 4 wickets in 4 consecutive balls — FIRST EVER in World Cup' }
    ]
  },
  'Chris Gayle': {
    id: 'gayle', name: 'Chris Gayle', country: 'West Indies', flag: '🏝️',
    role: 'Batter', born: 1979, debut: 1999, retired: 2021, image: '💥',
    career: {
      test: { matches: 103, innings: 182, runs: 7214, avg: 42.18, sr: 60.51, hs: '333', hundreds: 15, fifties: 37, wickets: 73, bestBowling: '5/34' },
      odi: { matches: 301, innings: 294, runs: 10480, avg: 37.83, sr: 87.19, hs: '215', hundreds: 25, fifties: 54, wickets: 167, bestBowling: '5/46' },
      t20i: { matches: 79, innings: 73, runs: 1899, avg: 27.52, sr: 137.5, hs: '117', hundreds: 2, fifties: 13 }
    },
    records: [
      '🏆 333 — Triple century in Tests, highest for West Indies',
      '🏆 215 — First and only double century in World Cup history',
      '🏆 Fastest T20I century (30 balls at the time)',
      '🏆 Most sixes in international cricket history',
      '🏆 Universal Boss of cricket — T20 legend worldwide'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Zimbabwe', venue: 'Port of Spain', year: 1999, batting: { runs: 6, balls: 18, dots: 14, fours: 1, sixes: 0, sr: 33.3, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'Sri Lanka', venue: 'Galle', year: 2010, batting: { runs: 333, balls: 437, dots: 280, fours: 34, sixes: 9, sr: 76.2, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 333 — 4th highest Test score EVER at the time, Triple century!' },
      { num: 3, format: 'ODI', opponent: 'Zimbabwe', venue: 'Canberra', year: 2015, batting: { runs: 215, balls: 147, dots: 30, fours: 10, sixes: 16, sr: 146.2, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 215 — FIRST EVER double century in World Cup! Record that may never be broken' }
    ]
  },
  'Mitchell Starc': {
    id: 'starc', name: 'Mitchell Starc', country: 'Australia', flag: '🇦🇺',
    role: 'Bowler', born: 1990, debut: 2010, retired: null, image: '💨',
    career: {
      test: { matches: 79, innings: 150, runs: 1430, avg: 13.8, sr: 46.0, hs: '84', hundreds: 0, fifties: 2, wickets: 315, bestBowling: '6/50' },
      odi: { matches: 104, innings: 103, runs: 526, avg: 11.7, sr: 86.0, hs: '43', hundreds: 0, fifties: 0, wickets: 206, bestBowling: '6/28' },
      t20i: { matches: 50, innings: 50, runs: 45, avg: 5.0, sr: 81.8, hs: '13', hundreds: 0, fifties: 0, wickets: 57, bestBowling: '4/20' }
    },
    records: [
      '🏆 Most wickets in a single World Cup (27 wickets in 2015)',
      '🏆 Fastest ball ever recorded by an Australian (160.4 km/h)',
      '🏆 Most World Cup wickets by an Australian',
      '🏆 Best strike rate among left-arm fast bowlers with 200+ wickets'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'New Zealand', venue: 'Brisbane', year: 2011, batting: null, bowling: { overs: 14, maidens: 3, runs: 42, wickets: 2, noBalls: 0, wides: 1, economy: 3.0 }, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'ODI', opponent: 'New Zealand', venue: 'Melbourne', year: 2015, batting: null, bowling: { overs: 8.1, maidens: 2, runs: 20, wickets: 2, noBalls: 0, wides: 0, economy: 2.44 }, isRecord: true, note: '🏆 World Cup Final — took 2 crucial wickets as Australia won 2015 CWC' }
    ]
  }
};

// Fuzzy search function
export function searchPlayer(query) {
  const q = query.toLowerCase().trim();
  const results = [];

  for (const [name, data] of Object.entries(CRICKET_KNOWLEDGE)) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes(q) || q.includes(nameLower.split(' ').pop())) {
      results.push({ name, data, score: nameLower === q ? 100 : nameLower.startsWith(q) ? 80 : 50 });
    }
  }

  // Sort by relevance
  results.sort((a, b) => b.score - a.score);
  return results;
}

export function getResearchSummary(playerData) {
  const p = playerData;
  const totalRuns = (p.career.test?.runs || 0) + (p.career.odi?.runs || 0) + (p.career.t20i?.runs || 0);
  const totalWickets = (p.career.test?.wickets || 0) + (p.career.odi?.wickets || 0) + (p.career.t20i?.wickets || 0);
  const totalMatches = (p.career.test?.matches || 0) + (p.career.odi?.matches || 0) + (p.career.t20i?.matches || 0);

  return {
    totalRuns,
    totalWickets,
    totalMatches,
    formats: Object.keys(p.career).map(f => f.toUpperCase()),
    recordCount: p.records?.length || 0,
    matchCount: p.matches?.length || 0
  };
}
