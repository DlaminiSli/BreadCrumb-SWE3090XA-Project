import React, {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ShoppingContext = createContext();

const STORAGE_KEY = "@breadcrumb_lists";

export function ShoppingProvider({ children }) {

    const [lists, setLists] = useState([]);

    /* LOAD LISTS */

    useEffect(() => {

        loadLists();

    }, []);

    /* SAVE LISTS */

    useEffect(() => {

        saveLists(lists);

    }, [lists]);

    const loadLists = async () => {

        try {

            const data = await AsyncStorage.getItem(

                STORAGE_KEY

            );

            if (data) {

                setLists(JSON.parse(data));

            }

        }

        catch (error) {

            console.log(

                "Error loading shopping lists",

                error

            );

        }

    };

    const saveLists = async (updatedLists) => {

        try {

            await AsyncStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(updatedLists)

            );

        }

        catch (error) {

            console.log(

                "Error saving shopping lists",

                error

            );

        }

    };

    /* CREATE LIST */

    const createList = (list) => {

        setLists(previous => [

            ...previous,

            {

                ...list,

                completed: false,

                archived: false,

                items: list.items || []

            }

        ]);

    };
        /*ADD PRODUCT */
    const addProduct = (listId, product) => {

        setLists(previous =>

            previous.map(list => {

                if (list.id !== listId) {

                    return list;

                }

                const existingItem = list.items.find(

                    item => item.id === product.id

                );

                if (existingItem) {

                    return {

                        ...list,

                        items: list.items.map(item =>

                            item.id === product.id

                                ? {

                                    ...item,

                                    quantity: item.quantity + 1

                                }

                                : item

                        )

                    };

                }

                return {

                    ...list,

                    items: [

                        ...list.items,

                        {
                            ...product,

                            quantity: 1,

                            purchased: false,

                            addedAt: new Date().toISOString()

                        }

                    ]

                };

            })

        );

    };

    /*APPLY SMART BASKET */

const applySmartBasket = (

    listId,

    products,

    strategy

) => {

    setLists(previous =>

        previous.map(list => {

            if (list.id !== listId) {

                return list;

            }

            const selectedStore =

                strategy === "singleStore"

                    ? "OK Foods"

                    : null;

            const updatedItems = [...list.items];

            products.forEach(product => {

                const exists = updatedItems.find(

                    item => item.id === product.id

                );

                if (!exists) {

                    updatedItems.push({

                        id: product.id,

                        name: product.name,

                        quantity: 1,

                        purchased: false,

                        addedAt: new Date().toISOString(),

                        store:

                            strategy === "maximum"

                                ? product.cheapestStore ||

                                "Shoprite"

                                : selectedStore,

                        price:

                            strategy === "maximum"

                                ? product.maximumPrice ||

                                product.estimatedPrice

                                : product.singleStorePrice ||

                                product.estimatedPrice

                    });

                }

            });

            return {

                ...list,

                items: updatedItems

            };

        })

    );

};

    /*REMOVE PRODUCT */

    const removeProduct = (listId, productId) => {

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        items: list.items.filter(

                            item => item.id !== productId

                        )

                    }

                    : list

            )

        );

    };

    /* INCREASE QUANTITY*/

    const increaseQuantity = (listId, productId) => {

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        items: list.items.map(item =>

                            item.id === productId

                                ? {

                                        ...item,

                                        quantity: item.quantity + 1

                                    }

                                : item

                        )

                    }

                    : list

            )

        );

    };

    /* DECREASE QUANTITY */

    const decreaseQuantity = (listId, productId) => {

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        items: list.items

                            .map(item =>

                                item.id === productId

                                    ? {

                                            ...item,

                                            quantity: item.quantity - 1

                                        }

                                    : item

                            )

                            .filter(

                                item => item.quantity > 0

                            )

                    }

                    : list

            )

        );

    };

    /* TOGGLE PURCHASED */

const togglePurchased = (listId, productId) => {

    setLists(previous =>

        previous.map(list =>

            list.id === listId

                ? {

                    ...list,

                    items: list.items.map(item =>

                        item.id === productId

                            ? {

                                ...item,

                                purchased: !item.purchased

                            }

                            : item

                    )

                }

                : list

        )

    );

};
        /* UPDATE SHOPPING LIST */

    const updateList = (listId, updates) => {

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        ...updates

                    }

                    : list

            )

        );

    };

    /* DELETE SHOPPING LIST */

    const deleteList = (listId) => {

        setLists(previous =>

            previous.filter(

                list => list.id !== listId

            )

        );

    };

    /* DUPLICATE SHOPPING LIST */

    const duplicateList = (listId) => {

        const original = lists.find(

            list => list.id === listId

        );

        if (!original) return;

        const copy = {

            ...original,

            id: Date.now(),

            name: `${original.name} Copy`,

            completed: false,

            archived: false,

            createdAt: new Date().toISOString()

        };

        setLists(previous => [

            ...previous,

            copy

        ]);

    };

    /* COMPLETE SHOPPING */

    const completeList = (listId) => {

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        completed: true,

                        archived: true,

                        completedDate: new Date().toISOString()

                    }

                    : list

            )

        );

    };

    /* RESTORE ARCHIVED LIST */

    const restoreList = (listId) => {

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        archived: false,

                        completed: false

                    }

                    : list

            )

        );

    };

    const reuseList = (listId) => {

    const list = lists.find(item => item.id === listId);

    if (!list) return;

    const copiedList = {

        ...list,

        id: Date.now(),

        name: `${list.name}`,

        archived: false,

        completed: false,

        items: list.items.map(item => ({

            ...item,

            quantity: item.quantity,

            purchased: false

        }))

    };

    setLists(previous => [

        copiedList,

        ...previous

    ]);

};
        /*CALCULATE TOTAL */

    const getTotal = (list) => {

        if (!list || !list.items) return 0;

        return list.items.reduce(

            (total, item) =>

                total +

                (Number(item.price) || 0) *

                (item.quantity || 1),

            0

        );

    };

    /* CALCULATE REMAINING BUDGET */

    const getRemaining = (list) => {

        if (!list) return 0;

        return Math.max(

            (Number(list.budget) || 0) -

            getTotal(list),

            0

        );

    };

    /*CALCULATE PROGRESS */

    const getProgress = (list) => {

        if (!list) return 0;

        const budget = Number(list.budget) || 0;

        if (budget === 0) return 0;

        return Math.min(

            (getTotal(list) / budget) * 100,

            100

        );

    };

    /*ESTIMATED SAVINGS*/

    const getEstimatedSavings = (list) => {

        if (!list || !list.items) return 0;

        return list.items.reduce(

            (total, item) =>

                total +

                ((item.savings || 0) *

                (item.quantity || 1)),

            0

        );

    };

    const archiveList = (listId) => {

        const today = new Date().toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        setLists(previous =>

            previous.map(list =>

                list.id === listId

                    ? {

                        ...list,

                        archived: true,

                        completed: true,

                        archivedDate: today

                    }

                    : list

            )

        );

    };


    return (

        <ShoppingContext.Provider

            value={{

                lists,

                createList,

                updateList,

                deleteList,

                duplicateList,

                archiveList,

                completeList,

                restoreList,

                reuseList,

                addProduct,

                applySmartBasket,

                togglePurchased,

                removeProduct,

                increaseQuantity,

                decreaseQuantity,

                getTotal,

                getRemaining,

                getProgress,

                getEstimatedSavings

            }}

        >

            {children}

        </ShoppingContext.Provider>

    );

}

export const useShopping = () =>

    useContext(ShoppingContext);