const express = require ('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));      //Use this to use css files

app.get("/", function(req, res){
    res.sendFile( __dirname + "/signup.html");    
})

app.post("/" , function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/26537577bb";
    
    const options = {
        method: "POST",
        auth: [API_KEY]
    }
   const request = https.request(url , options , function(response){
       
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        res.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})


//API KEY : 
