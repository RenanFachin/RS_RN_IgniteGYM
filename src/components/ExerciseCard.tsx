import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { ExercisesDTO } from '@dtos/ExercisesDTO'

import { api } from '@services/api'

interface ExerciseCardProps extends TouchableOpacityProps {
  // data = todos os dados vindos da API e sendo repassados pelo componente
  data: ExercisesDTO;
}

export function ExerciseCard({ data, ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt='Imagem do exercício'
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover" // cover melhora a visualização
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {data.name}
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
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