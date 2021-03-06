import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Votacao from '../pages/Votacao';
import Crono from '../pages/Crono';
import Tabela from '../pages/Tabela';
import Noticias from '../pages/Noticias';
import Home from '../pages/Home'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function Logado(){   
    return(
        <Tab.Navigator initialRouteName='Home' screenOptions={{tabBarLabelStyle: {fontSize: 20,},tabBarLabelPosition: 'below-icon', tabBarStyle: { borderColor:'#ffd200',backgroundColor: '#242424', height: 80 },headerShown: false, tabBarActiveTintColor: '#ffd200'}}>
            <Tab.Screen name="Home" component={Home} 
            options={{tabBarIcon: ({size,focused,color}) => {
                return (
                    <Icons name="home" size={32} color={focused ? "#ffd200" : "gray"}/>
                )
            },}}/>
            <Tab.Screen name="Crono" component={Crono} options={{tabBarIcon: ({size,focused,color}) => {
                return (
                    <Icons name="calendar" size={32} color={focused ? "#ffd200" : "gray"}/>
                )
            },}}/>
            {/* <Tab.Screen name="Tabela" component={Tabela} options={{tabBarIcon: ({size,focused,color}) => {
                return (
                    <Icons name="dns-outline" size={32} color={focused ? "#ffd200" : "gray"}/>
                )
            },}}/> */}
            <Tab.Screen name="Votação" component={Votacao} options={{tabBarIcon: ({size,focused,color}) => {
                return (
                    <Icons name="marker-check" size={32} color={focused ? "#ffd200" : "gray"}/>
                )
            },}}/>
            <Tab.Screen name="Notícias" component={Noticias} options={{tabBarIcon: ({size,focused,color}) => {
                return (
                    <Icons name="newspaper-variant-multiple" size={32} color={focused ? "#ffd200" : "gray"}/>
                )
            },}}/>

        </Tab.Navigator>
    )

}

export default Logado