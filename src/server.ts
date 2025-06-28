import express from 'express'
import { frontendUrl, port } from './infrastructure/config/envConfig'
import router from './routes/index'
import cors from 'cors'

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/', router)

app.get('/', (_req, res) => {
  const text = 'www LA BALATRO www'
    .split('')
    .map((char, i) => {
      const color = i % 2 === 0 ? 'red' : 'blue'
      return `<span style="color:${color}">${char}</span>`
    })
    .join('')
  res.send(`<h1>${text}</h1>`)
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
