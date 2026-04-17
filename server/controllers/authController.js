import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
// import transporter from "../lib/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email:email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "14d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    });

      // sending welcome mail to user

      // const mailOptions = {
      //     from: process.env.SENDER_EMAIL,
      //     to: email,
      //     subject: 'Welcome to Apex AI!',
      //       text: `Hello ${username},\n\nThank you for registering with our service! We're excited to have you on board.\n\nBest regards,\nThe Team`
      // }

      // await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "14d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const isVerified = (req, res) => {
  try {
   return res.status(200).json({ success: true, message: "User is authenticated" });
  } catch (error){
    return res.status(400).json({ success: false, message: error.message });
 }
}