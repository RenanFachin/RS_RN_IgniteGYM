import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

// https://docs.nativebase.io/vstack | https://docs.nativebase.io/image | https://docs.nativebase.io/text | https://docs.nativebase.io/heading | https://docs.nativebase.io/scrollview
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import BackgroundImg from '@assets/background.png'

// https://github.com/kristerkari/react-native-svg-transformer
import LogoSvg from '@assets/logo.svg'

// contexto
import { useAuth } from '@hooks/useAuth'

// Form
import { Controller, useForm } from 'react-hook-form'

type FormData = {
  email: string;
  password: string;
}


export function SignIn() {
  const { signIn } = useAuth()

  // Passando a definição de tipagem para o navigation (de acordo com o contexto, neste caso, o de auth)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  // form
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate('register')
  }

  function handleSignIn({ email, password }: FormData) {
    signIn(email, password)
  }

  return (
    <ScrollView _contentContainerStyle={
      { flexGrow: 1 }} // forçando a ocupação da página toda
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg} // defaultSource faz a imagem ser "pré renderizada"
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
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name='email'
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}

          />

          <Controller
            control={control}
            name='password'
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}

          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
          />

        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack >
    </ScrollView>
  )
}