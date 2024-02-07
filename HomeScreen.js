import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_key'

export default function HomeScreen({ route, navigation }) {


    // Define the state to store the todos
    const [todos, setTodos] = useState([]);
    // Store data in AsyncStorage
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (e) {
            console.error(e);
        }
    }
    // Get data from AsyncStorage
    const getData = async () => {
        try {
            return await AsyncStorage.getItem(STORAGE_KEY)
                .then(req => JSON.parse(req))
                .then(json => {
                    if (json === null) {
                        json = [];
                    }
                    setTodos(json);
                })
                .catch(error => console.log('error!'));
        } catch (e) {
            console.error(e);
        }
    }

    // Clear all data from AsyncStorage
    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
                .then(() => {
                    setTodos([]);
                    console.log('Storage successfully cleared!');
                });
        } catch (e) {
            console.error(e);
        }
    }
    // Get data from AsyncStorage
    useEffect(() => {
        if (route.params?.todo) {
            const newKey = todos.length + 1;
            const newTodo = { key: newKey.toString(), description: route.params.todo };
            const newTodos = [...todos, newTodo];
            storeData(newTodos);
        }
        getData();
    }, [route.params?.todo]);

    // Update data in AsyncStorage
    useEffect(() => {
        if (route.params?.todo) {
            const newTodos = [...todos, route.params.todo];
            setTodos(newTodos);
        }
    }, [route.params?.todo]);
    // Update the header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0',
            },
            headerRight: () => (
                <AntDesign
                    style={styles.navButton}
                    name="plus"
                    size={24}
                    color="black"
                    onPress={() => navigation.navigate('Todo')}
                />
            ),
        });
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    todos.map((todo) => (
                        <View style={styles.rowContainer} key={todo.key}>
                            <Text style={styles.rowText}>{todo.description}</Text>
                        </View>
                    ))
                }
            </ScrollView>
            <Button title='Clear Data' onPress={clearAsyncStorage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    rowText: {
        fontSize: 20,
        marginLeft: 5,
    },
    navButton: {
        marginRight: 5,
        fontSize: 24,
        padding: 4,
    },
});
