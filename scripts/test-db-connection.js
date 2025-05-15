const { PrismaClient } = require('@prisma/client');

const databaseUrl = "postgresql://postgres:A1%40dgjmptxw@localhost:5432/kinasa";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    console.log('✅ Connection successful!', result);
    
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ User table available. Current count: ${userCount}`);
    } catch (tableError) {
      console.error('❌ Error accessing User table:', tableError.message);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.error('Connection string format (redacted):', 
      process.env.DATABASE_URL?.replace(/\/\/([^:]+):([^@]+)@/, '//USER:PASSWORD@'));
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
