const express = require('express');
const app = express();

const {check, validationResult}= require('express-validator/check');
const {matchedData} = require('express-validator/filter');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', './public');
app.set('view engine', 'twig');

app.get('/', (req, res)=>{
    res.render('formValidate', {header: "Sing Up"});
})

app.post('/', [
    check('email', 'error acurred in email').trim().isEmail().normalizeEmail(),
    check('password', 'password must be greater then 5').trim().isLength({min: 5}),
    check('rePassword').custom((val, {req})=>{
        if(val !== req.body.password)
            throw new Error("error acurred in Password");
        else 
            return true; 
    })
    
] , (req, res)=>{
    const Errors = validationResult(req);
    var data = matchedData(req);
        // console.log(Errors.mapped())
        // console.log(data);
        // console.log(req.params);
        
    if (!Errors.isEmpty())
        res.render('formValidate', {error: Errors.mapped(), user: data})
    else
        res.render('formValidate', {user: data});
})
app.listen(4000, ()=> console.log('server is starting'));