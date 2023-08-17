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
    const tags = await tagsRepository.get({ note_id });

    response.json(tags);
  }

  async delete(request, response) {
    const { id } = request.body;

    const tagsRepository = new TagsRepository();
    await tagsRepository.delete({ id });

    response.json();
  }
}

module.exports = TagsController;