import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ComponentNavigationProps, NewsData } from "../utils/types";
import DetailsCard from "../components/DetailsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const storeData = async (value: NewsData) => {
  const data: NewsData[] = (await getData()) || [];
  !data.find((d) => d.title === value.title) ? data.push(value) : data;
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@newsData", jsonValue);
  } catch (e) {
    // saving error
    return alert("something went wrong with storing data");
  }
};

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

const NewsOverView = (props: ComponentNavigationProps) => {
  const { title, content, image_url } = props?.route?.params as NewsData;

  props.navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => storeData({ title, content, image_url })}>
        Save
      </Button>
    ),
  });

  return <DetailsCard content={content} image_url={image_url} title={title} />;
};

export default NewsOverView;

const styles = StyleSheet.create({});
