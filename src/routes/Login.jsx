import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';
import LayoutWrapper from '../components/LayoutWrapper';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  const loggedInUserRef = useRef(null); // initialize ref to null, no user yet

  // used to redirect to home page after login
  const navigate = useNavigate();

  // function to set UserRef and user state
  const successfulLogin = (response) => {
    loggedInUserRef.current = response.data;
    setUser(loggedInUserRef.current);
  };

  // async function to login, called when login button is clicked
  function sendRequest(email, password, user, setUser) {
    let loginData = {
      email: email,
      password: password,
    };

    const postRequest = new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:3000/login`, loginData, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          setUser({ name: res.data.name });
          // if server returns 200 (success)
          if (res.status === 200) {
            successfulLogin(res);
            setStatusCode(res.status);
            navigate('/');
          }
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
          setStatusCode(err.response.status);
          reject(err);
        });
    });
  }

  // if status code == 401 -> go sad route
  return (
    <LayoutWrapper>
      {statusCode === 401 && <h1>Invalid Credentials</h1>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </form>
      <div></div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        autoComplete="off"
      >
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={() => {
            sendRequest(email, password, user, setUser);
          }}
        >
          Login
        </button>
      </form>
    </LayoutWrapper>
  );
}

export default Login;
