import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Startups from './controllers/startup_controller';
import * as StartupUsers from './controllers/startup_user_controller';
import * as Students from './controllers/student_controller';

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

export default router;
