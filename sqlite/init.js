// テーブル定義
module.exports = function (db) {
  //  COMPASS連携
  db.run(
    `
    CREATE TABLE IF NOT EXISTS
    Compass(
    userJid TEXT PRIMARY KEY,
    id TEXT,
    basic TEXT,
    zero INTEGER,
    one INTEGER,
    two INTEGER,
    three INTEGER,
    four INTEGER,
    five INTEGER,
    six INTEGER,
    seven INTEGER,
    eight INTEGER,
    nine INTEGER,
    ten INTEGER,
    eleven INTEGER,
    twelve INTEGER,
    thirteen INTEGER,
    fourteen INTEGER,
    fifteen INTEGER,
    sixteen INTEGER,
    seventeen INTEGER,
    eighteen INTEGER,
    nineteen INTEGER,
    twenty INTEGER,
    twentyone INTEGER,
    twentytwo INTEGER,
    twentythree INTEGER
    )`
  )

  //  レイニー
  db.run(
    `
    CREATE TABLE IF NOT EXISTS
    Rainy(
    userJid TEXT PRIMARY KEY,
    name TEXT,
    zero INTEGER,
    one INTEGER,
    two INTEGER,
    three INTEGER,
    four INTEGER,
    five INTEGER,
    six INTEGER,
    seven INTEGER,
    eight INTEGER,
    nine INTEGER,
    ten INTEGER,
    eleven INTEGER,
    twelve INTEGER,
    thirteen INTEGER,
    fourteen INTEGER,
    fifteen INTEGER,
    sixteen INTEGER,
    seventeen INTEGER,
    eighteen INTEGER,
    nineteen INTEGER,
    twenty INTEGER,
    twentyone INTEGER,
    twentytwo INTEGER,
    twentythree INTEGER
    )`
  )
}