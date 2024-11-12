const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { authenticated } = require('./router/auth_users.js');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const app = express();
app.use(express.json());
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))
app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    if (!req.session || !req.session.token) {
        return res.status(401).json({ message: "Unauthorized: No session or token" });
    }
    const token = req.session.token;
    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            // Token verification failed
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = decoded;
        next();
    });
});
const PORT =5000;
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
