import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="py-5 text-center text-white bg-primary">
        <div className="container py-5">
          <div className="row py-5">
            <div className="mx-auto col-lg-10">
              <h1 className="display-4 mb-4 ">
                This is a beautiful Bootstrap 4 Navbar with Social Media Icons
              </h1>
              <p className="lead mb-5">
                There is nothing more rare, nor more beautiful, than a woman
                being unapologetically herself; comfortable in her perfect
                imperfection. To me, that is the true essence of beauty.
              </p>
              <Link to="#" className="btn btn-lg btn-outline-light mx-1">
                Take me there
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
