import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const OnBoardingUser = ({ errors, touched, values }) => {
  return (
    <div className="animal-form">
      <h1>OnBoarding User</h1>
      <Form>
        <Field type="text" name="name" placeholder="Enter Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label className="checkbox-container">
          Terms Of Conditions
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </Form>
    </div>
  );
};

const FormikOnBoard = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || ''
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(8, 'Name must be a minimum of 8 characters')
      .required('Please add only Letters please'),
    email: Yup.string()
      .email('Email not Valid')
      .required('You forgetting something @'),
    password: Yup.string()
      .min(16, 'Password must be 16 characters or longer')
      .required('Password is required')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      // values is our object with all our data on it.
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(OnBoardingUser);
export default FormikOnBoard;
