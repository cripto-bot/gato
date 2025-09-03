const { v4: uuidv4 } = require('uuid');

module.exports = (req, res) => {
    const trackingId = uuidv4();
    res.status(200).json({ trackingId });
};
