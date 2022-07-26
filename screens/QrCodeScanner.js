import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Input, Box, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { io } from "socket.io-client";

export default function QrCodeScanner({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ScannedWithMachine, setScannedWithMachine] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [zone, setzone] = useState(route.params.zone);
  const [company, setcompany] = useState(route.params.company);

  const [employee, setemployee] = useState('');
  const [socket, setSocket] = useState(null);

  const [formData, setFormData] = useState({
    codeabarProd: "",
    codeabarProdFromMachine: "",
    name: "",
    quantity: "",
    price: "",
    zone: "",
    idemployee: "",
    machine: ""
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

  useEffect(() => {
    setSocket(io("http://192.168.1.14:4000"));
  }, []);


  // Request Camera Permission
  useEffect(() => {
    getDataFromStorage().then((val) => {
      setemployee(val)
    });
    //  console.log(route.params.zone)
    setzone(route.params.zone)
    askForCameraPermission();
  }, []);



  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedWithMachine(false)
    setText(data)
  };

  const handleOnchange = (text, input) => {
    setFormData({ ...formData, [input]: text });
  };

  const sendProducts = async () => {
    //event hedhi tji fel home 
    console.log("********")

    console.log(company.AdminCompany)

    console.log(formData.codeabarProdFromMachine)
    console.log(scanned)


    socket.emit("sendNotification", {
      //sender name and receiver are  id not names
      senderName: employee._id,
      receiverName: company.AdminCompany,
      senderFirstName: employee.firstName,
      senderLastName: employee.lastName,
      zone: zone.zone._id,
      zonename: zone.zone.name,
      date: new Date(),
      text: "A new product has been added to ",
    });
    formData.codeabarProd = text
    formData.idemployee = employee._id
    formData.zone = zone.zone._id
    formData.company = zone.company
    formData.machine = "FromPhone"

    axios.post("http://192.168.1.14:5000/product/codebarFindProducts/test1", formData).then(function (response) {
      setScanned(false)
      setText('Not yet scanned')
    })
      .catch(function (error) {
        console.log(error)
      })
  };

  const sendProductsMachine = async () => {
    console.log("********")

    console.log(company.AdminCompany)

    console.log(formData.codeabarProdFromMachine)
    console.log(scanned)


    socket.emit("sendNotification", {
      //sender name and receiver are  id not names
      senderName: employee._id,
      receiverName: company.AdminCompany,
      senderFirstName: employee.firstName,
      senderLastName: employee.lastName,
      zone: zone.zone._id,
      zonename: zone.zone.name,
      date: new Date(),
      text: "A new product has been added to ",
    });
    formData.idemployee = employee._id
    formData.zone = zone.zone._id
    formData.company = zone.company
    formData.machine = "FromMachine"

    axios.post("http://192.168.1.14:5000/product/codebarFindProducts/test1", formData).then(function (response) {
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
      <View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      <Button title={'Scan with machine?'} onPress={() => { setScanned(false); setScannedWithMachine(true); setText('') }} color='green' />
      <Input mx="3" keyboardType="numeric" placeholder="Quantity" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'quantity')} name="quantity" />

      {scanned &&
        <Box alignItems="center" style={styles.boxstyle}>
          <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />

          {/*  <Input mx="3" placeholder="Name" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'name')} name="name" />
          <Input mx="3" keyboardType="numeric" placeholder="Price" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'price')} name="price" /> */}
          <Button title={'Send'} onPress={sendProducts} color='blue' />

        </Box>
      }



      {ScannedWithMachine &&
        <Box style={styles.boxstyle}>
          <Input mx="3"  placeholder="BarCode" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'codeabarProdFromMachine')} name="codeabarProdFromMachine" />
          {/*           <Input mx="3" keyboardType="numeric" placeholder="Quantity" w="75%" maxWidth="300px" onChangeText={text => handleOnchange(text, 'quantity')} name="quantity" />
 */}          <Button title={'Send'} onPress={sendProductsMachine} color='blue' />
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
    justifyContent: 'space-evenly',
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
    justifyContent: 'space-evenly'
  }
});