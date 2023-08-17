const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsRepository {
  async findByEmail({ email }) {
    const user = await knex("users").where({ email }).first();
    return user;
  }

  async createToken({ user }) {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return token;
  }
}

module.exports = SessionsRepository;