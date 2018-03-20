var mongoose = require("mongoose")
//setting up mongoose and connecting it to the localhost where mongod server is running
mongoose.connect("mongodb://localhost/cat_app");

//definition of a cat

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String

});

var Cat = mongoose.model("Cat", catSchema)
// adding a cat to the db
/*var george = new Cat({
    name: "Mrs.Norris",
    age: 14,
    temperament: "Evil"
});
george.save(function(err,cat){
    if (err){
        console.log("Error")
    }else{
        console.log("saved a cat to db")
        console.log(cat);
    }
});*/

Cat.create({
    name: "Snow White", 
    age: 12, 
    temperament: "bland"}, function(err, cat){
        if (err){
            console.log("Error")
        }else{
            console.log("saved a cat to db")
            console.log(cat);
        }
})
 //retreiving all the cats from the db
Cat.find({},function(err,cats){
    if(err){
        console.log("Error")
        console.log(err);
    }else{
        console.log(cats)
    }
})