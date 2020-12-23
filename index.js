var express = require('express')
var axios = require('axios')
const http = require('http')
const path = require('path')

var app = express()
const server = http.Server(app)
app.use('/', express.static(path.join(__dirname, 'testheroku')))

app.listen(process.env.PORT || 8080, () => {
  console.log('Server running on port 3000', process.env.PORT)
})

app.get('/getData', (req, res, next) => {
  let tagId = req.query.tag
  axios
    .get(`https://www.instagram.com/explore/tags/${tagId}/?__a=1`)
    .then(resp => {
      res.json(resp.data)
    })
    .catch(e => res.json(e))
})
