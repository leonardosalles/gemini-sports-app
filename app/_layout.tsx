import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import GeminiSportsTheme from '../themes';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="inverted" />

      <GluestackUIProvider config={config.theme}>
        <ApolloProvider client={client}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: GeminiSportsTheme.colors.primary,
              },
              headerTintColor: GeminiSportsTheme.colors.secondary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Todos',
              }}
            />
          </Stack>
        </ApolloProvider>
      </GluestackUIProvider>
    </>
  );
}
