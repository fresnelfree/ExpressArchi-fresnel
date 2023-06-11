// import des modules
const express = require('express')
const bodyParser = require('body-parser')
// appel au package 
const app = express()

// import routes
const globalRoutes = require('./routes/globalRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
// auth routes
const authRoutes = require('./routes/authRoutes')

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Activation des routes
app.use('/', globalRoutes);
// Ici on ajoute 'user' à la route initialement 'middleware' 
// Les requêtes s'effectueront sur /user/middleware 
app.use('/user', userRoutes);
app.use('/product', productRoutes);
// auth routes
app.use('/auth', authRoutes);

// stripe paiement
app.use('/stripe', stripeRoutes)

// déclenche le serveur sur le port 4000
app.listen(4001, () => {
    console.log("Server start localhost:4001")
})