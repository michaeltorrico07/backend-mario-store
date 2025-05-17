import express from 'express'
import { port } from './utils/config/envConfig'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>www</h1>')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
