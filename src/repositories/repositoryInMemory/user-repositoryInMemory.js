class UserRepositoryInMemory {
  user = {
    name: null,
    email: null,
    password: null
  }

  async findByEmail({ email }) {
    if(email) {
      this.user.email = email;
    }
    
    return (this.user.email === email);
  }

  async insertUser({ name, email, password }) {
    const userCreated = {
      id: Math.floor(Math.random() * 10),
      name,
      email,
      password
    }

    return userCreated;
  }
}

module.exports = UserRepositoryInMemory;