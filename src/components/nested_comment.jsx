import React, { useState } from "react";
import "./styles.css";
import useCommentTree from "../hooks/use-comment-tree";
import Comments from "./comments";

const NestedComments = ({
  commentsData = [],
  onSubmit = () => null,
  onEdit = () => null,
  onDelete = () => null,
}) => {
  const [addComment, setAddComment] = useState("");
  const { comment, insertComment, editComment, deleteComment } =
    useCommentTree(commentsData);
  console.log(comment);

  const handleComment = (e) => {
    setAddComment(e.target.value);
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
    onSubmit(content);
  };
  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };

  const handleAddComment = () => {
    if (addComment) {
      handleReply(undefined, addComment);
      setAddComment("");
    }
  };

  const handleDelete = (commentID) => {
    deleteComment(commentID);
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          rows={3}
          cols={50}
          value={addComment}
          onChange={handleComment}
          placeholder="Add a new Comment"
          className="comment-textarea"
        />
        <button className="comment-button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      {comment.map((items) => {
        // debugger;
        return (
          <Comments
            key={items.id}
            comments={items}
            onSubmitComment={handleReply}
            onEditCommit={handleEdit}
            onDeleteComment={handleDelete}
          />
        );
      })}
    </>
  );
};

export default NestedComments;
