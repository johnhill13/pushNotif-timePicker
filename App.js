import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Picker,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import NotificationService from './components/NotificationService';

class App extends Component {
  constructor(props) {
    super(props);
    // creating a new instance of the NotificationService
    //& passing in the function we want called when the notification happens
    this.notification = new NotificationService(this.onNotification);
    this.state = {
      seconds: 5,
    };
  }

  // Gets called when the notification comes in
  onNotification = notif => {
    Alert.alert(notif.title, notif.message);
  };

  // Permissions to use notifications
  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInserAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View>
              <Text style={styles.sectionTitle}>{this.state.seconds}</Text>
            </View>
            <View style={styles.body}>
              <Button
                type='Solid Button'
                title={'Scheduled Notification'}
                onPress={() => {
                  this.notification.scheduleNotification(this.state.seconds);
                }}
              />
            </View>
          </ScrollView>
          <Picker
            style={styles.picker}
            selectedValue={this.state.seconds}
            onValueChange={seconds => this.setState({seconds})}>
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="15" value={15} />
          </Picker>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  picker: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: 100,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
