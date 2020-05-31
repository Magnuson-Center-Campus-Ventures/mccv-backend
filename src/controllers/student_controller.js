import Student from '../models/student_model';
import User from '../models/user_model';

export const createStudent = ((req, res) => {
  const student = new Student();
  student.user_id = req.body.user_id;
  student.first_name = req.body.first_name;
  student.last_name = req.body.last_name;
  student.gender = req.body.gender;
  student.phone_number = req.body.phone_number;
  student.majors = req.body.majors;
  student.minors = req.body.minors;
  student.grad_year = req.body.grad_year;
  student.interested_industries = req.body.interested_industries;
  student.skills = req.body.skills;
  student.work_exp = req.body.work_experiences;
  student.relevant_classes = req.body.relevant_classes;
  student.other_exp = req.body.other_exp;
  student.desired_start_date = req.body.desired_start_date;
  student.desired_end_date = req.body.desired_end_date;
  student.time_commitment = req.body.time_commitment;

  student.save().then((result) => {
    // update user to have corresponding student_profile_id
    if (student.user_id) {
      User.updateUser(student.user_id, { student_profile_id: student.user_id });
    }
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
});

export const getStudents = (req, res) => {
  Student.find().populate('relevant_classes').populate('interested_industries').populate('skills')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getStudentByID = (req, res) => {
  Student.findById(req.params.id).populate('relevant_classes').populate('interested_industries').populate('skills')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const getStudentByUserID = (req, res) => {
  Student.findOne({ user_id: req.params.userID }).populate('relevant_classes').populate('interested_industries').populate('skills')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export const deleteStudent = (req, res) => {
  Student.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateStudent = (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
