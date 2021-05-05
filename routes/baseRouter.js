const Router=require('koa-router')
const router=new Router()

const {
    CompanyControllers,
    JobControllers,
    AppclicationControllers,
    UserControllers
}=require("../controllers/index")

const isAuthenticated=require('../policies/isAuthenticated')

//define all your routes
router.post("/companies",isAuthenticated,CompanyControllers.create)
router.get("/companies/:id",isAuthenticated,CompanyControllers.findOne)
router.get("/companies",isAuthenticated,CompanyControllers.find)
router.delete("/companies/:id",isAuthenticated,CompanyControllers.destroy)
router.put("/companies/:id",isAuthenticated,CompanyControllers.put)
//Jobs route
router.post("/jobs",isAuthenticated,JobControllers.create)
router.get("/jobs",isAuthenticated,JobControllers.find)
//Application route
router.post("/applications",isAuthenticated,AppclicationControllers.create)
//User route
router.post("/singup",UserControllers.singup)
router.post("/login",UserControllers.login)

module.exports=router;