var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


var schoolRoutes = require("./routes/school")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
//     res.sendFile('index.html');
// });

app.use('/api/school', schoolRoutes);


var port = 3000;
app.listen(port, function(){
    console.log("App running on port" + port);
})
