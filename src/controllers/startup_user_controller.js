import StartupUser from '../models/startup_user_model';

// We are not using StartupUsers right now, but keeping in case want to implement in future
export const createStartupUser = (req, res) => {
  const startupUser = new StartupUser();
  startupUser.user_id = req.body.user_id;
  startupUser.first_name = req.body.first_name;
  startupUser.last_name = req.body.last_name;
  startupUser.role = req.body.role;
  startupUser.startup_id = req.body.startup_id;
  startupUser.save()
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
