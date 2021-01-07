import 'react-native-gesture-handler';
import React, { useEffect, Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import api from './src/services/1net';
import dataInstitution from './src/services/credentials';

import Routes from './src/routes';

const NewApp = () => {
    useEffect(() => {
        const getInstitution = async() => {
            try {
                const response = await api.post('/institutionsessions', {
                    ...dataInstitution
                });

                AsyncStorage.setItem('token', response.data.token);
            } catch(err) {
                console.log('ERRO:', err);
            }
        }

        getInstitution();
    },[])

    return <Routes />;
}

export default class App extends Component {
    constructor(properties) {
        super(properties);
        //Remove this method to stop OneSignal Debugging
        OneSignal.setLogLevel(6, 0);

        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init("1dd0979b-1475-4827-8909-c23238684da6", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    render() {
        return <NewApp />;
    }
}

function myiOSPromptCallback(permission){
    // do something with permission value
}
