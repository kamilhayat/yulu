
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:25,
    marginTop:10
  },
  suggestionList: {
    position: 'absolute',
    top: 99, // Adjust this value according to your layout
    left: 15,
    right: 0,
    // backgroundColor: 'red',
    borderColor: 'black',
    // borderWidth:1,
    padding:10,
    maxHeight: 420,
    zIndex: 1,
  },
  mapIcon: {
    top:30,
    marginLeft:0,

},
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginLeft:20,
},
  textInput: {
    
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    width:370,
    marginLeft: 20,
  },

  separator: {
    backgroundColor: '#efefef',
    height: 1,
  },
  listView: {
    position: 'absolute',
    top: 105,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {

  },

  circle: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 20,
    left: 5,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 60,
    backgroundColor: '#c4c4c4',
    position: 'absolute',
    top: 28,
    left: 7,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 90,
    left: 5.3,
  },
});

export default styles;
