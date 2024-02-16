import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

interface ItoShop{
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [toDoShop, setToShops] = useState<ItoShop[]>([]);
  const [error, showError] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if(value.trim()) {
    setToShops([...toDoShop, {text : value, completed: false}]);
    saveData();
    } else { 
      showError(true);
    }
        setValue("");
  };

  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    saveData();
  }, [toDoShop]);


  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('toDoShop');
      if (data !== null && toDoShop.length === 0) {
        setToShops(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const saveData = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('toDoShop', JSON.stringify(toDoShop));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const removeItem = (index: number): void => {
    const newToShopList = [...toDoShop];
    newToShopList.splice(index, 1);
    setToShops(newToShopList);
    saveData();
  }

  const toggleComplete = (index: number): void => {
    const newToShopList = [...toDoShop];
    newToShopList[index].completed = !newToShopList[index].completed
    setToShops(newToShopList)
    saveData();
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
          source={require('./images/grocey-background.jpg')}
            style={styles.imageBackground}
                                          >
            <View style={styles.titleContainer}>
              <Text style={styles.text}>Shopping List</Text>
                  <TextInput 
                    placeholder='Enter shopping items'
                    value={value}
                    onChangeText={e => {
                      setValue(e);
                      showError(false);
                    }}
                      
                                          />
          <Button title='add Grocery' onPress={handleSubmit}/>
            </View>
                {error && <Text>Error: Input field is empty...</Text>}
                  <Text>Your Shopping List :</Text>
                    {toDoShop.length === 0 && <Text>No Groceries</Text>}
                      {toDoShop.map((toDo: ItoShop, index: number) => (
                        <View key={`${index}_${toDo.text}`} style={styles.itemContainer}>
                        <Text
                          style={[
                            styles.task,
                              { textDecorationLine: toDo.completed ? "line-through" : "none" }
                                  ]}>
                              {toDo.text}
                              </Text>
                              <View style={styles.buttonsContainer}>
                        <Button
                          title={toDo.completed ? "Completed" : "Complete"}
                          onPress={() => {toggleComplete(index)}}
                        />
                        <Button title="X" onPress={() => {removeItem(index)}} color="crimson" />
                        </View>
                      </View>
                      ))}
                    </ImageBackground>
                    <StatusBar style="auto" />
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
      paddingTop: 50,
      alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  task: {
    flex: 1,
    color: 'white',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },  
  
});
function loadData() {
  throw new Error('Function not implemented.');
}

