import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

// Image Picker - https://docs.expo.dev/versions/latest/sdk/imagepicker/
import * as ImagePicker from 'expo-image-picker'

// File System - https://docs.expo.dev/versions/latest/sdk/filesystem/
import * as FileSystem from 'expo-file-system';


// https://docs.nativebase.io/skeleton
// https://docs.nativebase.io/toast
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { TouchableOpacity } from "react-native";


const PHOTO_SIZE = 33

export function Profile() {
  const [isPhotoLoaded, setIsPhotoLoaded] = useState<boolean>(false)
  const [userPhoto, setUserPhoto] = useState<string>('')

  const toast = useToast()

  async function handleUserPhotoSelect() {
    setIsPhotoLoaded(true)

    try {
      // acessando o álbum do usuário
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        // Definindo algumas propriedades
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true, // Habilitando edição da imagem (recortar e etc)
      })

      // Usuário cancelando o submit da foto
      if (photoSelected.canceled) {
        return
      }


      // Salvando a foto enviada e salvando no state
      const [image] = photoSelected.assets

      if (image.uri) {
        // verificando o tamanho do arquivo (ele retorna o tamanho em bytes)
        const photoInfo = await FileSystem.getInfoAsync(image.uri)
        // console.log(photoInfo)

        const limitSize = 15 * 1024 * 1024 // 15mb
        if (photoInfo.exists && photoInfo.size > limitSize) {
          return toast.show({
            title: 'Essa imagem é muito grande, escolha uma de até 15 mb',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(image.uri)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsPhotoLoaded(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      {/* ScrollView para habilitar uma rolagem da tela (motivo: ela vai ocupar toda e quando o usuário clicar no input vai subir o teclado) */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
                  uri: userPhoto
                }}
                alt="Foto de perfil do usuário"
                size={PHOTO_SIZE}
                mr={6}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>


          <Input
            bg="gray.600"
            placeholder="Nome"
          />

          <Input
            bg="gray.400"
            placeholder="E-mail"
            isDisabled={true}
          />
        </Center>

        <VStack px={10} mt={10} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry={true}
          />

          <Input
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry={true}
          />

          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry={true}
          />

          <Button
            mt={4}
            title="Atualizar"
          />
        </VStack>
      </ScrollView>

    </VStack>
  )
}