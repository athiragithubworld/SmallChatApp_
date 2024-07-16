const express = require('express')

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("login")
  res.send('<form action="/login" method="POST"><input type="text" id=username name="name"><button>Login</button></form>')
})

router.post("/", (req, res, next) => {
  console.log(req.body.name)
  const username = req.body.name;
  res.send(
    `<html><body>  <script>localStorage.setItem("username", "${username}") 
    window.location.href = "/chat"</script ></body ></html > `
  )
  
})

module.exports = router;