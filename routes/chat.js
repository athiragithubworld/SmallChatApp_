const express = require('express');

const router = express.Router();

// Temporary storage for messages (replace with database in production)
let messages = [];

router.get("/", (req, res, next) => {
  // res.send('<html><form action="/chat" onsubmit="document.getElementById("username").value=localStorage.getItem("username") method="POST"><input id="message" name="message" type="text"><button>Send</button></form></html>')
  // const formHtml = `<html><form action="/chat" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST"><input id="username" name="username" type="hidden"><input id="message" name="message" type="text"><button type="submit">Send</button></form></html>`;
  console.log(messages.length)
  const formHtml = `
    <html>
      <body>
        <h1>Chat Application</h1>
        <form action="/chat" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST"><input id="username" name="username" type="hidden"><input id="message" name="message" type="text"><button type="submit">Send</button></form>
        <div id="messages">
          ${
            messages.length > 0
              ? messages
                  .map(
                    (msg) =>
                      `<p><strong>${msg.username}:</strong> ${msg.message}</p>`
                  )
                  .join("")
              : "<p>No messages yet</p>"
          }
        </div>
      </body>
    </html>`;
  res.send(formHtml);
})

router.post("/", (req, res, next) => {
  const { username, message } = req.body;
  if (!username || !message) {
    return res.status(404).send("Username and message required");
  }
  messages.push({ username, message });
  console.log(messages);
  // Construct the updated messages HTML
  const messagesHtml = messages
    .map((msg) => `<p><strong>${msg.username}:</strong> ${msg.message}</p>`)
    .join("");

  // Send the updated messages HTML back to the client
  const responseHtml = `
    <html>
      <body>
        <h1>Chat Application</h1>
        <form action="/chat" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST"><input id="username" name="username" type="hidden"><input id="message" name="message" type="text"><button type="submit">Send</button></form>
        <div id="messages">
          ${messagesHtml}
        </div>
      </body>
    </html>`;
  res.send(responseHtml);
  // res.redirect("/")
})

module.exports = router;