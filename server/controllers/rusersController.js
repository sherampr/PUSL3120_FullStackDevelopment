const User = require('../models/userModel'); 

exports.rusers = async (req, res) => {
    const { id } = req.params;
    try {
        const rusers = await User.findById(id);
        res.status(200).json(rusers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}