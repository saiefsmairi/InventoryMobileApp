import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, } from "native-base";
import { CardComponent } from '../components/CardComponent';
import axios from 'axios'

export default function AffectedZonesList({ navigation }) {
  const [TabAffecatation, setTabAffecatation] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);


  function findAffectationByEmployee() {
    axios.get("http://192.168.1.14:5000/affectation/findAffectationByEmployee/62e29cfe6d2f15138424bdd8").then((res) => {
      // console.log(res.data)
      setTabAffecatation(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {

    findAffectationByEmployee()
  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get("http://192.168.1.14:5000/affectation/findAffectationByEmployee/62e29cfe6d2f15138424bdd8").then((res) => {
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

        {TabAffecatation.map((x, index) => (
          <CardComponent key={index} zone={x} name={x.zone.name} companyname={x.company.companyname} datedebut={x.Datedebut} datefin={x.Datefin} navigation={navigation} />
        ))}
      </Center>

    </ScrollView>
  )
}
