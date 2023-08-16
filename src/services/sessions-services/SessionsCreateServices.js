const { compare } = require("bcryptjs");
const AppError = require("../../utils/AppError");

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
}

module.exports = SessionsCreateServices;