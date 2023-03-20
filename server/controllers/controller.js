import UserModel from "../model/User.js";
import bcrypt from "bcrypt";

/** middleware for verify user */
export const verifyUser = async (req, res) => {
  res.json("verifyUser route");
};

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export const register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      const error =
        existingUser.username === username
          ? "Please use a unique username"
          : "Please use a unique email";
      return res.status(400).send({ error });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    await user.save();
    res.status(201).send({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export const login = async (req, res) => {
  res.json("login route");
};

/** GET: http://localhost:8080/api/user/example123 */
export const getUser = async (req, res) => {
  res.json("getUser route");
};

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export const updateUser = async (req, res) => {
  res.json("updateUser route");
};

/** GET: http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res) => {
  res.json("generateOTP route");
};

/** GET: http://localhost:8080/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  res.json("verifyOTP route");
};

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export const createResetSession = async (req, res) => {
  res.json("createResetSession route");
};

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export const resetPassword = async (req, res) => {
  res.json("resetPassword route");
};
