const articlesRouter = require('express').Router();
const Article = require('../models/article');
const ArticleVersion = require('../models/articleversion');
const User = require('../models/user');
const Comment = require('../models/comment');
const checkAuth = require('../helpers/verify');
const createArticleVerify = require('../helpers/createArticleVerify');
const Filter = require('bad-words');
const filter = new Filter();
const { notifyUser } = require('../socket');

articlesRouter.get('/', async (req, res, next) => {
  let { l: page, q: prompt } = req.query;
  page = Number(page);
  if (!page) page = 1;
  if (!prompt) prompt = '';
  if (page < 0) return res.status(400).json({ success: false, msg: 'Page cannot be in negative' });
  const prompts = prompt.split(' ');

  const baseQuery = { unlisted: false }; // Always exclude unlisted articles

  const amountToFetch = 20;

  const articles = await Article.find({
    ...baseQuery,
    $and: prompts.map((q) => {
      return {
        $or: [
          { title: { $regex: new RegExp(`.*${q}.*`, 'i') } },
          { description: { $regex: new RegExp(`.*${q}.*`, 'i') } },
          { tags: { $regex: new RegExp(`.*${q}.*`, 'i') } },
        ],
      };
    }),
  })
    .sort({ createdAt: -1 })
    .skip((page - 1) * amountToFetch)
    .limit(amountToFetch)
    .catch(() => {
      return res.status(400).json({ success: false, msg: 'Failed to fetch articles from database' });
    });

  return res.status(200).json({ success: true, articles: articles });
});

articlesRouter.get('/:articleId', async (req, res) => {
  const { articleId } = req.params; // Extracting the 'id' from the route parameters

  if (!articleId) {
    return res.status(400).json({ success: false, msg: 'Article ID is required.' });
  }

  try {
    const article = await Article.findOne({ id: articleId })
      .populate('author', 'username discordId avatar') // Populating the 'author' field with selected fields
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username discordId avatar',
        },
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'replies',
          populate: {
            path: 'author',
            select: 'username discordId avatar',
          },
        },
      });

    if (!article) {
      return res.status(404).json({ success: false, msg: 'Article not found.' });
    }

    return res.status(200).json({ success: true, article: article });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to fetch article.', error: error.message });
  }
});

articlesRouter.delete('/:articleId', checkAuth, async (req, res) => {
  const { articleId } = req.params;

  if (!articleId) {
    return res.status(400).json({ success: false, msg: 'Article ID is required.' });
  }

  try {
    // Check if the article belongs to the authenticated user before deleting
    const article = await Article.findOne({ id: articleId });

    if (!article) {
      return res.status(404).json({ success: false, msg: 'Article not found.' });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: 'You do not have permission to delete this article.' });
    }

    await Article.deleteOne({ id: articleId });

    // Optionally, remove the article ID from the user's articles array
    await User.updateOne(
      { _id: req.user._id },
      {
        $pull: { articles: article._id },
      }
    );

    return res.status(200).json({ success: true, msg: 'Article deleted successfully.' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to delete the article.', error: error.message });
  }
});

articlesRouter.put('/:articleId', checkAuth, async (req, res) => {
  const { articleId } = req.params;
  const updatedData = req.body;

  try {
    const article = await Article.findOne({ id: articleId });

    if (!article) {
      return res.status(404).json({ success: false, msg: 'Article not found' });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: 'You do not have permission to edit this article' });
    }

    // Uložení aktuální verze
    const currentVersion = new ArticleVersion({
      articleId: article._id,
      versionNumber: article.version,
      title: article.title,
      unlisted: article.unlisted,
      description: article.description,
      thumbnail: article.thumbnail,
      tags: article.tags,
      blocks: article.blocks,
    });
    await currentVersion.save();

    // Aktualizace článku s novými daty
    article.title = updatedData.title || article.title;
    article.unlisted = updatedData.unlisted !== undefined ? updatedData.unlisted : article.unlisted;
    article.description = updatedData.description || article.description;
    article.thumbnail = updatedData.thumbnail || article.thumbnail;
    article.tags = updatedData.tags || article.tags;
    article.blocks = updatedData.blocks || article.blocks;
    article.version += 1;

    await article.save();

    return res.status(200).json({ success: true, article: article });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to update article', error: error.message });
  }
});

