const { compare } = require("bcryptjs");
const AppError = require("../../utils/AppError");
const authConfig = require("../../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsCreateServices {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async validateUser({ email, password }) {
    const user = await this.sessionsRepository.findByEmail({ email })
    if(!user) {
      throw new AppError("Email e/ou senha incorreta");
    }

    const samePasswords = await compare(password, user.password);
    if(!samePasswords) {
      throw new AppError("Email e/ou senha incorreta");
    }

    return user;
  }

  async createToken({ user }) {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.token),
      expiresIn
    });

    return token;
  }
}

module.exports = SessionsCreateServices;