import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const Post = () => {
  let { id } = useParams();
  const [individualPost, setIndividualPost] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((response) => {
      setIndividualPost(response.data);
    });
  }, []);
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{individualPost.title}</div>
          <div className="body">{individualPost.postText}</div>
          <div className="footer">{individualPost.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
};

export default Post;
