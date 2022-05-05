var express = require("express");
var app = express();
var session = require('express-session');
var flash = require('express-flash');

app.set('view engine', 'ejs');

//Body-parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//flash
app.use(flash());

app.get("/",(req,res) => {
    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");

    var email = req.flash("email");
    var pontos = req.flash("pontos");
    var nome = req.flash("nome");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError

    email = (email == undefined || email.length ==0) ? "" : email;
    pontos = (pontos == undefined || pontos.length ==0) ? "" : pontos;
    nome = (nome == undefined || nome.length ==0) ? "" : nome;

    res.render("index",{emailError, pontosError, nomeError, email, pontos, nome})
})

app.post("/form",(req,res) => {
    var {email, nome, pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == "") {
        emailError = "O email não pode ser vazio";
    }

    if(pontos == undefined || pontos <20) {
       pontosError = " Pontos não pode ser menos de 20 pontos";
    }

    if(nome == undefined || nome == "") {
        nomeError = "O nome não pode ser vazio";
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError", nomeError);

        req.flash("email", email);
        req.flash("email", nome);
        req.flash("email", pontos);

        res.redirect("/")
    } else {
        res.send("FORM VÁLIDO")
    }



})

app.listen(8080,(req,res) => {
    console.log("Servidor rodando")
})