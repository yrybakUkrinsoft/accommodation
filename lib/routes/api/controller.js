

module.exports.general = (req,res) => {
    let mockData = req.app.get('mock');
    res.json({
        success: true,
        value: mockData
    })
};