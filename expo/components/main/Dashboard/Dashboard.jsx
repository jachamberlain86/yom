import React, { useState, setState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../../features/User/userSlice.js';

import HomeScreen from '../Home/Home.jsx';
import ShoppingListScreen from '../ShoppingList/ShoppingList.jsx';

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
  return ( null );
};

export default function Dashboard () {

  const dispatch = useDispatch();
  const userStatus = useSelector( state => state.user.status );
  const error = useSelector( state => state.user.error );
  const currentUser = useSelector( state => state.user.currentUser );

  useEffect( () => {
    if ( userStatus === 'idle' ) {
      dispatch( fetchUser() );
    }
  }, [ userStatus, dispatch ] );


  let content;

  if ( userStatus === 'loading' ) {
    content = <Text>Loading...</Text>;
  } else if ( userStatus === 'succeeded' ) {
    content = <Text>{ currentUser.name } is logged in</Text>;
  } else if ( userStatus === 'failed' ) {
    content = <Text>{ error }</Text>;
  }




  return (
    <Tab.Navigator initialRouteName='Home' labeled={ false }>
      <Tab.Screen name='Home' component={ HomeScreen }
        options={ {
          tabBarIcon: ( { color, size } ) => (
            <MaterialCommunityIcons name='home-variant' color={ color } size={ 26 } />
          )
        } }
      />
      <Tab.Screen name='Recipe Book Container' component={ EmptyScreen }
        listeners={ ( { navigation } ) => ( {
          tabPress: event => {
            event.preventDefault();
            navigation.navigate( 'Recipe Book' );
          }
        } ) }
        options={ {
          tabBarIcon: ( { color, size } ) => (
            <MaterialCommunityIcons name='notebook' color={ color } size={ 26 } />
          )
        } }
      />
      <Tab.Screen name='Meal Plan Container' component={ EmptyScreen }
        listeners={ ( { navigation } ) => ( {
          tabPress: event => {
            event.preventDefault();
            navigation.navigate( 'Meal Plan' );
          }
        } ) }
        options={ {
          tabBarIcon: ( { color, size } ) => (
            <MaterialCommunityIcons name='hamburger' color={ color } size={ 26 } />
          )
        } }
      />
      <Tab.Screen name='Shopping List' component={ ShoppingListScreen }
        options={ {
          tabBarIcon: ( { color, size } ) => (
            <MaterialCommunityIcons name='text-box' color={ color } size={ 26 } />
          )
        } }
      />
    </Tab.Navigator>
  );
}
