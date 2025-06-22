import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import User from "./pages/User";
import { AuthContext } from "./helpers/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/validation", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner"></div>;

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/login");
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navbar">
          {!authState.status ? (
            <div className="rightSideNavbar">
              <Link className="nabarRegistration" to="/registration">
                Registration
              </Link>
              <Link className="nabarLogin" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <>
              <div className="leftSideNavbar">
                <Link to="/createpost">Create Post</Link>
                <Link to="/">Home Page</Link>
              </div>
              <div className="rightSideNavbar">
                <Link to={`/user/${authState.id}`} className="navbarUsername">
                  @{authState.username}
                </Link>
                <button onClick={logout}>Logout</button>
              </div>
            </>
          )}
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/posts/:id" exact element={<Post />} />
          <Route
            path="/login"
            exact
            element={
              !authState.status ? <Login /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/registration"
            exact
            element={
              !authState.status ? <Registration /> : <Navigate to="/" replace />
            }
          />
          <Route path="/user/:id" exact element={<User />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
