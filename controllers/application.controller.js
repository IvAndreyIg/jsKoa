
module.exports={
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