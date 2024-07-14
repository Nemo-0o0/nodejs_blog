module.exports = {
    mutipleMongooseToObject: function (mongooseArr) {
        return mongooseArr.map((mongooseArr) => mongooseArr.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.ToObject() : mongoose;
    },
};
