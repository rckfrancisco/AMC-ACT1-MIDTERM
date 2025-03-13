import React, {useState} from 'react'
import {View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function App() {

  const [enteredGoalText, setEnteredGoalText] = useState('');

  const[courseGoal, setCourseGoal] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);

  const goalInputHandler = (enteredText) => {
  setEnteredGoalText(enteredText)
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() ==='') return;

    if (editingIndex !==null) {
      const updatedGoals = [...courseGoal];
      updatedGoals[editingIndex] = { text: enteredGoalText, id: updatedGoals[editingIndex].id};
      setCourseGoal(updatedGoals)
      setEditingIndex(null);
    } else {
    setCourseGoal((currentCourseGoal) =>[
      ...currentCourseGoal,
      { text: enteredGoalText, id: Math.random().toString() }
    ]);
  } 
    setEnteredGoalText('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...courseGoal]
    updatedGoals.splice(index, 1);
    setCourseGoal(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEnteredGoalText(courseGoal[index].text)
    setEditingIndex(index);
  }

  return(
    <View>
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder = "My Goal"
        onChangeText={goalInputHandler}
        value = {enteredGoalText} 
        />
        <Button title={editingIndex !== null ? 'Edit Goal' : 'Add Goal' } onPress={addGoalHandler}/>  
      </View>

    <FlatList
    data={courseGoal}
    renderItem= {({item, index}) => (
      <View>
        <Text style={styles.inputText}>{item.text}</Text>
        <TouchableOpacity onPress={() => deleteGoal(index)}>
        <Text style={styles.clickText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => startEditing(index)}>
        <Text style={styles.clickText}>EDIT</Text>
        </TouchableOpacity>
      </View>  
    )}
    keyExtractor={(item) => item.id}
    />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '70%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    horizontal: 10,
  },
  inputText: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
    fontSize: 24,
    color: 'red',
  },
  clickText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
});
