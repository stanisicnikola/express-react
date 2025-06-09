import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
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
          <div className="post" key={key}>
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
