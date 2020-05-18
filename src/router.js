import { Router } from 'express';
import * as JobPosts from './controllers/job_post_controller';
import * as Startups from './controllers/startup_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our mcv api!' });
});

router.route('/jobposts')
  .get(JobPosts.getPosts)
  .post(JobPosts.createPost);

router.route('/jobposts/:id')
  .get(JobPosts.getPost)
  .put(JobPosts.updatePost)
  .delete(JobPosts.deletePost);

router.route('/startups')
  .get(Startups.getStartups)
  .post(Startups.createStartup);

router.route('/startups/:id')
  .get(Startups.getStartup)
  .put(Startups.updateStartup)
  .delete(Startups.deleteStartup);

export default router;
