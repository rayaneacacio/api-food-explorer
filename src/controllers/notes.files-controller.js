const NotesRepository = require("../repositories/notes-repository");

class FilesController {
  async patchImage(request, response) {
    const { note_id } = request.query;
    const imgFilename = request.file.filename;

    const notesRepository = new NotesRepository;

    const note = await notesRepository.findById({ id: Number(note_id) });
    await notesRepository.updateImg({ note, imgFilename });

    response.json();
  }
}

module.exports = FilesController;