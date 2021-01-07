import React from 'react';
import { StatusBar } from 'react-native';
import { Feather, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const StackNavigation = createStackNavigator();
const BottomTab = createBottomTabNavigator();

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Mural from './pages/Mural';
import Profile from './pages/Profile';
import News from './pages/News';
import Contracts from './pages/Contracts';
import Prospections from './pages/Prospections';
import More from './pages/More';
import Award from './pages/Award';

const icons = {
    Dashboard: {
        lib: AntDesign,
        name: 'home'
    },
    Mural: {
        lib: FontAwesome,
        name: 'newspaper-o'
    },
    Award: {
        lib: MaterialIcons,
        name: 'monetization-on'
    },
    Profile: {
        lib: Feather,
        name: 'user'
    }
}

const TabBottomNavigation = () => {
    return (
        <BottomTab.Navigator
            initialRouteName={"Dashboard"}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    const { lib: Icon, name } = icons[route.name];

                    return <Icon name={name} size={size} color={color} />
                }
            })}

            tabBarOptions={{
                activeTintColor: '#79CB39',
                style: {
                    backgroundColor: "#41484A"
                }
            }}
        >
            <BottomTab.Screen name='Dashboard' component={Dashboard} options={{
                tabBarLabel: "INÍCIO"
            }}/>
            <BottomTab.Screen name='Mural' component={Mural} options={{
                tabBarLabel: "MURAL"
            }}/>
            <BottomTab.Screen name='Award' component={Award} options={{
                tabBarLabel: "PREMIAÇÃO"
            }}/>
            <BottomTab.Screen name='Profile' component={Profile} options={{
                tabBarLabel: "PERFIL"
            }} />
        </BottomTab.Navigator>
    )
}

const Routes = () => {
    return (
        <>
            <StatusBar translucent barStyle="dark-content" backgroundColor="#79CB39" />

            <NavigationContainer>
                <StackNavigation.Navigator
                    initialRouteName={"Home"}

                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <StackNavigation.Screen name='BottomTab' component={TabBottomNavigation} />
                    <StackNavigation.Screen name='Home' component={Home} />
                    <StackNavigation.Screen name='SignIn' component={SignIn} />
                    <StackNavigation.Screen name='SignUp' component={SignUp} />
                    <StackNavigation.Screen name='News' component={News} />
                    <StackNavigation.Screen name='Contracts' component={Contracts} />
                    <StackNavigation.Screen name='Prospections' component={Prospections} />
                    <StackNavigation.Screen name='More' component={More} />
                </StackNavigation.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Routes;
