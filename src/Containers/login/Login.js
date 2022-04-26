import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";
import { loginStart } from "../../Actions/userActions";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.userData);

  useEffect(() => {
    user.username &&
      toast.success("Logged in successfully") &&
      navigate("/allTodos");
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart(formData));
    setFormData({
      username: "",
      password: "",
    });
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="componentWrapper">
      <form onSubmit={handleLogin} className="componentForm">
        <div className="boxHeading">User Login</div>
        <input
          type="text"
          name="username"
          required
          placeholder="Enter username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          required
          type="password"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">{loading ? "..." : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;
