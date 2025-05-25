import express from 'express'
import { port } from './infrastructure/config/envConfig'
import router from './routes/index'

const app = express()

app.use(express.json())
app.use('/', router)

app.get('/', (req, res) => {
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
