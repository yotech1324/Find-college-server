import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import hpp from 'hpp'
import helmet from 'helmet'
import logger from 'morgan'
import requestIp from 'request-ip'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import indexRouter from 'routes'
// import initialJobs from 'jobs'
import userAgent from 'express-useragent'
import withState from '@expresso/helpers/withState'
// import ExpressErrorYup from 'middlewares/ExpressErrorYup'
import ExpressErrorJoi from 'middlewares/ExpressErrorJoi'
import ExpressErrorResponse from 'middlewares/ExpressErrorResponse'
import ExpressErrorMongoose from 'middlewares/ExpressErrorMongoose'
// import ExpressRateLimit from 'middlewares/ExpressRateLimit'
import winstonLogger, { winstonStream } from 'config/winston'
import allowedOrigins from '@expresso/constants/ConstAllowedOrigins'

const GenerateDoc = require('utils/GenerateDocs')

const { NODE_ENV } = process.env
const app = express()

const options: cors.CorsOptions = {
  origin: '*',
}

// view engine setup
app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set('view engine', 'pug')

app.use(helmet())
app.use(cors(options))
app.use(logger('combined', { stream: winstonStream }))
app.use(bodyParser.json({ limit: '100mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(`${__dirname}/../`, 'public')))
app.use(hpp())
app.use(userAgent.express())
app.use(requestIp.mw())
// app.use(ExpressRateLimit)

app.use((req: Request, res, next) => {
  new withState(req)
  next()
})

// disable for production mode
if (NODE_ENV !== 'production') {
  // Initial Docs Swagger
  GenerateDoc(app)
}

// Initial Route
app.use(indexRouter)

// Initial Jobs
// initialJobs()

// app.use( )
app.use(ExpressErrorMongoose)
app.use(ExpressErrorResponse)
app.use(ExpressErrorJoi)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  winstonLogger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
