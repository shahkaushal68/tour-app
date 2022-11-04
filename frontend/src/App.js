import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addTour" element={<AddEditTour />} />
          <Route path="/editTour/:id" element={<AddEditTour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