articlesRouter.post('/', checkAuth, createArticleVerify, async (req, res) => {
  const MAX_ARTICLES_PER_USER = process.env.MAX_ARTICLES_PER_USER || 10; // Default to 10 if not set in .env

  try {
    const user = await User.findById(req.user._id);

    // Check if the user is not an admin and has reached the article limit
    if (!user.isAdmin && user.articles.length >= MAX_ARTICLES_PER_USER) {
      return res.status(400).json({ success: false, msg: 'Article creation limit reached' });
    }

    const { title, description, tags, blocks, unlisted, thumbnail } = req.body;

    // Filter out blocks without content
    const filteredBlocks = blocks
      .filter((block) => block.content && block.content.trim() !== '')
      .map((block) => ({ content: block.content, type: block.type }));

    // Here, the thumbnail is expected to be a data URL string sent from the client.

    if (!title || !description || filteredBlocks.length === 0) {
      return res.status(400).json({ success: false, msg: 'Required fields missing' });
    }

    const newArticle = new Article({
      title,
      description,
      thumbnail,
      tags,
      author: req.user._id,
      blocks: filteredBlocks,
      unlisted,
    });

    await newArticle.save();

    // Add the article ID to the user's articles array
    await User.updateOne(
      { id: req.user.id },
      {
        $push: { articles: newArticle._id },
      }
    );

    return res.status(201).json({ success: true, article: newArticle });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to create article', error: error.message });
  }
});

// Get all comments for an article
articlesRouter.get('/:articleId/comments', async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findOne({ id: articleId }).populate({
      path: 'comments',
      populate: [
        {
          path: 'author',
          select: 'username discordId avatar',
        },
        {
          path: 'replies',
          populate: {
            path: 'author',
            select: 'username discordId avatar',
          },
        },
      ],
    });

    if (!article) {
      return res.status(404).json({ success: false, msg: 'Article not found' });
    }

    return res.status(200).json({ success: true, comments: article.comments });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to fetch comments', error: error.message });
  }
});

// Add a new comment to an article
articlesRouter.post('/:articleId/comments', checkAuth, async (req, res) => {
  const { articleId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ success: false, msg: 'Comment content is required' });
  }

  // Censor the comment content
  const censoredContent = filter.clean(content);

  try {
    const article = await Article.findOne({ id: articleId });

    if (!article) {
      return res.status(404).json({ success: false, msg: 'Article not found' });
    }

    const newComment = new Comment({
      article: article._id,
      author: req.user._id,
      content: censoredContent,
    });

    await newComment.save();

    // Add the comment ID to the article's comments array
    article.comments.push(newComment._id);
    await article.save();

    if (article.author.toString() !== req.user._id.toString()) {
      const previewContent = censoredContent.slice(0, 50) + (censoredContent.length > 50 ? '...' : '');
      await notifyUser(
        article.author,
        'article',
        article.id,
        `${req.user?.username} commented: "${previewContent}"`
      );
    }

    return res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: 'Failed to add comment', error: error.message });
  }
});

// Add a reply to a comment

// * Note: commentId is Mongos ID unlike in any other requests
articlesRouter.post('/comments/:commentId/replies', checkAuth, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ success: false, msg: 'Reply content is required' });
  }

  // Censor the reply content
  const censoredContent = filter.clean(content);

  try {
    const parentComment = await Comment.findById(commentId).populate('article');

    if (!parentComment) {
      return res.status(404).json({ success: false, msg: 'Comment not found' });
    }

    const newReply = new Comment({
      article: parentComment.article,
      author: req.user._id,
      content: censoredContent,
      isReply: true,
    });

    await newReply.save();

    // Add the reply ID to the parent comment's replies array
    parentComment.replies.push(newReply._id);
    await parentComment.save();

    if (parentComment.author._id.toString() !== req.user._id.toString()) {
      const previewContent = censoredContent.slice(0, 50) + (censoredContent.length > 50 ? '...' : '');
      await notifyUser(
        parentComment.author._id,
        'article',
        parentComment.article.id,
        `${req.user?.username} replied: "${previewContent}"`
      );
    }

    return res.status(201).json({ success: true, reply: newReply });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: 'Failed to add reply', error: error.message });
  }
});

// Edit a comment

// * Note: commentId is Mongos ID unlike in any other requests
articlesRouter.put('/comments/:commentId', checkAuth, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ success: false, msg: 'Comment content is required' });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, msg: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: 'You do not have permission to edit this comment' });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({ success: true, comment: comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: 'Failed to edit comment', error: error.message });
  }
});

// Delete a comment

// * Note: commentId is Mongos ID unlike in any other requests
articlesRouter.delete('/comments/:commentId', checkAuth, async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ success: false, msg: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: 'You do not have permission to delete this comment' });
    }

    // Update the comment to mark it as deleted
    comment.content = 'This comment/reply has been deleted.';
    comment.isDeleted = true;
    await comment.save();

    return res.status(200).json({ success: true, msg: 'Comment marked as deleted successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to delete comment', error: error.message });
  }
});

module.exports = articlesRouter;
