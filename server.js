const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const app = express()
const fs = require('fs');

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)
