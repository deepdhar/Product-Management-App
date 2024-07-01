import { FlatList, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../Firebase/FirebaseConfig';
import ProductItem from '../../assets/components/ProductItem';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon2 from 'react-native-vector-icons/MaterialIcons'
import {useDispatch, useSelector} from 'react-redux'
import { removeFromDb } from '../../assets/components/redux/action';

const Home = () => { 
    const dispatch = useDispatch();
    const productData = useSelector((state)=>state.reducer);
    // console.warn(productData);
    useEffect(()=>{
        console.warn(productData);
        addProductItem(productData[0]);
    },[productData])

    const navigation = useNavigation();
    const user = FIREBASE_AUTH.currentUser;
    
    const [productList, setProductList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const removeFromDbList = (item) => {
        dispatch(removeFromDb(item.title))
    }

    const addProductItem = async(productData) => {
        try {
            const docRef = await addDoc(collection(FIREBASE_DB, user?.email), {
                title: productData.title,
                price: productData.price,
            });
        } catch (e) {
            console.log("Error in adding document: ", e);
        } finally {
            removeFromDbList(productData);
        }
        getProductItem();
    } 

    const getProductItem = async() => {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, user?.email))
        const tempArray = []
        querySnapshot.forEach((doc) => {
            tempArray.push({ 
                ...doc.data(),
                id: doc.id
        })
            setProductList(tempArray)
        });
    }
    useEffect(() => {
        getProductItem();
        console.log('productItem:', productList);
    }, [refresh])

    

    const refreshPage = () => {
        setRefresh(!refresh)
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.logoutBtn} onPress={()=>FIREBASE_AUTH.signOut()}>
                <AntDesign name='logout' color='red' size={28}/>
            </Pressable>

            <Text style={styles.header}>Product List</Text>
            <View style={{flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between'}}>
                <Text style={{color: 'gray'}}>{user?.email}</Text>
                <TouchableOpacity onPress={()=>refreshPage()}>
                    <Text style={{color: 'blue'}}>Refresh</Text>
                </TouchableOpacity>
            </View>

            { productList.length>0 ? 
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={productList}
                    renderItem={(item) => {
                        return (
                            <ProductItem id={item.item.id} title={item.item.title} price={item.item.price} user={user?.email}/>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                /> : <View style={styles.emptycart}>
                        <MaterialIcon  name='cart' size={100} color='lightgray'/>
                    </View>
            }
            
            <TouchableOpacity
                onPress={()=>navigation.navigate('AddProduct')}
                style={styles.addBtn}>
                <MaterialIcon2 name='add' color='white' size={25}/>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        padding: 18,
        flex: 1,
    },
    logoutBtn: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    header: {
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 5,
        color: 'black'
    },
    addBtn: {
        position: 'absolute',
        right: 30,
        bottom: 50,
        height: 50,
        width: 50,
        backgroundColor: '#fe3452',
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptycart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})