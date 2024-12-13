import axios from 'axios';
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, View } from 'react-native'

const DetailsScreen = () => {
  const id = useLocalSearchParams().id;

  const [userInfo, setUserInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    setIsLoading(true);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUserInfo(response.data);
    setIsLoading(false);

  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <Text>
          Loading....
        </Text>
      )}
      {!isLoading && (
        <View style={{
          marginTop : 20,
          padding: 10,
          display: 'flex',
          flexDirection: "column",
          rowGap: 10,
        }}>
          <Text style={{
            fontSize: 20
          }}>
            Name : {userInfo.name}
          </Text>
          <Text style={{
            fontSize: 20
          }}>
            Email : {userInfo.email}
          </Text>
          <Text style={{
            fontSize: 20
          }}>
            Street : {userInfo?.address?.street}
          </Text>
          <Text style={{
            fontSize: 20
          }}>
            City : {userInfo?.address?.city}
          </Text>
          <Text style={{
            fontSize: 20
          }}>
            Zipcode : {userInfo?.address?.zipcode}
          </Text>
          <Text style={{
            fontSize: 20
          }}>
            Company Name : {userInfo?.company?.name}
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default DetailsScreen