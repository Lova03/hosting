const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Define a sub-schema for blocks
const blockSchema = new Schema({
  type: {
    type: String,
    enum: ['text', 'code'], // only 'text' or 'code' is allowed
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const articleVersionSchema = new Schema(
  {
    articleId: { type: ObjectId, ref: 'Article', required: true },
    versionNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: false },
    unlisted: { type: Boolean, required: false, default: false },
    tags: [{ type: String }],
    blocks: [blockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ArticleVersion', articleVersionSchema);
