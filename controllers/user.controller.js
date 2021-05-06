
const jwtService = require('../services/jwt.service');
const UtilService=require('../services/util.service')

module.exports={

    /**
     * 
     * @api {post} /signup
     * @apiGroup Users
     * @apiName signupUser
     * @apiParam {String} [email] user must need to provide the email
     * @apiParamExample {String} Request Params :
     * {
     *  "email":"test@email.com",
     *  "password":"password1" 
     * }
     * @apiParam {String} [password] user must need to provide the password
     * @apiSuccess {String} Msg Singup successful!
     * @apiSuccessExample {json} Singup-Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "msg":Singup Successful
     *  }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8000/signup
     * @apiDescription User can create new account
     */
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
    /**
     * 
     * @api {post} /login
     * @apiGroup Users
     * @apiName loginUser
     * @apiParam {String} [email] user must need to provide email
     * @apiParam {String} [password] user must need to provide the password
     * @apiParamExample {String} Requst Params :
     * {
     * "email":"test@email.com",
     *  "password":"password1" 
     * }
     * @apiSuccess {Object} Token Json web token to access to protected routes
     * @apiSuccessExample {json} Login Response
     * {
     *  "token":"XAFAFWFGGWFAWFEHFASFASFAFASF"
     * }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8000/login
     * @apiDescription User can login to the system
     * 
     */
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