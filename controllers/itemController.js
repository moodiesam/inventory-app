const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Homepage
exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Homepage");
});

// Display list of all Items
exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item List");
});

// Display detail page of specific Item
exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Item Detail: ${req.params.id}`);
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