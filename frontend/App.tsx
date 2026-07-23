import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { fetchRoomData } from './mockApi';
import { Linking } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import { ViroARScene, ViroBox, ViroAmbientLight } from '@reactvision/react-viro';



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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassSearch')}>
        <Text style={styles.buttonText}>Find My Class</Text>
      </TouchableOpacity>
    </View>
  );
}

function ClassSearchScreen({ navigation }: any) {
  const [classCode, setClassCode] = React.useState('');
  const [arrivedAtBuilding, setArrivedAtBuilding] = React.useState(false);
  const [result, setResult] = React.useState<null | { 
    building: string;
     floor: number; 
     room: string;
     ar_coords:{x: number; y:number; z: number};
     building_coords: {lat:number, lng:number};
    }>(null);

   const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchRoomData(classCode);
    setLoading(false);

    if (data) {
      setResult({
        building: data.building,
        floor: data.floor,
        room: data.room,
        ar_coords: data.ar_coords,
        building_coords: data.building_coords,
      });
    } else {
      setResult(null);
      alert('Room not found');
    }
  };

  const openDirections = () => {
    if (!result) return;

    const lat = result.building_coords.lat;
    const lng = result.building_coords.lng;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
    Linking.openURL(url);
    setArrivedAtBuilding(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Class</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter class code (e.g. G204)"
        value={classCode}
        onChangeText={setClassCode}
        autoCapitalize="characters"
      />
     <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Searching...' : 'Search'}</Text>
      </TouchableOpacity>
      {result && (
        <View style={{ marginTop: 24 }}>
          <Text style={styles.subtitle}>
            {classCode || 'Your class'} is in {result.building}, Floor {result.floor}, Room {result.room}
          </Text>
        </View>
      )}
      {result && (
        <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={openDirections}>
          <Text style={styles.buttonText}>Go to Building</Text>
        </TouchableOpacity>
      )}
      {arrivedAtBuilding && result && (
        <Text style={[styles.subtitle, { marginTop: 16 }]}>
          Arriving? Open your AR view to find the room.
        </Text>
      )}
    </View>
  );

const ARScene = () => {
  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroBox 
      position={[0, 0, -1]}
       scale={[0.2, 0.2, 0.2]}
        />
    </ViroARScene>
  );
}



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
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});