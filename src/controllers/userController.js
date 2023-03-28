import userModel from '../model/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { isValidName, isValidPhone, isValidEmail, isValidPassword } from '../validation/validation.js'


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) return res.status(400).json({ message: 'email is not valid' });

    const user = await userModel.findOne({ email: email });
    if (user) {

      const matchPass = await bcrypt.compare(password, user.password)
      if (!matchPass) return res.status(400).json({ message: 'password is incorrect' });

      const payload = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })

      res
        .status(200)
        .cookie('token', token, { expires: new Date(Date.now() + 86400000) })       // expires in 1 day 
        .json({ "user": user, "token": token })

    } else {
      res.status(400).json({ message: "user not found" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const userSignUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) return res.status(400).json({ message: 'please enter all fields' });

    if (!isValidName(name)) return res.status(400).json({ message: 'name is not valid' });

    if (!isValidEmail(email)) return res.status(400).json({ message: 'email is not valid' });

    if (!isValidPhone(phone)) return res.status(400).json({ message: 'phone no. is not valid \n please add 10 digits only' });

    if (!isValidPassword(password)) return res.status(400).json({ message: 'password must be at between 8-15 character with (1 capital & 1 small letter, 1 special character)' });

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);
    req.body.password = hashedPass;

    const user = await userModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const userProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const checkUser = jwt.verify(token, process.env.JWT_SECRET);
      const { _id, name, email, phone } = await userModel.findById(checkUser.id);
      res.status(200).json({ name, email, phone, _id });
    }
  } catch (error) {
    res.status(500).json(null);
  }
}

export const userLogout = async (req, res) => {
  try {
    res.status(200).cookie('token', '').json(true);
  } catch (error) {
    res.status(500).json(null);
  }
}

