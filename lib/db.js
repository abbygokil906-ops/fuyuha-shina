const { MongoClient } = require('mongodb');

let client = null;
let db = null;
let connecting = null;

async function connectDB() {
  if (db) return db;
  if (connecting) return connecting;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI belum diset');
  }

  connecting = (async () => {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000
    });

    client.on('serverHeartbeatFailed', (e) => {
      console.error(
        'HEARTBEAT FAILED:',
        e.connectionId,
        e.failure && e.failure.name,
        e.failure && e.failure.message
      );
    });

    try {
      await client.connect();
      const database = client.db('apidb');
      await database.collection('users').createIndex({ email: 1 }, { unique: true });
      await database.collection('api_tokens').createIndex({ hash: 1 }, { unique: true });
      db = database;
      return db;
    } catch (err) {
      await client.close().catch(() => {});
      client = null;
      throw err;
    } finally {
      connecting = null;
    }
  })();

  return connecting;
}

function getDB() {
  if (!db) throw new Error('Database belum tersambung. Panggil connectDB() dulu.');
  return db;
}

module.exports = { connectDB, getDB };
