const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: "لا يوجد توكن، الوصول مرفوض" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // كدة الأمن سمحلك تعدي وتروح لصفحة الدفع
    } catch (err) {
        res.status(401).json({ msg: "التوكن غير صالح" });
    }
};