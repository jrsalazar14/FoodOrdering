import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrderList } from "@/src/api/orders";

const OrderScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default OrderScreen;
