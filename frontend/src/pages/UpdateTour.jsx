import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateTour } from "../redux/features/tourSlice";

const UpdateTour = () => {
  const [tourData, setTourData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const { userTours } = useSelector((state) => state.tour);
  const [singleTour, setSingleTour] = useState({});

  useEffect(() => {
    if (id) {
      const singleTourData = userTours.find((item) => item._id === id);
      setSingleTour(singleTourData);
      setTourData({ ...singleTourData });
    }
  }, [id, userTours]);
  //console.log("singleTour", singleTour);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  //console.log("error", userName);
  const formData = new FormData();
  formData.append("title", tourData.title);
  formData.append("description", tourData.description);
  formData.append("image", tourData.image);
  formData.append("tags", tags);
  formData.append("userName", user?.userName);

  //console.log("tourdata", tourData);
  //const formData = {
  // ...tourData,
  // tags,
  // userName: user?.userName,
  //};

  //useEffect(() => {
  //error && toast.error(message);
  //}, [error, message]);

  const handleChange = (e) => {
    setTourData({
      ...tourData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (!e.target.value.trim()) return;
    if (e.key === "Enter") e.preventDefault();
    setTags([...tags, e.target.value]);
    e.target.value = "";
  };
  const removeTag = (index) => {
    //console.log("index", index);
    setTags(tags.filter((el, i) => i !== index));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    //console.log("tourdata", tourData);
    dispatch(updateTour({ id, formData, navigate, toast }));
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row form-section">
          <div className="col-sm-8">
            <h2 className="text-center">Update Tour Detail</h2>
            <form className="form-horizontal">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Title</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter title..."
                      name="title"
                      value={tourData?.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Description</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      placeholder="Enter Description"
                      name="description"
                      value={tourData?.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Tags</label>
                  <div className="col-sm-10">
                    <div className="tags-input-container">
                      {tags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                          <span className="text">{tag}</span>
                          <span
                            className="close"
                            onClick={() => removeTag(index)}
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder={`${
                          singleTour ? singleTour.tags : "type something..."
                        }`}
                        className="tags-input"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label">Add Image</label>
                  <div className="col-sm-5">
                    <input
                      type="file"
                      onChange={(e) =>
                        setTourData({ ...tourData, image: e.target.files[0] })
                      }
                    />
                  </div>
                  <div className="col-sm-5">
                    <div className="imageDisplay">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${singleTour.image?.filePath}`}
                        alt="No dispaly"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-10">
                    <button
                      style={{ width: "100%" }}
                      className="btn btn-primary waves-effect waves-light"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTour;
