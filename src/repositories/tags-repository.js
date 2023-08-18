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

  async getAllTags({ note_id }) {
    const tags = await knex("tags").where({ note_id });
    return tags;
  }

  async findByTitle({ title }) {
    const tags = await knex("tags").whereLike("title", `%${ title }%`);

    const notes = await Promise.all(tags.map(async(tag) => {
      const note = await knex("notes").where({ id: tag.note_id });
      return note;
    }));

    return { notes, tags };
  }

  async delete({ id }) {
    await knex("tags").where({ id }).delete();
  }
}

module.exports = TagsRepository;