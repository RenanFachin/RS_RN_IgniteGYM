import { useCallback, useState } from 'react';
import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader"

import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryGroupByDayDTO } from '@dtos/HistoryGroupByDayDTO';

export function History() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([])

  const toast = useToast()

  async function fetchUserExerciseHistory(){
    try {
      setIsLoading(true)
      const response = await api.get('/history')

      setExercises(response.data)
      
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

    // Executando quando o focus voltar para a interface de home
    useFocusEffect(useCallback(() => {
      fetchUserExerciseHistory()
    }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        // renderizando o cabeçalho da lista
        renderSectionHeader={({section}) => (
          <Heading color="gray.300" fontSize="sm" mt={8} mb={2} fontFamily="heading"> 
            {section.title}
          </Heading>
        )}
        px={4}
        // estilizando lista vazia
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: "center"}}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}