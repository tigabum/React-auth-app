import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from 'axios'
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
    const [token, setToken] = useToken()
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {
      const response = await axios.post('/api/signup', {
          email: emailValue,
          password: passwordValue
      })
console.log("response from front end", response?.data?.token)
      const {token} = response?.data
      setToken(token)
      history.push('/')
    // alert("SignUp button Clicked");
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        type="text"
        placeholder="someone@gmail.com"
      />
      <input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type="password"
        placeholder="password"
      />
      <input
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        type="password"
        placeholder="confirm password"
      />
      <hr/>

      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>

      <button onClick={() => history.push("/login")}>
        Aleardy have an account? Log In
      </button>
    </div>
  );
};
