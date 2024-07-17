import React, { useState } from "react";

const useCommentTree = (initialComment) => {
  const [comment, setComment] = useState(initialComment);

  const insertNode = (tree, commentId, content) => {
    return tree.map((comments) => {
      if (comments.id === commentId) {
        return {
          ...comments,
          replies: [...comments.replies, content],
        };
      } else if (comments.replies && comments.replies.length > 0) {
        return {
          ...comments,
          replies: insertNode(comments.replies, commentId, content),
        };
      }
      return comments;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };
    if (commentId) {
      setComment((prevComment) =>
        insertNode(prevComment, commentId, newComment)
      );
    } else {
      setComment((prevComment) => [newComment, ...prevComment]);
    }
  };
  /// this logic is to edit comment
  const editNode = (tree, commentId, content) => {
    return tree.map((comments) => {
      if (comments.id === commentId) {
        return {
          ...comments,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (comments.replies && comments.replies.length > 0) {
        return {
          ...comments,
          replies: editNode(comments.replies, commentId, content),
        };
      }
      return comments;
    });
  };

  const editComment = (commentId, content) => {
    setComment((prevComment) => editNode(prevComment, commentId, content));
  };

  //logic for delete comment
  const deleteNode = (tree, commentId) => {
    return tree.reduce((acc, comments) => {
      if (comments.id === commentId) {
        return acc;
      } else if (comments.replies && comments.replies.length > 0) {
        comments.replies = deleteNode(comments.replies, commentId);
      }
      return [...acc, comments];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComment((prevComment) => deleteNode(prevComment, commentId));
  };

  return {
    comment,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;
