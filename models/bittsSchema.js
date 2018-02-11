var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    username: String,
    bittcontent: String,
    bittheader: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BitterBitts', usersSchema);
