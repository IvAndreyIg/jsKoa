
module.exports={

    /**
     * 
     * @api {post} /applications
     * @apiGroup Applications
     * @apiName createJob
     * @apiParam {String} [firstName] 
     * @apiParam {String} [lastName] 
     * @apiParam {String} [email] 
     * @apiParam {Number} [jobId] 
     * @apiSuccess {Object} Application A newly create Application
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:8000/applications
     * @apiDescription LoggedIn user can create application
     * @apiHeader {String} Authorization JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization":"jdkfawkfwga31231241231"
     * }
     */
    async create(ctx){
        try {

           

            const candidate=await ctx.db.Candidate.create({
                firstName:ctx.request.body.firstName,
                lastName:ctx.request.body.lastName,
                email:ctx.request.body.email
            })
            ctx.body =await ctx.db.Application.create({
                JobId:ctx.request.body.jobId,
                CandidateId:candidate.id
            })


        } catch (error) {
            //ctx.body=error;
            ctx.throw(500,error)
        }
    }
}