/**
 * Created by suchandp on 6/23/2016.
 */
var express = require('express');

var app = express();
var mongojs = require('mongojs');
var db = mongojs('expertprofiles', [ 'expertprofiles']);
var bodyParser = require('body-parser');

app.use(express.static(_dirname = '/public'));
app.use(bodyParser.json());

// img path
//var imgPath = '/dataImg1.jpg';

app.get('/profiles', function(req, res){
    console.log("I got Get All Request");
    db.expertprofiles.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});
app.post('/create', function(req, res){
    console.log("I got a create Request");
    console.log(req.body);
    db.expertprofiles.insert(req.body, function(err, doc){
        res.json(doc);
        console.log(err);
    });
});

app.listen(3033);