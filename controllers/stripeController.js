const stripe = require('../utils/stripe')
const argon2 = require('argon2')
var jwt = require('jsonwebtoken')
require('dotenv').config();

const Subscribe = async(req, res) => {
    let result = await stripe.Subscription()
    return res.status(200).json({
        error: false,
        message: ['Subscription ok !'],
        value : result    
    })    
}

const Unsubscribe = async(req, res) => {
    let body = req.body
    let result = await stripe.Desabonnement(body.ID_SUB,res)   
}

module.exports = {
    Subscribe,
    Unsubscribe
}

const UpdateSubscribe = async(req, res) => {
    let body = req.body
    let result = await stripe.UpdateSubscribe(body.ID_SUB,body.SUBSCRIPTION_ITEM_ID,body.NEW_PRICE_ID,res)   
}

module.exports = {
    Subscribe,
    Unsubscribe,
    UpdateSubscribe
}