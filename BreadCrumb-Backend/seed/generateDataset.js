const fs = require("fs");
const path = require("path");

const stores = [
    "Shoprite",
    "Pick n Pay",
    "SPAR",
    "Boxer",
    "Woolworths",
    "Clicks",
    "Dis-Chem",
    "HiFi Corp",
    "Game",
    "OK Furniture",
    "Bears"
];

const groceryBrands = [
    "Albany",
    "Blue Ribbon",
    "SunSun",
    "Tastic",
    "Ace",
    "Selati",
    "Clover",
    "Parmalat",
    "Umcenge",
    "Freshpak",
    "Five Roses",
    "Ricoffy",
    "Nestlé",
    "Kellogg's",
    "Jungle",
    "Futurelife",
    "Sunfoil",
    "Oros",
    "Coca-Cola",
    "Simba",
    "Doritos"
];

const groceryProducts = [
    "Bread",
    "Rice",
    "Sugar",
    "Milk",
    "Tea",
    "Coffee",
    "Cooking Oil",
    "Corn Flakes",
    "Eggs",
    "Mayonnaise",
    "Peanut Butter",
    "Jam",
    "Beans",
    "Pasta",
    "Flour",
    "Salt",
    "Chicken Portions",
    "Steak",
    "Boerewors",
    "Potatoes",
    "Onions",
    "Tomatoes",
    "Coke 2L",
    "Sprite 2L",
    "Fanta 2L",
    "Biscuits",
    "Toilet Paper",
    "Dishwashing Liquid",
    "Washing Powder",
    "Ice Cream"
];

const pharmacyBrands = [
    "Panado",
    "Nivea",
    "Dove",
    "Always",
    "Colgate",
    "Sensodyne",
    "Bio-Oil",
    "Johnson's",
    "Dettol",
    "Centrum"
];

const pharmacyProducts = [
    "Body Lotion",
    "Shampoo",
    "Conditioner",
    "Soap",
    "Pads",
    "Tampons",
    "Toothpaste",
    "Toothbrush",
    "Multivitamins",
    "Pain Tablets",
    "Face Wash",
    "Sunscreen",
    "Body Wash",
    "Roll-On",
    "Mouthwash"
];

const electronicsBrands = [
    "Samsung",
    "Apple",
    "Tecno",
    "Hisense",
    "LG",
    "HP",
    "Dell",
    "JBL",
    "Logitech",
    "Sony"
];

const electronicsProducts = [
    "Smart TV",
    "Laptop",
    "Wireless Mouse",
    "Keyboard",
    "Air Fryer",
    "Bluetooth Speaker",
    "Microwave",
    "Kettle",
    "Phone",
    "Headphones"
];

const liquorBrands = [
    "Black Label",
    "Castle Lite",
    "Savanna",
    "Flying Fish",
    "Heineken",
    "Jameson",
    "Hennessy",
    "Brutal Fruit",
    "Gordon's",
    "Smirnoff"
];

const liquorProducts = [
    "Beer 6 Pack",
    "Cider 6 Pack",
    "Whiskey 750ml",
    "Vodka 750ml",
    "Gin 750ml",
    "Brandy 750ml",
    "Wine 750ml"
];

const furnitureBrands = [
    "OK Furniture",
    "Bears",
    "Defy",
    "Russells"
];

const furnitureProducts = [
    "Dining Table",
    "TV Stand",
    "Office Desk",
    "Wardrobe",
    "Coffee Table",
    "Queen Bed",
    "Sofa",
    "Bookshelf"
];

function randomPrice(category){

    switch(category){

        case "Grocery":
            return Math.floor(Math.random()*120)+18;

        case "Pharmacy":
            return Math.floor(Math.random()*250)+25;

        case "Electronics":
            return Math.floor(Math.random()*25000)+350;

        case "Liquor":
            return Math.floor(Math.random()*1200)+80;

        case "Furniture":
            return Math.floor(Math.random()*9000)+500;

        default:
            return 100;
    }

}

const products = [];

let id = 1;

function generate(category, brands, items){

    brands.forEach(brand=>{

        items.forEach(item=>{

            products.push({

                ProductID:id++,

                ProductName:`${brand} ${item}`,

                Category:category,

                brand,

                image:
                    `${brand.toLowerCase().replace(/[^a-z0-9]/g,"")}.png`

            });

        });

    });

}

generate("Grocery",groceryBrands,groceryProducts);

generate("Pharmacy",pharmacyBrands,pharmacyProducts);

generate("Electronics",electronicsBrands,electronicsProducts);

generate("Liquor",liquorBrands,liquorProducts);

generate("Furniture",furnitureBrands,furnitureProducts);

console.log(`Generated ${products.length} products`);

const output =

`module.exports = ${JSON.stringify(products,null,4)};`;

fs.writeFileSync(

path.join(__dirname,"products.js"),

output

);

console.log("products.js created");