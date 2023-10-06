import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, FlatList } from "native-base";
import { useState } from "react";

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

    </VStack>
  )
}