import "./App.scss";
import { Route, Routes } from "react-router-dom";
import AllTodos from "./Containers/allTodos/AllTodos";
import AddEditTodo from "./Containers/addEditTodo/AddEditTodo";
import PageNotFound from "./Containers/pageNotFound/PageNotFound";
import Navbar from "./Components/navbar/Navbar";
import Login from "./Containers/login/Login";
import Signup from "./Containers/signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/allTodos" element={<AllTodos />}></Route>
        <Route path="/add" element={<AddEditTodo />}></Route>
        <Route path="/edit/:id" element={<AddEditTodo />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
