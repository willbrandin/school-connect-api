var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


var schoolRoutes = require("./routes/school");
var newsRoutes = require('./routes/news');
var calendarRoutes = require('./routes/calendar');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/school', schoolRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/calendar', calendarRoutes)
// app.use('/api/links', linkRoutes)
// app.use('/api/config', mobileAppConfigRoutes)

var port = 3000;
app.listen(port, function(){
    console.log("App running on port" + port);
})
