import JobPost from '../models/job_post_model';

export const createPost = (req, res) => {
  const jobPost = new JobPost();
  jobPost.startup_id = req.body.startup_id;
  jobPost.title = req.body.title;
  jobPost.description = req.body.description;
  jobPost.industry = req.body.industry;
  jobPost.required_skills = req.body.required_skills;
  jobPost.preferred_skills = req.body.preferred_skills;
  jobPost.time_commitment = req.body.time_commitment;
  jobPost.desired_start_date = req.body.desired_start_date;
  jobPost.desired_end_date = req.body.desired_end_date;
  jobPost.desired_classes = req.body.desired_classes;
  jobPost.availabile_until = req.body.availabile_until;
  jobPost.status = req.body.status;
  jobPost.applicants = req.body.applicants;
  jobPost.students_selected = req.body.students_selected;
  jobPost.location = req.body.location;
  jobPost.remote = req.body.remote;
  jobPost.save()
    .then((result) => {
      res.json({ message: 'Job post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  JobPost.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getPost = (req, res) => {
  JobPost.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deletePost = (req, res) => {
  JobPost.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updatePost = (req, res) => {
  JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
