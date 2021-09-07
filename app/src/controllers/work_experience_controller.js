import WorkExperience from '../models/work_experience_model';

export const createWorkExperience = (req, res) => {
  const workExperience = new WorkExperience();
  workExperience.employer = req.body.employer;
  workExperience.role = req.body.role;
  workExperience.city = req.body.city;
  workExperience.state = req.body.state;
  workExperience.start_date = req.body.start_date;
  workExperience.end_date = req.body.end_date;
  workExperience.currently_working = req.body.currently_working;
  workExperience.description = req.body.description;
  workExperience.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Get work experiences with specific ids (will be an array of ids from the student object)
export const getWorkExperiences = (req, res) => {
  WorkExperience.find().where('_id').in(req.params.idArray.split(',')).then((result) => {
    res.json(result);
  })
    .catch((error) => {
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
