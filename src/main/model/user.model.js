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

const User = Mongoose.model(COLLECTION_NAME, UserSchema, COLLECTION_NAME);

module.exports = User;