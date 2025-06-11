import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const Post = () => {
  let { id } = useParams();
  const [individualPost, setIndividualPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = { commentBody: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
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
                {value.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
