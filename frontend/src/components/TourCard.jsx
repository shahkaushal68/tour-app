import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ id, title, tags, description, author, image }) => {
  const expert = (str) => {
    if (str?.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card">
        <img
          className="card-img-top"
          src={`http://localhost:4000/${image?.filePath}`}
          alt="Card cap"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {expert(description)}
            &nbsp;
            <Link to={`/view/${id}`}>Read More</Link>
          </p>
          <p className="card-tags">
            Tags:- &nbsp;
            {tags.map((tag, index) => (
              <>
                <span key={index}>{tag}</span>,&nbsp;
              </>
            ))}
          </p>
          <p className="card-tags">
            Author:- &nbsp;
            <span>{author}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
