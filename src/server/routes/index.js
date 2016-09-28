import os from 'os';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import multer from 'koa-multer';
import * as auth from './auth';
import * as photos from './photos';
import * as tags from './tags';
import * as design from './design';
import defaultRoute from './default';
import { apiAuthMiddleware } from '../middleware/auth';
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
router.use(apiAuthMiddleware);

// CMS routes
router.post('/login', bodyParser(), async ctx => auth.login(ctx));
router.post('/verify-login', bodyParser(), async ctx => auth.verify(ctx));

router.post('/photos', upload.array('images'), async (ctx) => photos.createPhotos(ctx));
router.post('/photos/:id', bodyParser(), async (ctx) => photos.updatePhoto(ctx));
router.del('/photos/:id', bodyParser(), async (ctx) => photos.deletePhoto(ctx));

router.post('/tags', bodyParser(), async (ctx) => tags.createTag(ctx));

router.post('/design', upload.array('images'), async (ctx) => design.createProject(ctx));
router.post('/design/:id', upload.array('images'), async (ctx) => design.updateProject(ctx));
router.del('/design/:id', async (ctx) => design.deleteProject(ctx));

router.get('*', async ctx => defaultRoute(ctx));

export default router.routes();
