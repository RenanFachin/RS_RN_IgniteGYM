// https://docs.nativebase.io/input
import { Input as InputNativeBase, IInputProps } from 'native-base'

interface Inputprops extends IInputProps { }

export function Input({ ...props }: Inputprops) {
  return (
    <InputNativeBase
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{ bg: "gray.700", borderWidth: 1, borderColor: 'green.500' }}
      {...props}
    />
  )
}