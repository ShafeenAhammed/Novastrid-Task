import express, { Request, Response } from 'express';
import multer  from 'multer';
import exceljs from 'exceljs';
import { sequelize } from '../models';
import { ChatImport } from '../models/chatImport';

const router = express.Router();
const upload = multer();

router.post('/import-chat', upload.single('file'), async (req: Request,res: Response)=>{
    const transaction = await sequelize.transaction();
    try{
        const wb = new exceljs.Workbook();
        await wb.xlsx.load(req.file.buffer);
        const ws = wb.getWorksheet(1);
        const chatData: any = [];
        ws?.eachRow((row, rowNumber) => {
            const message = row.getCell(1).value?.toString();
            const status = row.getCell(2).value?.toString() === 'completed' ? 'completed' : 'pending';
            
            chatData.push(
                {
                    message: message || '', 
                    status: status || 'pending,'
                }
            )
        });

        await ChatImport.bulkCreate(chatData, {transaction});

        res.status(200).json({message: "Chat import success"});
    }
    catch(err){
        console.error("Error in importing chat",err);
        res.status(500).json({message: err.message});
    }
})

router.get('/imports', async (req: Request,res: Response)=>{
    const {status} = req.query;

    let imports;

    if(status) {
        imports = await ChatImport.findAll({where: {status}});
    }else {
        imports = await ChatImport.findAll();
    }

    res.status(200).json({message: "Success", chat: imports})
})

export default router;