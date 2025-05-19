import { neon } from '@neondatabase/serverless';

export async function getDbConnection() {
    if(!process.env.NEONDB_URL) {
        throw new Error('Neon Database URL is not defined')
    }
    const sql = neon(process.env.NEONDB_URL);
    return sql;
}