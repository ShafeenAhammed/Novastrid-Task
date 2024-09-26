import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await registerUser(email, password);

        res.status(201).json({message: "Registration successfull",user});
    }
    catch(err) {
        console.error("Error in registering", err);
        res.status(500).json({message:err.message})
    }
});

router.post('/login', async (req: Request,res: Response)=> {
    try{
        const {email, password} = req.body;
        const token = await loginUser(email, password);

        res.status(200).json({message: "Login successfull", token})
    }
    catch(err) {
        console.error("Error in login", err);
        res.status(500).json({message: err.message});
    }
})

export default router;