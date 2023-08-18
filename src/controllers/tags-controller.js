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
    const { note_id, title } = request.body;

    const tagsRepository = new TagsRepository();
    const { notes, tags } = await tagsRepository.findByTitle({ note_id, title });

    response.json({ notes, tags });
  }

  async delete(request, response) {
    const { id } = request.body;

    const tagsRepository = new TagsRepository();
    await tagsRepository.delete({ id });

    response.json();
  }
}

module.exports = TagsController;