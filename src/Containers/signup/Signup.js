import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import "../login/Login.scss";
import { signupStart } from "../../Actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.userData);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [cPassword, setCPassword] = useState("");

  useEffect(() => {
    if (user.username) {
      navigate("/allTodos");
      toast.info("Already signed in");
    }
  }, [user]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== cPassword) {
      toast.error("Passwords do not match");
      setCPassword("");
      setFormData({
        username: formData.username,
        password: "",
      });
      return;
    }
    if (formData.password.length < 8) {
      toast.info("Password must be 8 characters or more");
      return;
    }

    //hashing password to store in db
    let hash = bcrypt.hashSync(formData.password, 8);

    const userData = {
      username: formData.username,
      passwordHash: hash,
      isAdmin: false,
    };

    dispatch(signupStart(userData));

    if (!error) {
      toast.success("Signed up successfully");
      navigate("/allTodos");
    }

    //clearing inputs after submission
    setFormData({
      username: "",
      password: "",
    });
    setCPassword("");
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="componentWrapper">
      <form onSubmit={handleSignup} className="componentForm">
        <div className="boxHeading">User Sign Up</div>
        <input
          type="text"
          name="username"
          required
          placeholder="Enter username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="c_password"
          required
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <button type="submit">{loading ? "..." : "Sign up"}</button>
      </form>
    </div>
  );
}

export default Signup;
