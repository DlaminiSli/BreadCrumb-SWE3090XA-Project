const comparisons = [
    {
        productId: 1,
        stores: [
            {
                store: "Pick n Pay",
                price: 179,
                bestDeal: true,
                savings: 19,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 185,
                savings: 13,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 189,
                savings: 9,
                catalogueEnds: "30 Jul",
                stock: "Low Stock"
            },
            {
                store: "Boxer",
                price: 183,
                savings: 15,
                catalogueEnds: "28 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 2,
        stores: [
            {
                store: "SPAR",
                price: 17,
                bestDeal: true,
                savings: 7,
                catalogueEnds: "27 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 19,
                savings: 5,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay",
                price: 20,
                savings: 4,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Boxer",
                price: 18,
                savings: 6,
                catalogueEnds: "29 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 3,
        stores: [
            {
                store: "Pick n Pay",
                price: 19,
                bestDeal: true,
                savings: 10,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 21,
                savings: 8,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 20,
                savings: 9,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "OK Foods",
                price: 22,
                savings: 7,
                catalogueEnds: "27 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 4,
        stores: [
            {
                store: "Boxer",
                price: 37,
                bestDeal: true,
                savings: 6,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 40,
                savings: 3,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 39,
                savings: 4,
                catalogueEnds: "31 Jul",
                stock: "Low Stock"
            },
            {
                store: "Pick n Pay",
                price: 41,
                savings: 2,
                catalogueEnds: "28 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 5,
        stores: [
            {
                store: "Shoprite",
                price: 194,
                bestDeal: true,
                savings: 25,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Tops at SPAR",
                price: 199,
                savings: 20,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay Liquor",
                price: 205,
                savings: 14,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Boxer Liquor",
                price: 209,
                savings: 10,
                catalogueEnds: "27 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 6,
        stores: [
            {
                store: "SPAR",
                price: 115,
                bestDeal: true,
                savings: 12,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 118,
                savings: 9,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay",
                price: 120,
                savings: 7,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Boxer",
                price: 117,
                savings: 10,
                catalogueEnds: "28 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 7,
        stores: [
            {
                store: "HiFi Corp",
                price: 8999,
                bestDeal: true,
                savings: 500,
                catalogueEnds: "15 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 9199,
                savings: 300,
                catalogueEnds: "14 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 9299,
                savings: 200,
                catalogueEnds: "13 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 8,
        stores: [
            {
                store: "Clicks",
                price: 54,
                bestDeal: true,
                savings: 6,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Dis-Chem",
                price: 57,
                savings: 3,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "MediRite",
                price: 59,
                savings: 1,
                catalogueEnds: "28 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 9,
        stores: [
            {
                store: "Tops at SPAR",
                price: 119,
                bestDeal: true,
                savings: 15,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay Liquor",
                price: 123,
                savings: 11,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 126,
                savings: 8,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 10,
        stores: [
            {
                store: "OK Furniture",
                price: 4999,
                bestDeal: true,
                savings: 400,
                catalogueEnds: "20 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 5199,
                savings: 200,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "House & Home",
                price: 5399,
                savings: 100,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 11,
        stores: [
            {
                store: "Shoprite",
                price: 18,
                bestDeal: true,
                savings: 2,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay",
                price: 19,
                savings: 1,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 20,
                savings: 0,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Boxer",
                price: 19,
                savings: 1,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 12,
        stores: [
            {
                store: "Bears",
                price: 6799,
                bestDeal: true,
                savings: 700,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "HiFi Corp",
                price: 6899,
                savings: 600,
                catalogueEnds: "20 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 7099,
                savings: 400,
                catalogueEnds: "16 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 13,
        stores: [
            {
                store: "Dis-Chem",
                price: 89,
                bestDeal: true,
                savings: 10,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Clicks",
                price: 92,
                savings: 7,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "MediRite",
                price: 95,
                savings: 4,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 14,
        stores: [
            {
                store: "Pick n Pay Liquor",
                price: 129,
                bestDeal: true,
                savings: 18,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Tops at SPAR",
                price: 133,
                savings: 14,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 136,
                savings: 11,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 15,
        stores: [
            {
                store: "Bears",
                price: 2299,
                bestDeal: true,
                savings: 250,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 2399,
                savings: 150,
                catalogueEnds: "19 Aug",
                stock: "In Stock"
            },
            {
                store: "House & Home",
                price: 2499,
                savings: 50,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 16,
        stores: [
            {
                store: "Pick n Pay",
                price: 19,
                bestDeal: true,
                savings: 10,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 20,
                savings: 9,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 21,
                savings: 8,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "OK Foods",
                price: 22,
                savings: 7,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 17,
        stores: [
            {
                store: "HiFi Corp",
                price: 21999,
                bestDeal: true,
                savings: 1000,
                catalogueEnds: "15 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 22399,
                savings: 600,
                catalogueEnds: "17 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 22699,
                savings: 300,
                catalogueEnds: "16 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 18,
        stores: [
            {
                store: "Clicks",
                price: 65,
                bestDeal: true,
                savings: 8,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Dis-Chem",
                price: 69,
                savings: 4,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "MediRite",
                price: 71,
                savings: 2,
                catalogueEnds: "29 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 19,
        stores: [
            {
                store: "Shoprite",
                price: 194,
                bestDeal: true,
                savings: 25,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Tops at SPAR",
                price: 199,
                savings: 20,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay Liquor",
                price: 205,
                savings: 14,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 20,
        stores: [
            {
                store: "OK Furniture",
                price: 1699,
                bestDeal: true,
                savings: 180,
                catalogueEnds: "20 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 1799,
                savings: 80,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "House & Home",
                price: 1849,
                savings: 30,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 21,
        stores: [
            {
                store: "SPAR",
                price: 49,
                bestDeal: true,
                savings: 6,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 51,
                savings: 4,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay",
                price: 52,
                savings: 3,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Boxer",
                price: 50,
                savings: 5,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 22,
        stores: [
            {
                store: "HiFi Corp",
                price: 2399,
                bestDeal: true,
                savings: 250,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 2499,
                savings: 150,
                catalogueEnds: "19 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 2599,
                savings: 50,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 23,
        stores: [
            {
                store: "Clicks",
                price: 219,
                bestDeal: true,
                savings: 20,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Dis-Chem",
                price: 225,
                savings: 14,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "MediRite",
                price: 229,
                savings: 10,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 24,
        stores: [
            {
                store: "Tops at SPAR",
                price: 139,
                bestDeal: true,
                savings: 12,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 145,
                savings: 6,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay Liquor",
                price: 148,
                savings: 3,
                catalogueEnds: "31 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 25,
        stores: [
            {
                store: "Bears",
                price: 6999,
                bestDeal: true,
                savings: 650,
                catalogueEnds: "20 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 7199,
                savings: 450,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "House & Home",
                price: 7399,
                savings: 250,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 26,
        stores: [
            {
                store: "HiFi Corp",
                price: 6999,
                bestDeal: true,
                savings: 400,
                catalogueEnds: "15 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 7199,
                savings: 200,
                catalogueEnds: "16 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 7299,
                savings: 100,
                catalogueEnds: "18 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 27,
        stores: [
            {
                store: "Tops at SPAR",
                price: 129,
                bestDeal: true,
                savings: 15,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 135,
                savings: 9,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay Liquor",
                price: 138,
                savings: 6,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 28,
        stores: [
            {
                store: "Clicks",
                price: 39,
                bestDeal: true,
                savings: 5,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Dis-Chem",
                price: 42,
                savings: 2,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "MediRite",
                price: 44,
                savings: 0,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 29,
        stores: [
            {
                store: "Shoprite",
                price: 69,
                bestDeal: true,
                savings: 8,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Boxer",
                price: 72,
                savings: 5,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Pick n Pay",
                price: 74,
                savings: 3,
                catalogueEnds: "29 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 73,
                savings: 4,
                catalogueEnds: "28 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 30,
        stores: [
            {
                store: "OK Furniture",
                price: 3899,
                bestDeal: true,
                savings: 350,
                catalogueEnds: "20 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 3999,
                savings: 250,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "House & Home",
                price: 4199,
                savings: 50,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 31,
        stores: [
            {
                store: "HiFi Corp",
                price: 5499,
                bestDeal: true,
                savings: 300,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "Bears",
                price: 5599,
                savings: 200,
                catalogueEnds: "17 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 5699,
                savings: 100,
                catalogueEnds: "16 Aug",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 32,
        stores: [
            {
                store: "Pick n Pay Liquor",
                price: 119,
                bestDeal: true,
                savings: 12,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Tops at SPAR",
                price: 123,
                savings: 8,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 126,
                savings: 5,
                catalogueEnds: "29 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 33,
        stores: [
            {
                store: "Dis-Chem",
                price: 185,
                bestDeal: true,
                savings: 15,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Clicks",
                price: 189,
                savings: 11,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "MediRite",
                price: 194,
                savings: 6,
                catalogueEnds: "29 Jul",
                stock: "Low Stock"
            }
        ]
    },
    {
        productId: 34,
        stores: [
            {
                store: "Pick n Pay",
                price: 32,
                bestDeal: true,
                savings: 4,
                catalogueEnds: "31 Jul",
                stock: "In Stock"
            },
            {
                store: "Shoprite",
                price: 34,
                savings: 2,
                catalogueEnds: "30 Jul",
                stock: "In Stock"
            },
            {
                store: "SPAR",
                price: 35,
                savings: 1,
                catalogueEnds: "29 Jul",
                stock: "Low Stock"
            },
            {
                store: "Boxer",
                price: 33,
                savings: 3,
                catalogueEnds: "28 Jul",
                stock: "In Stock"
            }
        ]
    },
    {
        productId: 35,
        stores: [
            {
                store: "Bears",
                price: 1499,
                bestDeal: true,
                savings: 150,
                catalogueEnds: "20 Aug",
                stock: "In Stock"
            },
            {
                store: "OK Furniture",
                price: 1599,
                savings: 50,
                catalogueEnds: "18 Aug",
                stock: "In Stock"
            },
            {
                store: "House & Home",
                price: 1649,
                savings: 0,
                catalogueEnds: "17 Aug",
                stock: "Low Stock"
            }
        ]
    }
];
export default comparisons;