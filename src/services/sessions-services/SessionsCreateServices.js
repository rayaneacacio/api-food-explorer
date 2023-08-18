const { compare } = require("bcryptjs");
const AppError = require("../../utils/AppError");

class SessionsCreateServices {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async validateEmail({ email }) {
    const user = await this.sessionsRepository.findByEmail({ email });
    if(!user) {
      throw new AppError("Email e/ou senha incorreta");
    }

    return user;
  }

  async validatePassword({ user, password }) {
    const samePasswords = await compare(password, user.password);
    if(!samePasswords) {
      throw new AppError("Email e/ou senha incorreta");
    }
  }

  async Authenticate({ user }) {
    let token = null
    try {
      token = await this.sessionsRepository.createToken({ user });
    } catch {
      throw new AppError("Usuário nao autenticado");
    }

    return token;
  }
}

module.exports = SessionsCreateServices;