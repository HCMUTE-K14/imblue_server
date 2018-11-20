const Mongoose = require('mongoose');
const User = require('./user.model');
const Beverage = require('./beverage.model');

const COLLECTION_NAME = 'ORDER';

const OrderSchema = new Mongoose.Schema({
    table_no: {
        type: Number
    },
    date_created: {
        type: Date
    },
    user_created: {
        type: Mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    list_menu_item: {
        type: [{
            quantity: {
                type: Number
            },
            beverage: {
                type: Mongoose.Types.ObjectId,
                ref: 'beverage'
            }
        }],
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

OrderSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        let id = ret._id;
        ret.id = id;

        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Order = Mongoose.model('order', OrderSchema, COLLECTION_NAME);

module.exports = Order;