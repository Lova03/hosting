const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { v4: uuidv4 } = require('uuid');
const autopopulate = require('mongoose-autopopulate');

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
  id: { type: String, unique: true, required: true, default: uuidv4 },
});

const articleSchema = new Schema(
  {
    id: { type: String, unique: true, required: true, default: uuidv4 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: false },
    tags: [{ type: String }],
    author: { type: ObjectId, ref: 'User', required: true },
    blocks: [blockSchema],
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{ type: ObjectId, ref: 'Comment', autopopulate: true }],
    unlisted: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

articleSchema.plugin(autopopulate);

module.exports = mongoose.model('Article', articleSchema);
