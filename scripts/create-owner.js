require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { connectDB, getDB } = require('../lib/db');

(async () => {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Pakai: node scripts/create-owner.js email@kamu.com passwordKuat');
    process.exit(1);
  }

  await connectDB();
  const passwordHash = await bcrypt.hash(password, 12);

  await getDB().collection('users').updateOne(
    { email },
    { $set: { email, passwordHash, role: 'owner' } },
    { upsert: true }
  );

  console.log('Akun owner siap:', email);
  process.exit(0);
})();