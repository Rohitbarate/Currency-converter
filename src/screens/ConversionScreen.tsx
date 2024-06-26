import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CurrencyContext} from '../context/currencyContext';

const NUM_KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '00', '0', '.'];
const ACTION_KEYS = ['DEL', 'AC'];

const ConversionScreen = () => {
  const {rates} = useContext(CurrencyContext);

  const [amount, setAmount] = useState('200.50');
  const [result, setResult] = useState<number | null>(null);
  const [baseCurrency, setBaseCurrency] = useState('INR');
  const [targetCurrency, setTargetCurrency] = useState('USD');

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
      <View style={styles.currencyContainer}>
        <View style={{flexDirection: 'column', flex: 0.7, rowGap: 8}}>
          <View style={styles.amountContainer}>
            <TouchableOpacity>
              <Text style={styles.currencyText}>{baseCurrency}</Text>
            </TouchableOpacity>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.amountText}>
              {amount}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <TouchableOpacity>
              <Text style={styles.currencyText}>{targetCurrency}</Text>
            </TouchableOpacity>
            <Text style={styles.amountText}>
              {result !== null ? result.toFixed(2) : ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Text style={styles.swapButtonText}>Swap</Text>
        </TouchableOpacity>
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
    rowGap: 12,
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  amountContainer: {
    // flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
  },
  currencyText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  amountText: {
    color: 'orange',
    fontSize: 24,
    fontWeight: '800',
  },
  swapButton: {
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 50,
  },
  keyText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ConversionScreen;
