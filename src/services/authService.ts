import { User } from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (email: string, password: string) => {

    const existingUser = await User.findOne({where: {email}});
    if(existingUser) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email,password: hashedPassword});
    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({where: {email}});
    if(!user) throw new Error('User not found');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error ('Invalid Password');

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});

    return token;
}