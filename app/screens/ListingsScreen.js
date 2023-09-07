import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import ScrollableKeyboardAvoidView from "../config/ScrollableKeyboardAvoidView";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  console.log(getListingsApi)

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
    
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {(getListingsApi.error || !getListingsApi?.data?.results) && (
          <>
            <AppText>Couldn't retrieve jobs.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi?.data?.results}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item?.title}
              location = {item?.location}
              description = {item?.description}
              subTitle={"$" + item?.unit_price}
              imageUrl={item?.images[0]?.image || 'https://d3ski4a8qseigv.cloudfront.net/sokoni'}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item?.images[0]?.image}
            />
          )}
        />
      </Screen>
      
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
