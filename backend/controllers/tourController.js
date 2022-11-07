import Tour from "../models/tourModel.js";

export const addTour = async (req, res) => {
  //console.log("req-user", req);
  const imageData = {
    fileName: req.file.filename,
    filePath: req.file.path,
    fileType: req.file.type,
    fileSize: req.file.size,
  };
  try {
    //if (!req.body.title) return res.status(500).json("Title is required");
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
    console.log("Get All Tour error", error);
  }
};
