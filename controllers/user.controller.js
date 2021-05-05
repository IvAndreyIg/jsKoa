
const jwtService = require('../services/jwt.service');
const UtilService=require('../services/util.service')

module.exports={
    async singup(ctx){
        try {

            let {email, password}=ctx.request.body;

            if(!email){
                ctx.throw(400,"please provide email")
            }
            if(!password){
                ctx.throw(400,"please provide password")
            }

            const encryptedPassword=await UtilService.hashPassword(password);
            ctx.body= await ctx.db.User.create({
                email,
                password:encryptedPassword
            })
            ctx.body='Singup successful!'


        } catch (error) {
            ctx.throw(500,error)
        }
    },
    async login(ctx){
        try {

            let {email, password}=ctx.request.body;

            if(!email){
                ctx.throw(400,"please provide email")
            }
            if(!password){
                ctx.throw(400,"please provide password")
            }

           let user= await ctx.db.User.findOne({
                where:{
                    email
                }
            })

            if(!user){
                ctx.throw(500,'unable to proccess request');
            }

            const matched=UtilService.comparedPassword(password,user.password);

            if(matched){

               const token =jwtService.issue({
                   payload:{
                       userId:user.id
                   }
               },'1 day') 


               ctx.body={token};
            }
            else{
                ctx.throw(500,'invalid password')
            }
           

        } catch (error) {
            ctx.throw(500,error)
        }
    }



}