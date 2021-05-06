
module.exports={
    /**
     * 
     * @api {post} /companies
     * @apiGroup Companies
     * @apiName createCompany
     * @apiParam {String} [firstName] 
     * @apiParam {String} [lastName] 
     * @apiParam {String} [email] 
     * @apiParam {Number} [jobId] 
     * @apiSuccess {Object} Company A newly created Company Object
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8000/companies
     * @apiDescription LoggedIn user can register new company
     * @apiHeader {String} Authorization JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization":"jdkfawkfwga31231241231"
     * }
     */
    async create(ctx){

        

        try {
           ctx.body= await ctx.db.Company.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                address: ctx.request.body.address,
                UserId:ctx.state.user
            })
        } catch (err) {
            ctx.throw(500,err)
        }
    },

    /* async find(ctx){

        

        try {
           ctx.body= await ctx.db.Company.findAll({})
        } catch (err) {
            ctx.throw(500,err)
        }
    }, */
    async find(ctx){

        

        try {
           ctx.body= await ctx.db.Company.findAll({
            UserId:ctx.state.user,
            include:[
                   {
                       model:ctx.db.Job
                   }
               ]
           })
        } catch (err) {
            ctx.throw(500,err)
        }
    },
    async findOne(ctx){
        try {
          let company  = await ctx.db.Company.findOne({
            where: {
                    id: ctx.params.id
            },
            include:[
                {
                    model:ctx.db.Job
                }
            ]
        })
            if(!company){
                ctx.throw(404,'company id is invalid')
            }else
            ctx.body=company
        } catch (err) {
            ctx.throw(500,err)
        }
    },
    async destroy(ctx){
        try {
            
            let result=await ctx.db.Company.destroy({
                where: {
                    id: ctx.params.id
            }})

            result===0?ctx.throw(500,`no company with id:${ctx.params.id}`):ctx.body=`Company deleted with id: ${ctx.params.id}`

        } catch (err) {
            ctx.throw(500,err)
            
        }
    },
    async put(ctx){
        try {
            
            let result=await ctx.db.Company.update({
                name:ctx.request.body.name,
                city:ctx.request.body.city,
                address:ctx.request.body.address
            },{
                where: {
                    id: ctx.params.id
            }})

            result===0?ctx.throw(500,`no company with id:${ctx.params.id}`):ctx.body=`Company update with id: ${ctx.params.id}`

        } catch (err) {
            ctx.throw(500,err)
            
        }
    }
}