import { useCallback, useEffect, useState } from "react";
import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

// Navegação
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { ExercisesDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExercisesDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const toast = useToast()

  async function fetchExerciseGroups() {
    try {
      const response = await api.get('/groups')

      // console.log(response.data)
      // Atualizando os valores do state com os dados vindos da API
      setGroups(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      // console.log(response.data)
      setExercises(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(id: string) {
    navigation.navigate(`exercise`, { exerciseId: id })
  }


  useEffect(() => {
    fetchExerciseGroups()
  }, [])

  // Executando quando o focus voltar para a interface de home
  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8
        }}
        my={10}
        maxH={10} // garantindo que a FLatList utilzize apenas o espaço delimitado
        minH={10} // garantindo que a FlatList tenha uma altura mínima
      />

      {isLoading ?
        <Loading />
        :
        < VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm" p={1} bg="gray.800" rounded="full">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />

        </VStack>
      }

    </VStack >
  )
}