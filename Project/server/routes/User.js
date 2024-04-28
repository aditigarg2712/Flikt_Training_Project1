import express from 'express'
import bcrypt from 'bcrypt'
import { User} from '../models/User.js'
import { UserData} from '../models/UserData.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
const router = express.Router();

router.post('/Signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: "User already existed" })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({ status: true, message: "record registered" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: "user is not registered" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({ message: "password is incorrect" })
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: "login Successfully",userId: user._id })

})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "User not registered" })
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aditigarg27122000@gmail.com',
                    pass: 'hrzd kutm csjp mjgs'
                }
            });

            var mailOptions = {
                from: 'aditigarg27122000@gmail.com',
                to: email,
                subject: 'Reset Password Link',
                text: `http://localhost:5173/resetPassword/${token}`
            };

            transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    return res.json({ message: "error sending email" })
                } else {
                    return res.json({ status: true, message: "email sent" })
                }
            });
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
        return res.json({ status: true, message: "updated password" })
    } catch (err) {
        console.log(err);
        return res.json("invalid token")
    }
})
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "no token" })
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.userId = decoded.id;

        next();

    }
    catch (err) {
        return res.json(err)
    }

}
router.get("/verify", verifyUser, (req, res) => {
    return res.json({status : true, message : "authorized"})

})


router.post('/create-user-data', verifyUser, async (req, res) => {
    try {
        const { name, email, age, phoneNumber, address,createdBy } = req.body; // Extract data from the request body

        // Create a new instance of UserData model with the extracted data
        const newUserData = new UserData({
            name,
            email,
            age,
            phoneNumber,
            address,
            createdBy // Associate the data with the authenticated user
        });

        // console.log(newUserData)

        // Save the new user data to the database
        await newUserData.save();

        return res.json({ status: true, message: "User data created successfully", userData: newUserData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



// Retrieve a single user-specific data by ID
router.get('/user-data/:id', verifyUser, async (req, res) => {
    try {
        const singleUserData = await UserData.find({ createdBy: req.params.id });
        if (!singleUserData) {
            return res.status(404).json({ message: "User data not found" });
        }
        return res.json(singleUserData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update user-specific data by ID
router.put('/update-user-data/:id', verifyUser, async (req, res) => {
    try {
        const { data } = req.body;
        const updatedUserData = await UserData.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.userId },
            { data },
            { new: true }
        );
        if (!updatedUserData) {
            return res.status(404).json({ message: "User data not found" });
        }
        return res.json({ status: true, message: "User data updated successfully", userData: updatedUserData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete user-specific data by ID
router.delete('/delete-user-data/:id', verifyUser, async (req, res) => {
    try {
        const deletedUserData = await UserData.findOneAndDelete({ _id: req.params.id, createdBy: req.userId });
        if (!deletedUserData) {
            return res.status(404).json({ message: "User data not found" });
        }
        return res.json({ status: true, message: "User data deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});




router.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true })

})

export { router as UserRouter}