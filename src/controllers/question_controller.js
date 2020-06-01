import Question from '../models/question_model';

export const createQuestion = (req, res) => {
  const question = new Question();
  question.question = req.body.question;
  question.application_id = req.body.application_id;
  question.status = req.body.status;
  question.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getQuestions = (req, res) => {
  Question.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getQuestion = (req, res) => {
  Question.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deleteQuestion = (req, res) => {
  Question.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateQuestion = (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
