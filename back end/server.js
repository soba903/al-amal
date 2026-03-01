const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // درع حماية الـ Headers
const rateLimit = require('express-rate-limit'); // منع الهجمات المتكررة
// const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const app = express();

// 1. طبقات الحماية الأساسية (Security Middlewares)
app.use(helmet()); // تأمين الرؤوس
// app.use(mongoSanitize());
app.use(express.json({ limit: '10kb' })); // حماية من بعت ملفات ضخمة توقع السيرفر
app.use(cors()); // السماح للـ Front-end يكلم السيرفر

// 2. تحديد عدد الطلبات (Rate Limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // كل 15 دقيقة
    max: 100, // 100 طلب فقط لكل IP
    message: "عدد طلبات كتير جداً، جرب تاني كمان 15 دقيقة"
});
// app.use('/api', limiter);

// 3. الربط بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/marten')
    .then(() => console.log('✅ تم الاتصال بـ MongoDB بنجاح والأمان 100%'))
    .catch(err => console.error('❌ فشل الاتصال:', err));

// 4. تعريف المسارات
app.use('/api/auth', require('./Routes/auth'));
// app.use('/api/payment', require('./Routes/payment'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 السيرفر المتأمن شغال على بورت ${PORT}`));
