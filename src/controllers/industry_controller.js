import Industry from '../models/industry_model';

export const createIndustry = (req, res) => {
  const industry = new Industry();
  industry.name = req.body.name;
  industry.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getIndustries = (req, res) => {
  Industry.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Get industries with specific ids (will be an array of ids from the student object)
export const getCertainIndustries = (req, res) => {
  Industry.find().where('_id').in(req.params.idArray.split(',')).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getIndustry = (req, res) => {
  Industry.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteIndustry = (req, res) => {
  Industry.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateIndustry = (req, res) => {
  Industry.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
