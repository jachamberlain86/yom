import React from 'react'
import { View, Pressable } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../../styles/app.jsx'
import { useNavigation } from '@react-navigation/native'
import {useIsDrawerOpen} from '@react-navigation/drawer'

export default function SideMenuIcon () {
  const navigation = useNavigation()
  const isDrawerOpen = useIsDrawerOpen()

  const menuIcon = isDrawerOpen
  ? <MaterialCommunityIcons name='close-thick' color={colors.yomWhite} size={20} />
  : <MaterialCommunityIcons name='hamburger' color={colors.yomWhite} size={20} />

  function handleMenuPress () {
    navigation.toggleDrawer()
  }
  return (

    <View>
      <Pressable onPress={() => handleMenuPress()}>
        {menuIcon}

      </Pressable>
    </View>
  )
}
