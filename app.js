const express = require("express")
const bodyParser = require("body-parser")
const port = 3000
const app = express()
const date = require(__dirname + "/date.js")
var items = ["Buy Food", "Cook Food", "Eat Food"]
var workItems = []
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get("/", (req, res) => {

  let day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", (req, res) => {
  var item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }

})

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.listen(port, () => {
   console.log("server is running")
})
