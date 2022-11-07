import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import TourCard from "../components/TourCard";
import { viewAllTours } from "../redux/features/tourSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, tours } = useSelector((state) => state.tour);

  //.log("allTours", tours);

  useEffect(() => {
    dispatch(viewAllTours());
  }, [dispatch]);
  //console.log("tours", tours.length);
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

      <div className="tour-listing-section">
        <div className="tour-title">
          <h5>Here Lists of All Tours</h5>
        </div>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="container grid-container">
            <div className="row">
              {tours.length > 0 ? (
                tours.map((tour, index) => {
                  //console.log("tour", tour);
                  const { _id, title, tags, description, userName, image } =
                    tour;
                  return (
                    <TourCard
                      key={index}
                      id={_id}
                      title={title}
                      tags={tags}
                      description={description}
                      author={userName}
                      image={image}
                    />
                  );
                })
              ) : (
                <h3>No Tours Found</h3>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
