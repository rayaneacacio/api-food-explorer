const TagsRepository = require("../repositories/tags-repository");

class TagsController {
  async create(request, response) {
    const user_id = request.user.id;
    const { note_id, tags } = request.body;

    const tagsRepository = new TagsRepository();
    await tagsRepository.insert({ user_id, note_id, tags });

    response.json();
  }

  async index(request, response) {
    const { note_id } = request.body;

    const tagsRepository = new TagsRepository();
    const tags = await tagsRepository.getAllTags({ note_id });

    response.json(tags);
  }

  async show(request, response) {
    const { title } = request.body;

    const tagsRepository = new TagsRepository();
    const notes = await tagsRepository.findByTitle({ title });

    return response.json(notes);
  }

  async delete(request, response) {
    const { note_id } = request.body;

    const tagsRepository = new TagsRepository();
    await tagsRepository.delete({ note_id });

    response.json();
  }
}

module.exports = TagsController;