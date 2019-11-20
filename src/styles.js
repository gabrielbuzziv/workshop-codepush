import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#eee',
    marginVertical: 10,
    padding: 10,
    width: 100,
  },
});
