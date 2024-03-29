import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Logout = () => {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/employees/logout", {
      method: "GET",
      headers: {
        Accept: "appllication/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        } else {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1>Logout Page </h1>
    </>
  );
};

export default Logout;
