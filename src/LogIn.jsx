import { useState, useEffect } from "react";
import imgUrl from "./assets/welc.png";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [color, setColor] = useState("#C9E8E4");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = (color) => {
    setColor(color);
  };
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);
  const navigate = useNavigate();
  const SignInUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("username", userCredential.user.email);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <img src={imgUrl} alt="" />
      <h1>login</h1>
      <form onSubmit={SignInUser} className="loginForm">
        <div>
          <input
            type="text"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="line"></div>
        <div>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="a">
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default Login;
