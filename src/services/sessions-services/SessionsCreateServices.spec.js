const SessionsRepositoryInMemory = require("../../repositories/sessions-repositoryInMemory");
const SessionsCreateServices = require("./SessionsCreateServices");
const AppError = require("../../utils/AppError");

describe("SessionsCreateServices", () => {
  let sessionsRepositoryInMemory = null
  let sessionsCreateServices = null

  beforeEach(() => {
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
    sessionsCreateServices = new SessionsCreateServices(sessionsRepositoryInMemory);
  });

  it("verifica se o email existe", async() => {
    const emailTest = `${Math.floor(Math.random() * 1000)}@emailtest.com`;

    await expect(sessionsCreateServices.validateEmail({ email: emailTest })).rejects.toEqual(new AppError("Email e/ou senha incorreta"));
  });

  it("verifica se a senha está correta", async() => {
    const userTest = {
      name: "userTest",
      email: "usertest@email.com",
      password: String(Math.floor(Math.random() * 12))
    }

    const passwordTest = "1234"

    await expect(sessionsCreateServices.validatePassword({ user: userTest, password: passwordTest })).rejects.toEqual(new AppError("Email e/ou senha incorreta"));
  });

  it("verifica se o user está autenticado", async() => {
    const user = {}
    await expect(sessionsCreateServices.Authenticate({ user })).rejects.toEqual(new AppError("Usuário nao autenticado"));
  });

});