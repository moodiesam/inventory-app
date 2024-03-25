const Item = require("../models/item");
const Catagory = require("../models/catagory");
const { body, validationResult } = require("express-validator");


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
    const [allCatagories] = await Promise.all([
        Catagory.find().sort({ name: 1 }).exec(),
    ]);

    res.render("item_form", {
        title: "Create Item",
        catagories: allCatagories,
    });
});

// Handle Item create form on POST
exports.item_create_post = [
    body("name", "Item must have a name.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("description", "Item must have a description.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Item must have a price.")
        .trim()
        // ADD VALIDATION FOR INPUT FORMAT "XX.XX"
        .isLength({ min: 1 })
        .escape(),
    body("catagory", "Catagory must be selected.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("number_in_stock", "Must enter amount in stock.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const allCatagories = await Catagory.find().sort({ name: 1 }).exec();

        const item = new Item({
            title: "Create Item",
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            catagory: req.body.catagory,
        });

        if (!errors.isEmpty()) {
            const allCatagories = await Catagory.find().sort({ name: 1 }).exec();
            res.render("item_form", {
                title: "Create Item",
                catagories: allCatagories,
                item: item,
                errors: errors.array(),
            });
        } else {
            await item.save();
            res.redirect(item.url);
        }
    }),
];

// Display Item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    //Get details of item
    const item = await Item.findById(req.params.id).exec();

    if (item === null) {
        res.redirect("/catalog/items");
    }

    res.render("item_delete", {
        title: "Delete Item",
        item: item,
    });
});

// Handle Item delete form on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();

    await Item.findByIdAndDelete(req.body.itemid);
    res.redirect("/catalog/items");
});

// Display Item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
    //get item and caragories for form
    const [item, allCatagories] = await Promise.all([
        Item.findById(req.params.id).populate("catagory").exec(),
        Catagory.find().sort({ name: 1 }).exec(),
    ]);

    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_form", {
        title: "Update Item",
        catagories: allCatagories,
        item: item,
    });
});

// Handle Item update form on POST
exports.item_update_post = [
    // Validate and sanitize fields
    body("name", "Item must have a name.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("description", "Item must have a description.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Item must have a price.")
        .trim()
        // ADD VALIDATION FOR INPUT FORMAT "XX.XX"
        .isLength({ min: 1 })
        .escape(),
    body("catagory", "Catagory must be selected.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("number_in_stock", "Must enter amount in stock.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            catagory: req.body.catagory,
            _id: req.params.id //So that a new id is not created
        });

        if (!errors.isEmpty()) {
            const allCatagories = await Catagory.find().sort({ name: 1 }).exec();

            res.render("item_form", {
                title: "Update Item",
                catagories: allCatagories,
                item: item,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
            res.redirect(updatedItem.url);
        }
    }),
];