const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_PC);


const Subscription = async() => {

    try {

        // pour créer une carte de payment
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              number: '4242424242424242',
              exp_month: 8,
              exp_year: 2024,
              cvc: '314',
            },
        });   
        
        console.log(paymentMethod.id)  

        // create customer 
        const customer = await stripe.customers.create({
            email: 'fteboukeu@gmail.com',
        });

        console.log(customer.id)


        // on relie la carte au customer
        const paymentMethodAttach = await stripe.paymentMethods.attach(
            paymentMethod.id,
            {customer: customer.id}
          );


        // on créer l'abonnement   
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {price: process.env.STRIPE_PRODUIT},
            ],
            default_payment_method: paymentMethod.id
        });
        console.log(subscription)
        return subscription;
    } catch (error) {
        console.log(error)
        return false;
    }

}

const Desabonnement = async(ID_SUBSCRIPTION,res) => {
    console.log("subscription :",ID_SUBSCRIPTION)
    stripe.subscriptions.update(
        ID_SUBSCRIPTION,
        {
          cancel_at_period_end: true
        },
        function(err, subscription) {
          if (err) {
            // Gérer les erreurs
          } else {
            console.log(subscription)
            return res.status(200).json({
                error: false,
                message: ['Désabonnement ok !'],
                value : subscription    
            }) 
            // Subscription mise à jour avec succès
          }
        }
      );
}

const UpdateSubscribe = async(ID_SUBSCRIPTION,SUBSCRIPTION_ITEM_ID,NEW_PRICE_ID,res) => {
    console.log("subscription last:",ID_SUBSCRIPTION)
    stripe.subscriptions.update(
        ID_SUBSCRIPTION,
        {
        items: [{
            id: SUBSCRIPTION_ITEM_ID,
            price: NEW_PRICE_ID,
          }]
        },
        function(err, subscription) {
          if (err) {
            // Gérer les erreurs
          } else {
            console.log(subscription)
            return res.status(200).json({
                error: false,
                message: ['Désabonnement ok !'],
                value : subscription
            }) 
            // Subscription mise à jour avec succès
          }
        }
      );
}

module.exports= {
    Subscription,
    Desabonnement,
    UpdateSubscribe
}



