import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonNavigationAction, useIsFocused } from "@react-navigation/native";
import { ComponentNavigationProps, NewsData } from "../utils/types";
import CardItem from "../components/CardItem";

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@newsData");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert("something went wrong");
    return;
  }
};

const Saved = (props: ComponentNavigationProps) => {
  const focused = useIsFocused();
  const [savedNews, setsavedNews] = useState([]);
  useEffect(() => {
    getData()
      .then((data) => setsavedNews(data))
      .catch((err) => alert(err));
  }, [focused]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Saved" />
      </Appbar.Header>

      <FlatList
      keyExtractor={(item)=>item.title}
        data={savedNews}
        renderItem={({ item }) => (
          <CardItem
            content={item.content}
            description={item.description}
            image_url={item.image_url}
            title={item.title}
          />
          )}/>
        
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList:{
    display:'flex',
    flex:1,
    height:'auto'
  }
});
