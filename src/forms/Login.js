import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import "./login.css";
import { UserContext } from "../contexts/UserContext";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

export default function Form() {
  const { userData, setUserData } = useContext(UserContext);
  const { push } = useHistory();
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  // server error
  const [serverError, setServerError] = useState("");

  // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // managing state for errors...empty unless inline validation (validateInput) updates key/value pair to have error
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  // temporary state used to display response from API...this is not a commonly used convention
  const [post, setPost] = useState([]);

  // inline validation, validating one key/value pair at a time
  const validateChange = (event) => {
    yup
      // get the rules out of schema with reach at key 'event.target.name'-->'formSchema[event.target.name]
      .reach(formSchema, event.target.name)
      .validate(
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      )
      .then(() => {
        // the input is passing
        // the reset of that input's error
        setErrors({ ...errors, [event.target.name]: "" });
      })
      .catch((err) => {
        // the input is breaking form schema
        // if failing validation, set error message into error state (this is used in JSX to display error)

        console.log("err", err);
        setErrors({ ...errors, [event.target.name]: err.errors[0] });
      });
  };
  // onSubmit function
  const formSubmit = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post("/auth/login", formState)
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        setUserData({
          ...userData,
          username: formState.username,
          password: formState.password,
        });
        setPost(response.data);
        setServerError(null);
        setFormState({
          username: "",
          password: "",
        });
        push("/recipes");
      })
      .catch((err) => {
        const requestErrorText = err.response.data.error;
        setServerError(requestErrorText);
        console.log(serverError)
      });
  };
  // onChange function(changeHandler)
  const inputChange = (event) => {
    // use persist with async code -> we pass the event into validateChange that has async promise logic with .validate

    event.persist();
    validateChange(event); // for each change in input, do inline validation
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  // Add a schema, used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    // must have string present, must be shape of an username
    username: yup.string(),
    password: yup
      .string()
      .required("Password is required.")
      .min(6, "Passwords must be at least 6 characters long."),
    // throws error if password is not at least 6 characters // value must be one of the values in the array otherwise throws error
  });

  // whenever state updates, validate the entire form, if valid, then change button to be enabled
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      // valid is a boolean
      // !true === false
      // !false === true
      // if the form is valid, and we take the opposite --> we do not want disable the button
      setButtonDisabled(!valid);
    });
  }, [formState, formSchema]);

  return (
    <div className="formContainer">
      <form onSubmit={formSubmit}>
        <label htmlFor="username">
          Username:
          <input
            id="username"
            type="text"
            name="username"
            value={formState.username}
            onChange={inputChange}
          />
        </label>
        {errors.username.length > 0 ? (
          <p className="error">{errors.username}</p>
        ) : null}
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="text"
            name="password"
            value={formState.password}
            onChange={inputChange}
          />
        </label>
        {errors.password.length > 0 && (
          <p className="error">{errors.password}</p>
        )}
        <Link to="/register">New User? Register now!</Link>
        <button type="submit" disabled={buttonDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}
