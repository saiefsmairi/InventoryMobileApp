import React from "react";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";

export const CardComponent = ({zone, name, companyname, datedebut, datefin, navigation ,company}) => {
  const onPress = () => navigation.navigate('QrCodeScanner',  {zone,company})


  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Box alignItems="center" my="2">
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "gray.50"
        }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
                uri: "https://images.pexels.com/photos/4483775/pexels-photo-4483775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }} alt="image" />
            </AspectRatio>
            <Center bg="violet.500" _dark={{
              bg: "violet.400"
            }} _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs"
            }} position="absolute" bottom="0" px="3" py="1.5">
              ZONE
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {name}
              </Heading>
              <Text fontSize="xs" _light={{
                color: "violet.500"
              }} _dark={{
                color: "violet.400"
              }} fontWeight="500" ml="-0.5" mt="-1">
                Company: {companyname}
              </Text>
            </Stack>
            <Text fontWeight="400">
              Starting Date : {datedebut}
            </Text>
            <Text fontWeight="400">
              End Date : {datefin}

            </Text>
           
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>

  )

};
