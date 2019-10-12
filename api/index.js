require('dotenv').config();

if (!process.env.AIRTABLE_API_KEY) {
   console.log("Please specify an AIRTABLE_API_KEY environment variable");
   return;
}

if (!process.env.STRIPE_API_KEY) {
   console.log("Please specify a STRIPE_API_KEY environment variable");
   return;
}

const axios = require('axios');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const Router = require('@koa/router');
const Koa = require('koa');
const serve = require('koa-static');

const Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base('appIfjQZZE4PYWOZc');

const SlackWebhook = process.env.SLACK_WEBHOOK;
const StripeApiKey = process.env.STRIPE_API_KEY;

const stripe = require('stripe')(StripeApiKey);

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(logger());

// router.get('/', async ctx => {
//    ctx.status = 200;
//    ctx.body = 'Fine';
// });

router.post('/', async ctx => {
   ctx.status = 200;
   ctx.body = 'Fine';
});

router.get('/api/reservations', async ctx => {
   ctx.status = 200;
   ctx.body = "Ok!";
});

router.post('/api/reservations', async (ctx, next) => {
   var body = ctx.request.body;

   var guest = new Promise ((resolve, reject) => {
      let fields = {
         Name: body.name,
         Email: body.email,
         "In Corvallis": body.residency,
         "Hosting Interest": body.hostingInterest,
         "Looking For Housing": body.housingInterest,
         "Volunteer Before": body.volunteerBefore,
         "Shirt Interest": body.shirtInterest,
         "Volunteer During": body.volunteerDuring,
         // Hosting
         "How Many Guests": body.hostingHowMany,
         "Hosting Comments": body.hostingComments,
         "Excited to Host": body.excited,
         "Has Pets": body.hasPets,
         "Smokers Welcome": body.smokersWelcome,
         "Has Car": body.hasCar,
         // Travelers
         From: body.from,
         "Train Interest": body.trainInterest,
         "Carpool Interest": body.carpoolInterest,
         "Travel Flexible": body.flexible,
         "Pet Allergies": body.petAllergies,
         Smokes:body.smokes,
         "Needs Car": body.needsCar,
         "Travel Comments": body.housingComments,
         // Diet
         Vegetarian: body.diet && body.diet.vegetarian,
         Vegan: body.diet && body.diet.vegan,
         "Likes Checking Boxes": body.diet && body.diet.fun,
         // Allergies
         ...body.allergies,
         // Payment
         "Payment Type": body.payment,
         "Transaction ID": body.transactionId,
         // Everything / fallback
         All: JSON.stringify(body),
      };

      base('Guests').create(
         [{ fields: fields }], 
         (err, records) => {
            if (err)
               reject(err)
            else
               resolve(records)
         }
      );
   });

   var notifyTeam = new Promise ((resolve, reject) => {
      if (!SlackWebhook) {
         resolve();
         return;
      }
      
      let payload = {
         text: "Attending: " + body.name
      };

      axios.post(SlackWebhook, payload)
         .then(resolve)
         .catch(reject);
   });

   await Promise.all([guest])
   .then(() => {
      ctx.status = 200;
   })
   .catch(err => {
      ctx.throw(500, err);
   });

   await notifyTeam;
});

router.post('/api/charge', async (ctx, next) => {
   var token = ctx.request.body.token;
   var name = ctx.request.body.name;
   
   try {
      const charge = await stripe.charges.create({
         amount: 6000,
         currency: 'usd',
         description: 'Corvallis Swing Weekend',
         source: token,
         statement_descriptor: 'Corvallis Swing Dance',
      });

      await new Promise((resolve, reject) => {
         var fields = {
            Name: name,
            Amount: 60,
            Type: "card",
            "Transaction ID": charge.id
         };
         base('Payments').create(
            [{ fields: fields }], 
            (err, records) => {
               if (err)
                  reject(err)
               else
                  resolve(records)
            }
         );
      })
      .then(() => {
         ctx.status = 200;
         ctx.message = charge.id;
      })
      .catch(err => {
         ctx.status = 500;
         ctx.message = err.message;
      });
   }
   catch (err) {
      switch (err.type) {
         case 'StripeCardError':
           // A declined card error
           ctx.status = 400;
           break;
         case 'StripeInvalidRequestError':
           // Invalid parameters were supplied to Stripe's API
         case 'StripeAPIError':
           // An error occurred internally with Stripe's API
         case 'StripeConnectionError':
           // Some kind of error occurred during the HTTPS communication
         case 'StripeAuthenticationError':
           // You probably used an incorrect API key
         case 'StripeRateLimitError':
           // Too many requests hit the API too quickly
           ctx.status = 500;
           break;
       }
       ctx.message = err.message; // => e.g. "Your card's expiration year is invalid."
   }
});

router.post('/api/declines', async (ctx, next) => {
   var body = ctx.request.body;

   if (SlackWebhook) {
      try {
         let payload = {
            text: "Unable to attend: " + body.name + "\n\"" + body.note + "\""
         };
         await axios.post(SlackWebhook, payload);
      }
      catch (err) {
         ctx.throw(500, err);
      }
   }

   await new Promise ((resolve, reject) => {
      let fields = {
         Name: body.name,
         Note: body.note
      };

      base('Declines').create(
         [{ fields: fields }], 
         (err, records) => {
            if (err)
               reject(err)
            else
               resolve(records)
         }
      );
   })
   .then(() => {
      ctx.status = 200;
   })
   .catch(err => {
      ctx.throw(500, err);
   });
});

app.use(async (ctx, next) => {
   await next();
   if (ctx.status === 404) {
      // The default koa status is 404, but
      // in our API layer 204 is more useful.
      ctx.status = 204;
   }
});

app.use(serve(__dirname + '/dist'));
app.use(router.routes());
app.listen(3000);