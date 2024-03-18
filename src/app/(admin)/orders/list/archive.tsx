import { View, Text, FlatList } from "react-native";
import React from "react";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";
import { Stack } from "expo-router";

const OrderScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Archive" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default OrderScreen;
