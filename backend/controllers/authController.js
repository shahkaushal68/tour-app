import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { userName, email, password, googleId } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(500).json("email already register");
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await new User({
      userName,
      email,
      password: hashPassword,
      googleId,
    }).save();
    //const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    //expiresIn: "1d",
    //});
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
    //console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(500).json("User is not register");
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isCorrectPassword) return res.status(500).json("Wrong Credentials!");
    if (existingUser && isCorrectPassword) {
      const { _id, email, userName } = existingUser;
      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ _id, userName, email, token });
    }
  } catch (error) {
    //console.log(error);
  }
};
