import SubmittedApplication from '../models/submitted_application_model';

export const createSubmittedApplication = (req, res) => {
  const submittedApplication = new SubmittedApplication();
  submittedApplication.post_id = req.body.post_id;
  submittedApplication.student_id = req.body.student_id;
  submittedApplication.questions = req.body.questions;
  submittedApplication.answers = req.body.answers;
  submittedApplication.status = req.body.status;
  submittedApplication.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getSubmittedApplications = (req, res) => {
  SubmittedApplication.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getSubmittedApplication = (req, res) => {
  SubmittedApplication.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteSubmittedApplication = (req, res) => {
  SubmittedApplication.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateSubmittedApplication = (req, res) => {
  SubmittedApplication.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
