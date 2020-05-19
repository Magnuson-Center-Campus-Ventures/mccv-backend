import StartupUser from '../models/startup_user_model';

export const createStartupUser = (req, res) => {
  const startup_user = new StartupUser();
  startup_user.user_id = req.body.user_id;
  startup_user.first_name = req.body.first_name;
  startup_user.last_name = req.body.last_name;
  startup_user.role = req.body.role;
  startup_user.startup_id = req.body.startup_id;
  startup_user.save()
    .then((result) => {
      res.json({ message: 'Startup user profile created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getStartupUsers = (req, res) => {
  StartupUser.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getStartupUser = (req, res) => {
  StartupUser.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteStartupUser = (req, res) => {
  StartupUser.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateStartupUser = (req, res) => {
  StartupUser.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
