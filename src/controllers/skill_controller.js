import Skill from '../models/skill_model';

export const createSkill = (req, res) => {
  const skill = new Skill();
  skill.name = req.body.name;
  skill.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getSkills = (req, res) => {
  Skill.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Get skills with specific ids (will be an array of ids from the student object)
export const getCertainSkills = (req, res) => {
  Skill.find().where('_id').in(req.params.idArray.split(',')).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getSkill = (req, res) => {
  Skill.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteSkill = (req, res) => {
  Skill.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateSkill = (req, res) => {
  Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
