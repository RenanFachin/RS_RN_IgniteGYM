import { HStack, Heading, Icon, Image, Text, VStack, Box } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'

import BodySVG from '@assets/body.svg'
import SeriesSVG from '@assets/series.svg'
import RepetitionsSVG from '@assets/repetitions.svg'

// Navegação
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";

export function Exercise() {

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>


        <HStack justifyContent="space-between" my={6} alignItems="center" >
          {/* https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink */}
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySVG />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          w="full"
          h={80}
          source={{ uri: 'https://thumb.mais.uol.com.br/16669847-large.jpg?ver=0' }}
          alt="Colocar o nome do exercício"
          mb={3}
          resizeMode="cover"
          rounded="lg"
          overflow="hidden"
        />

        <Box bg="gray.600" rounded="md" pb={4} px={4}>
          <HStack alignItems="center" justifyContent="space-around" my={6}>
            <HStack>
              <SeriesSVG />
              <Text color="gray.200" ml={2}>
                3 séries
              </Text>
            </HStack>

            <HStack>
              <RepetitionsSVG />
              <Text color="gray.200" ml={2}>
                12 repetições
              </Text>
            </HStack>
          </HStack>


          <Button 
            title="Marcar como realizado"
          />
        </Box>
      </VStack>
    </VStack>
  )
}