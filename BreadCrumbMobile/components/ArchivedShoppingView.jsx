import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./BottomNavigation";
import styles from "../styles/ShoppingListDetailsStyles";

export default function ArchivedShoppingView({
    list,
    navigation,
    getTotal
}) {
    const total = getTotal(list);
    const budget = Number(list.budget || 0);
    const saved = budget - total;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color="#222"
                    />
                </TouchableOpacity>

                <View style={styles.headerCard}>
                    <Text style={styles.listName}>
                        {list.name}
                    </Text>
                    <Text style={styles.shoppingDate}>
                        Shopping Date
                    </Text>
                    <Text style={styles.shoppingDateValue}>
                        {list.shoppingDate}
                    </Text>
                </View>

                <View
                    style={[
                        styles.completeCard,
                        {
                            alignItems:"center",
                            justifyContent:"center",
                            paddingVertical:35
                        }
                    ]}
                >
                    <Ionicons
                        name="checkmark-circle"
                        size={80}
                        color="#22A45D"
                    />

                    <Text
                        style={[
                            styles.completeTitle,
                            {
                                textAlign:"center",
                                marginTop:18
                            }
                        ]}
                    >
                        Shopping Completed
                    </Text>

                    <Text
                        style={[
                            styles.completeSubtitle,
                            {
                                textAlign:"center",
                                marginTop:8
                            }
                        ]}
                    >
                        Completed on
                    </Text>

                    <Text
                        style={[
                            styles.completeDate,
                            {
                                textAlign:"center",
                                marginTop:6
                            }
                        ]}
                    >
                        {list.archivedDate}
                    </Text>
                </View>

                {/* Summary */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>
                            Budget
                        </Text>

                        <Text style={styles.summaryValue}>
                            E{budget}
                        </Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>
                            Spent
                        </Text>

                        <Text style={styles.summaryValue}>
                            E{total}
                        </Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>
                            Saved
                        </Text>

                        <Text
                            style={[
                                styles.summaryValue,
                                {
                                    color:
                                        saved >= 0
                                            ? "#22A45D"
                                            : "#D32F2F"
                                }
                            ]}
                        >
                            E{Math.abs(saved)}
                        </Text>
                    </View>
                </View>

                {/* Shopping Progress */}
                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>
                            Shopping Progress
                        </Text>
                        <Text style={styles.progressPercent}>
                            100%
                        </Text>
                    </View>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width:"100%"
                                }
                            ]}
                        />
                    </View>

                    <Text style={styles.progressText}>
                        {list.items.length} of {list.items.length} items purchased
                    </Text>
                </View>

                {/* Receipt */}
                <View style={styles.basketCard}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Purchase Receipt
                        </Text>
                    </View>

                    {
                        list.items.map(item => (
                            <View
                                key={(item._id || item.id).toString()}
                                style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    paddingVertical:18,
                                    borderBottomWidth:1,
                                    borderBottomColor:"#EFEFEF"
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection:"row",
                                        alignItems:"center",
                                        flex:1
                                    }}
                                >
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={22}
                                        color="#22A45D"
                                    />
                                    <View
                                        style={{
                                            marginLeft:12
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight:"700",
                                                fontSize:16,
                                                color:"#222"
                                            }}
                                        >
                                            {item.name}
                                        </Text>

                                        <Text
                                            style={{
                                                color:"#777",
                                                marginTop:4
                                            }}
                                        >
                                            {item.quantity} × E{item.price}
                                        </Text>
                                    </View>
                                </View>

                                <Text
                                    style={{
                                        fontWeight:"700",
                                        fontSize:16,
                                        color:"#22A45D"
                                    }}
                                >
                                    E{item.quantity * item.price}
                                </Text>
                            </View>
                        ))
                    }

                    <View
                        style={{
                            marginTop:25,
                            paddingTop:20,
                            borderTopWidth:1,
                            borderTopColor:"#E5E5E5",
                            flexDirection:"row",
                            justifyContent:"space-between"
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:"700",
                                fontSize:19
                            }}
                        >
                            Receipt Total
                        </Text>

                        <Text
                            style={{
                                fontWeight:"700",
                                fontSize:22,
                                color:"#22A45D"
                            }}
                        >
                            E{total}
                        </Text>
                    </View>
                </View>

                <View style={{ height: 90 }} />
            </ScrollView>

            <BottomNavigation
                navigation={navigation}
                active="Lists"
            />
        </SafeAreaView>
    );
}