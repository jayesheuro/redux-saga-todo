import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addTodoStart, editTodoStart } from "../../Actions/actions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FieldInput from "../../Components/fieldInput/FieldInput";
import "./AddEditTodo.scss";
import { toast } from "react-toastify";

function AddEditTodo() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const todoObj = {
    title: "",
    description: "",
    time: "",
    isDone: false,
  };
  const [todo, setTodo] = useState(todoObj);
  console.log("todo from add edit ", todo);
  const [err, setErr] = useState("");
  const { id } = params;

  const { todos } = useSelector((state) => state.todoData);
  const { user } = useSelector((state) => state.userData);

  //check if user is logged in otherwise redirect to login
  useEffect(() => {
    if (!user.username) {
      toast.info("Please login first");
      navigate("/login");
    }
  }, [user]);

  //populating input fields if "id" param exists for edit mode
  useEffect(() => {
    if (isEmpty(id)) {
      setTodo({ ...todoObj });
    } else {
      todos[id] && setTodo({ ...todos[id] });
    }
  }, [id, todos]);

  const validate = Yup.object({
    title: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    description: Yup.string().max(30, "Must be 30 characters or less"),
    time: Yup.string().required("Date and time are required"),
  });

  // const handleChange = (e) => {
  //   setTodo({ ...todo, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (todo) => {
    // e.preventDefault();
    // setTodo(todo);
    if (isEmpty(id)) {
      dispatch(addTodoStart(todo));
      setErr("");
      toast.success("Saved");
      navigate("/allTodos");
    } else {
      dispatch(editTodoStart({ todo, id }));
      setErr("");
      toast.success("Saved");
      navigate("/allTodos");
    }
  };
  const getCurrentDateTimeLocal = () => {
    let cur_time = new Date().toTimeString().slice(0, 5);
    let cur_date_time = new Date().toISOString().slice(0, 11) + cur_time;
    return cur_date_time;
  };
  return (
    <div className="editTodoWrapper">
      {err && <div style={{ color: "red" }}>{err}</div>}
      <Formik
        initialValues={(id && todos[id]) || todoObj}
        validationSchema={validate}
        onSubmit={(formValues) => handleSubmit(formValues)}
      >
        {(formik) => (
          <div>
            <Form>
              <FieldInput label="Title" name="title" type="text" />
              <FieldInput label="Description" name="description" type="text" />
              <FieldInput
                label="Time"
                name="time"
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
              />
              <button type="submit">Save</button>
              <button type="reset">Reset</button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AddEditTodo;
