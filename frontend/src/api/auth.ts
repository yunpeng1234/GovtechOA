import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

const signIn = async (username: string, password: string) => {
  const resp = await API.post("/auth/login", {
    Username: username,
    Password: password,
  });
  if (resp.status == 200) {
    const token = resp.data.jwt;
    localStorage.setItem("token", token);
    const { setUser } = useContext(AuthContext);
    setUser(username);
    return { status: 200, message: "Success" };
  } else {
    return { status: 400, message: "Failed" };
  }
  console.log("working");
};
