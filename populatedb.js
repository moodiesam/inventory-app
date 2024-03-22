#! /usr/bin/env node

console.log(
    'This script populates some test items and calagories to our database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory_app?retryWrites=true&w=majority"'
);
  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Catagory = require("./models/catagory");


const items = [];
const catagories = [];


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCatagories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// catagory[0] will always be soap, regardless of the order
// in which the elements of promise.all's argument complete.
async function catagoryCreate(index, name, description) {
    const catagory = new Catagory({ name: name, description: description });
    await catagory.save();
    catagories[index] = catagory;
    console.log(`Added catagory: ${name}`);
    }

//Create function for items

async function itemCreate(index, name, description, price, number_in_stock, catagory) {
    const itemdetail = {
        name: name,
        description: description,
        price: price,
        number_in_stock: number_in_stock,
        catagory: catagory
    };
    

    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
}

async function createCatagories() {
    console.log("Adding Catagories");
    await Promise.all([
        catagoryCreate(0, "Soap", "Sage & Thistle Handmade Goods offers a selection of handcrafted soaps, ranging from vegan to organic goat milk to premium tallow-based varieties, each uniquely crafted to provide a skin-nurturing, non-drying cleanse. Every soap is thoughtfully created using quality ingredients including organic and/or fair trade plant butters & oils, hand-rendered tallows & lard from ethical Ontario farms, organic & pesticide-free botanicals, pure essential oils, and natural clays & mineral-rich salts."),
        catagoryCreate(1, "Candle", "After many (many!) requests, we are excited to offer a range of curated, 100% natural candles! We collaborated with our friends at Planted, a fellow Toronto-based company to create these beautiful candles which are crafted with soy wax for a steady, clean burn, pure essential oils, and a non-toxic cotton wick, and are packaged in reusable amber glass vessels which you may return to our Toronto studio & receive a discount on your next purchase!"),
        catagoryCreate(2, "Skincare", "All-natural and handmade to cleanse, detox, and nourish your skin."),
    ]);
}

// Create items with links for catarogies

async function createItems() {
    console.log("Adding Items");
    await Promise.all([
        itemCreate(0,
            "Bergamot & Cedar",
            "This highly moisturizing artisanal soap bar is made with organic plant oils & butters,  and features Activated Charcoal for a gentle, detoxifying cleanse. Subtly scented with warm citrus & earthy Cedarwood essential oils, this vegan-friendly bar is appealing to all genders, and suitable for all skin types for everyday use as a hand, fave and body bar. Natural, biodegradable, Vegan, and packaged with a recyclable paper label.",
            12,
            5,
            catagories[0]),
        itemCreate(1,
            "Lavender & Sweet Orange",
            "This all-natural artisanal soap is the perfect addition to your Spring and Summer bathing routine! Inspired by our best-selling Room & Linen Spray of the same name, this vegan-friendly bar is handmade using a blend of quality plant oils and butters, including organic Mango, Sunflower, and Fair-Trade Shea to pamper and nourish your skin, orange and clementine peels for gentle exfoliation, Kaolin clays and Turmeric for some natural detoxing, and the perfect combination of French Lavender and Sweet Orange essential oils. This gentle bar is perfect for everyday use as a face, hand and body bar, and pairs beautifully with our handmade Organic Cotton Soap Savers.",
            12,
            8,
            catagories[0]),
        itemCreate(2,
            "Boreal Forest",
            "Woodsy and grounding.",
            35,
            3,
            catagories[1]),
        itemCreate(3,
            "Saltwater & Lemongrass",
            "This all-natural vegan soap is handcrafted using a French Gray Sea Salt brine, helping to bring moisture to your skin while providing a naturally detoxifying & non-drying cleanse! Lightly scented with bright Lemongrass & citrus oils, and crafted with quality, organic and Fair Trade plant oils and butters, this artisanal soap is naturally colored with Indigo. Added Apricot kernel meal provides gentle exfoliation. This Sage & Thistle favorite is perfect for everyday use on hands, face & body!",
            12,
            11,
            catagories[0]),
        itemCreate(4,
            "REFRESH Mask",
            "Refresh your skin with this all-natural, detoxifying mask! Made with gentle Rose Clay to draw out impurities, organic Hibiscus to brighten, and ground Rose petals to calm skin, this mask is the perfect addition to your weekly regimen. Suitable for all skin types.",
            18,
            9,
            catagories[2]),
        itemCreate(5,
            "Elderflower & Rose Geranium",
            "Treat your skin to the care it deserves with our natural & nourishing face oil. Made with slowly infused organic & wildcrafted herbs, and highly moisturizing, noncomedogenic oils. Toning Rose Geranium and antioxidant-rich Elderflowers bring evenness to skin, while organic Lavender provides a soothing, calming base.  Organic Pumpkin Seed Oil is rich with vitamins which encourage skin cells to repair, and Jojoba oil provides deep hydration and helps to regulate sebum production. This nourishing blend is designed to hydrate and refresh your skin, soothe redness, and calm irritation and dryness, and is perfect for use as a spot treatment, oil cleanser, or as a daily face moisturizer, suitable for all skin types.",
            30,
            5,
            catagories[2])
    ])
}