import Tour from "../models/tourModel.js";

export const addTour = async (req, res) => {
  const { title, description, name, creator, tags, image, likeCount } =
    req.body;
  try {
    const result = await new Tour({
      title,
      description,
      name,
      creator,
      tags,
      image,
      likeCount,
    }).save();
    res.status(200).json(result);
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
