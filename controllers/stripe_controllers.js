const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getPayment = async (req, res) => {
    const {
        token,
        amount,
    } = req.body;
    
    try {
        const payment = await stripe.charges.create({
        amount,
        currency: "usd",
        description: "Example charge",
        source: token,
        });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json(error);
    }
}

