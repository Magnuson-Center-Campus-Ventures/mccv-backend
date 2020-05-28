import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';

dotenv.config({ silent: true });

// signin, signup based on lab5
export const signin = (req, res) => {
  res.send({ token: tokenForUser(req.user), id: req.user.id });
};

export const signup = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) {
    res.status(422).send('You must provide email and password');
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) { // if the user exists, then return error
        res.status(422).send('User with this email already exists');
      } else { // if user doesn't exist, then create user
        const user = new User();
        user._id = req.body._id;
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;
        user.student_profile_id = req.body.student_profile_id;
        user.startup_id = req.body.startup_id;
        user.save().then((result) => {
          res.send({ token: tokenForUser(result), id: user._id });
          // res.send({ token: tokenForUser(result) });
        }).catch((error) => {
          res.status(500).json({ error });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const getUsers = (req, res) => {
  User.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getUser = (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
