const Router=require('koa-router')
const router=new Router()

const {CompanyControllers}=require("../controllers/index")
//define all your routes
router.post("/companies",CompanyControllers.create)
router.get("/companies/:id",CompanyControllers.findOne)
router.get("/companies",CompanyControllers.find)
router.delete("/companies/:id",CompanyControllers.destroy)
router.put("/companies/:id",CompanyControllers.put)


module.exports=router;