const { find } = require("./company.controllers")


    
module.exports={
    /**
     * 
     * @api {post} /jobs
     * @apiGroup Jobs
     * @apiName createJob
     * @apiParam {String} [title] user must need to provide the job title
     * @apiParam {Number} [CompanyId] user must need to provide the CompanyId
     * @apiParamExample {String} Request Params :
     * {
     *  "title":"Node.js developer",
     *  "CompanyId":"2" 
     * }
     * @apiSuccess {Object} Job A newly created job
     * @apiSuccessExample {json} Job-create-Response:
     * {
     * "id":1,
     * "title":"Node.js developer",
     * "CompanyId":"2" 
     *  }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8000/create
     * @apiDescription LoggedIn user can create new job
     * @apiHeader {String} Authorization JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization":"jdkfawkfwga31231241231"
     * }
     */
    async create(ctx){
        try {

            if(!ctx.request.body.title){
                ctx.throw(400,'please provide the job title')
            }

            if(!ctx.request.body.CompanyId){
                ctx.throw(400,'please provide the CompanyId')
            }

            ctx.body=await ctx.db.Job.create({
                title:ctx.request.body.title,
                CompanyId:ctx.request.body.CompanyId
            })
            


        } catch (error) {
            //ctx.body=error;
            ctx.throw(500,error)
        }
    },
    /**
     * 
     * @api {get} /jobs
     * @apiGroup Jobs
     * @apiName getJob
     * @apiSuccess {Object[]} Job List of Jobs with Candidates
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8000/create
     * @apiDescription LoggedIn user can view all jobs
     * @apiHeader {String} Authorization JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization":"jdkfawkfwga31231241231"
     * }
     */
    async find(ctx){
        try {
            ctx.body= await ctx.db.Job.findAll({
                include:[
                    {
                        model:ctx.db.Candidate
                    }
                ]
            })
        } catch (error) {
            ctx.throw(500,error)
        }
    }
}