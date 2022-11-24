import mongoose from "mongoose";
import Tour from "../models/tourModel.js";

export const addTour = async (req, res) => {
  //console.log("req-user", req);
  try {
    //if (!req.body.title) return res.status(500).json("Title is required");
    //console.log("req.file", req.file);
    var imageData;
    if (req.file) {
      imageData = {
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.type,
        fileSize: req.file.size,
      };
    } else {
      imageData: "";
    }

    const result = await new Tour({
      ...req.body,
      image: imageData,
      creator: req.user.id,
    }).save();
    res.status(200).json(result);
    //.log("req.body", { ...req.body, creator: req.user.id });
  } catch (error) {
    res.status(500).json(error);
    console.log("Add tour error", error);
  }
};

export const getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();
    res.status(200).json(allTours);
  } catch (error) {
    res.status(500).json(error);
    //console.log("Get All Tour error", error);
  }
};

export const getSingleTour = async (req, res) => {
  try {
    console.log("id", req.params);
    const singleTour = await Tour.findById(req.params.id);
    res.status(200).json(singleTour);
  } catch (error) {
    res.status(500).json(error);
    //console.log("Get Single Tour error", error);
  }
};

export const getToursByLoginUser = async (req, res) => {
  var ObjectId = mongoose.Types.ObjectId;
  //console.log("req", req.params.id);
  try {
    if (!ObjectId(req.params.id)) {
      res.status(500).json("You are not Valid User!");
    }
    const loginUserTours = await Tour.find({ creator: req.params.id });
    res.status(200).json(loginUserTours);
  } catch (error) {
    res.status(500).json(error);
    //console.log("Get Single Tour error", error);
  }
};

export const updateTour = async (req, res) => {
  try {
    var ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId(req.params.id)) {
      return res.status(500).json(`No tour exists with id ${req.params.id}`);
    }
    var imageData;
    if (req.file) {
      imageData = {
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.type,
        fileSize: req.file.size,
      };
    } else {
      imageData: "";
    }
    const updatedTourData = {
      ...req.body,
      _id: req.params.id,
      image: imageData,
      creator: req.user.id,
    };
    const result = await Tour.findByIdAndUpdate(
      req.params.id,
      updatedTourData,
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    console.log("updateTour Error", error);
    res.status(500).json(error);
  }
};

export const deleteTour = async (req, res) => {
  //const { id } = req.params;
  //console.log("id", req.params.id);
  try {
    var ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId(req.params.id)) {
      return res.status(500).json(`No tour exists with id ${req.params.id}`);
    }
    await Tour.findByIdAndRemove(req.params.id);
    res.status(200).json("Tour deleted Successfully");
  } catch (error) {
    //console.log("deleteTour Error", error);
    res.status(500).json(error);
  }
};

export const getToursBySearch = async (req, res) => {
  try {
    console.log("serachQuery", req.query);
    //const { searchQuery } = req.query;
    const title = new RegExp(searchQuery, i);
    const tours = await Tour.find({ title: title });
    res.status(200).json(tours);
  } catch (error) {
    //console.log("search Tour Error", error);
    res.status(500).json(error);
  }
};

export const getToursBasedOnTag = async (req, res) => {
  try {
    //console.log("req", req.params);
    //const {tag} = req.params
    const response = await Tour.find({ tags: req.params.tag });
    res.status(200).json(response);
  } catch (error) {
    console.log("Tag Tours Error", error);
    res.status(500).json(error);
  }
};
