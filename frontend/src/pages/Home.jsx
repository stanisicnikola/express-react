import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../helpers/authContext";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((response) => {
      const posts = response.data;
      setListOfPosts(posts);
    });
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setListOfPosts(
          listOfPosts.filter((value) => {
            return value.id != id;
          })
        );
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key}>
            <div
              className="post"
              onClick={() => {
                navigate(`/posts/${value.id}`);
              }}
            >
              <div className="title"> {value.title} </div>
              <div className="body"> {value.postText}</div>
              <div className="footer"> @{value.username}</div>
            </div>
            {authState.username === value.username && (
              <button
                className="deletePostButton"
                onClick={() => deletePost(value.id)}
              >
                Delete post
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
