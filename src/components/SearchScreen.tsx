import React, {useContext, useState} from 'react';
import {View, Text, FlatList, TextInput, Button, Modal} from 'react-native';
// import Modal from 'react-native-modal';
import {CurrencyContext} from '../context/currencyContext';

const SearchScreen = ({navigation}) => {
  const {rates} = useContext(CurrencyContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = Object.keys(rates).filter(currency =>
    currency.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search currency"
      />
      <FlatList
        data={filteredCurrencies}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View>
            <Text>
              {item}: {rates[item]}
            </Text>
          </View>
        )}
      />
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

export default SearchScreen;
