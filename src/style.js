import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpForm: {
    backgroundColor: '#ffffff',
    width: 200,
    padding: 10,
    marginBottom: 10,
  },
  btnPick: {
    flexDirection: 'row',
    padding: 20,
  },
  singleBtn: {
    backgroundColor: '#0067',
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  btnSubmit: {
    width: 150,
  },
  img: {
    backgroundColor: '#000000',
    width: 150,
    height: 150,
  },
  containerList: {
    flex: 1,
    backgroundColor: '#008080',
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
  },
  itemFeed: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  itemUser: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  imgUser: {
    backgroundColor: '#000000',
    width: 75,
    height: 75,
    marginEnd: 20,
  },
  title: {
    fontSize: 16,
  },
});

export default styles;
