const UserRepository = require("../repositories/user-repository");
const UsersCreateServices = require("../services/users-services/UsersCreateServices");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const usersCreateServices = new UsersCreateServices(userRepository);
    
    await usersCreateServices.checkEmail({ name, email, password });

    return response.json();
  }

  async delete(request, response) {
    const { email, password } = request.body; 

    const userRepository = new UserRepository();
    const usersCreateServices = new UsersCreateServices(userRepository);

    const user = await usersCreateServices.verifyEmail({ email });
    await usersCreateServices.verifyPassword({ user, password });

    return response.json();
  }
}

module.exports = UsersController;