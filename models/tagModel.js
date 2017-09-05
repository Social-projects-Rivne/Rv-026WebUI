let tagModel = {};

tagModel.findAllTags = () => {
    return `SELECT * FROM tags`;
};

tagModel.saveTags = (tagValue) => {
    const query = {
      text: `INSERT INTO tags (name, tag_description) VALUES ($1,$2) RETURNING id`,
      values: [tagValue, null]
    }
    return query
};

tagModel.findTagByName = (tagName) => {
    const query = {
      text: `SELECT t.id FROM tags t WHERE t.name = $1::text`,
      values: [tagName]
    }
    return query
};


module.exports = tagModel;