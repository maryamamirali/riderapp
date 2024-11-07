import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff5733',
    marginBottom: 20,
  },
  dropoffinputContainer: {
    width: '100%',
    marginBottom: 15,
  },
searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
searchResultsContainer: {
    paddingVertical: 10,
    maxHeight: 200,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
resultAddress: {
    fontSize: 14,
    color: '#777',
  },
selectedLocationContainer: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 10,
  },
selectedLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropoffmap: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 8,
  },
buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

// car selection

  carcontainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carselecttext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5733',
    textAlign: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    padding: 15,
    borderColor: '#007bff', // Blue border color
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  labelText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  buttonCars: {
    backgroundColor: '#ff5733',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  carbuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fareContainer: {
    padding: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  fareText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  carbuttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default styles