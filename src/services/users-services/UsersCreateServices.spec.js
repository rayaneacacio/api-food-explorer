const UserRepositoryInMemory = require("../../repositories/repositoryInMemory/user-repositoryInMemory");
const UsersCreateServices = require("./UsersCreateServices");
const AppError = require("../../utils/AppError");

describe("UsersCreateServices", () => {
  let userRepositoryInMemory = null;
  let usersCreateServices = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersCreateServices = new UsersCreateServices(userRepositoryInMemory);
  });

  it("verifica se o email já existe", async() => {
    const userTest = {
      name: "userTest",
      email: `${Math.floor(Math.random() * 1000)}@emailtest.com`,
      password: "1234"
    }

    await expect(usersCreateServices.checkEmail({ name: userTest.name, email: userTest.email, password: userTest.password })).rejects.toEqual(new AppError("Esse email já está em uso"));
  });

  it("verifica se o usuário foi criado", async() => {
    const userTest2 = {
      name: "userTest2",
      email: `${Math.floor(Math.random() * 2000)}@emailtest2.com`,
      password: "1234"
    }

    const userCreated = await usersCreateServices.newUser({ name: userTest2.name, email: userTest2.email, password: userTest2.password });

    expect(userCreated).toHaveProperty("id");
  });

  it("verifica se o email está correto", async() => {
    await expect(usersCreateServices.verifyEmail({ email: undefined })).rejects.toEqual(new AppError("email e/ou senha incorreta"));
  });

  it("verifica se a senha está correta", async() => {
    const userTest4 = {
      name: "userTest4",
      email: `${Math.floor(Math.random() * 4000)}@emailtest4.com`,
      password: `${Math.floor(Math.random() * 4000)}`
    }

    const passwordTest = "1234"

    await expect(usersCreateServices.verifyPassword({ user: userTest4, password: passwordTest })).rejects.toEqual(new AppError("email e/ou senha incorreta"));
  });

});