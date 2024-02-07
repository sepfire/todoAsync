import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useLayoutEffect, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({route,navigation}){

    const [todos, setTodos] = useState(
        Array(20).fill('').map((_, i)=> (`Test ${i}`))
    );
    useEffect(() => {
        if (route.params?.todo){
            const newTodos = [...todos,route.params.todo];
            setTodos(newTodos);
        }
    },[route.params?.todo]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0',
            },
        headerRight:() => (
            <AntDesign
            style={styles.navButton}
            name="plus"
            size={24}
            color= "black"
            onPress={() => navigation.navigate('Todo')}
            />
        ),
        });
    },[]);

    return(
        <View style={styles.container}>
            <ScrollView>
                {
                    todos.map((todo,index) => (
                        <View key={index} style={styles.rowContainer}>
                            <Text style={styles.rowText}>{todo}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBot: 5,
    },
    rowText:{
        fontSize: 20,
        marginLeft: 5,
    },
    navButton:{
        marginRight: 5,
        fontSize: 24,
        padding: 4,
    },
    });