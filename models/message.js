var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    name: {
        type: String,
        required: 'Message must contain a name'
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);