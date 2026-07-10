import React, { useState } from "react";
import { useShopping } from "../context/ShoppingContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import ShoppingListCard from "../components/ShoppingListCard";

import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    Switch,
    Platform
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ShoppingListsStyles";

export default function ShoppingLists({ navigation }) {

    const {

    lists,

    createList,

    archiveList,

    deleteList,

    reuseList

} = useShopping();

    const [modalVisible, setModalVisible] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [listName, setListName] = useState("");

    const [budget, setBudget] = useState("");

    const [shoppingDate, setShoppingDate] = useState(null);

    const [shareList, setShareList] = useState(false);

    const handleCreateList = () => {

        if (!listName.trim()) {

            return;

        }

        createList({

            id: Date.now(),

            name: listName,

            budget,

            shoppingDate: shoppingDate
                ? shoppingDate.toLocaleDateString(
                    "en-GB",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                )
                : "",

            shareList,

            items: [],

            completed:false,

            archived:false

        });

        setListName("");

        setBudget("");

        setShoppingDate(null);

        setShareList(false);

        setModalVisible(false);

    };

    const onChangeDate = (event, selectedDate) => {

        if (Platform.OS === "android") {

            setShowDatePicker(false);

        }

        if (selectedDate) {

            setShoppingDate(selectedDate);

        }

    };

    const formattedDate = shoppingDate

    ? shoppingDate.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    )

    : "Choose your shopping day";

        const activeLists = lists.filter(
            list => !list.archived
        );

        const archivedLists = lists.filter(
            list => list.archived
        );

    return (
    

    <SafeAreaView style={styles.container}>

        <View style={styles.header}>

            <TouchableOpacity

                onPress={() => navigation.goBack()}

            >

                <Ionicons

                    name="arrow-back"

                    size={26}

                    color="#222"

                />

            </TouchableOpacity>

            <Text style={styles.headerTitle}>

                Shopping Lists

            </Text>

            <TouchableOpacity

                style={styles.addButton}

                onPress={() => setModalVisible(true)}

            >

                <Ionicons

                    name="add"

                    size={24}

                    color="#FFF"

                />

            </TouchableOpacity>

        </View>

        {

            activeLists.length === 0 && archivedLists.length === 0 ? (

                <View style={styles.emptyContainer}>

                    <Ionicons

                        name="cart-outline"

                        size={90}

                        color="#C7D72D"

                    />

                    <Text style={styles.emptyTitle}>

                        No Shopping Lists Yet

                    </Text>

                    <Text style={styles.emptySubtitle}>

                        Create your first shopping list to start comparing prices and saving money.

                    </Text>

                    <TouchableOpacity

                        style={styles.createButton}

                        onPress={() => setModalVisible(true)}

                    >

                        <Text style={styles.createButtonText}>

                            Create New List

                        </Text>

                    </TouchableOpacity>

                </View>

            ) : (

                <ScrollView

                    showsVerticalScrollIndicator={false}

                >

                    {

                        activeLists.map((list) => (

                            <ShoppingListCard

                                key={list.id}

                                list={list}

                                archived={false}

                                navigation={navigation}

                                onArchive={() => archiveList(list.id)}

                                onDelete={() => deleteList(list.id)}

                            />

                        ))

                    }

                                    
                                    

                    {
                        archivedLists.length > 0 && (

                            <View
                                style={{
                                    marginHorizontal: 20,
                                    marginTop: 15,
                                    marginBottom: 10
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: "700",
                                        color: "#666"
                                    }}
                                >

                                    📦 Archived Shopping Lists

                                </Text>

                            </View>

                        )
                    }

                    {

                        archivedLists.map((list) => (

                            <ShoppingListCard

                                key={list.id}

                                list={list}

                                archived={true}

                                navigation={navigation}

                                onReuse={() => reuseList(list.id)}

                                onDelete={() => deleteList(list.id)}

                            />

                        ))

                    }

                </ScrollView>
    )}
        

        <Modal

            visible={modalVisible}

            animationType="slide"

            transparent

        >

            <View style={styles.modalBackground}>

                <View style={styles.modal}>

                    <Text style={styles.modalTitle}>

                        Create Shopping List

                    </Text>

                    <TextInput

                        placeholder="List Name"

                        placeholderTextColor="#888"

                        style={styles.input}

                        value={listName}

                        onChangeText={setListName}

                    />

                    <TextInput

                        placeholder="Budget (E)"

                        placeholderTextColor="#888"

                        keyboardType="numeric"

                        style={styles.input}

                        value={budget}

                        onChangeText={setBudget}

                    />

                    <TouchableOpacity

                        style={styles.datePicker}

                        activeOpacity={0.9}

                        onPress={() =>

                            setShowDatePicker(true)

                        }

                    >

                        <View

                            style={{

                                flexDirection:"row",

                                alignItems:"center"

                            }}

                        >

                            <View

                                style={{

                                    width:48,

                                    height:48,

                                    borderRadius:15,

                                    backgroundColor:

                                        "rgba(199,215,45,0.12)",

                                    justifyContent:"center",

                                    alignItems:"center"

                                }}

                            >

                                <Ionicons

                                    name="calendar"

                                    size={24}

                                    color="#C7D72D"

                                />

                            </View>

                            <View

                                style={{

                                    marginLeft:15,

                                    flex:1

                                }}

                            >

                                <Text

                                    style={styles.dateTitle}

                                >

                                    Shopping Date

                                </Text>

                                <Text

                                    style={styles.dateValue}

                                >

                                    {formattedDate}

                                </Text>

                            </View>

                            <Ionicons

                                name="chevron-forward"

                                size={22}

                                color="#AAA"

                            />

                        </View>

                    </TouchableOpacity>

                    {

                        showDatePicker && (

                            <DateTimePicker

                                value={

                                    shoppingDate ||

                                    new Date()

                                }

                                mode="date"

                                display={

                                    Platform.OS === "ios"

                                        ? "inline"

                                        : "default"

                                }

                                themeVariant="light"

                                minimumDate={

                                    new Date()

                                }

                                onChange={onChangeDate}

                            />

                        )

                    }

                    <View style={styles.switchRow}>

                        <Text

                            style={{

                                fontWeight:"600",

                                color:"#333"

                            }}

                        >

                            Share with Family

                        </Text>

                        <Switch

                            value={shareList}

                            onValueChange={

                                setShareList

                            }

                            trackColor={{

                                false:"#DDD",

                                true:"#C7D72D"

                            }}

                        />

                    </View>

                    <TouchableOpacity

                        style={styles.saveButton}

                        onPress={handleCreateList}

                    >

                        <Text style={styles.saveText}>

                            Create Shopping List

                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
        
        <View
            style={{
                height: 25
            }}
        />

    </SafeAreaView>

);
}