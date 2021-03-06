const Koa=require("koa");
const router=require('./routes/baseRouter')
const bodyParser=require('koa-parser')
const _= require('lodash')
const  serve=require('koa-static')

const app=new Koa();
const PORT=8000;


const db=require('./models')

//console.log("db:",db)

db.sequelize.sync({alter:true})
    .then(()=>console.log('models synced!'))
    .catch(err=>console.log(err));

app.context.db=db;
app.use(bodyParser());
app.use(serve(__dirname+'/public'));
app.use(router.routes())
app.listen(PORT);
console.log(`Server is listening on port:${PORT}`);