import { View, StyleSheet, Pressable } from "react-native";
import { Card, useTheme } from "react-native-paper";
import React from "react";
import { NewsData } from "../utils/types";
import { NavigationProp } from "@react-navigation/native";

// const theme = useTheme();

type Props = {
  title: string;
  image_url: string;
  description: string;
  content: string;
  navigation: NavigationProp<Route>;
};

const CardItem = (props: Props) => {
  const handlePress = () => {
    props.navigation.navigate("NewsOverview", {
      title: props.title,
      description: props.description,
      image_url: props.image_url,
      content: props.content,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={styles.card}>
        <Card.Cover borderRadius={10} source={{ uri: props.image_url }} />
        <Card.Title
          title={props.title}
          subtitle={props.description.split("\n")[0]}
          titleNumberOfLines={1}
        ></Card.Title>
      </Card>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    // backgroundColor: theme.colors.elevation.level5,
  },
});
