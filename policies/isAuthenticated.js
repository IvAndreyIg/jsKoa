const jwtService=require('../services/jwt.service')

module.exports=async (ctx,next)=>{

    try {
         let token='';
    if(ctx.req.headers&& ctx.req.headers.authorization){
        token=ctx.req.headers.authorization
    }
    else{
        ctx.throw(401,'Authorization header is missing')
    }

    const decodedToken=jwtService.verify(token);

    const user=await ctx.db.User.findOne({
        where:{
            id:decodedToken.payload.userId
        }
    })

    if(user){
        ctx.state.user=user.id;
        await next();
    }
    else{
        ctx.throw(401,'Unauthorised');
    }
    } catch (error) {
        console.log(error);
        console.trace(error);
    }
   
}