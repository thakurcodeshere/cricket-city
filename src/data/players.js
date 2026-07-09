// ============================================
// CRICKET CITY — Player Data
// Real cricket stats for Indian & international legends
// ============================================

export const PLAYER_ROLES = {
  BATTER: 'Batter',
  BOWLER: 'Bowler',
  ALLROUNDER: 'All-Rounder',
  WK_BATTER: 'WK-Batter'
};

export const FORMATS = {
  TEST: 'Test',
  ODI: 'ODI',
  T20I: 'T20I'
};

export const players = [
  // ===== INDIAN LEGENDS =====
  {
    id: 'sachin',
    name: 'Sachin Tendulkar',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.BATTER,
    born: 1973,
    debut: 1989,
    retired: 2013,
    image: '🏏',
    career: {
      test: { matches: 200, innings: 329, runs: 15921, avg: 53.78, sr: 54.04, hs: '248*', hundreds: 51, fifties: 68, wickets: 46, bestBowling: '3/10' },
      odi: { matches: 463, innings: 452, runs: 18426, avg: 44.83, sr: 86.23, hs: '200*', hundreds: 49, fifties: 96, wickets: 154, bestBowling: '5/32' },
      t20i: { matches: 1, innings: 1, runs: 10, avg: 10, sr: 100, hs: '10', hundreds: 0, fifties: 0 }
    },
    records: [
      '🏆 Most international runs (34,357)',
      '🏆 Most international centuries (100)',
      '🏆 First double century in ODIs (200* vs SA)',
      '🏆 Most Test runs by an Indian',
      '🏆 Youngest Test debutant for India (16y 205d)'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Pakistan', venue: 'Karachi', year: 1989, batting: { runs: 15, balls: 24, dots: 16, fours: 2, sixes: 0, sr: 62.5, dismissal: 'caught' }, bowling: { overs: 0, maidens: 0, runs: 0, wickets: 0, noBalls: 0, wides: 0 }, isRecord: false, note: 'Youngest Indian Test debutant at age 16' },
      { num: 2, format: 'Test', opponent: 'Pakistan', venue: 'Faisalabad', year: 1989, batting: { runs: 0, balls: 4, dots: 3, fours: 0, sixes: 0, sr: 0, dismissal: 'bowled' }, bowling: null, isRecord: false },
      { num: 3, format: 'Test', opponent: 'Pakistan', venue: 'Lahore', year: 1989, batting: { runs: 35, balls: 72, dots: 48, fours: 5, sixes: 0, sr: 48.6, dismissal: 'caught' }, bowling: null, isRecord: false },
      { num: 4, format: 'Test', opponent: 'Pakistan', venue: 'Sialkot', year: 1989, batting: { runs: 57, balls: 134, dots: 98, fours: 7, sixes: 0, sr: 42.5, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'First half century — stood tall against Waqar & Wasim' },
      { num: 5, format: 'Test', opponent: 'New Zealand', venue: 'Christchurch', year: 1990, batting: { runs: 88, balls: 198, dots: 142, fours: 11, sixes: 0, sr: 44.4, dismissal: 'bowled' }, bowling: null, isRecord: false },
      { num: 6, format: 'ODI', opponent: 'New Zealand', venue: 'Jaipur', year: 1989, batting: { runs: 0, balls: 2, dots: 2, fours: 0, sixes: 0, sr: 0, dismissal: 'run out' }, bowling: null, isRecord: false, note: 'ODI debut' },
      { num: 7, format: 'Test', opponent: 'England', venue: 'Manchester', year: 1990, batting: { runs: 119, balls: 189, dots: 120, fours: 17, sixes: 0, sr: 62.9, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 FIRST TEST CENTURY — At age 17, saved India from defeat' },
      { num: 8, format: 'ODI', opponent: 'Australia', venue: 'Sharjah', year: 1998, batting: { runs: 143, balls: 131, dots: 62, fours: 9, sixes: 5, sr: 109.16, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 Desert Storm — One of the greatest ODI innings ever' }
    ]
  },
  {
    id: 'virat',
    name: 'Virat Kohli',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.BATTER,
    born: 1988,
    debut: 2008,
    retired: null,
    image: '🏏',
    career: {
      test: { matches: 113, innings: 193, runs: 8848, avg: 49.15, sr: 57.31, hs: '254*', hundreds: 29, fifties: 30, wickets: 0, bestBowling: '-' },
      odi: { matches: 292, innings: 280, runs: 13848, avg: 58.69, sr: 93.25, hs: '183', hundreds: 50, fifties: 72, wickets: 4, bestBowling: '1/15' },
      t20i: { matches: 115, innings: 107, runs: 4008, avg: 48.87, sr: 137.96, hs: '122*', hundreds: 1, fifties: 37 }
    },
    records: [
      '🏆 Fastest to 8000 ODI runs',
      '🏆 Most centuries in ODI run chases (26)',
      '🏆 Most centuries in a single World Cup edition',
      '🏆 Most runs in T20 World Cup history',
      '🏆 ICC ODI Cricketer of the Year (multiple)'
    ],
    matches: [
      { num: 1, format: 'ODI', opponent: 'Sri Lanka', venue: 'Dambulla', year: 2008, batting: { runs: 12, balls: 22, dots: 14, fours: 1, sixes: 0, sr: 54.5, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'ODI debut — came in as a youngster' },
      { num: 2, format: 'ODI', opponent: 'Sri Lanka', venue: 'Kolkata', year: 2008, batting: { runs: 37, balls: 38, dots: 18, fours: 5, sixes: 0, sr: 97.3, dismissal: 'bowled' }, bowling: null, isRecord: false },
      { num: 3, format: 'T20I', opponent: 'Zimbabwe', venue: 'Harare', year: 2010, batting: { runs: 26, balls: 21, dots: 10, fours: 3, sixes: 0, sr: 123.8, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'T20I Debut' },
      { num: 4, format: 'Test', opponent: 'West Indies', venue: 'Kingston', year: 2011, batting: { runs: 4, balls: 10, dots: 8, fours: 0, sixes: 0, sr: 40.0, dismissal: 'lbw' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 5, format: 'ODI', opponent: 'Sri Lanka', venue: 'Kolkata', year: 2012, batting: { runs: 133, balls: 86, dots: 20, fours: 16, sixes: 5, sr: 154.6, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 Record chase of 321 — announced himself as a chase master' },
      { num: 6, format: 'Test', opponent: 'Australia', venue: 'Adelaide', year: 2014, batting: { runs: 141, balls: 175, dots: 100, fours: 17, sixes: 0, sr: 80.5, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 Twin centuries in Adelaide — 115 & 141' },
      { num: 7, format: 'ODI', opponent: 'Australia', venue: 'Nagpur', year: 2023, batting: { runs: 166, balls: 110, dots: 25, fours: 14, sixes: 8, sr: 150.9, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 Broke Sachin\'s ODI century record — 50th ODI hundred' }
    ]
  },
  {
    id: 'dhoni',
    name: 'MS Dhoni',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.WK_BATTER,
    born: 1981,
    debut: 2004,
    retired: 2020,
    image: '🧤',
    career: {
      test: { matches: 90, innings: 144, runs: 4876, avg: 38.09, sr: 59.1, hs: '224', hundreds: 6, fifties: 33, wickets: 0, bestBowling: '-' },
      odi: { matches: 350, innings: 297, runs: 10773, avg: 50.57, sr: 87.56, hs: '183*', hundreds: 10, fifties: 73, wickets: 1, bestBowling: '1/14' },
      t20i: { matches: 98, innings: 85, runs: 1617, avg: 37.6, sr: 126.13, hs: '56', hundreds: 0, fifties: 2 }
    },
    records: [
      '🏆 Only captain to win all three ICC trophies (WT20, CWC, CT)',
      '🏆 Highest score by an Indian wicketkeeper in Tests (224)',
      '🏆 Most dismissals by an Indian wicketkeeper in ODIs',
      '🏆 Finished with a six in 2011 World Cup Final',
      '🏆 Most successful Indian Test captain (27 wins)'
    ],
    matches: [
      { num: 1, format: 'ODI', opponent: 'Bangladesh', venue: 'Chittagong', year: 2004, batting: { runs: 0, balls: 1, dots: 1, fours: 0, sixes: 0, sr: 0, dismissal: 'run out' }, bowling: null, isRecord: false, note: 'ODI debut — run out on a duck' },
      { num: 2, format: 'ODI', opponent: 'Pakistan', venue: 'Visakhapatnam', year: 2005, batting: { runs: 148, balls: 123, dots: 45, fours: 15, sixes: 4, sr: 120.3, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 Announced himself with a stunning 148 — longest hair in cricket!' },
      { num: 3, format: 'ODI', opponent: 'Sri Lanka', venue: 'Jaipur', year: 2005, batting: { runs: 183, balls: 145, dots: 38, fours: 15, sixes: 10, sr: 126.2, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 183* — Highest score by an Indian WK in ODIs at the time' },
      { num: 4, format: 'Test', opponent: 'Sri Lanka', venue: 'Chennai', year: 2005, batting: { runs: 30, balls: 72, dots: 52, fours: 3, sixes: 0, sr: 41.6, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 5, format: 'T20I', opponent: 'South Africa', venue: 'Johannesburg', year: 2006, batting: { runs: 12, balls: 9, dots: 4, fours: 2, sixes: 0, sr: 133.3, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'T20I debut' },
      { num: 6, format: 'ODI', opponent: 'Sri Lanka', venue: 'Mumbai', year: 2011, batting: { runs: 91, balls: 79, dots: 28, fours: 8, sixes: 2, sr: 115.1, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 WORLD CUP FINAL — Finished it with a six! India wins after 28 years' }
    ]
  },
  {
    id: 'kapil',
    name: 'Kapil Dev',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.ALLROUNDER,
    born: 1959,
    debut: 1978,
    retired: 1994,
    image: '⚡',
    career: {
      test: { matches: 131, innings: 184, runs: 5248, avg: 31.05, sr: 80.91, hs: '163', hundreds: 8, fifties: 27, wickets: 434, bestBowling: '9/83' },
      odi: { matches: 225, innings: 198, runs: 3783, avg: 23.79, sr: 95.07, hs: '175*', hundreds: 1, fifties: 14, wickets: 253, bestBowling: '5/43' }
    },
    records: [
      '🏆 Led India to 1983 Cricket World Cup victory',
      '🏆 175* vs Zimbabwe in 1983 World Cup — Match that changed Indian cricket',
      '🏆 First Indian to take 400 Test wickets',
      '🏆 Best all-round Test performance: 9/83',
      '🏆 Fastest Indian to 100 Test wickets'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Pakistan', venue: 'Faisalabad', year: 1978, batting: { runs: 13, balls: 28, dots: 20, fours: 2, sixes: 0, sr: 46.4, dismissal: 'caught' }, bowling: { overs: 18, maidens: 4, runs: 48, wickets: 1, noBalls: 0, wides: 0, economy: 2.66 }, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'ODI', opponent: 'Zimbabwe', venue: 'Tunbridge Wells', year: 1983, batting: { runs: 175, balls: 138, dots: 50, fours: 16, sixes: 6, sr: 126.8, dismissal: 'not out' }, bowling: { overs: 11, maidens: 1, runs: 32, wickets: 1, noBalls: 0, wides: 1, economy: 2.9 }, isRecord: true, note: '🏆 175* — The innings that saved Indian cricket and changed the sport forever' },
      { num: 3, format: 'ODI', opponent: 'West Indies', venue: "Lord's", year: 1983, batting: { runs: 15, balls: 18, dots: 10, fours: 2, sixes: 0, sr: 83.3, dismissal: 'bowled' }, bowling: { overs: 11, maidens: 4, runs: 21, wickets: 1, noBalls: 0, wides: 0, economy: 1.9 }, isRecord: true, note: '🏆 WORLD CUP FINAL VICTORY — India beats the mighty West Indies!' },
      { num: 4, format: 'Test', opponent: 'Sri Lanka', venue: 'Ahmedabad', year: 1986, batting: { runs: 163, balls: 165, dots: 70, fours: 16, sixes: 6, sr: 98.7, dismissal: 'caught' }, bowling: { overs: 25, maidens: 5, runs: 76, wickets: 4, noBalls: 1, wides: 0, economy: 3.04 }, isRecord: true, note: '🏆 163 off 165 balls + 4 wickets — ultimate all-rounder display' }
    ]
  },
  {
    id: 'rohit',
    name: 'Rohit Sharma',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.BATTER,
    born: 1987,
    debut: 2007,
    retired: null,
    image: '🏏',
    career: {
      test: { matches: 56, innings: 99, runs: 3955, avg: 46.52, sr: 58.6, hs: '212', hundreds: 12, fifties: 14, wickets: 2, bestBowling: '1/18' },
      odi: { matches: 264, innings: 256, runs: 10709, avg: 49.12, sr: 89.01, hs: '264', hundreds: 31, fifties: 48, wickets: 8, bestBowling: '2/27' },
      t20i: { matches: 148, innings: 140, runs: 4231, avg: 32.05, sr: 140.89, hs: '118', hundreds: 4, fifties: 28 }
    },
    records: [
      '🏆 ONLY player with THREE ODI double centuries (264, 209, 208*)',
      '🏆 Highest individual ODI score (264 vs Sri Lanka)',
      '🏆 Most sixes in T20I cricket history',
      '🏆 4 centuries in T20I cricket',
      '🏆 Led India to T20 World Cup 2024 victory as captain'
    ],
    matches: [
      { num: 1, format: 'ODI', opponent: 'Ireland', venue: 'Belfast', year: 2007, batting: { runs: 52, balls: 78, dots: 45, fours: 5, sixes: 0, sr: 66.6, dismissal: 'bowled' }, bowling: null, isRecord: false, note: 'ODI debut' },
      { num: 2, format: 'T20I', opponent: 'England', venue: 'Durban', year: 2007, batting: { runs: 50, balls: 40, dots: 12, fours: 3, sixes: 3, sr: 125.0, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'WT20 semi-final — Crucial fifty' },
      { num: 3, format: 'ODI', opponent: 'Australia', venue: 'Bangalore', year: 2013, batting: { runs: 209, balls: 158, dots: 40, fours: 12, sixes: 16, sr: 132.2, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 First ODI double century — 209 with 16 sixes' },
      { num: 4, format: 'ODI', opponent: 'Sri Lanka', venue: 'Kolkata', year: 2014, batting: { runs: 264, balls: 173, dots: 42, fours: 33, sixes: 9, sr: 152.6, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 264 — HIGHEST INDIVIDUAL ODI SCORE EVER' },
      { num: 5, format: 'ODI', opponent: 'Sri Lanka', venue: 'Mohali', year: 2017, batting: { runs: 208, balls: 153, dots: 38, fours: 13, sixes: 12, sr: 135.9, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 THIRD double century — no one else has even two!' }
    ]
  },
  {
    id: 'bumrah',
    name: 'Jasprit Bumrah',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.BOWLER,
    born: 1993,
    debut: 2016,
    retired: null,
    image: '🔥',
    career: {
      test: { matches: 36, innings: 65, runs: 251, avg: 8.96, sr: 40.0, hs: '35*', hundreds: 0, fifties: 0, wickets: 159, bestBowling: '6/27' },
      odi: { matches: 72, innings: 72, runs: 19, avg: 6.33, sr: 31.6, hs: '10*', hundreds: 0, fifties: 0, wickets: 121, bestBowling: '6/19' },
      t20i: { matches: 60, innings: 60, runs: 2, avg: 2, sr: 33.3, hs: '2', hundreds: 0, fifties: 0, wickets: 83, bestBowling: '4/20' }
    },
    records: [
      '🏆 Best bowling figures by an Indian in Australia (6/33)',
      '🏆 Fastest Indian to 100 ODI wickets',
      '🏆 Led India to series win in Australia as stand-in captain',
      '🏆 Best economy rate among fast bowlers in T20I history',
      '🏆 Hat-trick in debut West Indies Test series'
    ],
    matches: [
      { num: 1, format: 'T20I', opponent: 'Australia', venue: 'Adelaide', year: 2016, batting: null, bowling: { overs: 4, maidens: 0, runs: 32, wickets: 3, noBalls: 0, wides: 1, economy: 8.0 }, isRecord: false, note: 'T20I debut — 3 wickets!' },
      { num: 2, format: 'ODI', opponent: 'Australia', venue: 'Sydney', year: 2016, batting: null, bowling: { overs: 10, maidens: 2, runs: 40, wickets: 2, noBalls: 0, wides: 0, economy: 4.0 }, isRecord: false, note: 'ODI debut' },
      { num: 3, format: 'Test', opponent: 'South Africa', venue: 'Cape Town', year: 2018, batting: null, bowling: { overs: 17, maidens: 5, runs: 54, wickets: 3, noBalls: 0, wides: 0, economy: 3.17 }, isRecord: false, note: 'Test debut' },
      { num: 4, format: 'Test', opponent: 'Australia', venue: 'Melbourne', year: 2018, batting: { runs: 0, balls: 1, dots: 1, fours: 0, sixes: 0, sr: 0, dismissal: 'not out' }, bowling: { overs: 23.4, maidens: 6, runs: 33, wickets: 6, noBalls: 0, wides: 0, economy: 1.39 }, isRecord: true, note: '🏆 6/33 — Demolished Australia at MCG, historic series win' },
      { num: 5, format: 'ODI', opponent: 'Afghanistan', venue: 'Southampton', year: 2019, batting: null, bowling: { overs: 10, maidens: 3, runs: 19, wickets: 6, noBalls: 0, wides: 0, economy: 1.9 }, isRecord: true, note: '🏆 6/19 in World Cup — Best figures in a World Cup by an Indian' }
    ]
  },
  {
    id: 'kumble',
    name: 'Anil Kumble',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.BOWLER,
    born: 1970,
    debut: 1990,
    retired: 2008,
    image: '🎯',
    career: {
      test: { matches: 132, innings: 236, runs: 2506, avg: 17.77, sr: 47.0, hs: '88', hundreds: 0, fifties: 5, wickets: 619, bestBowling: '10/74' },
      odi: { matches: 271, innings: 265, runs: 938, avg: 10.86, sr: 69.8, hs: '26', hundreds: 0, fifties: 0, wickets: 337, bestBowling: '6/12' }
    },
    records: [
      '🏆 10 wickets in a Test innings (10/74 vs Pakistan) — Only the 2nd player EVER',
      '🏆 3rd highest Test wicket-taker of all time (619)',
      '🏆 Most Test wickets by an Indian',
      '🏆 Bowled with a broken jaw against West Indies (warrior)',
      '🏆 35 five-wicket hauls in Tests'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'England', venue: 'Manchester', year: 1990, batting: { runs: 8, balls: 22, dots: 18, fours: 1, sixes: 0, sr: 36.3, dismissal: 'bowled' }, bowling: { overs: 30, maidens: 4, runs: 105, wickets: 3, noBalls: 0, wides: 1, economy: 3.5 }, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'Pakistan', venue: 'Delhi', year: 1999, batting: { runs: 0, balls: 3, dots: 3, fours: 0, sixes: 0, sr: 0, dismissal: 'bowled' }, bowling: { overs: 26.3, maidens: 9, runs: 74, wickets: 10, noBalls: 0, wides: 0, economy: 2.79 }, isRecord: true, note: '🏆 ALL 10 WICKETS — 10/74! Only Laker had done it before!' },
      { num: 3, format: 'Test', opponent: 'West Indies', venue: 'Antigua', year: 2002, batting: { runs: 22, balls: 40, dots: 28, fours: 3, sixes: 0, sr: 55.0, dismissal: 'caught' }, bowling: { overs: 35, maidens: 12, runs: 68, wickets: 6, noBalls: 0, wides: 0, economy: 1.94 }, isRecord: true, note: '🏆 Bowled with a BROKEN JAW — ultimate warrior spirit' }
    ]
  },
  {
    id: 'jadeja',
    name: 'Ravindra Jadeja',
    country: 'India',
    flag: '🇮🇳',
    role: PLAYER_ROLES.ALLROUNDER,
    born: 1988,
    debut: 2009,
    retired: null,
    image: '⚔️',
    career: {
      test: { matches: 72, innings: 111, runs: 3052, avg: 36.33, sr: 57.3, hs: '175*', hundreds: 3, fifties: 20, wickets: 279, bestBowling: '7/42' },
      odi: { matches: 174, innings: 117, runs: 2447, avg: 32.62, sr: 86.3, hs: '87', hundreds: 0, fifties: 14, wickets: 189, bestBowling: '5/36' },
      t20i: { matches: 64, innings: 39, runs: 457, avg: 23.0, sr: 127.0, hs: '46', hundreds: 0, fifties: 0, wickets: 51, bestBowling: '3/15' }
    },
    records: [
      '🏆 Most runs + most wickets combination in a single Test year (2022)',
      '🏆 Fastest left-arm bowler to 250 Test wickets',
      '🏆 One of the best fielders in cricket history',
      '🏆 Only Indian with 3000+ runs and 250+ wickets in Tests'
    ],
    matches: [
      { num: 1, format: 'ODI', opponent: 'Sri Lanka', venue: 'Colombo', year: 2009, batting: { runs: 60, balls: 77, dots: 40, fours: 4, sixes: 2, sr: 77.9, dismissal: 'run out' }, bowling: { overs: 9, maidens: 0, runs: 47, wickets: 0, noBalls: 0, wides: 1, economy: 5.2 }, isRecord: false, note: 'ODI debut — scored 60 on debut' },
      { num: 2, format: 'Test', opponent: 'England', venue: 'Nagpur', year: 2012, batting: { runs: 12, balls: 30, dots: 22, fours: 1, sixes: 0, sr: 40.0, dismissal: 'caught' }, bowling: { overs: 22, maidens: 5, runs: 55, wickets: 2, noBalls: 0, wides: 0, economy: 2.5 }, isRecord: false, note: 'Test debut' },
      { num: 3, format: 'Test', opponent: 'Sri Lanka', venue: 'Mohali', year: 2022, batting: { runs: 175, balls: 228, dots: 130, fours: 17, sixes: 3, sr: 76.7, dismissal: 'not out' }, bowling: { overs: 30, maidens: 8, runs: 62, wickets: 5, noBalls: 0, wides: 0, economy: 2.06 }, isRecord: true, note: '🏆 175* + 5 wickets — Incredible all-round masterclass' }
    ]
  },

  // ===== INTERNATIONAL LEGENDS =====
  {
    id: 'bradman',
    name: 'Sir Don Bradman',
    country: 'Australia',
    flag: '🇦🇺',
    role: PLAYER_ROLES.BATTER,
    born: 1908,
    debut: 1928,
    retired: 1948,
    image: '👑',
    career: {
      test: { matches: 52, innings: 80, runs: 6996, avg: 99.94, sr: 60.0, hs: '334', hundreds: 29, fifties: 13, wickets: 2, bestBowling: '1/8' }
    },
    records: [
      '🏆 Highest Test batting average EVER (99.94)',
      '🏆 334 — Was the highest Test score for years',
      '🏆 29 centuries in just 52 Tests',
      '🏆 Averaged 99.94 — needed 4 runs in last innings for 100 avg, got a duck',
      '🏆 Unanimously regarded as the greatest batsman of all time'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'England', venue: 'Brisbane', year: 1928, batting: { runs: 18, balls: 40, dots: 30, fours: 2, sixes: 0, sr: 45.0, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'England', venue: 'Melbourne', year: 1928, batting: { runs: 79, balls: 130, dots: 85, fours: 10, sixes: 0, sr: 60.7, dismissal: 'bowled' }, bowling: null, isRecord: false },
      { num: 3, format: 'Test', opponent: 'England', venue: 'Melbourne', year: 1929, batting: { runs: 123, balls: 185, dots: 120, fours: 15, sixes: 0, sr: 66.4, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 First Test century' },
      { num: 4, format: 'Test', opponent: 'England', venue: 'Leeds', year: 1930, batting: { runs: 334, balls: 448, dots: 290, fours: 46, sixes: 0, sr: 74.5, dismissal: 'caught' }, bowling: null, isRecord: true, note: '🏆 334 — Was the world record at the time' },
      { num: 5, format: 'Test', opponent: 'England', venue: 'The Oval', year: 1948, batting: { runs: 0, balls: 1, dots: 0, fours: 0, sixes: 0, sr: 0, dismissal: 'bowled' }, bowling: null, isRecord: true, note: '🏆 Last innings — needed 4 for avg of 100, got a duck. The most famous duck ever.' }
    ]
  },
  {
    id: 'lara',
    name: 'Brian Lara',
    country: 'West Indies',
    flag: '🏝️',
    role: PLAYER_ROLES.BATTER,
    born: 1969,
    debut: 1990,
    retired: 2007,
    image: '🏏',
    career: {
      test: { matches: 131, innings: 232, runs: 11953, avg: 52.88, sr: 60.51, hs: '400*', hundreds: 34, fifties: 48, wickets: 4, bestBowling: '2/5' },
      odi: { matches: 299, innings: 289, runs: 10405, avg: 40.48, sr: 79.51, hs: '169', hundreds: 19, fifties: 63, wickets: 4, bestBowling: '2/18' }
    },
    records: [
      '🏆 Highest individual Test score EVER (400* vs England)',
      '🏆 First player to score 500 in first-class cricket (501*)',
      '🏆 375 — Broke the world record held by Sobers',
      '🏆 9 scores of 150+ in Tests',
      '🏆 Considered the most elegant left-hander ever'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Pakistan', venue: 'Lahore', year: 1990, batting: { runs: 44, balls: 88, dots: 60, fours: 5, sixes: 0, sr: 50.0, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'England', venue: 'St John\'s', year: 1994, batting: { runs: 375, balls: 538, dots: 380, fours: 45, sixes: 0, sr: 69.7, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 375 — World record Test score, broke Sobers\' record' },
      { num: 3, format: 'Test', opponent: 'England', venue: 'St John\'s', year: 2004, batting: { runs: 400, balls: 582, dots: 410, fours: 43, sixes: 4, sr: 68.7, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 400* — HIGHEST EVER TEST SCORE. Broke his own record!' }
    ]
  },
  {
    id: 'warne',
    name: 'Shane Warne',
    country: 'Australia',
    flag: '🇦🇺',
    role: PLAYER_ROLES.BOWLER,
    born: 1969,
    debut: 1992,
    retired: 2007,
    image: '🌀',
    career: {
      test: { matches: 145, innings: 273, runs: 3154, avg: 17.32, sr: 44.0, hs: '99', hundreds: 0, fifties: 12, wickets: 708, bestBowling: '8/71' },
      odi: { matches: 194, innings: 191, runs: 1018, avg: 13.05, sr: 72.7, hs: '55', hundreds: 0, fifties: 1, wickets: 293, bestBowling: '5/33' }
    },
    records: [
      '🏆 2nd highest Test wicket-taker ever (708)',
      '🏆 Ball of the Century (1993 Ashes) — First ball in England',
      '🏆 37 five-wicket hauls in Tests',
      '🏆 Greatest leg-spinner of all time',
      '🏆 ICC Cricketer of the 20th Century (Wisden)'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'India', venue: 'Sydney', year: 1992, batting: { runs: 0, balls: 4, dots: 4, fours: 0, sixes: 0, sr: 0, dismissal: 'bowled' }, bowling: { overs: 45, maidens: 7, runs: 150, wickets: 1, noBalls: 0, wides: 1, economy: 3.33 }, isRecord: false, note: 'Test debut — 1/150, rough start' },
      { num: 2, format: 'Test', opponent: 'England', venue: 'Manchester', year: 1993, batting: null, bowling: { overs: 38, maidens: 14, runs: 85, wickets: 4, noBalls: 0, wides: 0, economy: 2.23 }, isRecord: true, note: '🏆 BALL OF THE CENTURY — First ball drifted, pitched outside leg, turned past Gatting' },
      { num: 3, format: 'Test', opponent: 'England', venue: 'The Oval', year: 2005, batting: { runs: 0, balls: 2, dots: 2, fours: 0, sixes: 0, sr: 0, dismissal: 'caught' }, bowling: { overs: 44, maidens: 5, runs: 122, wickets: 6, noBalls: 0, wides: 0, economy: 2.77 }, isRecord: true, note: '🏆 Last Ashes Test — 6 wickets, fought till the end despite losing the series' }
    ]
  },
  {
    id: 'murali',
    name: 'Muttiah Muralitharan',
    country: 'Sri Lanka',
    flag: '🇱🇰',
    role: PLAYER_ROLES.BOWLER,
    born: 1972,
    debut: 1992,
    retired: 2010,
    image: '🌀',
    career: {
      test: { matches: 133, innings: 230, runs: 1261, avg: 11.67, sr: 40.0, hs: '67', hundreds: 0, fifties: 1, wickets: 800, bestBowling: '9/51' },
      odi: { matches: 350, innings: 341, runs: 674, avg: 6.82, sr: 52.0, hs: '33*', hundreds: 0, fifties: 0, wickets: 534, bestBowling: '7/30' }
    },
    records: [
      '🏆 ALL-TIME HIGHEST Test wicket-taker (800 wickets)',
      '🏆 ALL-TIME HIGHEST ODI wicket-taker (534)',
      '🏆 67 five-wicket hauls in Tests — most ever',
      '🏆 22 ten-wicket match hauls — most ever',
      '🏆 Took his 800th wicket with last ball of last Test'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Australia', venue: 'Colombo', year: 1992, batting: null, bowling: { overs: 22, maidens: 4, runs: 68, wickets: 3, noBalls: 1, wides: 0, economy: 3.09 }, isRecord: false, note: 'Test debut — 3 wickets vs mighty Aussies' },
      { num: 2, format: 'Test', opponent: 'England', venue: 'The Oval', year: 1998, batting: null, bowling: { overs: 59.3, maidens: 18, runs: 220, wickets: 16, noBalls: 0, wides: 0, economy: 3.69 }, isRecord: true, note: '🏆 16 wickets in a single Test match! 9/65 in first innings' },
      { num: 3, format: 'Test', opponent: 'India', venue: 'Galle', year: 2010, batting: null, bowling: { overs: 43.5, maidens: 15, runs: 63, wickets: 8, noBalls: 0, wides: 0, economy: 1.43 }, isRecord: true, note: '🏆 800th TEST WICKET — took it with his LAST BALL in Tests!' }
    ]
  },
  {
    id: 'kallis',
    name: 'Jacques Kallis',
    country: 'South Africa',
    flag: '🇿🇦',
    role: PLAYER_ROLES.ALLROUNDER,
    born: 1975,
    debut: 1995,
    retired: 2014,
    image: '💎',
    career: {
      test: { matches: 166, innings: 280, runs: 13289, avg: 55.37, sr: 46.1, hs: '224', hundreds: 45, fifties: 58, wickets: 292, bestBowling: '6/54' },
      odi: { matches: 328, innings: 314, runs: 11579, avg: 44.36, sr: 72.89, hs: '139', hundreds: 17, fifties: 86, wickets: 273, bestBowling: '5/30' },
      t20i: { matches: 25, innings: 22, runs: 666, avg: 34.0, sr: 117.46, hs: '73', hundreds: 0, fifties: 5 }
    },
    records: [
      '🏆 Greatest all-rounder statistically — 13,289 runs + 292 wickets in Tests',
      '🏆 45 Test centuries — 3rd most ever (behind Sachin & Ponting)',
      '🏆 Only player with 10,000+ runs and 250+ wickets in Tests',
      '🏆 Most Man of the Match awards in Test cricket (23)'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'England', venue: 'Durban', year: 1995, batting: { runs: 10, balls: 25, dots: 20, fours: 1, sixes: 0, sr: 40.0, dismissal: 'caught' }, bowling: { overs: 12, maidens: 2, runs: 35, wickets: 1, noBalls: 0, wides: 0, economy: 2.91 }, isRecord: false, note: 'Test debut — age 20' },
      { num: 2, format: 'Test', opponent: 'India', venue: 'Cape Town', year: 2011, batting: { runs: 224, balls: 422, dots: 310, fours: 33, sixes: 0, sr: 53.0, dismissal: 'not out' }, bowling: { overs: 15, maidens: 5, runs: 32, wickets: 2, noBalls: 0, wides: 0, economy: 2.13 }, isRecord: true, note: '🏆 224* + 2 wickets — highest Test score, classic all-rounder innings' }
    ]
  },
  {
    id: 'wasim',
    name: 'Wasim Akram',
    country: 'Pakistan',
    flag: '🇵🇰',
    role: PLAYER_ROLES.BOWLER,
    born: 1966,
    debut: 1984,
    retired: 2003,
    image: '💨',
    career: {
      test: { matches: 104, innings: 181, runs: 2898, avg: 22.64, sr: 54.0, hs: '257*', hundreds: 3, fifties: 7, wickets: 414, bestBowling: '7/119' },
      odi: { matches: 356, innings: 351, runs: 3717, avg: 16.52, sr: 83.0, hs: '86', hundreds: 0, fifties: 6, wickets: 502, bestBowling: '5/15' }
    },
    records: [
      '🏆 Sultan of Swing — Greatest left-arm fast bowler ever',
      '🏆 502 ODI wickets — 2nd most ever at the time',
      '🏆 257* in a Test match — Highest by a number 8',
      '🏆 Led Pakistan to 1992 World Cup victory',
      '🏆 4 hat-tricks in ODIs — most ever'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'New Zealand', venue: 'Auckland', year: 1985, batting: { runs: 9, balls: 20, dots: 15, fours: 1, sixes: 0, sr: 45.0, dismissal: 'caught' }, bowling: { overs: 21, maidens: 3, runs: 72, wickets: 2, noBalls: 1, wides: 0, economy: 3.42 }, isRecord: false, note: 'Test debut at age 18' },
      { num: 2, format: 'ODI', opponent: 'England', venue: 'Melbourne', year: 1992, batting: { runs: 33, balls: 18, dots: 5, fours: 4, sixes: 1, sr: 183.3, dismissal: 'not out' }, bowling: { overs: 10, maidens: 0, runs: 49, wickets: 3, noBalls: 0, wides: 0, economy: 4.9 }, isRecord: true, note: '🏆 WORLD CUP FINAL — 3 wickets + crucial 33 runs, led Pakistan to glory' }
    ]
  },
  {
    id: 'abd',
    name: 'AB de Villiers',
    country: 'South Africa',
    flag: '🇿🇦',
    role: PLAYER_ROLES.BATTER,
    born: 1984,
    debut: 2004,
    retired: 2018,
    image: '🦸',
    career: {
      test: { matches: 114, innings: 191, runs: 8765, avg: 50.66, sr: 53.9, hs: '278*', hundreds: 22, fifties: 46, wickets: 0, bestBowling: '-' },
      odi: { matches: 228, innings: 218, runs: 9577, avg: 53.5, sr: 101.09, hs: '176', hundreds: 25, fifties: 53, wickets: 7, bestBowling: '2/8' },
      t20i: { matches: 78, innings: 75, runs: 1672, avg: 26.12, sr: 135.16, hs: '79*', hundreds: 0, fifties: 10 }
    },
    records: [
      '🏆 Fastest ODI 50 (16 balls), 100 (31 balls), 150 (64 balls)',
      '🏆 Mr. 360 — Could hit any ball to any part of the ground',
      '🏆 278* — Highest Test score by a South African',
      '🏆 Most innovative batsman of modern era',
      '🏆 ICC ODI Player of the Year (multiple)'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'England', venue: 'Port Elizabeth', year: 2004, batting: { runs: 28, balls: 45, dots: 30, fours: 4, sixes: 0, sr: 62.2, dismissal: 'caught' }, bowling: null, isRecord: false, note: 'Test debut — showed flashes of genius' },
      { num: 2, format: 'ODI', opponent: 'West Indies', venue: 'Johannesburg', year: 2015, batting: { runs: 149, balls: 44, dots: 4, fours: 9, sixes: 16, sr: 338.6, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 Fastest ODI 100 (31 balls) & 150 (64 balls) — SUPERHUMAN!' },
      { num: 3, format: 'Test', opponent: 'Pakistan', venue: 'Abu Dhabi', year: 2010, batting: { runs: 278, balls: 394, dots: 250, fours: 34, sixes: 4, sr: 70.5, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 278* — Highest ever score by a South African' }
    ]
  },
  {
    id: 'stokes',
    name: 'Ben Stokes',
    country: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    role: PLAYER_ROLES.ALLROUNDER,
    born: 1991,
    debut: 2011,
    retired: null,
    image: '🔥',
    career: {
      test: { matches: 101, innings: 173, runs: 6272, avg: 35.09, sr: 57.7, hs: '258', hundreds: 12, fifties: 28, wickets: 197, bestBowling: '6/22' },
      odi: { matches: 105, innings: 95, runs: 2919, avg: 39.44, sr: 93.01, hs: '102*', hundreds: 3, fifties: 21, wickets: 74, bestBowling: '5/61' },
      t20i: { matches: 34, innings: 28, runs: 397, avg: 18.04, sr: 134.57, hs: '47*', hundreds: 0, fifties: 0, wickets: 28, bestBowling: '3/26' }
    },
    records: [
      '🏆 Headingley 135* — Greatest Test innings ever? Chased 362 at #5',
      '🏆 2019 World Cup Final Super Over hero',
      '🏆 258 — Fastest Test double century by an Englishman',
      '🏆 Led England to their first World Cup title',
      '🏆 BBC Sports Personality of the Year 2019'
    ],
    matches: [
      { num: 1, format: 'Test', opponent: 'Australia', venue: 'Adelaide', year: 2013, batting: { runs: 15, balls: 35, dots: 26, fours: 2, sixes: 0, sr: 42.8, dismissal: 'caught' }, bowling: { overs: 14, maidens: 2, runs: 50, wickets: 0, noBalls: 1, wides: 0, economy: 3.57 }, isRecord: false, note: 'Test debut' },
      { num: 2, format: 'Test', opponent: 'Australia', venue: 'Headingley', year: 2019, batting: { runs: 135, balls: 219, dots: 140, fours: 11, sixes: 8, sr: 61.6, dismissal: 'not out' }, bowling: null, isRecord: true, note: '🏆 135* — THE Headingley miracle! Chased 362 with last man. Greatest innings ever!' },
      { num: 3, format: 'ODI', opponent: 'New Zealand', venue: "Lord's", year: 2019, batting: { runs: 84, balls: 98, dots: 50, fours: 5, sixes: 2, sr: 85.7, dismissal: 'run out' }, bowling: { overs: 9, maidens: 0, runs: 49, wickets: 2, noBalls: 0, wides: 1, economy: 5.44 }, isRecord: true, note: '🏆 WORLD CUP FINAL — 84* + Super Over hero. England win first World Cup!' }
    ]
  }
];

export function getPlayersByRole(role) {
  return players.filter(p => p.role === role);
}

export function getPlayersByCountry(country) {
  return players.filter(p => p.country === country);
}

export function getPlayerById(id) {
  return players.find(p => p.id === id);
}

export function getTotalMatches(player) {
  let total = 0;
  if (player.career.test) total += player.career.test.matches;
  if (player.career.odi) total += player.career.odi.matches;
  if (player.career.t20i) total += player.career.t20i.matches;
  return total;
}

export function getTotalRuns(player) {
  let total = 0;
  if (player.career.test) total += player.career.test.runs;
  if (player.career.odi) total += player.career.odi.runs;
  if (player.career.t20i) total += player.career.t20i.runs;
  return total;
}

export function getTotalWickets(player) {
  let total = 0;
  if (player.career.test) total += player.career.test.wickets;
  if (player.career.odi) total += player.career.odi.wickets;
  if (player.career.t20i) total += player.career.t20i.wickets || 0;
  return total;
}
