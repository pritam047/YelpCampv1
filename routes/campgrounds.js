//INDEX ROUTE
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
router.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allLandscapes){
        if(err){console.log(err);}
        else
        {
            res.render("campgrounds",{campgrounds:allLandscapes});
        }
    
    })
})
//ADD NEW ROUTE
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("new");
})
//SHOW/DISPLAY ROUTE
router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err || !foundCamp)
        {
            req.flash('error', 'Sorry, that campground does not exist!');
            console.log(err);
            return res.redirect('/campgrounds');
        }
        else{
            res.render("show",{camp:foundCamp});
        }
    })
})

//EDIT ROUTE
router.get("/campgrounds/:id/edit",middleware.checkOwner,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
            res.render("edit",{campground:foundCampground});
        
    })
    //res.render("edit",{campground:foundCampground});
})
//UPDATE ROUTE
router.put("/campgrounds/:id",middleware.checkOwner,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
        if(err)
        res.redirect("/campgrounds");
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//DELETE ROUTE
router.delete("/campgrounds/:id",middleware.checkOwner,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        res.redirect("/campgrounds");
        else{
            res.redirect("/campgrounds");
        }
    })
})
//POST ROUTE TO CREATE CAMPGROUND
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    console.log(desc);
    var newCampground={name : name ,price : price , image : image ,description : desc , author:author};
    Campground.create(newCampground,function(err,newCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log("New landscape added.");
            res.redirect("/campgrounds");
        }
    })
})




module.exports=router;