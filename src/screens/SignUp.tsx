import { useNavigation } from '@react-navigation/native'

import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import BackgroundImg from '@assets/background.png'

// https://github.com/kristerkari/react-native-svg-transformer
import LogoSvg from '@assets/logo.svg'

// Forms e Validation
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// API
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Criando schema de validação
const signUpSchemaValidation = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o email').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve pelo menos 6 dígitos'),
  confirmPassword: yup.string().required('Informe a senha novamente').oneOf([yup.ref('password')], 'A confirmação da senha confere.')
})

const defaultInputValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export function SignUp() {

  // Forms
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchemaValidation)
  })

  const toast = useToast()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleRegisterUser({ name, email, password }: FormDataProps) {

    try {
      const response = await api.post('/users', {
        name, email, password
      })

      console.log(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta'

      toast.show({
        title: title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    reset(defaultInputValues)

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
                errorMessage={errors.name?.message}
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
                errorMessage={errors.email?.message}
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
                errorMessage={errors.password?.message}
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
                // Fazendo o usuário conseguir enviar a partir do teclado
                onSubmitEditing={handleSubmit(handleRegisterUser)}
                returnKeyType="send"
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />


          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleRegisterUser)}
          />

        </Center>


        <Button
          title="Voltar para o login"
          variant="outline"
          mt={16}
          onPress={handleGoBack}
        />

      </VStack >
    </ScrollView>
  )
}