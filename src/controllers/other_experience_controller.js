import OtherExperience from '../models/other_experience_model';

export const createOtherExperience = (req, res) => {
  const otherExperience = new OtherExperience();
  otherExperience.name = req.body.name;
  otherExperience.description = req.body.description;
  otherExperience.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Get other experiences with specific ids (will be an array of ids from the student object)
export const getOtherExperiences = (req, res) => {
  OtherExperience.find().where('_id').in(req.params.idArray.split(',')).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const deleteOtherExperience = (req, res) => {
  OtherExperience.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateOtherExperience = (req, res) => {
  OtherExperience.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
