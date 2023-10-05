// https://docs.nativebase.io/vstack
// https://docs.nativebase.io/image
// https://docs.nativebase.io/text
// https://docs.nativebase.io/heading
// https://docs.nativebase.io/scrollview
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import BackgroundImg from '@assets/background.png'

// https://github.com/kristerkari/react-native-svg-transformer
import LogoSvg from '@assets/logo.svg'

export function SignIn() {
  return (
    <ScrollView _contentContainerStyle={
      { flexGrow: 1 }} // forçando a ocupação da página toda
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg='gray.700' px={10} pb={16}>
        <Image
          source={BackgroundImg}
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

          <Input
            placeholder="E-mail"
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Input
            placeholder="Senha"
            secureTextEntry={true}
          />

          <Button title="Acessar" />

        </Center>

        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
          />
        </Center>
      </VStack >
    </ScrollView>
  )
}