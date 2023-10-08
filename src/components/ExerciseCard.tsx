import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

interface ExerciseCardProps extends TouchableOpacityProps { }

export function ExerciseCard({ ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: 'https://thumb.mais.uol.com.br/16669847-large.jpg?ver=0' }}
          alt='Imagem do exercício'
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover" // cover melhora a visualização
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            Serrote
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 10 repetições
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name='chevron-thin-right'
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}