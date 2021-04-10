import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts, Roboto_900Black } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import uuid from "uuid";

import { THEME } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import products from "../dummy/products";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const ProductIcon = ({ image, title, active, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        elevation: active === image ? 20 : 0,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginRight: THEME.padding / 3,
        borderRadius: 20,
        backgroundColor: "white",
      }}
      onPress={onPress}
    >
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
        }}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          marginLeft: 5,
          color: active === image ? THEME.primaryColor : "#000",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const renderRating = (rating) => {
  var StarReview = [];
  var fullStar = Math.floor(rating);
  var noStar = Math.floor(5 - rating);
  var halfStar = 5 - fullStar - noStar;
  // full rating
  for (let i = 0; i < fullStar; i++) {
    StarReview.push(<FontAwesome name="star" size={18} color="gold" />);
  }
  // half rating
  for (let i = 0; i < halfStar; i++) {
    StarReview.push(<FontAwesome name="star-half" size={18} color="gold" />);
  }
  // no rating
  for (let i = 0; i < noStar; i++) {
    StarReview.push(<FontAwesome name="star" size={18} color="lightgray" />);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 5,
      }}
    >
      <View style={{ flexDirection: "row" }}>{StarReview}</View>
      <Text
        style={{
          marginLeft: 5,
          fontSize: 13,
          fontWeight: "bold",
          color: THEME.primaryColor,
        }}
      >
        ({rating})
      </Text>
    </View>
  );
};

const Product = ({ product, index }) => {
  const { item } = product;
  return (
    <View key={uuid.v4()} style={styles.product}>
      {/* product header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.discount}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              padding: 2,
              fontWeight: "bold",
            }}
          >
            30%
          </Text>
        </View>
        <View
          style={[
            styles.favorite,
            {
              borderRadius: 20,
              padding: 2,
              backgroundColor: item.isFavorite ? THEME.red : "transparent",
            },
          ]}
        >
          <MaterialIcons
            name="favorite"
            size={18}
            color={item.isFavorite ? THEME.white : "lightgray"}
          />
        </View>
      </View>
      {/* product image container */}
      <View style={[styles.outerCon, { backgroundColor: item.bgColor }]}>
        <View style={styles.innerCon}>
          <Image
            source={products[index].image}
            resizeMode="contain"
            style={{ width: 80, height: 80 }}
          />
        </View>
      </View>
      {/* product details */}
      <View style={{ alignItems: "center" }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 16,
            textAlign: "center",
            color: THEME.primaryColor,
            paddingVertical: 5,
          }}
        >
          {item.title}
        </Text>
        {/* price */}
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: THEME.primaryColor,
              paddingHorizontal: 2,
              paddingTop: 3,
            }}
          >
            $
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: THEME.darkPrimary,
            }}
          >
            {item.price}.00
          </Text>
        </View>
        {/* rating */}
        {renderRating(item.rating)}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [activeProduct, setActiveProduct] = React.useState(products[0].image);
  const [index, setIndex] = React.useState(products[0].id - 1);
  const [fontsLoaded] = useFonts({
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Our Product</Text>
        <TouchableOpacity onPress={console.log("Sort pressed")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.subTitle}>Sort by</Text>
            <AntDesign name="down" size={12} color="gray" />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: THEME.padding,
          marginHorizontal: THEME.radius / 5,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {products.map((item) => (
          <ProductIcon
            key={item.id}
            image={item.image}
            title={item.title}
            active={activeProduct}
            onPress={() => {
              setActiveProduct(item.image);
              setIndex(item.id - 1);
            }}
          />
        ))}
      </View>
      <View style={styles.productContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          data={products[index].products}
          keyExtractor={() => uuid.v4()}
          renderItem={(product) => (
            <Product key={product.item.id} product={product} index={index} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.lightWhite,
    padding: THEME.padding,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: 25,
    flex: 1,
  },
  subTitle: {
    color: "gray",
    fontWeight: "bold",
    marginRight: 5,
  },
  productContainer: {
    paddingVertical: THEME.padding,
    marginBottom: 60,
  },
  product: {
    backgroundColor: THEME.white,
    borderRadius: 30,
    width: "47%",
    padding: 10,
    margin: 5,
    height: "auto",
    paddingBottom: 20,
  },
  outerCon: {
    width: 120,
    height: 120,
    alignSelf: "center",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  innerCon: {
    width: 100,
    height: 100,
    alignSelf: "center",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: THEME.white,
    borderWidth: 2,
  },
  discount: {
    backgroundColor: THEME.dodgerBlue,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
