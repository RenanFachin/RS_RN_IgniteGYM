import { useState } from "react";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groups, setGroups] = useState(['costa', 'ombro', 'bíceps', 'tríceps'])
  const [groupSelected, setGroupSelected] = useState('Costa')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
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
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm" p={1} bg="gray.800" rounded="full">
            4
          </Text>
        </HStack>


        <ExerciseCard />
        <ExerciseCard />
      </VStack>

    </VStack>
  )
}