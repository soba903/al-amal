const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// مسار التسجيل (Register)
// مسار التسجيل (Register) - نسخة مطورة لاكتشاف الأخطاء
// مسار التسجيل (Register) - النسخة الآمنة والمشفرة
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. التأكد من وجود البيانات
        if (!email || !password) {
            return res.status(400).json({ msg: "برجاء إدخال الإيميل والباسورد" });
        }

        // 2. البحث عن مستخدم بنفس الإيميل
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "المستخدم موجود بالفعل" });

        // 3. تشفير الباسورد (Hashing)
        const salt = await bcrypt.genSalt(10); // إنشاء "ملح" للتشفير
        const hashedPassword = await bcrypt.hash(password, salt); // تحويل الباسورد لرموز غير مفهومة

        // 4. حفظ المستخدم بالباسورد المشفر
        user = new User({ 
            email, 
            password: hashedPassword 
        });
        
        await user.save();
        res.status(201).json({ msg: "تم إنشاء الحساب بنجاح وتشفير البيانات ✅" });

    } catch (err) {
        console.error("❌ خطأ في السيرفر:", err.message);
        res.status(500).json({ msg: "حدث خطأ داخلي: " + err.message });
    }
});


// مسار الدخول (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "بيانات الدخول غير صحيحة" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "بيانات الدخول غير صحيحة" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;