export function compareBasket(selectedProducts) {

    if (!selectedProducts || selectedProducts.length === 0) {

        return {

            oneStore: null,

            maximumSavings: null

        };

    }

    /* ONE STORE COMPARISON */

    const stores = [

        {

            name: "Boxer",

            total: 410

        },

        {

            name: "Spar",

            total: 415

        },

        {

            name: "OK Foods",

            total: 429

        },

        {

            name: "Shoprite",

            total: 470

        },

        {

            name: "Pick n Pay",

            total: 580

        }

    ];

    stores.sort(

        (a, b) => a.total - b.total

    );

    const oneStore = {

        selectedStore: stores[0].name,

        total: stores[0].total,

        savings: 170,

        rankings: stores,

        products: selectedProducts.map(

            item => ({

            ...item,

            price: item.estimatedPrice

        })

    )

    };

    /*MAXIMUM SAVINGS */

    const groupedStores = [];

    const storeNames = [

    "Boxer",

    "Spar",

    "OK Foods",

    "Shoprite",

    "Pick n Pay"

];

selectedProducts.forEach(

    (product, index) => {

        const store =

            storeNames[

                index % storeNames.length

            ];

        const existingStore = groupedStores.find(

            item => item.store === store

        );

        if (existingStore) {

            existingStore.items.push({

                ...product,

                price: product.estimatedPrice

            });

        }

        else {

            groupedStores.push({

                store,

                items: [

                    {

                        ...product,

                        price: product.estimatedPrice

                    }

                ]

            });

        }

    }

);

    const maximumSavings = {

        total: 385,

        savings: 195,

        groupedStores

    };

    return {

        oneStore,

        maximumSavings

    };

}