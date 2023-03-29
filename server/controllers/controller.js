import UserModel from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** middleware for verify user */
export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method === "GET" ? req.query : req.body; // extract the username from either query or body depending on the HTTP method

    const user = await UserModel.findOne({ username }); // look up user by username
    if (!user) return res.status(404).send({ error: "Can't find User!" }); // handle case where user is not found

    next(); // proceed to the next middleware function or route handler
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" }); // handle any other errors
  }
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
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username }); // look up user by username
    if (!user) return res.status(404).send({ error: "User not Found" }); // handle case where user is not found

    const passwordMatch = await bcrypt.compare(password, user.password); // compare hashed password with password received in request
    if (!passwordMatch)
      return res.status(400).send({ error: "Password does not match" }); // handle case where password does not match

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    ); // create JWT token
    return res
      .status(200)
      .send({ msg: "Login Successful!", username: user.username, token }); // return success response with token
  } catch (error) {
    return res.status(500).send({ error }); // handle any other errors
  }
};

/** GET: http://localhost:8080/api/user/example123 */
export const getUser = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send({ error: "Invalid username" });
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { password, ...userData } = user.toJSON();

    return res.status(200).send(userData);
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
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
  const userId = req.query.id;
  if (!userId) return res.status(401).json({ error: "User Not Found...!" });

  const body = req.body;
  UserModel.updateOne({ _id: userId }, body)
    .then(() => res.status(201).json({ msg: "Record Updated...!" }))
    .catch((error) => res.status(401).json({ error }));
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
