import express from 'express'
import path from 'path'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)
