import ws from 'ws';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

declare global {
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma;

export { prisma };
