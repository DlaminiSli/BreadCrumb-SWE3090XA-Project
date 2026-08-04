const fs = require("fs");
const path = require("path");

const products = require("./products");

const stores = [

    { name: "Shoprite", multiplier: 1.00 },

    { name: "Pick n Pay", multiplier: 0.99 },

    { name: "SPAR", multiplier: 1.03 },

    { name: "Boxer", multiplier: 0.97 },

    { name: "OK Foods", multiplier: 1.00 },

    { name: "Woolworths", multiplier: 1.12 },

    { name: "Clicks", multiplier: 1.02 },

    { name: "Dis-Chem", multiplier: 1.01 },

    { name: "HiFi Corp", multiplier: 0.99 },

    { name: "Game", multiplier: 1.00 },

    { name: "OK Furniture", multiplier: 1.04 },

    { name: "Bears", multiplier: 1.06 }

];

// Which stores sell each category

const categoryStores = {

    Grocery: [
        "Shoprite",
        "Pick n Pay",
        "SPAR",
        "Boxer",
        "OK Foods",
        "Woolworths"
    ],

    Meat: [
        "Shoprite",
        "Pick n Pay",
        "SPAR",
        "Boxer",
        "OK Foods",
        "Woolworths"
    ],

    Cleaning: [
        "Shoprite",
        "Pick n Pay",
        "SPAR",
        "Boxer",
        "OK Foods",
        "Woolworths"
    ],

    Toiletries: [
        "Shoprite",
        "Pick n Pay",
        "SPAR",
        "Boxer",
        "OK Foods",
        "Woolworths",
        "Clicks",
        "Dis-Chem"
    ],

    Baby: [
        "Shoprite",
        "Pick n Pay",
        "OK Foods",
        "Spar",
        "Clicks",
        "Dis-Chem"
    ],

    Pharmacy: [
        "Clicks",
        "Dis-Chem",
        "Shoprite",
        "Pick n Pay"
    ],

    Liquor: [
        "Shoprite",
        "Pick n Pay",
        "OK Foods",
        "Boxer",
        "SPAR"
    ],

    Electronics: [
        "HiFi Corp",
        "Game"
    ],

    Furniture: [
        "OK Furniture",
        "Bears"
    ]

};

