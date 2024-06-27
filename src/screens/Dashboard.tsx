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
    navigation.navigate('searchCurrency', {onSelect: undefined}); // Replace 'SearchScreen' with your actual screen name
  };

  // Function to handle navigation to search screen
  const navigateToConversion = () => {
    navigation.navigate('Conversion'); // Replace 'SearchScreen' with your actual screen name
  };

  const renderItem = ({
    item,
  }: {
    item: {code: string; name: string; rate: number};
  }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.currencyCode}>{item.code}</Text>
        <Text style={styles.currencyName}>{item.name}</Text>
      </View>
      <Text style={styles.currencyRate}>{item.rate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateToSearch}
        style={styles.searchBarContainer}>
        <Text style={styles.searchBarText}>🔍 {'  '}Search currencies</Text>
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
            // numColumns={2}
            renderItem={renderItem}
            // columnWrapperStyle={styles.row}
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
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
    color: '#f5f5f5',
    textAlign: 'left',
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#f0f0f040',
    padding: 16,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  currencyName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff90',
  },
  currencyRate: {
    fontSize: 20,
    color: '#fff',
  },
  searchBarContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f0f0f050',
    borderRadius: 24,
    marginBottom: 12,
    borderColor: '#ffffff80',
    borderWidth: 1,
  },
  searchBarText: {
    fontSize: 16,
    color: '#ffffff',
  },
  button: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export default DashboardScreen;
