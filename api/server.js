require('dotenv').config();

if (!process.env.AIRTABLE_API_KEY) {
   console.log("Please specify an AIRTABLE_API_KEY environment variable");
   return;
}

const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const Router = require('@koa/router');
const Koa = require('koa');

const Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
   .base('appIfjQZZE4PYWOZc');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(logger());

router.get('/', async ctx => {
   ctx.status = 200;
   ctx.body = 'Fine';
});

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
         "Volunteer During": body.volunteerDuring
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

   var diet = new Promise((resolve, reject) => {
      let fields = body.diet;
      fields.Name = body.name;
      base('Diets').create(
         [{ fields: fields }], 
         (err, records) => err ? reject(err) : resolve(records)
      );
   });

   var allergies = new Promise((resolve, reject) => {
      let fields = body.allergies;
      fields.Name = body.name;
      base('Allergies').create(
         [{ fields: fields }],
         (err, records) => err ? reject(err) : resolve(records)
      );
   });

   await Promise.all([guest, diet, allergies])
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

app.use(router.routes());
app.listen(3000);