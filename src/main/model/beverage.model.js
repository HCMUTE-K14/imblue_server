const Mongoose = require('mongoose');

const COLLECTION_NAME = 'BEVERAGE';

const BeverageSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String
    },
    category: {
      type: Mongoose.Types.ObjectId,
      ref: 'category'
    }
});

BeverageSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        let id = ret._id;
        ret.id = id;

        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
const Beverage = Mongoose.model('beverage', BeverageSchema, COLLECTION_NAME);

module.exports = Beverage;
