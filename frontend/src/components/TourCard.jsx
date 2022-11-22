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
    <div className="col-12 col-md-6 col-lg-4 card-block">
      <div className="card">
        {image ? (
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_BASE_URL}/${image?.filePath}`}
            alt="Card cap"
          />
        ) : (
          <img
            className="card-img-top"
            src="/images/no-image.jpg"
            alt="No-available"
          />
        )}
        <p className="card-tags">
          Tags:- &nbsp;
          {tags.map((tag, index) => (
            <>
              <span key={index}>{tag}</span>,&nbsp;
            </>
          ))}
        </p>
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
