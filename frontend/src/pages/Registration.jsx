import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3000/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputRegistration"
            name="username"
            placeholder="(Ex. John123...)"
          ></Field>
          <label>Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputRegistration"
            type="password"
            name="password"
            placeholder="(Ex. password123...)"
          ></Field>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
