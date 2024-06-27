import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Modal,
  StyleSheet,
} from 'react-native';
// import Modal from 'react-native-modal';
import {CurrencyContext} from '../context/currencyContext';

const SearchScreen = ({navigation}) => {
  const {rates} = useContext(CurrencyContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = rates.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  console.log({filteredCurrencies});

  const renderItem = ({item}: {item: {code: string; rate: number}}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.currencyCode}>{item.code}</Text>
      <Text style={styles.currencyRate}>{item.rate}</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
      }}>
      <View style={styles.searchBar}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 8,
          }}>
          <Text style={{fontSize: 20}}>🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search currency"
            placeholderTextColor={'#000'}
            maxLength={15}
            style={{color: '#000', flex: 1}}
          />
        </View>
        {searchQuery.length >= 1 && (
          <Text
            onPress={() => setSearchQuery('')}
            style={{
              fontSize: 12,
              color: 'red',
              padding: 5,
              backgroundColor: '#ffffff80',
              borderRadius: 20,
            }}>
            ❌
          </Text>
        )}
      </View>

      {filteredCurrencies.length == 0 ? (
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontWeight: '600',
            fontSize: 16,
          }}>
          No Currency found
        </Text>
      ) : (
        <FlatList
          data={filteredCurrencies}
          keyExtractor={item => item.code}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          initialNumToRender={20}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'flex-start',
    borderBottomColor: '#ffffff80',
    borderBottomWidth: 1,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  currencyRate: {
    fontSize: 16,
    color: '#ffffff90',
  },
  searchBar: {
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    marginBottom: 14,
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SearchScreen;
