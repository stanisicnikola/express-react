import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  let { id } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/user/${id}`).then((response) => {
      console.log(response.data);
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
  );
};

export default User;
