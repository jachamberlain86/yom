import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { colors, tabBarStyle, mainHeaderOptions, authHeaderOptions } from '../../styles/app.jsx'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { createDrawerNavigator } from '@react-navigation/drawer'

import SideMenuIcon from '../../components/main/SideMenuIcon/SideMenuIcon.jsx'

import LandingScreen from '../../components/auth/Landing/Landing.jsx'
import LoginScreen from '../../components/auth/Login/Login.jsx'
import RegisterScreen from '../../components/auth/Register/Register.jsx'
import MealPlanScreen from '../../components/main/MealPlan/MealPlan.jsx'
import AddLinkScreen from '../../components/recipes/AddLink/AddLink.jsx'
import AddImageScreen from '../../components/recipes/AddImage/AddImage.jsx'
import AddTextScreen from '../../components/recipes/AddText/AddText.jsx'
import RecipeItemScreen from '../../components/recipes/RecipeItem/RecipeItem.jsx'
import UploadImageScreen from '../../components/recipes/UploadImage/UploadImage.jsx'
import EditNewRecipeScreen from '../../components/recipes/EditNewRecipe/EditNewRecipe.jsx'
import HomeScreen from '../../components/main/Home/Home.jsx'
import ShoppingListScreen from '../../components/main/ShoppingList/ShoppingList.jsx'
import RecipeListScreen from '../../components/recipes/RecipeList/RecipeList.jsx'
import AccountScreen from '../../components/main/Account/Account.jsx'
import CustomDrawerButtons from '../CustomDrawerButtons/CustomDrawerButtons.jsx'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const EmptyScreen = () => {
  return (null)
}

function MainTabNavigator () {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={colors.yomWhite}
      inactiveColor={colors.yomGreyLightest}
      barStyle={tabBarStyle}
    >
      <Tab.Screen
        name='Home' component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home-variant' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Recipe Book Container' component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault()
            navigation.navigate('Recipe Book')
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='notebook' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Meal Plan' component={MealPlanScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='rice' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Shopping List' component={ShoppingListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='text-box' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

function RecipeTabNavigator () {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={colors.yomWhite}
      inactiveColor={colors.yomWhite}
      barStyle={tabBarStyle}
    >
      <Tab.Screen
        name='Recipe List'
        component={RecipeListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='pot-mix' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Add Recipe Container'
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault()
            navigation.navigate('Add Recipe')
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='plus-circle-outline' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export function AddRecipeTabNavigator () {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={colors.yomWhite}
      inactiveColor={colors.yomWhite}
      barStyle={tabBarStyle}
    >
      <Tab.Screen
        name='Add Link'
        component={AddLinkScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='earth' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Add Image'
        component={AddImageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='camera' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Add Text'
        component={AddTextScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='pencil' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export function AuthStackNavigator () {
  return (
    <SafeAreaProvider>

      <NavigationContainer>

        <Stack.Navigator
          initialRouteName='Landing'
          screenOptions={
          authHeaderOptions
        }
          headerMode='float'
        >
          <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export function MainStackNavigator () {
  return (

    <Stack.Navigator
      initialRouteName='Home Container'
      screenOptions={
          { ...mainHeaderOptions, headerRight: ({ size, color }) => <SideMenuIcon /> }
        }
      headerMode='screen'
    >
      <Stack.Screen name='Home Container' component={MainTabNavigator} />
      <Stack.Screen name='Recipe Book' component={RecipeTabNavigator} />
      <Stack.Screen name='Add Recipe' component={AddRecipeTabNavigator} />
      <Stack.Screen name='Add Link' component={AddLinkScreen} />
      <Stack.Screen name='Add Image' component={AddImageScreen} />
      <Stack.Screen name='Add Text' component={AddTextScreen} />
      <Stack.Screen name='Meal Plan' component={MealPlanScreen} />
      <Stack.Screen name='Shopping List' component={ShoppingListScreen} />
      <Stack.Screen name='Account' component={AccountScreen} />

      <Stack.Screen name='Recipe Item' component={RecipeItemScreen} />
      <Stack.Screen name='Edit New Recipe' component={EditNewRecipeScreen} />
      <Stack.Screen name='Upload Image' component={UploadImageScreen} />
    </Stack.Navigator>

  )
}

export function SideMenuDrawerNavigator () {
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <Drawer.Navigator
          backBehavior='initialRoute'
          drawerStyle={{
            backgroundColor: colors.yomBlack,
            width: '50%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          drawerContent={(props) => <CustomDrawerButtons {...props} />}
        >
          <Drawer.Screen name='Main' component={MainStackNavigator} />

          <Drawer.Screen name='Account' component={AccountScreen} />
          <Drawer.Screen name='Log Out' component={CustomDrawerButtons} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
