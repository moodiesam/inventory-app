const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CatagorySchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true },
});

CatagorySchema.virtual("url").get(function () {
    return `/catalog/catagory/${this._id}`;
});

module.exports = mongoose.model("Catagory", CatagorySchema);