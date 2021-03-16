import express from 'express'
import bodyParser from 'body-parser'
import makeCallback from './express-callback'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import passport from 'passport'
import './utils/config'
import logger from './utils/logger'
global.logger = logger;
import { blogController, photosController, messagesController, userController } from './controllers'
import webpush from './utils/web-push'


const app = express();
require('./utils/passport');
app.use(passport.initialize());

global.config.staticPath = '../' + config.static;
app.use(express.static(config.staticPath))

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
    res.set({ Tk: '!' });
    next();
})
app.use(cors())

app.post(`${config.apiRoot}/user/login`, makeCallback(userController.login));
app.post(`${config.apiRoot}/user/register`, makeCallback(userController.register));

app.post(`${config.apiRoot}/blog`, passport.authenticate('jwt', { session: false }), makeCallback(blogController.postPost));
app.get(`${config.apiRoot}/blog`, makeCallback(blogController.getPosts));
app.post(`${config.apiRoot}/post`, makeCallback(blogController.getPost));
app.post(`${config.apiRoot}/post/delete`, passport.authenticate('jwt', { session: false }), makeCallback(blogController.deletePost));

app.post(`${config.apiRoot}/messages`, makeCallback(messagesController.postMessage));
app.get(`${config.apiRoot}/messages`, passport.authenticate('jwt', { session: false }), makeCallback(messagesController.getMessages));
app.patch(`${config.apiRoot}/messages`, passport.authenticate('jwt', { session: false }), makeCallback(messagesController.getUpdateMessage));
app.delete(`${config.apiRoot}/messages`, passport.authenticate('jwt', { session: false }), makeCallback(messagesController.getRemoveMessage));

app.post(`${config.apiRoot}/photos/list`, makeCallback(photosController.getListGalleries));
app.post(`${config.apiRoot}/photos`, makeCallback(photosController.getOneGallery));

app.patch(`${config.apiRoot}/photos`, passport.authenticate('jwt', { session: false }), makeCallback(photosController.getUpdateGallery));
app.put(`${config.apiRoot}/photos`, passport.authenticate('jwt', { session: false }), makeCallback(photosController.getAddedPhotos));

app.get(`${config.apiRoot}/photos/:galleryId`, makeCallback(photosController.getOneGallery));
app.post(`${config.apiRoot}/photos/delete`, passport.authenticate('jwt', { session: false }), makeCallback(photosController.getPhotoDeleted));
app.post(`${config.apiRoot}/upload/photos/:thumbs`, passport.authenticate('jwt', { session: false }), makeCallback(photosController.getPhotoUploaded));
app.post(`${config.apiRoot}/photos/deletegallery`, passport.authenticate('jwt', { session: false }), makeCallback(photosController.getGalleryDeleted));

app.listen(config.port, config.host, () => {
    console.log(`--------------------------`)
    console.log(`Production URL: ${config.siteUrl}`)
    console.log(`Environment: ${config.env}`)
    console.log(`Server is listening on: http://${config.host}:${config.port} `)
    console.log(`--------------------------`)
});

export default app