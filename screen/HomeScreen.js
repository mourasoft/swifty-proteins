import React, { useLayoutEffect, useState, useCallback } from "react";
import useDebounce from "../hooks/useDebounce";
import { FlatList, SafeAreaView } from "react-native";
import DATA from "../services/ligand.json";
import NoData from "../components/Home/NoData";
import { filterData, navigatto } from "../services/helpers";
import { Ligand, ItemView, StyledInput } from "../styles/StyledHome";
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 10); // 100ms delay in debouncing

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

  const renderItem = useCallback(
    ({ item, index }) => (
      <ItemView key={index} onPress={() => navigatto(item, navigation)}>
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
