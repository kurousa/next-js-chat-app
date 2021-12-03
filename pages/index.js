import React, { useContext }  from "react"
import { Context } from '../context';
import { useRouter } from "next/router";
import axios from "axios";

const Auth = () => {
  const {
    username,
    secret,
    setUsername,
    setSecret
  } = useContext(Context);

  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();

    if (username.length === 0 || secret.length === 0) return;
    console.log(process.env.CHATENGINE_PRIVATE_KEY)
    axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username, 
        secret: secret
      },
      {
        headers: {
          "Private-Key": process.env.CHATENGINE_PRIVATE_KEY
        }
      }
    )
    .then(res => router.push('/chats'))
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">NextJs Chat</div>

          <div className="input-container">
            <input 
              placeholder="Email" 
              className="text-input" 
              onChange={e => setUsername(e.target.value)}></input>
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password" 
              className="text-input" 
              onChange={e => setSecret(e.target.value)}></input>
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  )
};

export default Auth;