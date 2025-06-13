import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../helpers/authContext";

const Post = () => {
  let { id } = useParams();
  const [individualPost, setIndividualPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setIndividualPost(response.data);
    });
    axios.get(`http://localhost:3000/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3000/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
            id: response.data.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3000/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setComments(
          comments.filter((value) => {
            return value.id != id;
          })
        );
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{individualPost.title}</div>
          <div className="body">{individualPost.postText}</div>
          <div className="footer">{individualPost.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            value={newComment}
            placeholder="Comment..."
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((value, key) => {
            return (
              <div key={key} className="comment">
                <div className="comment-header">
                  <span className="comment-username">
                    Added by: {value.username}
                  </span>
                  {authState.username === value.username && (
                    <button
                      className="deleteButton"
                      onClick={() => deleteComment(value.id)}
                    >
                      X
                    </button>
                  )}
                </div>
                <div className="comment-body">{value.commentBody}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
