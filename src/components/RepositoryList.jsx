import { FlatList, View, StyleSheet, Pressable, } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import RepositoryListHeader from './RepositoryListHeader';
import { useDebounce } from "use-debounce";
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate, selectedOrder, handleOrderChange, searchKeyword, setSearchKeyword }) => {
  const repositoryNodes = repositories ?
    repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList 
      data={repositoryNodes} 
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <Pressable onPress={() => navigate(`/${item.id}`)}><RepositoryItem item={item} displayButton={false}/></Pressable>}
      ListHeaderComponent={
        <>
          <Searchbar style={{ backgroundColor: 'white' }} mode="view" value={searchKeyword} onChangeText={setSearchKeyword}/>
          <RepositoryListHeader 
          selectedOrder={selectedOrder} 
          handleOrderChange={handleOrderChange}
          />
        </> 
      }
      />
  )
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC')
  const [selectedOrder, setSelectedOrder] = useState('latest')
  const [searchKeyword, setSearchKeyword] = useState('');
  const [value] = useDebounce(searchKeyword, 500)
  const { repositories } = useRepositories({ orderBy, orderDirection, searchKeyword: value });
  const navigate = useNavigate();

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    switch(value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        break;
    }
  }

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      navigate={navigate} 
      selectedOrder={selectedOrder} 
      handleOrderChange={handleOrderChange}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
}

export default RepositoryList;