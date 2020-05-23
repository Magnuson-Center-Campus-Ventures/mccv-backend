import User from '../models/user_model';

export const createUser = (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  user.student_profile_id = req.body.student_profile_id;
  user.startup_id = req.body.startup_id;
  user.save()
    .then((result) => {
      res.json({ message: 'User profile created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

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