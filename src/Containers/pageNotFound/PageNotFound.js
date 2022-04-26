import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Oops, no such page exists</h1>
      <Link to="/">Go to home</Link>
    </div>
  );
};

export default PageNotFound;
