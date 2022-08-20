const express = require('express');
const Offers = require ('../models/offers');// importing created user model
const auth = require('../middleware/auth')

const router = express.Router();

//save offers
router.post('/offer/save',(req,res)=>{

    let newOffer = new Offers(req.body);

    newOffer.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Offer saved successfully"
        });
    });
});

//get offers
router.get('/offers',(req,res) =>{
    Offers.find().exec((err,offers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });           
        }
        return res.status(200).json({
            success:true,
            existingOffers:offers
        });
    });
});

//get a specific offer

router.get("/offer/:id",(req,res) =>{

    let offerId = req.params.id;

    Offers.findById(offerId,(err,offer) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            offer
        });
    })
   
});

//update offers

router.put('/offer/update/:id',(req,res) =>{
    Offers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,offer)=>{
            if(err){
            return res.status(400).json({error:err});
        }

        return res.status(200).json({
            success:"Updated Successfully!!"
        });
    }
    );
});

//delete offer

router.delete('/offer/delete/:id',(req,res) =>{
    Offers.findByIdAndRemove(req.params.id).exec((err,deletedOffer) =>{

        if(err) return res.status(400).json({
            message:"Deletion Unsuccessful",err
        });

        return res.json({
            message:"Deleted Successfully",deletedOffer
    });

  });

});

module.exports = router;