function getBasePrice(product){

    const name = product.ProductName.toLowerCase();

    // ==================================
    // BREAD
    // ==================================

    if(name.includes("blue ribbon")) return 18.99;
    if(name.includes("albany")) return 19.99;
    if(name.includes("sasko")) return 18.49;

    // ==================================
    // RICE
    // ==================================

    if(name.includes("tastic rice 2kg")) return 72.99;
    if(name.includes("tastic rice 5kg")) return 179.99;
    if(name.includes("sunsun")) return 69.99;
    if(name.includes("spekko")) return 74.99;

    // ==================================
    // MAIZE
    // ==================================

    if(name.includes("ace maize")) return 154.99;
    if(name.includes("super sun")) return 149.99;

    // ==================================
    // SUGAR

    if(name.includes("selati")) return 44.99;
    if(name.includes("huletts")) return 46.99;

    // ==================================
    // MILK

    if(name.includes("umcenge")) return 36.99;
    if(name.includes("clover")) return 17.99;
    if(name.includes("parmalat")) return 41.99;

    // ==================================
    // COFFEE

    if(name.includes("ricoffy")) return 92.99;
    if(name.includes("nescafe")) return 84.99;

    // ==================================
    // TEA

    if(name.includes("five roses")) return 56.99;
    if(name.includes("freshpak")) return 52.99;

    // ==================================
    // EGGS

    if(name.includes("18 pack")) return 59.99;
    if(name.includes("30 pack")) return 88.99;

    // ==================================
    // OIL

    if(name.includes("sunfoil")) return 79.99;
    if(name.includes("excella")) return 82.99;

    // ==================================
    // CHIPS

    if(name.includes("simba")) return 19.99;
    if(name.includes("nik naks")) return 18.99;
    if(name.includes("doritos")) return 34.99;
    if(name.includes("pringles")) return 49.99;

    // ==================================
    // DRINKS

    if(name.includes("oros")) return 39.99;
    if(name.includes("coca-cola")) return 22.99;
    if(name.includes("sprite")) return 22.99;
    if(name.includes("fanta")) return 22.99;
    if(name.includes("stoney")) return 23.99;
    if(name.includes("appletiser")) return 18.99;
    if(name.includes("grapetiser")) return 18.99;

    // ==================================
    // CEREALS

    if(name.includes("jungle")) return 69.99;
    if(name.includes("weet")) return 64.99;
    if(name.includes("futurelife")) return 84.99;
    if(name.includes("corn flakes")) return 74.99;
    if(name.includes("coco")) return 68.99;

    // ==================================
    // CHICKEN & MEAT

    if(name.includes("captain")) return 179.99;
    if(name.includes("drumsticks")) return 89.99;
    if(name.includes("wings")) return 96.99;
    if(name.includes("whole chicken")) return 119.99;
    if(name.includes("beef mince")) return 124.99;
    if(name.includes("beef stew")) return 139.99;
    if(name.includes("sirloin")) return 179.99;
    if(name.includes("t-bone")) return 189.99;
    if(name.includes("rump")) return 184.99;
    if(name.includes("pork")) return 149.99;
    if(name.includes("boerewors")) return 129.99;

    // ==================================
    // CLEANING

    if(name.includes("omo")) return 129.99;
    if(name.includes("surf")) return 119.99;
    if(name.includes("ariel")) return 139.99;
    if(name.includes("sunlight")) return 36.99;
    if(name.includes("handy")) return 49.99;
    if(name.includes("domestos")) return 39.99;
    if(name.includes("jik")) return 34.99;
    if(name.includes("harpic")) return 42.99;

    // ==================================
    // TOILETRIES

    if(name.includes("colgate")) return 34.99;
    if(name.includes("sensodyne")) return 68.99;
    if(name.includes("toothbrush")) return 29.99;
    if(name.includes("dove")) return 24.99;
    if(name.includes("lux")) return 18.99;
    if(name.includes("shield")) return 44.99;
    if(name.includes("nivea")) return 94.99;
    if(name.includes("vaseline")) return 89.99;
    if(name.includes("pantene")) return 99.99;
    if(name.includes("head")) return 104.99;
    if(name.includes("always")) return 74.99;
    if(name.includes("stayfree")) return 69.99;
    if(name.includes("baby soft")) return 119.99;

    // ==================================
    // BABY

    if(name.includes("pampers")) return 239.99;
    if(name.includes("huggies")) return 219.99;
    if(name.includes("johnson")) return 74.99;
    if(name.includes("purity")) return 18.99;

    // ==================================
    // PHARMACY

    if(name.includes("panado")) return 56.99;
    if(name.includes("grand")) return 44.99;
    if(name.includes("disprin")) return 39.99;
    if(name.includes("corenza")) return 72.99;
    if(name.includes("bio-oil")) return 189.99;
    if(name.includes("bioplus")) return 24.99;
    if(name.includes("eno")) return 42.99;
    if(name.includes("gaviscon")) return 118.99;
    if(name.includes("voltaren")) return 98.99;

    // ==================================
    // BEER

    if(name.includes("castle lager")) return 109.99;
    if(name.includes("castle lite")) return 114.99;
    if(name.includes("milk stout")) return 119.99;
    if(name.includes("black label")) return 112.99;
    if(name.includes("hansa")) return 108.99;
    if(name.includes("windhoek")) return 124.99;
    if(name.includes("heineken")) return 139.99;
    if(name.includes("corona")) return 169.99;
    if(name.includes("budweiser")) return 139.99;
    if(name.includes("stella")) return 149.99;
    if(name.includes("guinness")) return 149.99;
    if(name.includes("sibebe")) return 99.99;

    // ==================================
    // CIDERS

    if(name.includes("savanna")) return 134.99;
    if(name.includes("hunters")) return 129.99;
    if(name.includes("flying fish")) return 119.99;
    if(name.includes("brutal")) return 124.99;
    if(name.includes("bernini")) return 119.99;

    // ==================================
    // SPIRITS

    if(name.includes("smirnoff")) return 219.99;
    if(name.includes("absolut")) return 329.99;
    if(name.includes("belvedere")) return 699.99;
    if(name.includes("gordon")) return 180.00;
    if(name.includes("bombay")) return 399.99;
    if(name.includes("tanqueray")) return 389.99;
    if(name.includes("jameson")) return 449.99;
    if(name.includes("jack")) return 499.99;
    if(name.includes("bell")) return 249.99;
    if(name.includes("johnnie walker red")) return 359.99;
    if(name.includes("johnnie walker black")) return 549.99;
    if(name.includes("chivas")) return 699.99;
    if(name.includes("glenfiddich")) return 899.99;
    if(name.includes("hennessy vs")) return 749.99;
    if(name.includes("hennessy vsop")) return 1199.99;
    if(name.includes("amarula")) return 189.99;
    if(name.includes("richelieu")) return 219.99;

    // ==================================
    // WINE

    if(name.includes("four cousins")) return 89.99;
    if(name.includes("raindance")) return 74.99;
    if(name.includes("chateau")) return 64.99;
    if(name.includes("robertson")) return 79.99;
    if(name.includes("nederburg")) return 149.99;
    if(name.includes("tall horse")) return 84.99;
    if(name.includes("drostdy")) return 94.99;

    // ==================================
    // ELECTRONICS

    if(name.includes("ps5")) return 10999;
    if(name.includes("xbox")) return 11499;
    if(name.includes("switch")) return 6999;
    if(name.includes("iphone 16")) return 21999;
    if(name.includes("iphone 15")) return 18999;
    if(name.includes("iphone 14")) return 15999;
    if(name.includes("iphone 13")) return 12999;
    if(name.includes("galaxy s25")) return 18999;
    if(name.includes("galaxy s24")) return 16999;
    if(name.includes("galaxy a56")) return 7999;
    if(name.includes("galaxy a36")) return 5999;
    if(name.includes("galaxy a26")) return 4499;
    if(name.includes("galaxy a16")) return 3299;

    if(name.includes("tv")) return 7999;
    if(name.includes("laptop")) return 13999;
    if(name.includes("printer")) return 2499;
    if(name.includes("speaker")) return 2299;
    if(name.includes("air fryer")) return 1699;
    if(name.includes("microwave")) return 1899;
    if(name.includes("washing")) return 7499;
    if(name.includes("refrigerator")) return 9999;

    // ==================================
    // FURNITURE

    if(name.includes("sofa")) return 6999;
    if(name.includes("couch")) return 8999;
    if(name.includes("queen bed")) return 5999;
    if(name.includes("double bed")) return 4999;
    if(name.includes("king bed")) return 7499;
    if(name.includes("wardrobe")) return 3999;
    if(name.includes("desk")) return 2499;
    if(name.includes("chair")) return 1499;
    if(name.includes("dining")) return 4499;
    if(name.includes("mattress")) return 3299;
    if(name.includes("bookshelf")) return 1699;

    // ==================================
// ADDITIONAL ELECTRONICS

if(name.includes("tecno spark 20")) return 2899;
if(name.includes("tecno spark 30")) return 3599;
if(name.includes("tecno camon 40 pro")) return 5299;

if(name.includes("redmi note 13")) return 3999;
if(name.includes("redmi note 14")) return 4799;

if(name.includes("logitech wireless mouse")) return 349;
if(name.includes("hp wireless keyboard")) return 699;

if(name.includes("philips electric kettle")) return 699;

    return 100;
}

