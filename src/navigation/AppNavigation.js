import React, { useContext } from 'react'
import UserNavigation from './UserNavigation'
import NewsNavigation from './NewsNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const AppNavigation = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user ? <NewsNavigation /> : <UserNavigation />}
    </NavigationContainer>
  )
}

export default AppNavigation