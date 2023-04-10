module.exports= {
home :(req,res)=>{
    res
    .status(200)
    .render("index")
},
about :(req,res)=>{
    res
    .status(200)
    .render("about")
},
contact :(req,res)=>{
    res
    .status(200)
    .render("contact")
},
service :(req,res)=>{
    res
    .status(200)
    .render("service")
},
hire:(req,res)=>{
    res
    .status(200)
    .render("hire")
},
login:(req,res)=>{
    res
    .status(200)
    .render("login")
},
signup:(req,res)=>{
    res
    .status(200)
    .render("signup")
}

}