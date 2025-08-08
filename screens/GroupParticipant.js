import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {CURRENCY_OPTION, COLORS} from './Constant';

export default function GroupParticipant({members, setMembers}) {
  const [memberName, setMemberName] = useState('');
  // const [members, setMembers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEdit = () => {
    if (memberName.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...members];
      updated[editIndex] = memberName;
      setMembers(updated);
      setEditIndex(null);
      console.log("editIndex----");
    } else {
      setMembers(prev => [...prev, memberName]);
      console.log("In -----editIndex----");
    }

    setMemberName('');
  };

  const handleEdit = index => {
    setMemberName(members[index]);
    setEditIndex(index);
  };

  const handleDelete = index => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setMemberName('');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>GroupParticipant Screen</Text> */}

      <TextInput
        style={styles.input}
        placeholder="Enter member name"
        value={memberName}
        onChangeText={setMemberName}
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddOrEdit}>
          <Text style={styles.addButtonText}>
            {editIndex !== null ? 'Update' : 'Add Member'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={members}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.memberRow}>
            <Text style={styles.memberName}>{item}</Text>

            <TouchableOpacity
              onPress={() => handleEdit(index)}
              style={styles.actionButton}>
              <Image
                source={require('../assets/edit.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(index)}
              style={styles.actionButton}>
              <Image
                source={require('../assets/delete.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // margin: 10,
    // marginHorizontal: 20,
    // marginBottom: 10,
    backgroundColor: COLORS.BG_LIGHT_BLUE,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: 'rgb(55,125,253)',
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginTop:20,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: COLORS.BG_DARK_BLUE,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  },
  addButtonText: {color: '#fff', fontWeight: 'bold'},
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginHorizontal: 10,
    // marginBottom: 10,
    // backgroundColor: 'red'
  },
  memberName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:5,
    color: COLORS.BG_DARK_BLUE // Ensure text color is set
  },

  actionButton: {
    marginLeft: 5,
    padding: 6,
  },

  editText: {color: '#007bff'},
  deleteText: {color: '#ff4d4d'},
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'rgb(55,125,253)',
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    borderRadius: 5,
    marginRight:0
  },
});
