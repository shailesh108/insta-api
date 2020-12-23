var express = require('express')
var axios = require('axios')
var app = express()

app.listen(8080, () => {
  console.log('Server running on port 3000')
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
