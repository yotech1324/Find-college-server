import express from 'express'

const router = express.Router()

export default router

require('controllers/Auth/controller')
require('controllers/User/controller')
require('controllers/Role/controller')
require('controllers/RefreshToken/controller')
require('controllers/Collage/controller')
require('controllers/Country/controller')
require('controllers/Course/controller')
require('controllers/States/controller')