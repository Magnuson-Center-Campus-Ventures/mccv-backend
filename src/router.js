import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Startups from './controllers/startup_controller';
// not using startupusers at the moment
// import * as StartupUsers from './controllers/startup_user_controller';
import * as Students from './controllers/student_controller';
import * as Users from './controllers/user_controller';
import * as WorkExperiences from './controllers/work_experience_controller';
import * as SubmittedApplications from './controllers/submitted_application_controller';
import * as Skills from './controllers/skill_controller';
import * as Classes from './controllers/class_controller';
import * as Industries from './controllers/industry_controller';
import * as OtherExperiences from './controllers/other_experience_controller';
import * as PasswordReset from './controllers/password_reset_controller';
import * as EmailConfirmation from './controllers/email_confirmation_controller';
import * as EmailNotification from './controllers/email_notification_controller';
import * as AdminAction from './controllers/admin_action_controller';
import * as S3 from './services/s3';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our mcv api!' });
});

// posts routes
router.route('/posts')
  .get(requireAuth, Posts.getPosts)
  .post(requireAuth, Posts.createPost);

// no longer using, moved post search functionality entirely to front-end implementation
// router.route('/posts-search/:searchterm')
//   .get(requireAuth, Posts.getSearchResults);

router.route('/posts/:id')
  .get(requireAuth, Posts.getPost)
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

// startup routes
router.route('/startups')
  .get(requireAuth, Startups.getStartups)
  .post(requireAuth, Startups.createStartup);

// no longer using, moved search functionality entirely to front-end implementation
// router.route('/startups-search/:searchterm')
//   .get(requireAuth, Startups.getSearchResults);

router.route('/startups/:id')
  .get(requireAuth, Startups.getStartup)
  .put(requireAuth, Startups.updateStartup)
  .delete(requireAuth, Startups.deleteStartup);

router.route('/startupprofile/:userID')
  .get(requireAuth, Startups.getStartupByUserID);

/* // not using startupusers
router.route('/startupusers')
  .get(requireAuth, StartupUsers.getStartupUsers)
  .post(requireAuth, StartupUsers.createStartupUser);

router.route('/startupusers/:id')
  .get(requireAuth, StartupUsers.getStartupUser)
  .put(requireAuth, StartupUsers.updateStartupUser)
  .delete(requireAuth, StartupUsers.deleteStartupUser);
*/

// student routes
router.route('/students')
  .get(requireAuth, Students.getStudents)
  .post(requireAuth, Students.createStudent);

router.route('/students/:id')
  .get(requireAuth, Students.getStudentByID)
  .put(requireAuth, Students.updateStudent)
  .delete(requireAuth, Students.deleteStudent);

router.route('/profile/:userID')
  .get(requireAuth, Students.getStudentByUserID);

// user routes
router.route('/users')
  .get(requireAuth, Users.getUsers);

router.route('/users/:id')
  .get(requireAuth, Users.getUserByID)
  .put(requireAuth, Users.updateUser)
  .delete(requireAuth, Users.deleteUser);

router.route('/studentuser/:studentID')
  .get(requireAuth, Users.getUserByStudentID);

// work experiences routes
router.route('/workexperiences')
  .post(requireAuth, WorkExperiences.createWorkExperience);

router.route('/workexperiences/:idArray')
  .get(requireAuth, WorkExperiences.getWorkExperiences);

router.route('/workexperiences/:id')
  .put(requireAuth, WorkExperiences.updateWorkExperience)
  .delete(requireAuth, WorkExperiences.deleteWorkExperience);

// submitted applications routes
router.route('/submittedapplications')
  .get(requireAuth, SubmittedApplications.getSubmittedApplications)
  .post(requireAuth, SubmittedApplications.createSubmittedApplication);

router.route('/submittedapplications/:id')
  .get(requireAuth, SubmittedApplications.getSubmittedApplication)
  .put(requireAuth, SubmittedApplications.updateSubmittedApplication)
  .delete(requireAuth, SubmittedApplications.deleteSubmittedApplication);

// skills routes
router.route('/skills')
  .get(requireAuth, Skills.getSkills)
  .post(requireAuth, Skills.createSkill);

router.route('/skills/:idArray')
  .get(requireAuth, Skills.getCertainSkills);

router.route('/skills/:id')
  .get(requireAuth, Skills.getSkill)
  .put(requireAuth, Skills.updateSkill)
  .delete(requireAuth, Skills.deleteSkill);

// classes routes
router.route('/classes')
  .get(requireAuth, Classes.getClasses)
  .post(requireAuth, Classes.createClass);

router.route('/classes/:idArray')
  .get(requireAuth, Classes.getCertainClasses);

router.route('/classes/:id')
  .get(requireAuth, Classes.getClass)
  .put(requireAuth, Classes.updateClass)
  .delete(requireAuth, Classes.deleteClass);

// industries routes
router.route('/industries')
  .get(requireAuth, Industries.getIndustries)
  .post(requireAuth, Industries.createIndustry);

router.route('/industries/:idArray')
  .get(requireAuth, Industries.getCertainIndustries);

router.route('/industries/:id')
  .get(requireAuth, Industries.getIndustry)
  .put(requireAuth, Industries.updateIndustry)
  .delete(requireAuth, Industries.deleteIndustry);

// other experiences routes
router.route('/otherexperiences')
  .post(requireAuth, OtherExperiences.createOtherExperience);

router.route('/otherexperiences/:idArray')
  .get(requireAuth, OtherExperiences.getOtherExperiences);

router.route('/otherexperiences/:id')
  .put(requireAuth, OtherExperiences.updateOtherExperience)
  .delete(requireAuth, OtherExperiences.deleteOtherExperience);

// password reset route
router.post('/updatepassword', PasswordReset.updatePassword);
router.post('/forgotpassword', PasswordReset.createToken);

// email confirmation route
router.post('/emailconfirmation', EmailConfirmation.createToken);
router.post('/confirmemail', EmailConfirmation.confirmSignUp);

// email confirmation route
router.post('/emailnotification', EmailNotification.sendEmailNotification);

// admin actions route
router.post('/massemail', AdminAction.massEmail);
router.post('/broadcastbanner', AdminAction.broadcastBanner);
router.post('/massarchive', AdminAction.massArchive);

// s3 route
router.get('/sign-s3', S3.signS3);

// auth routes
router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.signup);

router.post('/emailexists/', Users.emailExists);

export default router;
