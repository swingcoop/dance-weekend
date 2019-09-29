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
   await new Promise ((resolve, reject) => {
      base('Reservations').create([{ fields: ctx.request.body }], 
         (err, records) => {
            if (err) {
               ctx.throw(500, err.message);
            }
            ctx.status = 200;
            resolve();
         }
      );
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