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

// Form
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from "@hooks/useAuth";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileValidationSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) => schema.nullable().required('Informe a confirmação da senha').transform((value) => !!value ? value : null).transform((value) => !!value ? value : null)
    }),
})

export function Profile() {
  const [isUpadtingUserData, setIsUpadtingUserData] = useState<boolean>(false)
  const [isPhotoLoaded, setIsPhotoLoaded] = useState<boolean>(false)
  const [userPhoto, setUserPhoto] = useState<string>('')

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileValidationSchema)
  })

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpadtingUserData(true)


      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      }) 

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : 'Não foi possível atualizar os dados.'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsUpadtingUserData(false)
    }
  }

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
        toast.show({
          title: 'Imagem alterada com sucesso!',
          placement: 'top',
          bgColor: 'green.500'
        })
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
              // mr={6}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />


          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.400"
                placeholder="E-mail"
                isDisabled={true}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

        </Center>

        <VStack px={10} mt={10} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry={true}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry={true}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry={true}
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />




          <Button
            mt={4}
            title="Atualizar"
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpadtingUserData}
          />
        </VStack>
      </ScrollView>

    </VStack>
  )
}