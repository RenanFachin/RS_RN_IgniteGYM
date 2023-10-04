// https://docs.nativebase.io/spinner
// https://docs.nativebase.io/center
import { Spinner, Center, Heading } from 'native-base'

export function Loading() {
  return (
    <Center flex={1}>
      <Spinner color="cyan.500" size='lg' accessibilityLabel="Loading" />

      <Heading fontSize={'md'} color="cyan.500" marginTop={2}>
        Loading
      </Heading>
    </Center>
  )
}