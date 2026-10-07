import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import path from 'path';

async function start() {
  console.log('Starting local MongoDB instance...');
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'onestop_interiors',
    },
  });

  const uri = mongod.getUri();
  console.log(`[Mongo Server] Local MongoDB ready at: ${uri}`);

  // Also update .env.local to ensure exact URI match if not already pointing to Atlas
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    if (!envContent.includes('mongodb+srv://')) {
      envContent = envContent.replace(/MONGODB_URI=.*/, `MONGODB_URI=${uri}onestop_interiors`);
      fs.writeFileSync(envPath, envContent);
    }
  }

  process.on('SIGINT', async () => {
    await mongod.stop();
    process.exit(0);
  });
}

start().catch(err => {
  console.error('Failed to start local mongo:', err);
  process.exit(1);
});

