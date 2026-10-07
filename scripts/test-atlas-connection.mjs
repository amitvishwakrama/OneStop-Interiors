import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

function getMongoUri() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.startsWith('MONGODB_URI=')) {
        return line.substring('MONGODB_URI='.length).trim();
      }
    }
  }
  return process.env.MONGODB_URI;
}

const uri = getMongoUri();

async function checkAtlas() {
  console.log('Testing connection to configured database...');
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  const isAtlas = uri.startsWith('mongodb+srv://');
  console.log(`Target type: ${isAtlas ? 'MongoDB Atlas (Cloud)' : 'Local / Standard MongoDB'}`);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });

    console.log('✓ Successfully connected to MongoDB Atlas!');
    console.log(`Connected Database: ${conn.connection.name}`);
    console.log(`Host: ${conn.connection.host}`);

    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`Existing Collections (${collections.length}):`, collections.map(c => c.name).join(', ') || 'None (New DB)');

    await mongoose.disconnect();
    console.log('✓ Connection test completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed with error:');
    if (err.message && err.message.includes('bad auth')) {
      console.error('Authentication failed: Please check your MongoDB Atlas username and password.');
    } else if (err.message && (err.message.includes('querySrv ENOTFOUND') || err.message.includes('getaddrinfo'))) {
      console.error('DNS / Hostname lookup failed: Please verify your cluster hostname in the connection string.');
    } else if (err.message && (err.message.includes('whitelist') || err.message.includes('timed out') || err.message.includes('selection timed out'))) {
      console.error('Network / Whitelist issue: Please ensure your IP address is whitelisted in MongoDB Atlas Network Access (or set to 0.0.0.0/0).');
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
}

checkAtlas();
