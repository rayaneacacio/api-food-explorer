const SessionsRepository = require("../repositories/sessions-repository");
const SessionsCreateServices = require("../services/sessions-services/SessionsCreateServices");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionsRepository = new SessionsRepository();
    const sessionsCreateServices = new SessionsCreateServices(sessionsRepository);

    const user = await sessionsCreateServices.validateUser({ email, password });
    const token = await sessionsCreateServices.createToken({ user });

    response.json({ user, token });
  }
}

module.exports = SessionsController;