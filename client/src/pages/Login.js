import React, { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Adjust path if needed

const Login = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <p>Error: AuthContext is undefined!</p>; // Prevent undefined errors
  }

  return (
    <button onClick={() => auth.login("dummyToken")}>
      Login
    </button>
  );
};

export default Login;