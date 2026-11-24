const { connectDB } = require('./db');

const STATS_ID = 'global';

function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

async function loadStats() {
  const db = await connectDB();
  const col = db.collection('stats');
  let doc = await col.findOne({ _id: STATS_ID });

  if (!doc) {
    doc = { _id: STATS_ID, totalPremium: 0, todayPremium: 0, lastDate: getTodayDateString() };
    await col.insertOne(doc);
  }

  const today = getTodayDateString();
  if (doc.lastDate !== today) {
    await col.updateOne(
      { _id: STATS_ID },
      { $set: { todayPremium: 0, lastDate: today } }
    );
    doc.todayPremium = 0;
    doc.lastDate = today;
  }
  return doc;
}

async function getStats() {
  const current = await loadStats();
  return {
    total: current.totalPremium || 0,
    today: current.todayPremium || 0
  };
}

async function incrementStats() {
  await loadStats();
  const db = await connectDB();
  const today = getTodayDateString();
  const updated = await db.collection('stats').findOneAndUpdate(
    { _id: STATS_ID },
    { $inc: { totalPremium: 1, todayPremium: 1 }, $set: { lastDate: today } },
    { returnDocument: 'after' }
  );
  return {
    total: updated.totalPremium,
    today: updated.todayPremium
  };
}

module.exports = {
  getStats,
  incrementStats
};