import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGithub } from "react-icons/fa";

import AddTodo from "./components/add-todo";
import Login from "./components/login";
import Signup from "./components/signup";
import TodosList from "./components/todos-list";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";

import TodoDataService from "./services/todos";

export default function App() {
  // const user = null;

  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState(null);

  async function login(user = null) {
    TodoDataService.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch((e) => {
        console.log("login", e);
        setError(e.toString());
      });
  }

  async function logout() {
    setToken("");
    setUser("");
    localStorage.serItem("token", "");
    localStorage.serItem("user", "");
  }

  async function signup(user = null) {
    TodoDataService.signup(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
      })
      .catch((e) => {
        console.log(e);
        setError(e.toString());
      });
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>
                Todos
              </Link>

              {user ? (
                <Link className="nav-link" onClick={logout}>
                  Logout ({user})
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                  <Link className="nav-link" to={"/signup"}>
                    Signup
                  </Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>

      <div className="container mt-4">
        <Switch>
          <Route
            exact
            path={["/", "/todos"]}
            render={(props) => <TodosList {...props} token={token} />}
          ></Route>

          <Route
            path="/todos/create"
            render={(props) => <AddTodo {...props} token={token} />}
          ></Route>

          <Route
            path="/todos/:id"
            render={(props) => <AddTodo {...props} token={token} />}
          ></Route>

          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          ></Route>

          <Route
            path="/signup"
            render={(props) => <Signup {...props} signup={signup} />}
          ></Route>
        </Switch>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
          {/* Copyright symbol */}
          <span className="text-center text-lg-start bg-light text-muted mt-4 mx-1">
            &copy; {new Date().getFullYear()} TodosApp
          </span>
          <a
            href="www.github.com/The-CodeINN"
            className="text-center text-lg-start bg-light text-muted mt-4 "
          >
            <FaGithub className="text-center text-lg-start bg-light text-muted " />
          </a>
        </div>
      </footer>
    </div>
  );
}