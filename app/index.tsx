import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios';
const HomeScreen = () => {
    const router = useRouter();

    const [users, setUser] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setIsLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUser(response.data);
        setIsLoading(false);
    }


    return (
        <View style={styles.container}>
            {!isLoading &&
                <FlatList
                    style={{
                        padding: 5,
                    }}
                    data={users}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: "/details", params: { id: item.id } })}
                            style={{
                                marginVertical: 10,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{
                                marginBottom: 5,
                            }}>
                                {item.name}
                            </Text>
                            <Text>
                                {item.email}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            }
            {isLoading && <Text>
                Loading.....
            </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'black'
    },
})





export default HomeScreen