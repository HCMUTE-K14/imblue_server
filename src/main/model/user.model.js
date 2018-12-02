const Mongoose = require('mongoose');

const COLLECTION_NAME = 'USER';

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }, 
    display_name: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    identity_id: {
        type: String
    },
    phone_number: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String
    }
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        let id = ret._id;
        ret.id = id;
        
        delete ret._id;
        delete ret.__v;
        delete ret.password;

        return ret;
    }
});

const User = Mongoose.model('user', UserSchema, COLLECTION_NAME);

module.exports = User;