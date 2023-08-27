const development = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'postgres',
}

const test = {
  database: 'database_name',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'postgres',
}

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'postgres',
}

module.exports = {
  development,
  test,
  production,
}
