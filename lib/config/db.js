module.exports = {
    "host": "localhost",
    "port": 5432,
    "pool": 150,
    "username": process.env.AC_USER,
    "password": process.env.AC_PASSWORD,
    "database": process.env.AC_DB
}