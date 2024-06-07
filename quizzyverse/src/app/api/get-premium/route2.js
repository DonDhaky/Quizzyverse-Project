import { buffer } from 'micro';
import Stripe from 'stripe';
import { query } from '../../../../lib/mysql';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      console.error(`Error message : ${err.message}`);
      return res.status(400).send(`Webhook error : ${err.message}`);
    }

    // gestion de l'événement checkout.session.completed
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;

        console.log("get-premium route : ", session);
        console.log("get-premium route : ", userId);

        try {
          const result = await query(
            'UPDATE users SET is_premium = ? WHERE id = ?',
            [1, userId]
          );
  
          if (result.affectedRows > 0) {
            console.log(`Updated user ${userId} to premium`);
          } else {
            console.error(`Failed to update user ${userId}`);
          }
        } catch (error) {
          console.error(`Error updating user ${userId}:`, error);
          return res.status(500).send('Internal Server Error');
        }
      }
  
      res.status(200).json({ received: true });
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  };
  
  export const POST = webhookHandler;