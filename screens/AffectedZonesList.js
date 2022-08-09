import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, } from "native-base";
import { CardComponent } from '../components/CardComponent';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AffectedZonesList({ route,navigation }) {
  const [TabAffecatation, setTabAffecatation] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);
  const [employee, setemployee] = React.useState('');

  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      setemployee(JSON.parse(jsonValue)._id)
      findAffectationByEmployee(JSON.parse(jsonValue)._id)
    } catch (e) {
      console.log("error getDataFromStorage")
    }
  }

  function findAffectationByEmployee(idemp) {
    console.log(idemp)
    axios.get("http://192.168.1.14:5000/affectation/findAffectationByEmployee/"+idemp).then((res) => {
      console.log(res.data)
      setTabAffecatation(res.data)
      setRefreshing(false)
    }).catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    getDataFromStorage()
   // findAffectationByEmployee()
  }, [])

 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get("http://192.168.1.14:5000/affectation/findAffectationByEmployee/"+employee._id).then((res) => {
      // console.log(res.data)
      setTabAffecatation(res.data)
      setRefreshing(false)
    }).catch(function (error) {
      console.log(error)
    })

  }, []);



  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } >
      <Center flex={1}>
        {TabAffecatation?.map((x, index) => (
          <CardComponent key={index} zone={x} name={x.zone.name} companyname={x.company.companyname} datedebut={x.Datedebut} datefin={x.Datefin} company={x.company} navigation={navigation} />
        ))}
      </Center>

    </ScrollView>
  )
}
