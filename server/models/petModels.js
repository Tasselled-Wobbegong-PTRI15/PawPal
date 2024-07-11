const { Pool } = require('pg');

const PG_URI = 'postgresql://postgres.iiyppxnpqglfsepjqkrk:imEtEsAdpB9UcRTS@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

// create new pool using the connection string 
const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };