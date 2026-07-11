import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ClassSearch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function LoginScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus AR Navigator</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Ready to find your next class?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ClassSearch')}
      >
        <Text style={styles.buttonText}>Find My Class</Text>
      </TouchableOpacity>
    </View>
  );
}
function ClassSearchScreen({ navigation }: any) {
  const [classCode, setClassCode] = React.useState('');
  const [result, setResult] = React.useState<null | { building: string; floor: number; room: string }>(null);

  const handleSearch = () => {
    // Fake hardcoded response for now — real API comes in Iteration 3
    setResult({
      building: 'Science Block',
      floor: 2,
      room: '204',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Class</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter class code (e.g. CS101)"
        value={classCode}
        onChangeText={setClassCode}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {result && (
        <View style={{ marginTop: 24 }}>
          <Text style={styles.subtitle}>
            {classCode || 'Your class'} is in {result.building}, Floor {result.floor}, Room {result.room}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ClassSearch" component={ClassSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
 subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});