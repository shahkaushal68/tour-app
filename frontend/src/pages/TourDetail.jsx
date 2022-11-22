import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import PosterButtons from "../components/PosterButtons";
import SingleTourInfo from "../components/SingleTourInfo";
import { viewSingleTour } from "../redux/features/tourSlice";

const TourDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(viewSingleTour(id));
  }, [dispatch, id]);
  const tour = useSelector((state) => state.tour.singleTour);

  //console.log("tour", tourImagePath);
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="wrapper">
            <div className="content-wrapper">
              <div className="content">
                <div
                  className="poster"
                  style={{
                    backgroundImage: `url("${process.env.REACT_APP_BASE_URL}/${tour.image?.filePath}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="poster-title">
                    <h1> {tour.title} </h1>
                    <div className="line"></div>
                    <p>{tour.description}</p>
                  </div>
                  <PosterButtons />
                </div>
                <SingleTourInfo />
                <div className="words">{tour.description}</div>
                <div className="author">
                  <div className="image"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetail;
