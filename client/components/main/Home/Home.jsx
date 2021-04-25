import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../../features/User/userSlice.js'
import { styles } from '../../../styles/app.jsx'

export default function Home () {
  const dispatch = useDispatch()
  const userStatus = useSelector(state => state.user.status)
  const error = useSelector(state => state.user.error)
  const currentUser = useSelector(state => state.user.currentUser)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

  let content

  if (userStatus === 'loading') {
    content = <Text>Loading...</Text>
  } else if (userStatus === 'succeeded') {
    content = <Text>{currentUser.name} is logged in</Text>
  } else if (userStatus === 'failed') {
    content = <Text>{error}</Text>
  }

  return (
    <View>
      <Text style={styles.bodyCopy}>{content}</Text>
    </View>
  )
}
