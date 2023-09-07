import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ScrollableKeyboardAvoidView from "../config/ScrollableKeyboardAvoidView";

function ListingDetailsScreen({ route }) {
  const product = route.params;

  return (
    <ScrollableKeyboardAvoidView>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <Image
          style={styles.image}
          preview={{ uri: product?.images[0]?.image  ? product?.images[0]?.image : 'https://d3ski4a8qseigv.cloudfront.net/sokoni' }}
          tint="light"
          uri={product?.images[0]?.image || 'https://d3ski4a8qseigv.cloudfront.net/sokoni'}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.description}>{product?.description}</Text>
          <Text style={styles.price}>${product?.unit_price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/makoye.jpeg")}
              title="Emmanuel Makoye"
              subTitle="5 products"
            />
          </View>
          <ContactSellerForm product={product} />
        </View>
      </KeyboardAvoidingView>
      </ScrollableKeyboardAvoidView>

  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
