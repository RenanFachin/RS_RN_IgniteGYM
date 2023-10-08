import { useState } from 'react';
import { Heading, VStack, SectionList, Text } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '06.10.23',
      data: ["Puxada Frontal", "Remada"]
    }, {
      title: '03.10.23',
      data: ["Puxada Frontal"]
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
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