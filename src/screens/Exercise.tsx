import { useEffect, useState } from "react";
import { HStack, Heading, Icon, Image, Text, VStack, Box, ScrollView, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { Button } from "@components/Button";

import BodySVG from '@assets/body.svg'
import SeriesSVG from '@assets/series.svg'
import RepetitionsSVG from '@assets/repetitions.svg'

// Navegação
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExercisesDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  // Este isLoading é para garantir que o gif já tenha sido carregado antes de renderizar em tela
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmittingRegister, setIsSubmittingRegister] = useState<boolean>(false)

  const [exerciseDetail, setExerciseDetail] = useState<ExercisesDTO>({} as ExercisesDTO)

  // navegação
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  // Obtendo os dados que vem da rota
  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  const toast = useToast()
  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/${exerciseId}`)
      // Armazenando as informaões no state
      setExerciseDetail(response.data)


    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRegisterExercise() {
    try {
      setIsSubmittingRegister(true)

      await api.post('/history', { exercise_id: exerciseId })


      // feedback para o usuário
      toast.show({
        title: 'Parabéns! Exercício registrado.',
        placement: 'top',
        bgColor: 'green.700'
      })

      // Navegando o usuário para página de histórico
      navigation.navigate('history')


    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível registrar o exercício'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsSubmittingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

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
          <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily="heading">
            {exerciseDetail.name}
          </Heading>

          <HStack alignItems="center">
            <BodySVG />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exerciseDetail.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        {
          isLoading ? <Loading /> :
            <VStack p={8}>
              <Box rounded="lg" mb={3} overflow="hidden">
                <Image
                  w="full"
                  h={80}
                  source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetail.demo}` }}
                  alt="Colocar o nome do exercício"
                  resizeMode="cover"
                  rounded="lg"
                  overflow="hidden"
                />
              </Box>

              <Box bg="gray.600" rounded="md" pb={4} px={4}>
                <HStack alignItems="center" justifyContent="space-around" my={6}>
                  <HStack>
                    <SeriesSVG />
                    <Text color="gray.200" ml={2}>
                      {exerciseDetail.series} séries
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionsSVG />
                    <Text color="gray.200" ml={2}>
                      {exerciseDetail.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>


                <Button
                  title="Marcar como realizado"
                  isLoading={isSubmittingRegister}
                  onPress={handleRegisterExercise}
                />
              </Box>
            </VStack>
        }
      </ScrollView>
    </VStack >
  )
}