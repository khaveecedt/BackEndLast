const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require("../models/userModel.js");
const submit = require("../models/klonModel.js");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// fetch users
router.get('/',async (req,res) => {
    //console.log(emailRegex.test("asd@asd.asd"))
    try{
        const users = await user.find();
        res.status(200).json(users)
    }
    catch(err){
        console.err(err)
        return res.status(500).json({error : 'Internal server error'})
    }
})

// login 
router.post('/login',async (req,res) => {
    const { username , password} = req.body;

    // console.log(await user.findOne({email}))
    try{
        if(emailRegex.test(username) === true){
            email=username;
            //console.log(email)
            let id_acc = (await user.findOne({email , password}))
            if(id_acc != {}){
                // user = await user.findOne({email , password})
                return res.status(200).send(username)
            }
            else{
                return res.status(500).json({error : 'username or password wrong'})
            }
        }
        else{
            if( await user.findOne({username , password})){
                return res.status(200).send(username)
            }
            else{
                return res.status(500).json({error : 'username or password wrong'})
            }            
        }
    }
    catch (err){
        console.log("error");
        return res.status(500).json({error : 'Internal server error'})
    }
})

// singup
router.post('/sign_up', async (req, res) => {
    const { username, password ,email} = req.body;
    console.log(req.body)
    if(emailRegex.test(email)==true){
        try {
            // Check if the username already exists in the database
            const existingUser = await user.findOne({ username });
            const existingEmail = await user.findOne({ email });
            console.log(existingUser)
      
            if (existingUser) {
              return res.status(400).json({ error: 'Username already exists' });
            }
            else if(existingEmail){
              return res.status(400).json({ error: 'Email already exists' });
            }
        
            // Create a new user if the username doesn't exist
            const newUser = new user({ username, password ,email});
            await newUser.save();
        
            return res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
          }
    }
    else{
        res.json({message : "You don't have a permission"})
    }
    
  });

  router.post('/submit', async (req,res) => {
    /*
    {
        username : "",
        klon : ""
    }
    */
    var { username , klon} = req.body;
    // const User = await user.findOne({username})
    // console.log(User.email)
    // console.log((await user.findOne({username})).email)
    if(emailRegex.test(username) === true){
        try{
            email=username
            const a = await user.findOne({email})
            console.log(a)
            if(a){
                username = a.username                 
            }
            else{
                return res.json({ message : "Wrong input"})
            }
        }
        catch(error){
            console.log("err")
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
    try {
        // Check if the klon already exists in the database
        if(await user.findOne({username})){

        /* {Code for not accept the same klon}
        const existingUserAndKlon = await summit.findOne({ username , klon });
        console.log({username , klon})
        if (existingUserAndKlon) {
          return res.status(400).json({ error: 'Klon already exists' });
        }
        */

        //Create a new user if the username doesn't exist
        const newKlon = new submit({ username, klon });
        await newKlon.save();
        return res.status(201).json({ message: 'Klon added successfully' });
        }
        else{
            res.json({ message : "Klon added fail"})
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
})

// get all poem
router.get('/allsubmissions' , async (req,res) => {
    try{
        const Submission = await submit.find();
        res.json(Submission)
    }
    catch(err){
        console.err(err)
        return res.status(500).json({error : 'Internal server error'})
    }    
})

// delete by poem_id
router.post('/delete', async (req,res) =>{
    try{
        const { id } = req.body;
        console.log(id)
        await submit.deleteOne({_id : id});
        res.json({ message : 'Delete completed'})
    }
    catch(err){
        console.err(err)
        return res.status(500).json({error : 'Internal server error'})
    }
})

module.exports = router;