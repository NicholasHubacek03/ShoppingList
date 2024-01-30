import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./images/grocey-background.jpg')}
        style={styles.imageBackground}  // Use the style prop here
      >
 <View style={styles.titleContainer}>
          <Text style={styles.text}>Shopping List</Text>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',

  },
    titleContainer: {
      paddingTop: 50, // Adjust the paddingTop to move the title down from the top
      alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
