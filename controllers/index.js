//usecases
import { blogService,  photoService, messageService, userService } from '../usecases'


//controllers
import makeGetListPosts from './blog/get-posts'
import makeAddPost from './blog/add-post'
import makeGetPost from './blog/get-post'
import makeDeletePost from './blog/delete-post'

import makeGetListMessages from './messages/get-messages'
import makeAddMessage from './messages/add-message'
import makeUpdateMessage from './messages/update-message'
import makeRemoveMessage from './messages/remove-message'

import makeGetRegisterUser from './users/register-user'
import makeGetLoginUser from './users/login-user'


import makeAddPhotos from './photos/add-photos'
import makeGetListGalleries from './photos/get-galleries'
import makeGetGallery from './photos/get-gallery'
import makeAddGallery from './photos/add-gallery'
import makeAddAlbum from './photos/add-album'
import makeUpdateGallery from './photos/update-gallery'
import makePhotoUpload from './photos/upload-photo'
import makeDeletePhoto from './photos/delete-photo'
import makeDeleteGallery from './photos/delete-gallery'

const findUser = userService.findUser;
const registerUser = userService.registerUser;
const login = makeGetLoginUser({ findUser })
const register = makeGetRegisterUser({ registerUser, findUser })
const userController = Object.freeze({
    login,
    register
});

const addPost = blogService.addPost;
const listPosts = blogService.listPosts;
const onePost = blogService.onePost;
const deletePostFS = blogService.deletePostFS;
const deletePostDB = blogService.deletePostDB;

const getPosts = makeGetListPosts({ listPosts })
const postPost = makeAddPost({ addPost, onePost })
const getPost = makeGetPost({ onePost })
const deletePost = makeDeletePost({ deletePostFS, deletePostDB })
const blogController = Object.freeze({
    getPosts,
    getPost,
    postPost,
    deletePost
});

const galleryController = Object.freeze({});


const addMessage = messageService.addMessage;
const sendMail = messageService.sendMail;
const listMessages = messageService.listMessages;
const updateMessage = messageService.updateMessage;
const removeMessage = messageService.removeMessage;
const getMessages = makeGetListMessages({ listMessages })
const postMessage = makeAddMessage({ addMessage, sendMail })
const getUpdateMessage = makeUpdateMessage({ updateMessage })
const getRemoveMessage = makeRemoveMessage({ removeMessage })

const messagesController = Object.freeze({
    getMessages,
    postMessage,
    getUpdateMessage,
    getRemoveMessage,
});

const listGalleries = photoService.listGalleries;
const addGallery = photoService.addGallery;
const addAlbum = photoService.addAlbum;
const getGallery = photoService.getGallery;
const updateGallery = photoService.updateGallery;
const addPhotos = photoService.addPhotos;
const deletePhotoFS = photoService.deletePhotoFS;
const deletePhotoDB = photoService.deletePhotoDB;
const deleteGalleryFS = photoService.deleteGalleryFS;
const deleteGalleryDB = photoService.deleteGalleryDB;
const getListGalleries = makeGetListGalleries({ getGallery })
const getOneGallery = makeGetGallery({ getGallery })
const getAddGallery = makeAddGallery({ addGallery })
const getAddAlbum = makeAddAlbum({ addAlbum })
const getUpdateGallery = makeUpdateGallery({ updateGallery })
const getPhotoUploaded = makePhotoUpload()
const getAddedPhotos = makeAddPhotos({ addPhotos })
const getPhotoDeleted = makeDeletePhoto({ deletePhotoFS, deletePhotoDB })
const getGalleryDeleted = makeDeleteGallery({ deleteGalleryFS, deleteGalleryDB })
const photosController = Object.freeze({
    getListGalleries,
    getAddGallery,
    getOneGallery,
    getAddAlbum,
    // getOneAlbum,
    getPhotoUploaded,
    getUpdateGallery,
    getAddedPhotos,
    getPhotoDeleted,
    getGalleryDeleted
});


export { blogController, galleryController, photosController, messagesController, userController }