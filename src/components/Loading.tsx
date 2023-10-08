// https://docs.nativebase.io/spinner
// https://docs.nativebase.io/center
import { Spinner, Center, Heading } from 'native-base'

export function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="green.500" size='lg' accessibilityLabel="Loading" />

      <Heading fontSize={'md'} color="green.500" marginTop={2} fontFamily="heading">
        Loading
      </Heading>
    </Center>
  )
}