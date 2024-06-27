import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CurrencyContext} from '../context/currencyContext';
import {CURRENCY_NAMES} from '../utils';

const NUM_KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '00', '0', '.'];
const ACTION_KEYS = ['DEL', 'AC'];

const ConversionScreen = ({navigation}) => {
  const {rates, lastUpdateTD} = useContext(CurrencyContext);

  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [baseCurrency, setBaseCurrency] = useState('INR');
  const [targetCurrency, setTargetCurrency] = useState('USD');

  console.log({baseCurrency, targetCurrency});

  useEffect(() => {
    convertCurrency();
  }, [amount, baseCurrency, targetCurrency]);

  const convertCurrency = () => {
    const baseRate = rates.find(rate => rate.code === baseCurrency)?.rate || 1;
    const targetRate =
      rates.find(rate => rate.code === targetCurrency)?.rate || 1;
    const convertedAmount = (parseFloat(amount) / baseRate) * targetRate;
    setResult(convertedAmount);
  };

  const swapCurrencies = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  const handleCngTargetCurr = (currencyCode: string) => {
    console.log('handleCngTargetCurr callled! ' + currencyCode);
    setTargetCurrency(currencyCode.toString());
  };

  const handleKeyPress = (key: string) => {
    if (key === 'DEL') {
      setAmount(amount.slice(0, -1) || '0');
    } else if (key === 'AC') {
      setAmount('0');
    } else {
      setAmount(prev => (prev === '0' ? key : prev + key));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{rowGap: 14}}>
        <View style={styles.currencyContainer}>
          <View style={{flexDirection: 'column', flex: 1, rowGap: 8}}>
            <View style={styles.amountContainer}>
              <Text style={styles.currencyText}>
                {CURRENCY_NAMES[baseCurrency] + ' ' + baseCurrency}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.amountText, {color: 'orange'}]}>
                {amount}
              </Text>
            </View>
            <View style={styles.amountContainer}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 8,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  navigation.navigate('searchCurrency', {
                    onSelect: handleCngTargetCurr,
                  });
                }}>
                <Text style={styles.currencyText}>
                  {CURRENCY_NAMES[targetCurrency] + ' ' + targetCurrency}
                </Text>
                <Text
                  style={[
                    styles.currencyText,
                    {fontSize: 20, color: 'orange', fontWeight: '800'},
                  ]}>
                  {'⇄'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.amountText}>
                {result !== null ? result.toFixed(2) : ''}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Text style={styles.swapButtonText}>Swap</Text>
        </TouchableOpacity> */}
        </View>
        <Text style={{alignSelf: 'center'}}>{`last updated on ${new Date(
          lastUpdateTD,
        ).toLocaleString()}`}</Text>
      </View>
      {/* Keyboard view */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={[
            styles.keyboardContainer,
            {
              alignSelf: 'flex-end',
              columnGap: 6,
            },
          ]}>
          {ACTION_KEYS.map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.key, {width: '30%', backgroundColor: 'orange'}]}
              onPress={() => handleKeyPress(key)}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keyboardContainer}>
          {NUM_KEYS.map(key => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    // rowGap: 12,
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  amountContainer: {
    // flex: 1,
    backgroundColor: '#f0f0f040',
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
  },
  currencyText: {
    color: '#f5f5f599',
    fontSize: 16,
    fontWeight: '400',
  },
  amountText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  swapButton: {
    backgroundColor: '#f0f0f050',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  },
  swapButtonText: {
    color: '#000',
    fontSize: 16,
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  key: {
    width: '25%',
    // height: 60,
    padding: 16,
    margin: 5,
    backgroundColor: '#f0f0f050',
    alignItems: 'center',
    borderRadius: 50,
  },
  keyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ConversionScreen;
