const  mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    description : String,
    servingSize : String,
    macronutrients : String, // protein fat
    micronutrients : String, //vitamin mineral
    foodCategory : String,
    createdAt : {
        type: Date,
        default : Date.now,
    },
    updatedAt : {
        type: Date,
        default : Date.now,
    },
    deletedAt : {
        type : Date
    }
});

// String ifade db table adı
module.exports = mongoose.model("food_items", FoodItemSchema);