function formatRetailPrice(price){

    return Math.round(price);

}

const prices = [];

function getStoreAdjustment(product, storeName){

    switch(product.Category){

        // ==========================
        // GROCERY
        // ==========================

        case "Grocery":
        case "Cleaning":
        case "Baby":
        case "Toiletries":
        case "Meat": {

            const name = product.ProductName.toLowerCase();

            let winner = "Shoprite";

            // Meat
            if (
                name.includes("steak") ||
                name.includes("boerewors") ||
                name.includes("beef") ||
                name.includes("pork")
            ) {
                winner = "SPAR";
            }

            // Chicken
            else if (
                name.includes("chicken") ||
                name.includes("drumsticks") ||
                name.includes("wings")
            ) {
                winner = "Shoprite";
            }

            // Bread & Dairy
            else if (
                name.includes("bread") ||
                name.includes("milk") ||
                name.includes("eggs")
            ) {
                winner = "OK Foods";
            }

            // Drinks
            else if (
                name.includes("coca") ||
                name.includes("sprite") ||
                name.includes("fanta") ||
                name.includes("coffee") ||
                name.includes("tea")
            ) {
                winner = "Pick n Pay";
            }

            // Cleaning
            else if (
                name.includes("omo") ||
                name.includes("sunlight") ||
                name.includes("domestos") ||
                name.includes("jik")
            ) {
                winner = "Boxer";
            }

            // Toiletries
            else if (
                name.includes("colgate") ||
                name.includes("pantene") ||
                name.includes("nivea") ||
                name.includes("always") ||
                name.includes("dove")
            ) {
                winner = "Woolworths";
            }

            const adjustment = {
                "Shoprite": 30,
                "Pick n Pay": 30,
                "SPAR": 30,
                "Boxer": 30,
                "OK Foods": 30,
                "Woolworths": 30
            };

            adjustment[winner] = 0;

            return adjustment[storeName] ?? 30;
        }

        // ==========================
        // PHARMACY
        // ==========================

        case "Pharmacy":

            return {

                "Clicks": 0,
                "Dis-Chem": 5,
                "Shoprite": 15,
                "Pick n Pay": 18

            }[storeName] ?? 10;

        // ==========================
        // LIQUOR
        // ==========================

        case "Liquor":

            return {

                "SPAR": 0,
                "Shoprite": 12,
                "Pick n Pay": 18

            }[storeName] ?? 15;

        // ==========================
        // ELECTRONICS
        // ==========================

        case "Electronics":

            return {

                "HiFi Corp": 0,
                "Game": 450

            }[storeName] ?? 300;

        // ==========================
        // FURNITURE
        // ==========================

        case "Furniture":

            return {

                "OK Furniture": 0,
                "Bears": 650

            }[storeName] ?? 500;

        default:

            return 10;

    }

}

