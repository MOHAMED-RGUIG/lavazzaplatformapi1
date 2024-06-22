const sql = require('mssql');
require("dotenv").config()
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    pool: {
        max: 10, // Maximum number of connections
        min: 0, // Minimum number of connections
        idleTimeoutMillis: 30000 // How long a connection can be idle before being closed
    }
};

// Initialize connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('MSSQL connection pool created');
        return pool;
    })
    .catch(err => {
        console.error('Error creating MSSQL connection pool', err);
        process.exit(1); // Exit process on connection failure
    });

module.exports = {
    sql,
    poolPromise
};
