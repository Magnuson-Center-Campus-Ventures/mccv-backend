import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Startups from './controllers/startup_controller';
import * as StartupUsers from './controllers/startup_user_controller';
import * as Students from './controllers/student_controller';
import * as Users from './controllers/user_controller';
import * as WorkExperiences from './controllers/work_experience_controller';
import * as Applications from './controllers/application_controller';
import * as SubmittedApplications from './controllers/submitted_application_controller';
import * as Skills from './controllers/skill_controller';
import * as Classes from './controllers/class_controller';
import * as Industries from './controllers/industry_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our mcv api!' });
});

router.route('/posts')
  .get(Posts.getPosts)
  .post(Posts.createPost);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

router.route('/startups')
  .get(Startups.getStartups)
  .post(Startups.createStartup);

router.route('/startups/:id')
  .get(Startups.getStartup)
  .put(Startups.updateStartup)
  .delete(Startups.deleteStartup);

router.route('/startupusers')
  .get(StartupUsers.getStartupUsers)
  .post(StartupUsers.createStartupUser);

router.route('/startupusers/:id')
  .get(StartupUsers.getStartupUser)
  .put(StartupUsers.updateStartupUser)
  .delete(StartupUsers.deleteStartupUser);

router.route('/students')
  .get(Students.getStudents)
  .post(Students.createStudent);

router.route('/students/:id')
  .get(Students.getStudent)
  .put(Students.updateStudent)
  .delete(Students.deleteStudent);

router.route('/profile/:userID')
  .get(Students.getStudentByUserID);

router.route('/users')
  .get(Users.getUsers)
  .post(Users.createUser);

router.route('/users/:id')
  .get(Users.getUser)
  .put(Users.updateUser)
  .delete(Users.deleteUser);

router.route('/workexperiences')
  .post(WorkExperiences.createWorkExperience);

router.route('/workexperiences')
  .get(WorkExperiences.getWorkExperiences);

router.route('/workexperiences/:id')
  .put(WorkExperiences.updateWorkExperience)
  .delete(WorkExperiences.deleteWorkExperience);

router.route('/applications')
  .get(Applications.getApplications)
  .post(Applications.createApplication);

router.route('/applications/:id')
  .get(Applications.getApplication)
  .put(Applications.updateApplication)
  .delete(Applications.deleteApplication);

router.route('/submittedapplications')
  .get(SubmittedApplications.getSubmittedApplications)
  .post(SubmittedApplications.createSubmittedApplication);

router.route('/submittedapplications/:id')
  .get(SubmittedApplications.getSubmittedApplication)
  .put(SubmittedApplications.updateSubmittedApplication)
  .delete(SubmittedApplications.deleteSubmittedApplication);

router.route('/skills')
  .get(Skills.getSkills)
  .post(Skills.createSkill);

router.route('/skills/:id')
  .get(Skills.getSkill)
  .put(Skills.updateSkill)
  .delete(Skills.deleteSkill);

router.route('/classes')
  .get(Classes.getClasses)
  .post(Classes.createClass);

router.route('/classes/:id')
  .get(Classes.getClass)
  .put(Classes.updateClass)
  .delete(Classes.deleteClass);

router.route('/industries')
  .get(Industries.getIndustries)
  .post(Industries.createIndustry);

router.route('/industries/:id')
  .get(Industries.getIndustry)
  .put(Industries.updateIndustry)
  .delete(Industries.deleteIndustry);

export default router;
