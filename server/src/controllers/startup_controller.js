import Startup from '../models/startup_model';

export const createStartup = (req, res) => {
  const startup = new Startup();
  startup.user_id = req.body.user_id;
  startup.logo = req.body.logo;
  startup.name = req.body.name;
  startup.affiliation = req.body.affiliation; 
  startup.founder_gender = req.body.founder_gender;  
  startup.contact_email = req.body.contact_email;
  startup.industries = req.body.industries;
  startup.description = req.body.description;
  startup.video = req.body.video;
  startup.posts = req.body.posts;
  startup.status = req.body.status;
  startup.city = req.body.city;
  startup.state = req.body.state;
  startup.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getStartups = (req, res) => {
  Startup.find()
    .populate('posts')
    .populate('industries')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getStartup = (req, res) => {
  Startup.findById(req.params.id)
    .populate('posts')
    .populate('industries')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
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
  Startup.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('posts')
    .populate('industries')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getStartupByUserID = (req, res) => {
  Startup.findOne({ user_id: req.params.userID })
    .populate('posts')
    .populate('industries')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
