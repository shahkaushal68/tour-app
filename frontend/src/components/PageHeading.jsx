import React from "react";

const PageHeading = ({ heading }) => {
  return (
    <div className="py-5 text-center text-white bg-primary">
      <div className="container py-5">
        <div className="row py-5">
          <div className="mx-auto col-lg-10">
            <h1 className="display-4 mb-4 ">{heading}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
