import { useState, useEffect } from "react";
import imgUrl from "./assets/welc.png";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const [color, setColor] = useState("#C9E8E4");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const click = (color) => {
    setColor(color);
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: nickName,
        });
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <img src={imgUrl} alt="" />
      <h1>Sign up</h1>
      <form onSubmit={signUpUser} className="loginForm">
        <div className="">
          <input
            type="text"
            className="input"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Nick Name"
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div>
          <input
            type="mail"
            className="input"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
