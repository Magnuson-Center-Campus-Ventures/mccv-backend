// For companies' volunteer position postings

import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.startup_id = req.body.startup_id;
  post.title = req.body.title;
  post.description = req.body.description;
  post.industries = req.body.industries;
  post.required_skills = req.body.required_skills;
  post.preferred_skills = req.body.preferred_skills;
  post.time_commitment = req.body.time_commitment;
  post.desired_start_date = req.body.desired_start_date;
  post.desired_end_date = req.body.desired_end_date;
  post.desired_classes = req.body.desired_classes;
  post.availabile_until = req.body.availabile_until;
  post.status = req.body.status;
  post.applicants = req.body.applicants;
  post.students_selected = req.body.students_selected;
  post.location = req.body.location;
  post.remote = req.body.remote;
  post.save()
    .then((result) => {
      res.json({ message: 'Volunteer position post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find().then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
