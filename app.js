var express          =      require("express"),
    app              =      express(),
    bodyParser       =      require("body-parser"),
    mongoose         =      require("mongoose"),
    passport         =      require("passport"),
    LocalStrategy    =      require("passport-local"), 
    User             =      require("./models/user"),
    flash            =      require("connect-flash");
    Campground       =      require("./models/campground"), 
    Comment          =      require("./models/comment"),
   // seedDB           =      require("./seeds"), 
    methodOverride   =      require("method-override");
var commentRoutes    =      require("./routes/comments"),      
    campgroundRoutes =      require("./routes/campgrounds"),
    indexRoutes       =     require("./routes/index");

var PORT=process.env.PORT || 3000;   
//seedDB();
//mongoose.connect("mongodb://localhost/yelpcamp",{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.connect("mongodb+srv://pritam:pikaz143@yccluster-hcyz4.mongodb.net/yelpcamp?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
//Passport Configuration
app.use(require("express-session")({
    secret:"TripleXXX",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
 });
 
 app.use("/campgrounds/:id/comments",commentRoutes);
 app.use(campgroundRoutes);
 app.use(indexRoutes);


// Campground.create(
//     {name:"Mountain Under Clouds",image:"https://images.unsplash.com/photo-1438382458652-54431bf59e01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Green Grass",image:"https://images.unsplash.com/reserve/unsplash_524010c76b52a_1.JPG?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
// function(err,campground){
//     if(err){
//         console.log(err);
//     }
    
//     else{
//         console.log("NEW LANDSCAPE ADDED.");
//     }

// })


// var landscapes=[
//     {name:"Flying Birds",image:"https://images.unsplash.com/photo-1506333438925-a6203045b492?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
//     {name:"Mountain Under Clouds",image:"https://images.unsplash.com/photo-1438382458652-54431bf59e01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Green Grass",image:"https://images.unsplash.com/reserve/unsplash_524010c76b52a_1.JPG?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
//     {name:"Flying Birds",image:"https://images.unsplash.com/photo-1506333438925-a6203045b492?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
//     {name:"Mountain Under Clouds",image:"https://images.unsplash.com/photo-1438382458652-54431bf59e01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=500&q=60"},
//     {name:"Green Grass",image:"https://images.unsplash.com/reserve/unsplash_524010c76b52a_1.JPG?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}

// ]

app.listen(PORT);