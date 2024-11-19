const express = require('express');
const router = express.Router();


const FoodItem = require('../model/FoodItem');

router.get('/', function(req, res, next) {
    FoodItem.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.json(err);
        });
});




router.get('/:id', function(req, res, next) {
    FoodItem.findById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        });
});


router.post('/', function(req, res, next) {
    const foodItem = new FoodItem({
        name : req.body.name,
        description : req.body.description,
        servingSize : req.body.servingSize,
        macronutrients : req.body.macronutrients,
        micronutrients : req.body.micronutrients,
        foodCategory : req.body.foodCategory
    });

    foodItem.save()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        });
});



router.patch('/:id', (req,res)=>{

    const item = FoodItem.find(item => item.id === parseInt(req.params.id));
    if(!item){
        return res.status(404).json({msg: 'Item not found'});
    }


    
    
});


module.exports = router;
