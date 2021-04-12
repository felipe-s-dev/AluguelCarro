require('dotenv/config')

const {
  DB_CLIENT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS } = process.env

module.exports = {

  development: {
    client: DB_CLIENT,
    connection: {
      database: DB_NAME,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
