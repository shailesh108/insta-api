var express = require('express')
var axios = require('axios')
const http = require('http')
const path = require('path')
const puppeteer = require('puppeteer')

var app = express()
const server = http.Server(app)
app.use('/', express.static(path.join(__dirname, 'testheroku')))

app.listen(process.env.PORT || 8080, () => {
  console.log('Server running on port 3000', process.env.PORT)
})

app.get('/getData', async (req, res, next) => {
  let tagId = req.query.tag
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      '--user-data-dir=/tmp/user_data/',
      '--window-size=1200,800'
    ]
  })
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/explore/tags/${tagId}/?__a=1`)
  let items = await page.evaluate(() => {
    let items = document.getElementsByTagName('pre')[0]
    items = items && items.textContent
    return JSON.parse(items || null)
  })
  await browser.close()
  res.json(items)
})
