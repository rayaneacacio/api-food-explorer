const knex = require("../database/knex");

class TagsRepository {
  async insert({ user_id, note_id, tags }) {
    const tagsInsert = tags.map(tag => {
      return {
        user_id,
        note_id,
        title: tag
      }
    })

    await knex("tags").insert(tagsInsert);
  }

  async get({ note_id }) {
    const tags = await knex("tags").where({ note_id });
    return tags;
  }

  async delete({ id }) {
    await knex("tags").where({ id }).delete();
  }
}

module.exports = TagsRepository;