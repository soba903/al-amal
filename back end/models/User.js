const mongoose = require('mongoose');

// تعريف شكل بيانات المستخدم (Schema)
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // ممنوع تكرار الإيميل
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// تصدير الموديل عشان نقدر نستخدمه في auth.js
module.exports = mongoose.model('User', UserSchema);