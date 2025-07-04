import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../helpers/authContext";

const CreatePost = () => {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/posts", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate("/");
        }
      });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          ></Field>
          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Description...)"
          ></Field>
          <button type="submit">Create</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
