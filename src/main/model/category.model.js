const Mongoose = require('mongoose');

const COLLECTION_NAME = 'CATEGORY';

const CategorySchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

CategorySchema.set('toJSON', {
    transform: function(doc, ret, options) {
        let id = ret._id;
        ret.id = id;

        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
const Category = Mongoose.model('category', CategorySchema, COLLECTION_NAME);

module.exports = Category;
