module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 53306,
  "username": "user",
  "password": "pass",
  "database": "sakenowa",
  "entities": ["src/entities/**/*.entity.ts"],
  "migrations": ["database/migrations/**/*.ts"],
  "subscribers": ["database/subscribers/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "database/migrations",
    "subscribersDir": "database/subscribers"
  }
}
