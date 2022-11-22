import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { deleteTour, getUserTours } from "../redux/features/tourSlice";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { auth, tour } = useSelector((state) => state);
  const userId = auth.user?._id;
  //console.log("auth", userId);
  useEffect(() => {
    if (userId) {
      //console.log("userID", userId);
      dispatch(getUserTours(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    tour.error && toast.error(tour.message);
  }, [tour.error, tour.message]);

  const handleDelete = (id) => {
    if (window.confirm("Are sure for delete this tour?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  if (auth.isLoading) return <Spinner />;

  return (
    <>
      <Navigation />
      <div className="container">
        {tour.userTours.length > 0 ? (
          <div className="table-responsive">
            <table
              className="table table-bordered   table-striped"
              style={{ marginTop: "100px" }}
            >
              <thead className="table__head">
                <tr className="winner__table">
                  <th>S/N</th>
                  <th>Tour Name</th>
                  <th>Tags</th>
                  <th>Created At</th>
                  <th>Image</th>
                  <th>Posted By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tour.userTours.map((tour, index) => (
                  <tr className="winner__table" key={index}>
                    <td>{index + 1}</td>
                    <td>{tour.title}</td>
                    <td>
                      {tour.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </td>
                    <td>26 Sept,2020</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${tour.image?.filePath}`}
                        className="coin"
                        alt="coin"
                      />
                    </td>
                    <td>{tour.userName}</td>
                    <td className="action-icons">
                      <span>
                        <Link to={`/view/${tour._id}`}>
                          <GrView />
                        </Link>
                      </span>
                      &nbsp;
                      <span>
                        <Link to={`/editTour/${tour._id}`}>
                          <FaEdit />
                        </Link>
                      </span>
                      &nbsp;
                      <span onClick={() => handleDelete(tour._id)}>
                        <MdDelete />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <h3>
              No Tour Added by this User! Please Add Tour first &nbsp;
              <Link to="/addTour">Add Tour</Link>
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
