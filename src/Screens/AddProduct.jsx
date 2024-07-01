import { Alert, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import {useDispatch, useSelector} from 'react-redux'
import { addToDb } from '../../assets/components/redux/action'

const AddProduct = () => {
    const dispatch = useDispatch();
    const productCartItems = useSelector((state)=>state.reducer);
    // const [isAdded, setIsAdded] = useState(false);

    const navigation = useNavigation();

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const item = {title: title, price: price};

    const handleAddToDb = async() => {
        dispatch(addToDb(item));
        navigation.goBack();
    }

    useEffect(()=>{
        // if(productCartItems && productCartItems.length) {
        //     productCartItems.forEach((element)=>{
        //         if(element.title===item.title) {
        //             setIsAdded(true);
        //         }
        //     })
        // }
        console.warn(productCartItems)
    },[productCartItems])

    return (
        <View style={styles.container}>
            {/* Product name */}
            <View>
                <TextInput
                    value={title}
                    style={styles.input}
                    onChangeText={(text) => setTitle(text)}
                    placeholder='Add new product'
                    inputMode='text'
                />
            </View>
            {/* Price */}
            <View>
                <TextInput
                    value={price}
                    style={styles.input}
                    onChangeText={(text) => setPrice(text)}
                    placeholder='Enter price'
                    inputMode='text'
                />
            </View>

            <TouchableOpacity
                onPress={()=>handleAddToDb()}
                style={styles.addBtn}
            >
                <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Add product</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        justifyContent: 'space-evenly'
    },
    input: {
        borderColor: '#ccc', 
        justifyContent: 'center',
        height: 200,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#ffffff',
    },
    addBtn: {
        height: 45,
        marginTop: 10,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})