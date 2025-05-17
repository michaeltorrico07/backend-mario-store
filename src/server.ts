import express from 'express'
import { port } from './utils/config/envConfig'
import router from './routes/index'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>www</h1>')
})

app.use('/', router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
