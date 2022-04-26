import React from "react";
import { ErrorMessage, useField } from "formik";
import "./FieldInput.scss";

function FieldInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="inputField">
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        style={{
          border: `${meta.touched && meta.error ? "1px solid red" : "none"}`,
        }}
      />
      <ErrorMessage name={field.name}>
        {(msg) => <div className="err">{msg}</div>}
      </ErrorMessage>
    </div>
  );
}

export default FieldInput;
