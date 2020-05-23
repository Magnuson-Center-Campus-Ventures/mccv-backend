import WorkExperience from '../models/work_experience_model';

export const createWorkExperience = (req, res) => {
  const workExperience = new WorkExperience();
  workExperience.email = req.body.email;
  workExperience.password = req.body.password;
  workExperience.role = req.body.role;
  workExperience.student_profile_id = req.body.student_profile_id;
  workExperience.startup_id = req.body.startup_id;
  workExperience.save()
    .then((result) => {
      res.json({ message: 'WorkExperience profile created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getWorkExperiences = (req, res) => {
  WorkExperience.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getWorkExperience = (req, res) => {
  WorkExperience.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteWorkExperience = (req, res) => {
  WorkExperience.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateWorkExperience = (req, res) => {
  WorkExperience.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
