const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkEmail = await database.get("SELECT * FROM users WHERE email = (?)", [ email ]);
    if(checkEmail) {
      throw new AppError("Esse email já está em uso");
    }

    const hashPassword = await hash(password, 8);
    
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [ name, email, hashPassword ]);

    return response.json(checkEmail);
  }
}

module.exports = UsersController;