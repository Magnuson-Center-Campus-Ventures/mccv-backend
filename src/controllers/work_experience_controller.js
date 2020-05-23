import WorkExperience from '../models/work_experience_model';

export const createWorkExperience = (req, res) => {
  const workExperience = new WorkExperience();
  workExperience.employer = req.body.employer;
  workExperience.role = req.body.role;
  workExperience.location = req.body.location;
  workExperience.start_date = req.body.start_date;
  workExperience.end_date = req.body.end_date;
  workExperience.currently_working = req.body.currently_working;
  workExperience.decription = req.body.description;
  workExperience.save()
    .then((result) => {
      res.json({ message: 'WorkExperience profile created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// No get all work experiences function because we'll only ever want to get ones for a specific student,
// rather than all at the same time

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
