const Item = require("../models/item");
const Catagory = require("../models/catagory");

const asyncHandler = require("express-async-handler");

// Homepage
exports.index = asyncHandler(async (req, res, next) => {
    const [
        numItems,
        numCatagories,
    ] = await Promise.all([
        Item.countDocuments({}).exec(),
        Catagory.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Sage & Thistle Home",
        item_count: numItems,
        catagory_count: numCatagories,
    });
});

// Display list of all Items
exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}, "name catagory")
        .sort({ name: 1 })
        .populate("catagory")
        .exec();

    res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page of specific Item
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("catagory").exec()
    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", { title: item.name, item: item });
});

// Display Item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item Create GET");
});

// Handle Item create form on POST
exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item Create POST");
});

// Display Item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item Delete GET");
});

// Handle Item delete form on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display Item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item Update GET");
});

// Handle Item update form on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item Update POST");
});