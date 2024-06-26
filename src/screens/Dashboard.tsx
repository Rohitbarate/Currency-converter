import React, {useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {CurrencyContext} from '../context/currencyContext';
import SearchScreen from '../components/SearchScreen';

const DashboardScreen = ({navigation}: {navigation: any}) => {
  const {rates, loading, error, refreshRates} = useContext(CurrencyContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshRates().then(() => setRefreshing(false));
  }, [refreshRates]);

  // Function to handle navigation to search screen
  const navigateToSearch = () => {
    navigation.navigate('searchCurrency'); // Replace 'SearchScreen' with your actual screen name
  };

  // Function to handle navigation to search screen
  const navigateToConversion = () => {
    navigation.navigate('Conversion'); // Replace 'SearchScreen' with your actual screen name
  };

  const renderItem = ({item}: {item: {code: string; rate: number}}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.currencyCode}>{item.code}</Text>
      <Text style={styles.currencyRate}>{item.rate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateToSearch}
        style={styles.searchBarContainer}>
        <Text style={styles.searchBarText}>🔎 {'  '}Search currencies</Text>
      </TouchableOpacity>
      {loading ? (
        // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          size="large"
          color="#f5f5f5"
        />
      ) : // </View>
      error ? (
        <Text style={{color: '#000'}}>Error fetching data</Text>
      ) : (
        <>
          <Text style={styles.header}>
            The below rate conversions are from INR,
          </Text>
          <FlatList
            data={rates.slice(0, 20)}
            keyExtractor={item => item.code}
            numColumns={2}
            renderItem={renderItem}
            columnWrapperStyle={styles.row}
            style={{flex: 0.8, height: '80%'}}
          />
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToConversion}>
              <Text style={styles.buttonText}>Go to Conversion</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    paddingTop: 12,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
    color: '#f5f5f590',
    textAlign: 'left',
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  currencyRate: {
    fontSize: 16,
    color: '#666',
  },
  searchBarContainer: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
    marginBottom: 16,
    borderColor: '#000',
    borderWidth: 1,
  },
  searchBarText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default DashboardScreen;
