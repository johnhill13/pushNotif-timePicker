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
          <View
            contentInserAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View>
              <Text style={styles.sectionTitle}>{this.state.seconds} Seconds</Text>
            </View>
            <View style={styles.body}>
              <Button
                color="#eb4034"
                style={styles.button}
                type="Solid Button"
                title={'Scheduled Notification'}
                onPress={() => {
                  this.notification.scheduleNotification(this.state.seconds);
                }}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Picker
              style={styles.picker}
              itemStyle={styles.itemStyle}
              selectedValue={this.state.seconds}
              onValueChange={seconds => this.setState({seconds})}>
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="15" value={15} />
              <Picker.Item label="20" value={20} />
              <Picker.Item label="25" value={25} />
              <Picker.Item label="30" value={30} />
            </Picker>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    height: 100,
    width: 100,
    color: '#344953',
    justifyContent: 'center',
  },
  itemStyle: {
    height: 70,
    alignItems: 'center',
  },
  button: {
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: 100,
  },
});

export default App;
