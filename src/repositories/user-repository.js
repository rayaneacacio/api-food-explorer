const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");

class UserRepository {
  async findByEmail({ email }) {
    const database = await sqliteConnection();
    const emailExists = await database.get("SELECT * FROM users WHERE email = (?)", [ email ]);

    return emailExists;
  }

  async insertUser({ name, email, password }) {
    await knex("users").insert({ name, email, password });
  }
}

module.exports = UserRepository;