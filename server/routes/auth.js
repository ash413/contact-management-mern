const router = require('express').Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');


router.post("/login");

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    
    //check all missing fields
    if(!name || !email || !password) 
        return res
        .status(400)
        .json({ error: `Please enter all required fields.` });

    //name validation
    if(name.length > 25) 
        return res
            .status(400)
            .json({ error: `name can only be less than 25 characters.` })

    //email validations
    const emailReg = 
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailReg.test(email)) 
        return res
            .status(400)
            .json({ error: `please enter a valid email address.` });

    //password validation
    if(password.length < 6) 
        return res
            .status(400)
            .json({ error: `password must be atleast 6 characters long.` })




    try {
        const doesUserAlreadyExist = await User.findOne({email});
        if(doesUserAlreadyExist) return res.status(400).json({error: `a user with that email already exists. please try another one.`});


        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password : hashedPassword });

        //save the user
        const result = await newUser.save();
        result._doc.password = undefined;
        return res.status(201).json({ ...result._doc });



    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;