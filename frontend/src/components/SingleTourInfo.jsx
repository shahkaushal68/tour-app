import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const SingleTourInfo = () => {
  const tour = useSelector((state) => state.tour.singleTour);
  return (
    <div className="info">
      <div className="block published">
        <div className="mini-title">Published</div>
        {moment(tour.createdAt).fromNow()}
      </div>
      <div className="block published">
        <div className="mini-title">Published By</div>
        {tour.userName}
      </div>
      <div className="block published">
        <div className="mini-title">Likes</div>
        156
      </div>
      <div className="block published">
        <div className="mini-title">tags</div>
        {tour?.tags?.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default SingleTourInfo;
