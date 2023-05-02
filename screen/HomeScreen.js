import React, { useLayoutEffect, useState, useCallback } from "react";
import useDebounce from "../hooks/useDebounce";
import { FlatList, SafeAreaView } from "react-native";
import DATA from "../services/ligand.json";
import NoData from "../components/Home/NoData";
import styled from "styled-components";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 10); // 100ms delay in debouncing

  const filterData = (data, query) => {
    // filterData is a function that takes in data and query as parameters
    if (!query) {
      // if query is empty, return default data
      return data;
    }

    return data.filter((item) => {
      // if query is not empty, return filtered data
      const itemData = item.toLowerCase();
      const queryData = query.toLowerCase();
      return itemData.indexOf(queryData) > -1;
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <StyledInput
          placeholder="Search for a Ligand!"
          onChangeText={(search) => setSearchQuery(search)}
        />
      ),
    });
  }, [navigation]);

  const navigatto = (item) => {
    navigation.navigate("Viewer", { ligand: item });
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <ItemView key={index} onPress={() => navigatto(item)}>
        <Ligand>{item}</Ligand>
      </ItemView>
    ),
    []
  );

  return (
    <SafeAreaView>
      <FlatList
        style={{ marginTop: 10 }}
        data={filterData(DATA, debouncedSearchTerm)}
        ListEmptyComponent={() => <NoData query={debouncedSearchTerm} />}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        initialNumToRender={10} // for example
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const Ligand = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 3px;
  color: #fff;
`;

const ItemView = styled.TouchableOpacity`
  background-color: #e97560;
  padding-inline: 20px;
  border-radius: 4px;
  padding: 5px 20px;
  margin: 4px;
`;

const StyledInput = styled.TextInput`
  /* flex: 1; */
  border: 1px solid red;
  border-radius: 10px;
  padding: 0 10px;
  width: 96%;
  min-height: 40px;
`;
