import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:A1%40dgjmptxw@localhost:5432/kinasa";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Création d'une instance avec logs détaillés
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
