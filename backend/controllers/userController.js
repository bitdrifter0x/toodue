import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword

        })

        const payload = { id: user._id }
        const secretKey = process.env.JWT_SECRET;
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secretKey, options);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000
        })

        res.status(201).json({ message: 'User created successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error })
    }
}


export const loginUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exists' })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        

        const payload = { id: existingUser._id }
        const secretKey = process.env.JWT_SECRET;
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secretKey, options);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000
        })

        res.status(200).json({ message: 'logged in successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error })
    }

}


export const verifyAuth = async (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ authenticated: false });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ authenticated: true, userId: decoded.id });
    } catch (error) {
        res.status(401).json({ authenticated: false });
    }
}

export const logoutUser = async (req, res) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })
    res.json({ message: 'Logged out successfully' });
}





