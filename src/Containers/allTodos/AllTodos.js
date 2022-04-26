import React from "react";
import {
  getTodosStart,
  deleteTodoStart,
  editTodoStart,
} from "../../Actions/actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaClock } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import "./AllTodos.scss";
import { toast } from "react-toastify";
import { CircleSpinner } from "react-spinners-kit";

function AllTodos() {
  const { todos, loading: loadingTodos } = useSelector(
    (state) => state.todoData
  );
  const { user, loading: loadingUser } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getTodosStart());
  }, [dispatch]);

  const handleTodoDelete = (id) => {
    dispatch(deleteTodoStart(id));
    toast.success("Deleted");
    dispatch(getTodosStart());
  };

  const handleTodoDone = (id) => {
    let updatedTodo = { ...todos[id], isDone: true };
    dispatch(editTodoStart({ id, todo: updatedTodo }));
    toast.success("Marked as done");
    dispatch(getTodosStart());
  };
  if (loadingTodos || loadingUser) {
    return (
      <div className="loaderDiv">
        <CircleSpinner size={70} />
      </div>
    );
  }

  return (
    <div className="homeWrapper">
      <div className="todoWrapper">
        {" "}
        {Object.keys(todos).map((id) => (
          <div className="todos" key={id}>
            <h2>{todos[id].title}</h2>
            <p>{todos[id].description}</p>
            {user.isAdmin && (
              <Link className="editTodo" to={`/edit/${id}`}>
                <FiEdit />
              </Link>
            )}

            <span>
              {todos[id].isDone === true ? (
                <>
                  <TiTick style={{ transform: "scale(1.5)" }} /> Completed
                </>
              ) : (
                <>
                  <FaClock /> Pending... Due:&nbsp;
                  {todos[id].time.split("T").join(", ")}
                </>
              )}
            </span>
            {user.isAdmin && (
              <div className="todoButtons">
                <button
                  style={{ display: `${todos[id].isDone && "none"}` }}
                  onClick={() => handleTodoDone(id)}
                >
                  Mark as Done
                </button>
                <button onClick={() => handleTodoDelete(id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTodos;
