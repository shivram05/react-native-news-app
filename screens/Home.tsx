//@ts-nocheck
import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";

import { Appbar, Chip, Button } from "react-native-paper";
import { NewsData } from "../utils/types";
import CardItem from "../components/CardItem";

const categories = ["Technology", "Sports", "Politics", "Health", "Business"];
const API_KEY = "pub_24268d6826dae2b2722b7b44da98b905993fc";

const Home = (props:ComponentNavigationProps) => {
  const [selectedCategories, setselectedCategories] = useState<NewsData[]>([]);
  const [newsData, setnewsData] = useState([]);
  const [nextPage, setnextPage] = useState("");

  const handleSelect = (val: String) => {
    setselectedCategories((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((cat) => cat !== val)
        : [...prev, val]
    );
  };

  const handleSubmit = async () => {
    const BASE_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=us&language=en&${
      selectedCategories.length > 0
        ? `&category=${selectedCategories.join()}`
        : ""
    }${nextPage?.length>0 ? `&page=${nextPage}`: ''}`;

    console.log(BASE_URL);

    try {
      await fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {setnewsData((prev)=>[...prev,...data.results]) 
           setnextPage(data.nextPage)}
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <View style={styles.filtersContainer}>
        {categories.map((c) => (
          <Chip
            key={c}
            style={styles.chipItem}
            mode="outlined"
            textStyle={{ fontWeight: "400", color: "black", padding: 1 }}
            showSelectedOverlay
            selected={
              selectedCategories.find((cat) => cat === c) ? true : false
            }
            onPress={() => handleSelect(c)}
          >
            {c}
          </Chip>
        ))}

        <Button
          mode="contained-tonal"
          style={styles.button}
          labelStyle={{ fontSize: 14, margin: "auto" }}
          icon={"sync"}
          onPress={handleSubmit}
        >
          Refresh
        </Button>
      </View>

      <FlatList
      onEndReached={handleSubmit}
        style={styles.flatlist}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
          navigation = {props.navigation}
            category={item.category}
            content={item.content}
            country={item.country}
            creator={item.creator}
            description={item.description}
            image_url={item.image_url}
            keywords={item.keywords}
            language={item.language}
            link={item.link}
            pubDate={item.pubDate}
            source_id={item.source_id}
            title={item.title}
            video_url={item.video_url}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },

  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },

  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatlist: {
    flex: 1,
    height: "auto",
  },
});
