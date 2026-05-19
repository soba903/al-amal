const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // تم التصحيح هنا
const jwt = require('jsonwebtoken');

// API التسجيل (Register)
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "المستخدم موجود بالفعل" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ msg: "تم إنشاء الحساب بنجاح ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API تسجيل الدخول (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "المستخدم غير موجود" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "كلمة المرور خطأ" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
        res.json({ token, msg: "تم تسجيل الدخول بنجاح 🚀" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;