const AppError = require("../../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersCreateServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async checkEmail({ name, email, password }) {
    const checkEmail = await this.userRepository.findByEmail({ email });
    if(checkEmail) {
      throw new AppError("Esse email já está em uso");
    }

    const hashPassword = await hash(password, 8);
    await this.newUser({ name, email, password: hashPassword });
  }

  async newUser({ name, email, password }) {
    const userCreated = await this.userRepository.insertUser({ name, email, password });
    return userCreated;
  }

  async verifyEmail({ email }) {
    const user = await this.userRepository.findByEmail({ email });
    if(!user) {
      throw new AppError("email e/ou senha incorreta");
    }

    return user;    
  }

  async verifyPassword({ user, password }) {
    const samePassword = await compare(password, user.password);
    if(!samePassword) {
      throw new AppError("email e/ou senha incorreta");
    }

    await this.userRepository.deleteUser({ email: user.email });
  }

}

module.exports = UsersCreateServices;