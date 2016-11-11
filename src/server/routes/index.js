/* eslint no-param-reassign: "off" */
import os from 'os';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import multer from 'koa-multer';
import * as photos from './photos';
import * as tags from './tags';
import * as design from './design';
import defaultRoute from './default';
import AuthService from '../services/auth';
import authMiddleware, { authRequired } from '../middleware/auth';
import { APIMiddleware } from '../middleware/api';
import { errorMiddleware } from '../middleware/error';

const router = new KoaRouter();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage });

router.use(errorMiddleware);
router.use(authMiddleware);

router.get('*', async ctx => defaultRoute(ctx));

// Public CMS routes
router.post('/login', bodyParser(), async ctx => {
  const { username, password } = ctx.request.body;

  try {
    // Get a login token for the CMS
    const token = await AuthService.createToken(username, password);
    ctx.body = { success: true, token };
    ctx.status = 200;
  } catch (error) {
    ctx.throw('Invalid credentials.', 401);
  }
});

router.post('/verify-login', bodyParser(), async ctx => {
  const token = ctx.headers.authorization;

  try {
    await AuthService.verifyToken(token);
    ctx.body = { success: true, token };
    ctx.status = 200;
  } catch (error) {
    ctx.throw('Invalid credentials.', 401);
  }
});

// Secure CMS routes that communicate with the API
router.use(authRequired);
router.use(APIMiddleware);

// Create photos
router.post('/photos', upload.array('images'), async (ctx) => photos.createPhotos(ctx));
// Update a photo
router.post('/photos/:id', bodyParser(), async (ctx) => photos.updatePhoto(ctx));
// Delete a photo
router.del('/photos/:id', async (ctx) => photos.deletePhoto(ctx));

// Create a tag
router.post('/tags', bodyParser(), async (ctx) => tags.createTag(ctx));

// Create a design project
router.post('/design', upload.array('images'), async (ctx) => design.createProject(ctx));
// Update a design project
router.post('/design/:id', upload.array('images'), async (ctx) => design.updateProject(ctx));
// Delete a design project
router.del('/design/:id', async (ctx) => design.deleteProject(ctx));

export default router.routes();
