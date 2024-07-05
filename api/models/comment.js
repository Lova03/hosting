const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const autopopulate = require('mongoose-autopopulate');

const commentSchema = new Schema(
  {
    article: { type: ObjectId, ref: 'Article', required: true },
    author: { type: ObjectId, ref: 'User', required: true, autopopulate: true },
    content: { type: String, required: true },
    likes: [{ type: ObjectId, ref: 'User' }],
    replies: [{ type: ObjectId, ref: 'Comment', autopopulate: true }],
    isReply: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

commentSchema.plugin(autopopulate);

module.exports = mongoose.model('Comment', commentSchema);
