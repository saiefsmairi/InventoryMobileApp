import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Input, Box, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function QrCodeScanner({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [zone, setzone] = useState(route.params.zone);
  const [employee, setemployee] = useState('');

  const [formData, setFormData] = useState({
    codeabarProd: "",
    name: "",
    quantity: "",
    price: "",
    zone: "",
    idemployee: ""
  });

  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("error getDataFromStorage")
    }
  }


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }
  // Request Camera Permission
  useEffect(() => {
    getDataFromStorage().then((val) => {
      setemployee(val)
    });
    //  console.log(route.params.zone)
    setzone(route.params.zone)
    askForCameraPermission();
  });



  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  const handleOnchange = (text, input) => {
    setFormData({ ...formData, [input]: text });
  };

  const sendProducts = async () => {
    formData.codeabarProd = text
    formData.idemployee = employee._id
    formData.zone = zone._id
    console.log(formData)

    axios.post("http://192.168.1.14:5000/product", formData).then(function (response) {
      console.log(response)
      setScanned(false)
      setText('Not yet scanned')
    })
      .catch(function (error) {
        console.log(error)
      })
  };



  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned &&
        <Box alignItems="center" style={styles.boxstyle}>
          <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />
          <Input mx="3" placeholder="Name" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'name')} name="name" />
          <Input mx="3" keyboardType="numeric" placeholder="Quantity" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'quantity')} name="quantity" />
          <Input mx="3" keyboardType="numeric" placeholder="Price" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'price')} name="price" />

          <Button title={'Send'} onPress={sendProducts} color='blue' />

        </Box>


      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  boxstyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});