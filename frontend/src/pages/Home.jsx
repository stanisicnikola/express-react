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

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3000/likes",
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likeCount: response.data.liked
                  ? post.likeCount + 1
                  : post.likeCount - 1,
              };
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key}>
            <div className="post">
              <div className="title"> {value.title} </div>
              <div
                onClick={() => {
                  navigate(`/posts/${value.id}`);
                }}
                className="body"
              >
                {value.postText}
              </div>
              <div className="footer">
                @{value.username}{" "}
                <button
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                >
                  Like
                </button>
                <label>{value.likeCount}</label>
              </div>
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
