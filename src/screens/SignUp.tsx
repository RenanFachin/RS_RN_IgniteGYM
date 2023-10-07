import { useNavigation } from '@react-navigation/native'

import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { Input } from '@components/Input'
import { Button } from '@components/Button'

// Forms
import { useForm, Controller } from 'react-hook-form'

import BackgroundImg from '@assets/background.png'

// https://github.com/kristerkari/react-native-svg-transformer
import LogoSvg from '@assets/logo.svg'

export function SignUp() {

  // Forms
  const { control } = useForm()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleRegisterUser() {

    const newUser = {}

    console.log(newUser)
  }

  return (
    <ScrollView _contentContainerStyle={
      { flexGrow: 1 }} // forçando a ocupação da página toda
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Imagem de fundo da aplicação contendo duas pessoas realizando um treino'
          resizeMode='contain' // faz a imagem não se esticar
          position="absolute" // faz começar do topo
        />

        <Center my={24}>
          <LogoSvg />

          <Text color={'gray.100'} fontSize={'sm'}>
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center >
          <Heading color={'gray.100'} fontSize={'xl'} mb={6} fontFamily={'heading'}>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            // dizer o input
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            // dizer o input
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            // dizer o input
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            // dizer o input
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Digite a senha novamente"
                secureTextEntry={true}
                onChangeText={onChange}
                value={value}
              />
            )}
          />


          <Button
            title="Criar e acessar"
            onPress={handleRegisterUser}
          />

        </Center>


        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />

      </VStack >
    </ScrollView>
  )
}