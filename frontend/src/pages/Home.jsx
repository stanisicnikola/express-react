import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../helpers/authContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfLikedPosts, setListOfLikedPosts] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    }
    axios
      .get("http://localhost:3000/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        const posts = response.data.listOfPosts;
        setListOfPosts(posts);
        const likedPosts = response.data.likedPosts;
        setListOfLikedPosts(
          likedPosts.map((like) => {
            return like.PostId;
          })
        );
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
        if (listOfLikedPosts.includes(postId)) {
          setListOfLikedPosts(
            listOfLikedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setListOfLikedPosts([...listOfLikedPosts, postId]);
        }
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
                <div className="footerContent">
                  <div>@{value.username}</div>
                  <div>
                    <FavoriteIcon
                      onClick={() => {
                        likeAPost(value.id);
                      }}
                      className={
                        listOfLikedPosts.includes(value.id)
                          ? "unlikeBtnn"
                          : "likeBtnn"
                      }
                    />
                    <label>{value.likeCount}</label>
                  </div>
                </div>
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
