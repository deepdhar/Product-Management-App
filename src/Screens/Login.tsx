import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../Firebase/FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSignedUp } from '../../assets/components/redux/action';


const Login = () => {
    const dispatch = useDispatch()
    const signUpCompleted = useSelector((state)=>state.reducer)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            Alert.alert('Login failed: ' + error.message);
        } finally {
            setLoading(false);
            dispatch(getUserSignedUp(auth.currentUser?.email));
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('User created! Login Now');
        } catch (error: any) {
            Alert.alert('Registration failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}>
                <Text style={{fontSize: 28, fontWeight: '600', color: 'black'}}>Product Counter</Text>
                <View style={{borderBottomWidth: 2, borderColor: '#fe3456', width: '70%', marginTop: 5}}/>
            </View>

            <View style={styles.inputBox}>
                <MaterialIcon name='email-outline' color='#b5b5b5' size={18}/>
                <Text style={{color: '#b5b5b5', paddingHorizontal: 5}}>|</Text>
                <TextInput 
                    value={email}
                    style={styles.input}
                    placeholder='enter your email here'
                    placeholderTextColor={'#b5b5b5'}
                    cursorColor={'#b5b5b5'}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}/>
            </View>
            <View style={styles.inputBox}>
                <MaterialIcon name='lock-outline' color='#b5b5b5' size={18}/>
                <Text style={{color: '#b5b5b5', paddingHorizontal: 5}}>|</Text>
                <TextInput 
                    value={password}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='enter password'
                    placeholderTextColor={'#b5b5b5'}
                    cursorColor={'#b5b5b5'}
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}/>
            </View>
            { loading ? (
                <ActivityIndicator size="large" style={{marginTop: 20}} color={'#fe3452'}/> 
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={signIn} >
                        <Text style={{color: '#ffffff', fontSize: 15, fontWeight: '500'}}>Login</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
                        <View style={{borderBottomWidth: 0.5, flex:1, borderColor: '#b5b5b5', marginHorizontal: 10, marginBottom: 8}}/>
                        <Text style={{color: '#b5b5b5', fontSize: 12, fontWeight: '500'}}>OR</Text>
                        <View style={{borderBottomWidth: 0.5, flex:1, borderColor: '#b5b5b5', marginHorizontal: 10, marginBottom: 8}}/>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={signUp} >
                        <Text style={{color: '#ffffff', fontSize: 15, fontWeight: '500'}}>Sign Up</Text>
                    </TouchableOpacity>
                </>
            )}
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        marginBottom: 20,
        position: 'absolute',
        top: 80,
        left: 20
    },
    inputBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 4,
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 5
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        color: 'black'
    },
    button: {
        height: 45,
        width: '100%',
        backgroundColor: '#fe3452',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
})