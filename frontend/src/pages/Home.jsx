import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navigation from "../components/Navigation";
import PageHeading from "../components/PageHeading";
import Spinner from "../components/Spinner";
import TourCard from "../components/TourCard";
import { searchTours, viewAllTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, tours } = useSelector((state) => state.tour);
  const [searchTour, setSearchTour] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTour) {
      dispatch(searchTours(searchTour));
      navigate(`/tour/search?searchQuery=${searchTour}`);
      setSearchTour("");
    }
    //alert(searchTour);
  };

  //.log("allTours", tours);

  useEffect(() => {
    dispatch(viewAllTours());
  }, [dispatch]);
  //console.log("tours", tours.length);
  return (
    <>
      <Navigation />
      <PageHeading heading="List of All Tours" />

      <div className="tour-listing-section">
        {loading ? (
          <Spinner />
        ) : (
          <div className="container grid-container">
            <div className="row">
              <div className="search-section col-md-12">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Tour..."
                    value={searchTour}
                    onChange={(e) => setSearchTour(e.target.value)}
                  />
                  <span
                    onClick={handleSearch}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    Search
                  </span>
                </div>
              </div>

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
