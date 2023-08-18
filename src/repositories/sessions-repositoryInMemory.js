class SessionsRepositoryInMemory {
  users = [];

  async findByEmail({ email }) {
    return this.users.find(user => user.email === email);
  }

  async createToken({ user }) {
    const token = {
      subject: String(user.id),
      expiresIn: "1d"
    }

    return token;
  }
}

module.exports = SessionsRepositoryInMemory;