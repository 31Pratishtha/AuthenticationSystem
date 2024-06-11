import { userSchema } from "../../shared/userInputSchema.js";

const user = []; //Temporary Database

const signup = (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    if (user.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    user.push({ email: email, password: password });
    res.status(201).json({email: email, message: "User Signed Up !" });

    console.log(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = (req, res) => {
  try {
    const {email, password} = userSchema.parse(req.body);
    if(!user.find((user) => user.email === email)){
      return res.status(400).json({message: "User not found. Please Sign up"});
    }
    if(!user.find((user) => user.password === password)){
      console.log(password);
      return res.status(400).json({message: "Invalid Password"});
    }
    res.status(200).json({email: email, message: "Login Successful !"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { signup, login };
