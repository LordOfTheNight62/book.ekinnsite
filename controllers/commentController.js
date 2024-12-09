const Comment = require('../models/commentModel');

exports.addNewComment = async (req, res) => {
  const { comment, bookID } = req.body;
  if (!comment || !bookID) {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return res.status(302).redirect(fullUrl + '?message=error');
  }
  try {
    const commentObject = new Comment(comment, bookID, req.session.userId);
    await Comment.addComment(commentObject);
    const lastComment = await Comment.getLastComment(bookID);
    const statistics = {
      totalComments: await Comment.getAllCommentsCountByBookID(bookID),
    };
    res.json({ message: 'Yorumunuz başarıyla gönderildi', comment: lastComment, statistics });
  } catch (err) {}
};

exports.deleteCommentByID = async (req, res) => {
  try {
    const { commentID } = req.body;
    await Comment.deleteCommentByID(commentID);
    const statistics = {
      totalComments: await Comment.getAllCommentsCountByUserID(req.session.userId),
    };
    res.json({ message: 'Yorumunuz başarıyla silindi', deletedCommentID: commentID, statistics });
  } catch (err) {}
};

exports.addLikeOrDislike = async (req, res) => {
  try {
    const { userID, commentID, isLike } = req.body;
    const checkIsLiked = await Comment.checkLikeOrDislikeByUser(userID, commentID);
    if (checkIsLiked.length === 0) {
      await Comment.addLikeOrDislike(userID, commentID, isLike);
      const statistics = {
        totalCommentLikes: await Comment.getLikesCount(commentID),
        totalCommentDislikes: await Comment.getDislikesCount(commentID),
      };
      res.json({ message: 'Beğeni veya beğenmeme başarıyla eklendi', statistics });
    } else {
      if (checkIsLiked[0].isLike === 1) {
        await Comment.deleteLikeOrDislike(userID, commentID);
        if (isLike === false) {
          await Comment.addLikeOrDislike(userID, commentID, isLike);
          const statistics = {
            totalCommentLikes: await Comment.getLikesCount(commentID),
            totalCommentDislikes: await Comment.getDislikesCount(commentID),
          };
          return res.json({ deletedLike: true, statistics });
        }
        const statistics = {
          totalCommentLikes: await Comment.getLikesCount(commentID),
          totalCommentDislikes: await Comment.getDislikesCount(commentID),
        };
        return res.json({ deletedLike: true, statistics });
      } else if (checkIsLiked[0].isLike === 0) {
        await Comment.deleteLikeOrDislike(userID, commentID);
        if (isLike === true) {
          await Comment.addLikeOrDislike(userID, commentID, isLike);
          const statistics = {
            totalCommentLikes: await Comment.getLikesCount(commentID),
            totalCommentDislikes: await Comment.getDislikesCount(commentID),
          };
          return res.json({ deletedDislike: true, statistics });
        }
        const statistics = {
          totalCommentLikes: await Comment.getLikesCount(commentID),
          totalCommentDislikes: await Comment.getDislikesCount(commentID),
        };
        return res.json({ deletedDislike: true, statistics });
      }
    }
  } catch (err) {}
};
