import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Card, useTheme, Text } from "react-native-paper";

type Props = {
  title: string;
  image_url: string;
  content: string;
};
const DetailsCard = (props: Props) => {
  return (
    <ScrollView>
      <Text
        style={{ color: "black", marginVertical: 10 }}
        variant="headlineMedium"
      >
        {props.title}
      </Text>

      <Card contentStyle={{ width: Dimensions.get("window").width }}>
        {props.image_url && <Card.Cover source={{ uri: props.image_url }} />}
        <Card.Content>
          <Text textBreakStrategy="highQuality" variant="headlineSmall" style={{ textAlign: "left", marginVertical: 10 }}>
            {props.content}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({});
