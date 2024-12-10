import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import {
  globalErrHandler,
  notFoundErrHandler,
} from './app/middleware/errHandler'
import router from './app/routes'
import cookieParser from 'cookie-parser'
// import axios from 'axios'
// import { CronJob } from 'cron'

const app = express()

// // Create an axios instance with a longer timeout
// const axiosInstance = axios.create({
//   timeout: 30000, // 30 seconds timeout
// })

// // Set up a cron job to ping the server every 10 minutes
// const job = new CronJob('*/10 * * * *', () => {
//   axiosInstance
//     .get('https://utshofolio-server.onrender.com/api/v1')
//     .then((response) => {
//       console.log('😀🎉 Self-ping successful:', response.status)
//     })
//     .catch((error) => {
//       console.error('😡 Self-ping failed:', error.message)
//     })
// })

// // Start the cron job
// job.start()

app.get('/api/v1', async (req, res) => {
  res.send('Japalearn home route!')
})

// parser
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      return callback(null, origin)
    },
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

// Router
app.use('/api/v1', router)
// app.use('/api/v1/students', studentRouter)
// app.use('/api/v1/users', userRoute)

// error handler
app.use(notFoundErrHandler)
app.use(globalErrHandler)

export default app
