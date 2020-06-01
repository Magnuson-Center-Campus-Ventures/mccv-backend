import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';
import Student from '../models/student_model';
import Startup from '../models/startup_model';

dotenv.config({ silent: true });

// signin, signup based on lab5
export const signin = (req, res) => {
  console.log('from back ', req.user.role)
  res.send({ token: tokenForUser(req.user), id: req.user.id, role: req.user.role });
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
      } else {
        // if user doesn't exist, then create user
        const user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;
        user.student_profile_id = req.body.student_profile_id;
        user.startup_id = req.body.startup_id;

        // depending on role, create appropriate profiles
        if (user.role === 'student') { // if user role is student, save user
          const student = new Student();
          user.save().then((result) => {
            res.send({ token: tokenForUser(result), id: user._id, role: user.role });
          }).then((result2) => { // if saved user, save a student with user_id prefilled
            student.user_id = user._id;
            student.save().then((result3) => {
              // if saved student, update previously created user with student_profile_od
              user.student_profile_id = student._id;
              User.findByIdAndUpdate(user._id, user, { new: true }).then((result4) => {
                console.log('updated user with role student');
              }).catch((error) => { // error updating user
                res.status(500).json({ error });
              });
            }).catch((error) => { // error saving student
              res.status(500).json({ error });
            });
          }).catch((error) => { // error saving user
            res.status(500).json({ error });
          });
        } else if (user.role === 'startup') { // if user role is startup, save user
          const startup = new Startup();
          user.save().then((result) => {
            res.send({ token: tokenForUser(result), id: user._id, role: user.role });
          }).then((result2) => { // if saved user, save a startup with user_id and status prefilled
            startup.user_id = user._id;
            startup.status = 'pending';
            startup.save().then((result3) => {
              // if saved startup, update previously created user with startup_id
              user.startup_id = startup._id;
              User.findByIdAndUpdate(user._id, user, { new: true }).then((result4) => {
                console.log('updated user with role startup');
              }).catch((error) => { // error updating user
                res.status(500).json({ error });
              });
            }).catch((error) => { // error saving student
              res.status(500).json({ error });
            });
          }).catch((error) => { // error saving user
            res.status(500).json({ error });
          });
        }
      }
    }).catch((error) => {
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

export const getUserByID = (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const getUserByStudentID = (req, res) => {
  User.findOne({ student_profile_id: req.params.studentID }).then((result) => {
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
