import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const User = () => {
  let { id } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [listOfPosts, setListsOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/user/${id}`);
    axios.get(`http://localhost:3000/posts/byUserId/${id}`).then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);

  const updatePassword = (password) => {
    axios
      .put(`http://localhost:3000/auth/user/update/${id}`, {
        password: password,
      })
      .then((response) => {
        alert(response.data);
        navigate("/");
      });
  };
  return (
    <div className="userPosts">
      <div>
        {listOfPosts.map((post, key) => {
          return (
            <div key={key}>
              <div className="post">
                <div className="title">{post.title}</div>
                <div className="body">{post.postText}</div>
                <div className="footer">
                  <div className="footerContent">
                    <div>@{post.username}</div>
                    <label>Likes: {post.Likes.length}</label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="loginContainer">
        <h1>Update password</h1>
        <label>New password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={() => {
            updatePassword(password);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default User;
