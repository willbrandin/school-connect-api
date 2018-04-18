var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


var schoolRoutes = require("./routes/school");
var newsRoutes = require('./routes/news');
var calendarRoutes = require('./routes/calendar');
var linkRoutes = require('./routes/links')
var mobileAppConfigRoutes = require('./routes/mobile-app-config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/school', schoolRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/homelinks', linkRoutes)
app.use('/api/config', mobileAppConfigRoutes)

app.listen(process.env.PORT || 5000, function(){
    console.log("App running");
})
