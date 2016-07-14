/**
 * Created by suchandp on 6/23/2016.
 */
var express = require('express');

var app = express();
var mongojs = require('mongojs');
var db = mongojs('expertprofiles', [ 'expertprofiles']);
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
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

app.get('/getProfile/:id', function(req, res){
    console.log("got a get Request");
    var id = req.params.id;
    db.expertprofiles.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
        console.log(err);
    });
});

app.put('/update/:id', function (req, res) {
    console.log("update request received");
    var id = req.params.id;
    console.log(id);
    db.expertprofiles.findAndModify({
        query:{_id: mongojs.ObjectId(id)},
        update:{$set:{name:req.body.name , skills:req.body.skills, experience:req.body.experience, currentproject:req.body.currentproject,
        profile:req.body.profile, role:req.body.role }},new : true },function(response){
        console.log("updated successfully");
        console.log(response);
        res.json(response);
    });
});

app.listen(3033);