import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as yup from "yup";
import { UserContext } from "../contexts/UserContext";
import "./login.css";

export default function Register() {
  const { userData, setuserData } = useContext(UserContext);
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
  });

  // server error
  const [serverError, setServerError] = useState("");

  // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // managing state for errors...empty unless inline validation (validateInput) updates key/value pair to have error
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    terms: "",
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
    event.preventDefault(); // <form> onSubmit has default behavior from HTML

    // send out POST request with obj as second param, for us that is formState
    // trigger .catch by changing URL to 'https://regres.in/api/register'

    console.log("User data: ", userData);
    axios
      .post(
        "https://secret-recipes-bw.herokuapp.com/api/auth/register",
        userData
      )
      .then((response) => {
        // update temp state with value from API to display in <pre>
        setPost(response.data);

        // if successful request, clear any server errors
        setServerError(null);

        // clear state, could also use a predetermined initial state variable here
        setFormState({
          username: "",
          email: "",
          password: "",
          terms: false,
        });
      })
      .catch(() => {
        // this is where we could create a server error in the form...if API request fails...ex, for authentication the user doesn't exist in the database
        setServerError("Error Message");
      });
  };
  // onChange function(changeHandler)
  const inputChange = (event) => {
    // use persist with async code -> we pass the event into validateChange that has async promise logic with .validate

    event.persist(); // necessary because we're passing the event asynchronously and we need it to exist even after this function completes (which will complete before validate finishes)
    // event.target.name --> name of the input that fired the event
    // event.target.value --> current value of the input that fired the event
    // event.target.type --> type attribute of the input
    const newFormState = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    setuserData({
      username: formState.username,
      password: formState.password,
      email: formState.email,
    });
    validateChange(event); // for each change in input, do inline validation
    setFormState(newFormState); // update state with new data
  };

  // Add a schema, used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    username: yup.string().required("Name is required."),
    // must have string present, must be shape of an email
    email: yup.string().email(),
    password: yup
      .string()
      .required("Password is required.")
      .min(6, "Passwords must be at least 6 characters long."),
    // throws error if password is not at least 6 characters // value must be one of the values in the array otherwise throws error
    terms: yup.boolean().oneOf([true]),
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
        {serverError && <p className="error">{serverError}</p>}
        <label htmlFor="name">
          Username:
          <input
            id="name"
            type="text"
            name="username"
            value={formState.username}
            onChange={inputChange}
          />
        </label>
        {errors.username.length > 0 ? (
          <p className="error">{errors.username}</p>
        ) : null}
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
          />
        </label>
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
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
        <label htmlFor="terms" className="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
          />
          Terms & Conditions:
        </label>
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
        <button type="submit" onChange={formSubmit} disabled={buttonDisabled}>
          Submit
        </button>
        {/*Displays post request */}
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </form>
    </div>
  );
}
