import makeGetListPosts from './blog/get-list'
import makeAddPost from './blog/add-post'
import makeGetOnePost from './blog/get-post'
import { makeDeletePostDB, makeDeletePostFS } from './blog/delete-post'

import makeGetListMessages from './messages/get-list'
import makeAddMessage from './messages/add-message'
import makeUpdateMessage from './messages/update-message'
import makeRemoveMessage from './messages/delete-message'
import makeSendMail from './messages/send-mail'

import makeFindUser from './users/find-user'
import makeRegisteruser from './users/create-user'

import makeGetPhotoGalleries from './photos/get-photo-galleries'
import makeGetPhotoGallery from './photos/get-photo-gallery'
import makeAddPhotoGallery from './photos/add-photo-gallery'
import makeUpdateGallery from './photos/update-photo-gallery'
import makeAddPhotoAlbum from './photos/add-photo-album'
import { makeDeletePhotoDB, makeDeletePhotoFS } from './photos/delete-photo'
import makeAddPhotos from './photos/add-photo'
import { makeDeleteGalleryDB, makeDeleteGalleryFS } from './photos/delete-gallery'
import { blogDb, photosDb, messagesDb, userDb } from '../db/index'

const listPosts = makeGetListPosts({ blogDb })
const addPost = makeAddPost({ blogDb })
const onePost = makeGetOnePost({ blogDb })
const deletePostDB = makeDeletePostDB({ blogDb })
const deletePostFS = makeDeletePostFS()

const blogService = Object.freeze({
    listPosts,
    addPost,
    onePost,
    deletePostDB,
    deletePostFS
});

const listMessages = makeGetListMessages({ messagesDb })
const addMessage = makeAddMessage({ messagesDb })
const sendMail = makeSendMail()
const updateMessage = makeUpdateMessage({ messagesDb })
const removeMessage = makeRemoveMessage({ messagesDb })

const messageService = Object.freeze({
    listMessages,
    addMessage,
    sendMail,
    updateMessage,
    removeMessage,
});

const findUser = makeFindUser({ userDb })
const registerUser = makeRegisteruser({ userDb })


const userService = Object.freeze({
    findUser,
    registerUser
});

const listGalleries = makeGetPhotoGalleries({ photosDb })
const getGallery = makeGetPhotoGallery({ photosDb })
const addGallery = makeAddPhotoGallery({ photosDb })
const updateGallery = makeUpdateGallery({ photosDb })
const addAlbum = makeAddPhotoAlbum({ photosDb })
const addPhotos = makeAddPhotos({ photosDb })
const deletePhotoDB = makeDeletePhotoDB({ photosDb })
const deletePhotoFS = makeDeletePhotoFS()
const deleteGalleryDB = makeDeleteGalleryDB({ photosDb })
const deleteGalleryFS = makeDeleteGalleryFS()
const photoService = Object.freeze({
    listGalleries,
    getGallery,
    addGallery,
    updateGallery,
    addAlbum,
    addPhotos,
    deletePhotoFS,
    deletePhotoDB,
    deleteGalleryDB,
    deleteGalleryFS
});

// export const usersService = Object.freeze({

// });

export { blogService, photoService, messageService, userService }