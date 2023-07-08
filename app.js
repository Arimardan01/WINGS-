var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
  console.log("db connected")
}

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/courses', (req, res) => {
    res.render('courses')
})
app.get('/idea', (req, res) => {
    res.render('idea')
})
app.get('/resources', (req, res) => {
    res.render('resources')
})



const user_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
});

const user = mongoose.model('user',user_schema)

app.post("/signup",async (req,res)=>{
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
    console.log(data);
    const new_user = new user(data);
    await new_user.save();
    return res.redirect('index2.html')
})


app.post('/login', async (req, res) => {

    try {
        
        
        const check = await user.findOne({ email:req.body.email });
         if (check.password == req.body.password) {
            return res.redirect('index2.html')
         }

        else {
            res.send("incorrect password")
        }
    }
    catch (e) {

        res.status(400).send("wrong details")
    }
    

});




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('signup.html');
}).listen(3000);


console.log("Listening on PORT 3000");