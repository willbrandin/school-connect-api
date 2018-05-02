var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

var ev = require('dotenv').config();


var schoolRoutes = require("./routes/school");
var newsRoutes = require('./routes/news');
var calendarRoutes = require('./routes/calendar');
var linkRoutes = require('./routes/links')
var mobileAppConfigRoutes = require('./routes/mobile-app-config')
var messageRoutes = require('./routes/message')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/school', schoolRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/homelinks', linkRoutes)
app.use('/api/config', mobileAppConfigRoutes)
app.use('/api/message', messageRoutes)


app.listen(process.env.PORT || 5000, function(){
    console.log("App running");
})
