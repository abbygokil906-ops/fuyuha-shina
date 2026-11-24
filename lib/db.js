const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
let db = null;

async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('apidb');
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('api_tokens').createIndex({ hash: 1 }, { unique: true });
  return db;
}

function getDB() {
  if (!db) throw new Error('Database belum tersambung. Panggil connectDB() dulu.');
  return db;
}

module.exports = { connectDB, getDB };