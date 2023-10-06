import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

// https://docs.nativebase.io/skeleton
import { Center, ScrollView, VStack, Skeleton } from "native-base";

const PHOTO_SIZE = 33

export function Profile() {
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(true)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      {/* ScrollView para habilitar uma rolagem da tela (motivo: ela vai ocupar toda e quando o usuário clicar no input vai subir o teclado) */}
      <ScrollView>
        <Center mt={6} px={10}>


          {
            isPhotoLoaded ?
              < Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.600"
                endColor="gray.400"
              />
              :
              <UserPhoto
                source={{
                  uri: 'https://github.com/RenanFachin.png'
                }}
                alt="Foto de perfil do usuário"
                size={PHOTO_SIZE}
                mr={6}
              />

          }
        </Center>
      </ScrollView>

    </VStack>
  )
}