import React, { useState } from "react";
import Navigation from "../components/Navigation";
//import { WithContext as ReactTags } from "react-tag-input";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTour } from "../redux/features/tourSlice";

const AddEditTour = () => {
  const [tourData, setTourData] = useState({
    title: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = {
    ...tourData,
    tags,
  };

  const handleChange = (e) => {
    setTourData({
      ...tourData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(createTour({ formData, toast, navigate }));
    setTourData({
      title: "",
      description: "",
    });
    setTags([]);
  };

  const handleClear = () => {
    setTourData({
      title: "",
      description: "",
    });
    setTags([]);
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

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row form-section">
          <div className="col-sm-8">
            <h2 className="text-center">Add Tour Detail</h2>
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
                      value={tourData.title}
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
                      value={tourData.description}
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
                        placeholder="type something..."
                        className="tags-input"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label">Add Image</label>
                  <div className="col-sm-10">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setTourData({ ...tourData, image: base64 })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-10">
                    <button
                      style={{ width: "100%" }}
                      className="btn btn-primary waves-effect waves-light"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-10">
                    <button
                      style={{ width: "100%" }}
                      className="btn btn-danger waves-effect waves-light"
                      onClick={handleClear}
                    >
                      Reset
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

export default AddEditTour;
