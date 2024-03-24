const Catagory = require("../models/catagory");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display list of all Catagories
exports.catagory_list = asyncHandler(async (req, res, next) => {
    const allCatagories = await Catagory.find({})
    .sort({ name: 1 })
    .exec();

    res.render("catagory_list", { title: "Catagory List", catagory_list: allCatagories });
});

// Display detail page of specific Catagory
exports.catagory_detail = asyncHandler(async (req, res, next) => {
    const [catagory, itemsInCatagory] = await Promise.all([
        Catagory.findById(req.params.id).exec(),
        Item.find({ catagory: req.params.id }, "name price").exec(),
    ])

    if (catagory == null) {
        const err = new Error("Catagory not found");
        err.status = 404;
        return next(err);
    }

    res.render("catagory_detail", {
        title: catagory.name,
        catagory: catagory,
        catagory_items: itemsInCatagory,
    });
});

// Display Catagory create form on GET
exports.catagory_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Catagory Create GET");
});

// Handle Catagory create form on POST
exports.catagory_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Catagory Create POST");
});

// Display Catagory delete form on GET
exports.catagory_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Catagory Delete GET");
});

// Handle Catagory delete form on POST
exports.catagory_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Catagory delete POST");
});

// Display Catagory update form on GET
exports.catagory_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Catagory Update GET");
});

// Handle Catagory update form on POST
exports.catagory_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Catagory Update POST");
});