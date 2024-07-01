import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/Screens/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/Firebase/FirebaseConfig';
import Home from './src/Screens/Home';
import AddProduct from './src/Screens/AddProduct';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <InsideStack.Screen name="AddProduct" component={AddProduct} options={{headerShown: false}} />
        </InsideStack.Navigator>
    )
}

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    },[])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}} />
                ) : (
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App