import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  LogBox,
} from 'react-native';
// import Modal from 'react-native-modal';
import {CurrencyContext} from '../context/currencyContext';

const SearchScreen = ({navigation, route}) => {
  const onSelect = route.params?.onSelect;
  const {rates} = useContext(CurrencyContext);
  const [searchQuery, setSearchQuery] = useState('');

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const filteredCurrencies = rates.filter(
    currency =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  console.log({filteredCurrencies});

  const handleSelectCurrency = (currencyCode: string) => {
    onSelect(currencyCode);
    navigation.goBack();
  };

  const renderItem = ({
    item,
  }: {
    item: {code: string; name: string; rate: number};
  }) => (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        borderBottomColor: '#ffffff80',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
      }}
      disabled={onSelect ? false : true}
      onPress={() => onSelect && handleSelectCurrency(item.code)}>
      <View style={styles.itemContainer}>
        <Text style={styles.currencyCode}>{item.name + ' ' + item.code}</Text>
        <Text style={styles.currencyRate}>{item.rate}</Text>
      </View>
      {onSelect && <Text>{'⟩'}</Text>}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={{flex: 1, height: '80%'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000099',
          padding: 20,
          borderRadius: 10,
          height: '80%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: 12,
            width: '65%',
            paddingVertical: 12,
            marginBottom: 8,
          }}>
          <Text
            onPress={() => navigation.goBack()}
            style={{fontSize: 20, color: '#fff', fontWeight: '200'}}>
            ⨉
          </Text>
          <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
            {onSelect ? `Select currency` : `Search currency`}
          </Text>
        </View>
        <View style={styles.searchBar}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
            }}>
            <Text style={{fontSize: 16}}>🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search currency"
              placeholderTextColor={'#00000050'}
              maxLength={15}
              autoFocus={true}
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
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'flex-start',
  },
  currencyCode: {
    fontSize: 16,
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
