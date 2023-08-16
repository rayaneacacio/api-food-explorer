const AppError = require("../../utils/AppError");
const { hash } = require("bcryptjs");

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
    await this.userRepository.insertUser({ name, email, password: hashPassword });
  }
}

module.exports = UsersCreateServices;