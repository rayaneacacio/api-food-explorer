exports.up = knex => knex.schema.alterTable("notes", table => {
  table.renameColumn("avatar", "image");
});

exports.down = knex => knex.schema.alterTable("notes", table => {
  table.renameColumn("image", "avatar");
});