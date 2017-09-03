let tagModel = {};

tagModel.findAllTags = () => {
    return `SELECT * FROM tags`;
};

tagModel.saveTags = (tagValue) => {
    const query = {
      text: `INSERT INTO tags (name, tag_description) VALUES ($1,$2) RETURNING id`,
      values: [tagValue, null]
    }
    console.log(query);
    return query
};

module.exports = tagModel;