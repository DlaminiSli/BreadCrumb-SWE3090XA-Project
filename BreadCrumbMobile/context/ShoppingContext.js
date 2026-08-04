import api from "../services/api";
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

    /* SAVE LISTS

    useEffect(() => {

        saveLists(lists);

    }, [lists]);*/

    const loadLists = async () => {

    try {

        const response = await api.get("/shoppinglists");

        console.log("Shopping Lists API:", response.data);

        setLists(response.data);

    }

    catch (error) {

        console.log("Load Lists Error");

        console.log(error.response?.data || error.message);

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

    const createList = async (list) => {

        try {

            const user = JSON.parse(

                await AsyncStorage.getItem("@currentUser")

            );

            const response = await api.post(

                "/shoppinglists",

                {

                    user: user._id,

                    name: list.name,

                    category: list.category,

                    budget: Number(list.budget) || 0,

                    shoppingDate: list.shoppingDate,

                    shareList: list.shareList,

                    completed: list.completed,

                    archived: list.archived,

                    items: list.items || []

                }

            );

            setLists(previous => [

                ...previous,

                response.data.shoppingList

            ]);

        }

        catch (error) {

            console.log("Create List Error");

            console.log(error.response?.data || error.message);

        }

    };
        /*ADD PRODUCT */
    const addProduct = async (listId, product) => {

    try {

        await api.post(

            `/shoppinglists/${listId}/items`,

            {

                name: product.name,

                price: Number(String(product.price).replace("E","")),

                savings: Number(String(product.save || "0").replace("Save E","")),

                store: product.store,

                quantity: 1

            }

        );

        await loadLists();

    }

    catch (error) {

        console.log("Add Product Error");

        console.log(error.response?.data || error.message);

    }

};

    /*APPLY SMART BASKET */

    const applySmartBasket = async (

        listId,

        products,

        strategy

    ) => {

        try {

            const selectedStore =
                strategy === "singleStore"
                    ? products[0]?.store || "Shoprite"
                    : null;

            for (const product of products) {

                await api.post(

                    `/shoppinglists/${listId}/items`,

                    {

                        name: product.name,

                        quantity: 1,

                        purchased: false,

                        price:
                            strategy === "maximum"
                                ? Number(product.price || product.maximumPrice || product.estimatedPrice || 0)
                                : Number(product.price || product.singleStorePrice || product.estimatedPrice || 0),

                        store:
                            strategy === "maximum"
                                ? product.store || product.cheapestStore || "Shoprite"
                                : selectedStore,

                        savings: Number(product.savings || 0)

                    }

                );

            }

            await loadLists();

        }

        catch (error) {
            console.log("Apply Smart Basket Error");
            console.log(error.response?.data || error.message);
        }

    };

    /*REMOVE PRODUCT */
    const removeProduct = async (listId, itemId) => {
        try {
            await api.delete(
                `/shoppinglists/${listId}/items/${itemId}`
            );
            await loadLists();
        }

        catch (error) {
            console.log("Remove Product Error");
            console.log(error.response?.data || error.message);
        }

    };

    /* INCREASE QUANTITY*/
    const increaseQuantity = async (listId,itemId) => {
        try{
            await api.patch(
                `/shoppinglists/${listId}/items/${itemId}/increase`
            );
            await loadLists();
        }
        catch(error){
            console.log("Increase Error");
            console.log(error.response?.data || error.message);
        }
    };

    /* DECREASE QUANTITY */
    const decreaseQuantity = async (listId, itemId) => {
        try {
            await api.patch(
                `/shoppinglists/${listId}/items/${itemId}/decrease`
            );
            await loadLists();
        }

        catch (error) {
            console.log("Decrease Error");
            console.log(error.response?.data || error.message);
        }
    };

    /* TOGGLE PURCHASED */
    const togglePurchased = async (listId, itemId) => {
        try {
            await api.patch(
                `/shoppinglists/${listId}/items/${itemId}/toggle`
            );
            await loadLists();
        }
        catch (error) {
            console.log("Toggle Purchased Error");
            console.log(error.response?.data || error.message);
        }
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
    const deleteList = async (listId) => {
        try {
            await api.delete(`/shoppinglists/${listId}`);
            await loadLists();
        }
        catch (error) {
            console.log("Delete List Error");
            console.log(error.response?.data || error.message);
        }
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

    const reuseList = async (listId) => {
        try {
            await api.patch(
                `/shoppinglists/${listId}/reuse`
            );
            await loadLists();
        }

        catch(error){
            console.log("Reuse Error");
            console.log(error.response?.data || error.message);
        }
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

    const archiveList = async (listId) => {

    try {
        await api.patch(
            `/shoppinglists/${listId}/archive`
        );
        await loadLists();
    }

    catch (error) {
        console.log("Archive Error");
        console.log(error.response?.data || error.message);
    }

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