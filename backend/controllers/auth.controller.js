import { userSchema } from "../../shared/userInputSchema.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../service/jwtAuth.js";

const signup = async (req, res) => {
  try {
    //validate form using zod model
    const { email, password } = userSchema.parse(req.body);

    //check for already existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email: email, password: hashedPassword });

    //generate token
    const token = generateToken(newUser);

    res.cookie('token', token, {httpOnly: true, sameSite: 'None'});
    res.status(201).json({ email: email, message: "User Signed Up !" });

    console.log(User);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found. Please Sign up" });
    }
    if (!(await bcrypt.compare(password, existingUser.password))) {
      console.log(password);
      return res.status(400).json({ message: "Invalid Password" });
    }
    res.status(200).json({ email: email, message: "Login Successful !" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { signup, login };
