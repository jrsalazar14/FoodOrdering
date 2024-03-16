import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetField = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price must be a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Updating product: ", name);

    resetField();
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Create product: ", name);

    resetField();
  };

  const onDelete = () => {
    console.warn("Delete product");
  };

  const confirmDelete = () => {
    Alert.alert("Delete Product", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: onDelete,
        style: "destructive",
      },
    ]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{error}</Text>
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
