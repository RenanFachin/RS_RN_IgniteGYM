// https://docs.nativebase.io/input
// https://docs.nativebase.io/form-control
import { Input as InputNativeBase, IInputProps, FormControl } from 'native-base'

interface Inputprops extends IInputProps {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...props }: Inputprops) {
  // Caso tenha mensagem de erro, então ele será inválido
  const invalid = !!errorMessage

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <InputNativeBase
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{ bg: "gray.700", borderWidth: 1, borderColor: 'green.500' }}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        {...props}
      />

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}