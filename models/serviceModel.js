const mongoose = require('mongoose');

const serviceShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Service must have name'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'A Service must have address']
    },
    ranking: {
        type: Number,
        default: 4.5,
        min:[1, 'Ranking mus be above 1'],
        max: [5, 'Ranking mus be below 5']
    },
    price: {
        type: Number,
        required: [true, 'A Service must have price']
    },
    price_discount: {
        type: Number,
    },
    comfort: {
        type: String,
        required: [true, 'A Service must have syats level'],
        enum: {
            values: ['1', '2', '3', '4', '5', '6', '7']
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A Service must have summary']
    },
    description: {
        type: String,
        trim: true
    },
    image_cover: {
        type: String,
        required: [true, 'A Service mus have cover']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
}
);
serviceShema.virtual('repairmans',{
    ref: 'Repairman',
    foreignField: 'Service',
    localField: '_id'
})

const Service = mongoose.model('Service', serviceShema);

module.exports = Service;