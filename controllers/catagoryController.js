const Catagory = require("../models/catagory");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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
    res.render("catagory_form", { title: "Create Catagory" });
});

// Handle Catagory create form on POST
exports.catagory_create_post = [
    //Validate and sanitize all input fields
    body("name", "Catagory name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "Description must be at least 20 characters")
        .trim()
        .isLength({ min: 20 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const catagory = new Catagory({ name: req.body.name, description: req.body.description })

        if (!errors.isEmpty()) {
            res.render("catagory_form", {
                title: "Create Catagory",
                catagory: catagory,
                errors: errors.array(),
            });
            return;
        } else {
            const catagoryExists = await Catagory.findOne({ name: req.body.name }).exec();
            if (catagoryExists) {
                res.redirect(catagoryExists.url);
            } else {
                await catagory.save();
                res.redirect(catagory.url);
            }
        }
    }),
];

// Display Catagory delete form on GET
exports.catagory_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of catagory and all items in catagory
    const [catagory, allItemsInCatagory] = await Promise.all([
        Catagory.findById(req.params.id).exec(),
        Item.find({ catagory: req.params.id }, "name description").exec(),
    ]);

    if (catagory === null) {
        res.redirect("/catalog/catagories");
    }

    res.render("catagory_delete", {
        title: "Delete Catagory",
        catagory: catagory,
        catagory_items: allItemsInCatagory,
    });
});

// Handle Catagory delete form on POST
exports.catagory_delete_post = asyncHandler(async (req, res, next) => {
    const [catagory, allItemsInCatagory] = await Promise.all([
        Catagory.findById(req.params.id).exec(),
        Item.find({ catagory: req.params.id }, "name description").exec(),
    ]);

    if (allItemsInCatagory.length > 0) {
        res.render("catagory_delete", {
            title: "Delete Catagory",
            catagory: catagory,
            catagory_items: allItemsInCatagory,
        });
        return;
    } else {
        await Catagory.findByIdAndDelete(req.body.catagoryid);
        res.redirect("/catalog/catagories");
    }
});

// Display Catagory update form on GET
exports.catagory_update_get = asyncHandler(async (req, res, next) => {
    const catagory = await Catagory.findById(req.params.id).exec()

    if (catagory === null) {
        const err = new Error("Catagory not found");
        err.status = 404;
        return next(err);
    }

    res.render("catagory_form", {
        title: "Update Catagory",
        catagory: catagory,
    });
});

// Handle Catagory update form on POST
exports.catagory_update_post = [
    //Validate and sanitize all input fields
    body("name", "Catagory name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "Description must be at least 20 characters")
        .trim()
        .isLength({ min: 20 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const catagory = new Catagory({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render("catagory_form", {
                title: "Update Catagory",
                catagory: catagory,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedCatagory = await Catagory.findByIdAndUpdate(req.params.id, catagory, {});
            res.redirect(updatedCatagory.url);
        }
    }),
];