products.forEach(product => {

    const allowed = categoryStores[product.Category];

    const base = getBasePrice(product);

    allowed.forEach(storeName => {

        let amount =

            base +

            getStoreAdjustment(

                product,

                storeName

            );

        // Small realistic variation
        amount += (Math.random() * 2) - 1;

        amount = formatRetailPrice(amount);

        // Never allow a negative or unrealistic price
        if (amount < base * 0.90) {

            amount = Math.round(base * 0.90);
        }

        if (amount > base * 1.15) {

            amount = Math.round(base * 1.15);

        }

        let saving = 0;

switch(product.Category){

    case "Grocery":

        saving = Math.floor(Math.random()*15)+5;
        break;

    case "Pharmacy":

        saving = Math.floor(Math.random()*15)+5;
        break;

    case "Liquor":

        saving = Math.floor(Math.random()*35)+10;
        break;

    case "Electronics":

        saving = Math.floor(Math.random()*1200)+150;
        break;

    case "Furniture":

        saving = Math.floor(Math.random()*1000)+200;
        break;

    default:

        saving = 5;

}

const normalPrice = amount + saving;

        prices.push({

            productName: product.ProductName,

            storeName,

            normalPrice,

            amount,

            saving,

            dealType: saving > 0 ? "Special" : "Regular",

            catalogue: "July Weekly Specials",

            validUntil: new Date("2026-07-31"),

            featured: Math.random() > 0.88,

            stock: Math.random() > 0.15
                ? "In Stock"
                : "Low Stock",

            dateUpdated: new Date()

        });

    });

});


console.log(`${prices.length} prices generated.`);

fs.writeFileSync(

    path.join(__dirname,"prices.js"),

    "module.exports = " +

    JSON.stringify(prices,null,4) +

    ";"

);

console.log("prices.js created.");