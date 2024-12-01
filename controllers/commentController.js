const Comment = require('../models/commentModel');

exports.addNewComment = async (req, res) => {
  const { name, comment, bookID } = req.body;
  if (!name || !comment || !bookID) {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return res.status(302).redirect(fullUrl + '?message=error');
  }
  try {
    const commentObject = new Comment(name, comment, bookID, req.session.userId);
    await Comment.addComment(commentObject);
    const lastComment = await Comment.getLastComment(bookID);
    const statistics = {
      totalComments: await Comment.getAllCommentsCount(bookID),
    };
    res.json({ message: 'Yorumunuz başarıyla gönderildi', comment: lastComment, statistics });
  } catch (err) {}
};

exports.deleteCommentByID = async (req, res) => {
  try {
    const { commentID } = req.body;
    await Comment.deleteCommentByID(commentID);
    const comments = await Comment.getAllCommentsByID(req.session.userId);
    const statistics = {
      totalComments: await Comment.getAllMyCommentsCount(req.session.userId),
    };
    res.send({ message: 'Yorumunuz başarıyla silindi', comments, deletedCommentID: commentID, statistics });
  } catch (err) {}
};
