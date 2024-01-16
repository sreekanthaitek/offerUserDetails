const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const conn = process.env.MONGO_URL;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.connect(conn);

const inputSchema = new mongoose.Schema({
    fullName: String,
    lName: String,
    fName: String,
    nationality: String,
    birthPlace: String,
    passNumber: String,
    pid: String,
    ped: String,
    pic: String,
    dob: String,
    gender: String,
    race: String,
    religion: String,
    ms: String,
    homeAdd: String,
    spouse: String,
    child: String,
    mail: String,
    tCon: String,
    mCon: String,
    bankDetails: String,
    pBank: String,
    addrBank: String,
    accNum: String,
    sortCode: String,
    bLocation: String,
    swiftCode: String,
    iban: String,
    bInfo: String,
    taxIdentity: String,
    emgName: String,
    emgRelation: String,
    contact: String,
    addr: String,
})

const InputData = mongoose.model('InputData',inputSchema);

app.post('/upload',async(req,res)=>{
    let {lName,fullName,fName,nationality,birthPlace,passNumber,pid,ped,pic,dob,gender,race,religion,ms,homeAdd,spouse,child,mail,tCon,mCon,bankDetails,pBank} = req.body;
    let {addrBank,accNum,sortCode,bLocation,swiftCode,iban,bInfo,taxIdentity,emgName,emgRelation,contact,addr} = req.body;
    try{
        const inputData = new InputData({
            fullName: fullName,
            lName: lName,
            fName: fName,
            nationality: nationality,
            birthPlace: birthPlace,
            passNumber: passNumber,
            pid: pid,
            pic: pic,
            ped: ped,
            dob: dob,
            gender: gender,
            race: race,
            religion: religion,
            ms: ms,
            homeAdd: homeAdd,
            spouse: spouse,
            child: child,
            mail: mail,
            tCon: tCon,
            mCon: mCon,
            bankDetails: bankDetails,
            pBank: pBank,
            addrBank: addrBank,
            accNum: accNum,
            sortCode: sortCode,
            bLocation: bLocation,
            swiftCode: swiftCode,
            iban: iban,
            bInfo: bInfo,
            taxIdentity: taxIdentity,
            emgName: emgName,
            emgRelation: emgRelation,
            contact: contact,
            addr: addr, 
        });
        await inputData.save();
        let a3 = fs.readFileSync('public/submit.html')
        res.send(a3.toString());
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/form.html');
});

app.get('/upload',(req,res)=>{
    res.sendFile(__dirname+'/public/upload.html');
});

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})