import PushNotification from 'react-native-push-notification';

export default class NotificationService {
    //onNotification is a function passed in that is to be called when a notification is to be emitted.

    constructor(onNotification) {
        this.configure(onNotification);
        this.lastId = 0;
    }
    configure(onNotification) {
        PushNotification.configure({
            onNotification: onNotification,

            // IOS Only (optional)
            permissions: {
                alerth: true,
                badge: true,
                sound: true
            },
            
            popInitialNotification: true,
        });
    }
// Appears after a specified time.
    scheduleNotification() {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + (30 * 1000)), // set for 30 seconds
            title: "Scheduled notification",
            message: "My Notification Message",
            playSound: true,
            soundName: 'default',
        });
    }

    checkPermission(cbk) {
        return PushNotification.checkPermissions(cbk);
    }

    cancelNotif() {
        PushNotification.cancelLocalNotifications({id: ''+this.lastId});
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotificationss();
    }
}