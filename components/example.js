import React from "react";
import { Alert, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, NativeBaseProvider } from "native-base";

export default function Example() {
  return <Center>
      <Alert w="90%" maxW="400" status="error" colorScheme="info">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
               Login Error
              </Text>
            </HStack>
            <IconButton variant="unstyled" _focus={{
            borderWidth: 0
          }} icon={<CloseIcon size="3" color="coolGray.600" />} />
          </HStack>
          <Box pl="6" _text={{
          color: "coolGray.600"
        }}>
           Bad credentials
          </Box>
        </VStack>
      </Alert>
    </Center>;
}

