const express = require("express");
const router = express.Router();

// Controller Modules
const catagory_controller = require("../controllers/catagoryController");
const item_controller = require("../controllers/itemController");

// ITEM ROUTES

// GET catalog homepage
router.get("/", item_controller.index);

// GET and POST for create (first because of conflict in reading :id in url), delete and update
router.get("/item/create", item_controller.item_create_get);
router.post("/item/create", item_controller.item_create_post);
router.get("/item/:id/delete", item_controller.item_delete_get);
router.post("/item/:id/delete", item_controller.item_delete_post);
router.get("/item/:id/update", item_controller.item_update_get);
router.post("/item/:id/update", item_controller.item_update_post);

//GET for one item and list of all
router.get("/item/:id", item_controller.item_detail);
router.get("/items", item_controller.item_list);

// CATAGORY ROUTES

// GET and POST for create (first because of conflict in reading :id in url), delete and update


// Get for one catagory and list of all