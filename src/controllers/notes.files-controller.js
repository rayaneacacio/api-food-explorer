const NotesRepository = require("../repositories/notes-repository");

class FilesController {
  async patchImage(request, response) {
    const user_id = request.user.id;
    const { title } = request.query;
    const imgFilename = request.file.filename;

    const notesRepository = new NotesRepository;

    const note = await notesRepository.findByTitle({ user_id, title });
    await notesRepository.updateImg({ user_id, title, note, imgFilename });

    response.json(note);
  }
}

module.exports = FilesController;