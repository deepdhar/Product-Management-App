import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductUser } from '../../src/Screens/Home'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '../../src/Firebase/FirebaseConfig'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ProductItem = (props) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title)
    const [updatedPrice, setUpdatedPrice] = useState(props.price)

    const updateIsChecked = async() => {
        const productRef = doc(FIREBASE_DB, props.user, props.id);
        await updateDoc(productRef, {
            isChecked: isChecked,
        });
    }

    // useEffect(() => {    
    //   updateIsChecked();
    // }, [])

    const handleCardPress = () => {
        console.log('Pressed Card: ', props.title);
        console.log('Id: ', props.id);
        console.log('isChecked: ', props.isChecked)
        setModalVisible(true);
    }
    const handleLongPress = () => {
        console.log('Long Pressed Card');
    }

    const updateItem = async() => {
        await updateDoc(doc(FIREBASE_DB, props.user, props.id), {
            title: updatedTitle,
            price: updatedPrice
        })
        setModalVisible(false)
        setUpdatedTitle('')
    }
   
    const handleCheckPress = () => {
        // setRerender(true);
    }

    const handleDeleteData = () => {
        Alert.alert('Alert', `Do you want to delete this product ?`, [
            {   text: 'Cancel',
                onPress: ()=> {
                    console.log('Cancelled');
                },
            },
            {
                text: 'Yes',
                onPress: async()=> {
                    try {
                        await deleteDoc(doc(FIREBASE_DB, props.user, props.id));
                        console.log('Deleted data');
                    } catch(e) {
                        console.log(e);
                    }
                }
            }
        ])
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                        <Text style={{color: 'white', marginBottom: 10, fontSize: 16}}>Update your product :</Text>
                        <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
                            <MaterialCommunityIcons name='close' color='black' size={25} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        value={updatedTitle}
                        style={styles.input}
                        onChangeText={(text) => setUpdatedTitle(text)}
                        placeholder='Add new product name'
                    />
                    <TextInput
                        value={updatedPrice}
                        style={styles.input}
                        onChangeText={(text) => setUpdatedPrice(text)}
                        placeholder='Add new price name'
                    />
                    <TouchableOpacity
                    onPress={()=>updateItem()}
                    style={styles.updateBtn}>
                        <Text style={{color: 'white'}}>Update</Text>
                    </TouchableOpacity>
                </View>
                
            </Modal>

            <TouchableOpacity 
                style={{flexDirection: 'column', flex: 1}}
                onPress={() => handleCardPress()}
                onLongPress={() => handleLongPress()}
            >
                <View 
                    style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View
                    style={styles.titleContainer}>
                    <Text style={styles.price}>Rs. {props.price}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleDeleteData()}>
                <MaterialCommunityIcons name='delete' color='black' size={20} />
            </TouchableOpacity>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'red',
        marginTop: 200,
        borderRadius: 15,
        marginHorizontal: 30,
        padding: 20
    },
    input: {
        borderColor: '#ccc', 
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#ffffff',
        height: 100
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    title: {
        color: '#000000',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '600'
    },
    price: {
        color: '#000000',
        marginBottom: 5,
        fontSize: 14
    },
    updateBtn: {
        height: 45,
        marginTop: 10,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})