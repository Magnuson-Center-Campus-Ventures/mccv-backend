import Startup from '../models/startup_model';

export const createStartup = (req, res) => {
  const startup = new Startup();
  startup.user_ids = req.body.user_ids;
  startup.name = req.body.name;
  startup.industry = req.body.industry;
  startup.description = req.body.description;
  startup.posts = req.body.posts;
  startup.status = req.body.status;
  startup.location = req.body.location;
  startup.save()
    .then((result) => {
      res.json({ message: 'Startup profile created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getStartups = (req, res) => {
  Startup.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getStartup = (req, res) => {
  Startup.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteStartup = (req, res) => {
  Startup.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateStartup = (req, res) => {
  Startup.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
