import React from "react";

import {

    View,

    Text,

    TouchableOpacity,

    Alert

} from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/ShoppingListsStyles";

export default function ShoppingListCard({

    list,

    archived,

    navigation,

    onArchive,

    onDelete,

    onReuse

}) {

    const leftAction = () => (

        <TouchableOpacity

            onPress={() => {

                if (archived) {

                    onReuse();

                } else {

                    onArchive();

                }

            }}

            style={{

                width:120,

                backgroundColor:"#22A45D",

                justifyContent:"center",

                alignItems:"center",

                borderRadius:22,

                marginBottom:18

            }}

        >

            <Ionicons

                name={

                    archived

                        ? "refresh"

                        : "archive"

                }

                size={32}

                color="#FFF"

            />

            <Text

                style={{

                    color:"#FFF",

                    fontWeight:"700",

                    marginTop:8

                }}

            >

                {

                    archived

                        ? "Reuse"

                        : "Archive"

                }

            </Text>

        </TouchableOpacity>

    );

    const rightAction = () => (

        <TouchableOpacity

            onPress={() => {

                Alert.alert(

                    archived

                        ? "Delete Forever?"

                        : "Delete Shopping List",

                    archived

                        ? "This archived list will be permanently deleted."

                        : "Are you sure you want to delete this shopping list?",

                    [

                        {

                            text:"Cancel",

                            style:"cancel"

                        },

                        {

                            text:"Delete",

                            style:"destructive",

                            onPress:onDelete

                        }

                    ]

                );

            }}

            style={{

                width:120,

                backgroundColor:"#D32F2F",

                justifyContent:"center",

                alignItems:"center",

                borderRadius:22,

                marginBottom:18

            }}

        >

            <Ionicons

                name="trash"

                size={32}

                color="#FFF"

            />

            <Text

                style={{

                    color:"#FFF",

                    fontWeight:"700",

                    marginTop:8

                }}

            >

                Delete

            </Text>

        </TouchableOpacity>

    );

    return (

        <Swipeable

            renderLeftActions={leftAction}

            renderRightActions={rightAction}

        >
            <View

    style={[
        styles.listCard,
        archived && {
            opacity:0.75
        }
    ]}

>

    <TouchableOpacity

        activeOpacity={0.9}

        onPress={() =>

            navigation.navigate(

                "ShoppingListDetails",

                {

                    listId:list.id

                }

            )

        }

    >

        <View style={styles.listTop}>

            <View>

                <Text style={styles.listName}>

                    {list.name}

                </Text>

                <Text style={styles.listDate}>

                    {list.shoppingDate || "No Date"}

                </Text>

            </View>

            {

                archived ?

                (

                    <Ionicons

                        name="archive"

                        size={24}

                        color="#666"

                    />

                )

                :

                (

                    list.shareList &&

                    <Ionicons

                        name="people"

                        size={24}

                        color="#C7D72D"

                    />

                )

            }

        </View>

        <View style={styles.infoRow}>

            <View>

                <Text style={styles.infoTitle}>

                    Budget

                </Text>

                <Text style={styles.infoValue}>

                    E{list.budget}

                </Text>

            </View>

            <View>

                <Text style={styles.infoTitle}>

                    Items

                </Text>

                <Text style={styles.infoValue}>

                    {list.items.length}

                </Text>

            </View>

            <View>

                <Text style={styles.infoTitle}>

                    {

                        archived

                            ? "Status"

                            : "Remaining"

                    }

                </Text>

                <Text

                    style={

                        archived

                            ?

                            {

                                color:"#22A45D",

                                fontWeight:"700",

                                marginTop:5,

                                fontSize:16

                            }

                            :

                            styles.remaining

                    }

                >

                    {

                        archived

                            ?

                            "Completed"

                            :

                            `E${list.budget}`

                    }

                </Text>

            </View>

        </View>

    </TouchableOpacity>

</View>

</Swipeable>

);

}
