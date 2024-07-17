import React, { useState } from "react";
import useCommentTree from "../hooks/use-comment-tree";

const Comments = ({
  key,
  comments = {},
  onSubmitComment = () => null,
  onEditCommit = () => null,
  onDeleteComment = () => null,
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comments.content);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(comments.content);
  };

  const toggleHand = () => {
    setExpand(!expand);
  };

  const handleReply = (e) => {
    if (editMode) {
      setEditedContent(e.target.value);
    } else setReplyContent(e.target.value);
  };

  const handleAddReply = () => {
    if (replyContent) {
      onSubmitComment(comments.id, replyContent);
      setReplyContent("");
    }
  };

  const handelsaveEdit = () => {
    onEditCommit(comments.id, editedContent);
    setEditMode(false);
  };

  //   const handleEdit

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comments.content}</p>
          <p className="comment-info">Votes:{comments.votes}</p>
          <p className="comment-info">
            {new Date(comments.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div>
          <div className="add-comment">
            <textarea
              rows={3}
              cols={50}
              value={editedContent}
              onChange={handleReply}
              placeholder="Add a new Comment"
              className="comment-textarea"
            />
            <button className="comment-button" onClick={handelsaveEdit}>
              Save Edit
            </button>
            <button className="comment-button" onClick={toggleEditMode}>
              Cancle Edit
            </button>
          </div>
        </div>
      )}
      <div className="comment-actions">
        <button className="comment-button" onClick={toggleHand}>
          {expand ? "Hide Repiles" : "Reply"}
        </button>
        <button className="comment-button" onClick={toggleEditMode}>
          Edit
        </button>
        <button
          className="comment-button"
          onClick={() => onDeleteComment(comments.id)}
        >
          Delete
        </button>
      </div>
      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              rows={3}
              cols={50}
              value={replyContent}
              onChange={handleReply}
              placeholder="Add a new Comment"
              className="comment-textarea"
            />
            <button className="comment-button" onClick={handleAddReply}>
              Add Comment
            </button>
          </div>
          {comments?.replies?.map((reply) => {
            return (
              <Comments
                key={reply.id}
                comments={reply}
                onSubmitComment={onSubmitComment}
                onDeleteComment={onDeleteComment}
                onEditCommit={onEditCommit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;
