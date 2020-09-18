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
  post.responsibilities = req.body.responsibilities;
  post.time_commitment = req.body.time_commitment;
  post.desired_start_date = req.body.desired_start_date;
  post.desired_end_date = req.body.desired_end_date;
  post.desired_classes = req.body.desired_classes;
  post.availabile_until = req.body.availabile_until;
  post.status = req.body.status;
  post.applicants = req.body.applicants;
  post.application_id = req.body.application_id;
  post.students_selected = req.body.students_selected;
  post.city = req.body.city;
  post.state = req.body.state;
  post.virtual = req.body.virtual;
  post.inperson = req.body.inperson;

  post.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find()
    .populate('startup_id')
    .populate('industries')
    .populate('required_skills')
    .populate('preferred_skills')
    .populate('desired_classes')
    .populate('applicants')
    .populate('students_selected')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .populate('startup_id')
    .populate('industries')
    .populate('required_skills')
    .populate('preferred_skills')
    .populate('desired_classes')
    .populate('applicants')
    .populate('students_selected')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
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
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('startup_id')
    .populate('industries')
    .populate('required_skills')
    .populate('preferred_skills')
    .populate('desired_classes')
    .populate('applicants')
    .populate('applicaton_id')
    .populate('students_selected')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
