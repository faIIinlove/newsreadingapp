import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';
import { UserProvider } from './src/contexts/UserContext';
import { NewsProvider } from './src/contexts/NewsContext';

function App(): JSX.Element {
  return (
      <SafeAreaView style={styles.body}>
        <UserProvider>
          <NewsProvider>
            <AppNavigation />
          </NewsProvider>
        </UserProvider>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor:'red',
  }
});

export default App;
