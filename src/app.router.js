
import adminRouter from "./modules/admin/admin.router.js"
import AuthRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import reviewsRouter from "./modules/review/review.router.js"
import plansRouter from "./modules/plans/plans.router.js"
import classesRouter from "./modules/classes/classes.router.js"
import exercisesRouter from "./modules/exercises/exercises.router.js"
import regstrationRouter from "./modules/registration/registration.router.js"
import connectDB from "../DB/connection.js"
import cors from 'cors'


const initApp=(app,express)=>{
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.status(200).json({message:"welcome"});
    })
    app.use('/auth',AuthRouter);
    app.use('/user',userRouter);
    app.use('/admin',adminRouter);
    app.use('/reviews',reviewsRouter);
    app.use('/plans',plansRouter);
    app.use('/classes',classesRouter);
    app.use('/exercises',exercisesRouter);
    app.use('/regstration',regstrationRouter);

    app.get('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});

    }); 

    app.use((err,req,res,next)=>{
        res.status(err.statuscode).json({message:err.message});
    })

}
export default initApp;