import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((response) => {
      const posts = response.data;
      setListOfPosts(posts);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            className="post"
            key={key}
            onClick={() => {
              navigate(`/posts/${value.id}`);
            }}
          >
            <div className="title"> {value.title} </div>
            <div className="body"> {value.postText}</div>
            <div className="footer"> {value.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
