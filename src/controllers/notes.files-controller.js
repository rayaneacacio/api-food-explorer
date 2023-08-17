const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class FilesController {
  async patchImage(request, response) {
    const user_id = request.user.id;
    const { title } = request.query;
    const imgFilename = request.file.filename;

    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imgFilename);

    const note = await knex("notes").where({ user_id, title }).first();

    note.image = filename;
    await knex("notes").update(note).where({ user_id, title });

    response.json(note);
  }
}

module.exports = FilesController;