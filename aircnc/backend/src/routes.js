const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

const SessionControll = require('./controllers/SessionController')
const SpotControll = require('./controllers/SpotController')
const DashboardControll = require('./controllers/DashboardController')
const BookingControll = require('./controllers/BookingController')

const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

routes.post('/sessions', SessionControll.store)
routes.get('/spots', SpotControll.index)
routes.post('/spots', upload.single('thumbnail'), SpotControll.store)
routes.get('/dashboard', DashboardControll.show)
routes.post('/spots/:spot_id/bookings', BookingControll.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes
