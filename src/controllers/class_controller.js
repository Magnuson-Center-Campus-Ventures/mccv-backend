import Class from '../models/class_model';

export const createClass = (req, res) => {
  const course = new Class();
  course.name = req.body.name;
  course.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getClasses = (req, res) => {
  Class.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Get classes with specific ids (will be an array of ids from the student object)
export const getCertainClasses = (req, res) => {
  Class.find().where('_id').in(req.params.idArray.split(',')).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getClass = (req, res) => {
  Class.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteClass = (req, res) => {
  Class.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateClass = (req, res) => {
  Class.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
