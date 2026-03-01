const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json()); // عشان يفهم البيانات اللي جاية بصيغة JSON
app.use(cors());        // عشان يسمح للـ Frontend يكلمه
app.use('/api/auth', require('../Routes/auth'));
app.use('/api/payment', require('../Routes/payment'));

// الاتصال بقاعدة البيانات (هنحط الرابط في ملف .env)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("تم الاتصال بنجاح بالقاعدة ✅"))
    .catch(err => console.log("خطأ في الاتصال: ", err));

app.get('/', (req, res) => res.send("السيرفر شغال وزي الفل"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`السيرفر شغال على بورت ${PORT}`));