const express = require("express");
const app = express();
const path = require('path')
const port = 3000;

// Importing the user routes
const userRoutes = require('./userRoutes')

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome to the static file demo!");
});

app.use('/user', userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Dynamic params
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.send(`User with id: ${id} found! `);
})

app.get('/profile', (req, res) => {
    res.render('profile', { username: 'marco'})
})

app.get('/menu/:category', (req, res) => {
    const category = req.params.category;
    res.send(`This is the ${category} menu`);
})

app.post("/submit", (req, res) => {
    res.send('Form submitted!')
})

app.put('/update', (req, res) => {
    res.send('Item updated!')
})

app.delete('/delete', (req, res) => {
    res.send('item deleted!')
})

app.use(express.json); // Parse JSON request bodies

app
.route('/user')
.get((req, res) => {
    res.send('Fetching user data')
})
.post((req, res) => {
    const { name } = req.body
    res.send(`Creating a user with name ${name}`);
})// Etc...

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
