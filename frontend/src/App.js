import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import TourDetail from "./pages/TourDetail";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import UpdateTour from "./pages/UpdateTour";
import PageNotFound from "./pages/PageNotFound";
import TagTours from "./pages/TagTours";

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
          <Route path="/tour/sreach" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/addTour" element={<AddEditTour />} />
            <Route path="/editTour/:id" element={<UpdateTour />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/view/:id" element={<TourDetail />} />
          <Route path="/tour/tag/:tag" element={<TagTours />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
