import pg, { QueryResult } from "pg";

const pool = new pg.Pool({
    max: 50
});

export async function query(
    statement: string,
    variables?: any[]
): Promise<QueryResult> {
    // Grab a client from the pool
    const client = await pool.connect();
    try {
        // Make the query on the database
        return await client.query(statement, variables);
    } finally {
        // Regardless of a success or fail, release the client back to the pool
        client.release();
    }
}
