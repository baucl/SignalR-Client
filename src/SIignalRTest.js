import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const SIignalRTest = () => {
    const [connection1, setConnection1] = useState(null);
    const [connection2, setConnection2] = useState(null);
    const [connection3, setConnection3] = useState(null);
    let connectionId1 = null;
    let connectionId2 = null;
    let connectionId3 = null;
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluQGVtZXJnaWEuY29tIiwicm9sZSI6ImFkbWluIiwibmFtZWlkIjoiYmNiZTJlMzYtODJhYS00MTMyLTk0NDEtNTNjYTI4ZjJhNjQ3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IjNmZGJjOTc4LTA1MWEtNGVhYi1hMGZiLWNmMzM2NmNiN2M3MiIsImdyb3Vwc2lkIjoiZmU3NDUzNTctNmM3ZC00Y2VjLTg4YjItODhhNjgzOTlkN2IwIiwidXNlcnR5cGUiOiIiLCJqdGkiOiIwNWQ3ZGM3ZS05ZmI3LTQ3ODItYmExYy0zZmY5MWMyMWU2NGQiLCJuYmYiOjE2NjU1ODU3NTksImV4cCI6MTY2NTYwMzc1OSwiaWF0IjoxNjY1NTg1NzU5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjEwMTE1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDoxMDExNSJ9.dgR_mOLDZ2fDBxG9-VvlGbrzH6WhuGLzXS-RXfkgQMo'
    useEffect(() => {
        const newConnection1 = new HubConnectionBuilder()
            .withUrl('https://localhost:44327/notification', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();
        setConnection1(newConnection1);

        const newConnection2 = new HubConnectionBuilder()
            .withUrl('https://localhost:44327/notification', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();
        setConnection2(newConnection2);

        const newConnection3 = new HubConnectionBuilder()
            .withUrl('https://localhost:44327/notification', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();
        setConnection3(newConnection3);
    }, []);

    useEffect(() => {
        if (connection1) {
            connection1.start()
                .then(result => {
                    console.log('Connected! Grupo 1');

                    connection1.invoke("GetConnectionId").then((data) => {
                        connectionId1 = data
                        fetch('https://localhost:44327/api/1/Notification/'+ connectionId1, {
                            method: 'PUT',
                            headers: {
                                'Authorization': 'Bearer ' + token,
                                'Content-Type': 'application/json',
                                'Accept': '*/*'
                            }
                        }).then(async response => {
                            console.log('ConnectionId Actualizada')
                        });
                    });


                })
                .catch(e => console.log('Connection failed: ', e));

            connection1.on('newNotification', (mess) => {
                console.info(mess)
            });
        }
        if (connection2) {
            connection2.start()
                .then(result => {
                    console.log('Connected! Grupo 2 Usuario 1');

                    connection2.invoke("GetConnectionId").then((data) => {
                        connectionId2 = data
                    });


                })
                .catch(e => console.log('Connection failed: ', e));

            connection2.on('newNotification', (mess) => {
                console.info(mess)
            });
        }

        if (connection3) {
            connection3.start()
                .then(result => {
                    console.log('Connected! Grupo 2 Usuario 2');

                    connection3.invoke("GetConnectionId").then((data) => {
                        connectionId3 = data
                    });


                })
                .catch(e => console.log('Connection failed: ', e));

            connection3.on('newNotification', (mess) => {
                console.info(mess)
            });
        }

    }, [connection1, connection2, connection3]);

    const sendMessageGrupo1 = async () => {

        if (connection1._connectionStarted) {

            try {
                fetch('https://localhost:44327/api/1/Notification/manualSend', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        id: "500382CA-A9EC-4450-8659-088BEEFE5600"
                    })
                }).then(async response => {
                    console.log('Grupo 1 Usuario 1')
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const sendMessageGrupo2 = async () => {

        if (connection2._connectionStarted) {

            try {
                fetch('https://localhost:44327/api/1/Notification/manualSend', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        id: "05A3728E-1C3A-4B4A-A273-09C9DCAC57CE"
                    })
                }).then(async response => {
                    console.log('Grupo 2 Usuario 1')
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const updateGrupo1 = async () => {

        if (connection1._connectionStarted) {
            //llamada POST/PUT/DELETE
            try {
                fetch('https://localhost:44327/api/1/notification/configuration/' + connectionId1 + '/954B7046-32B2-4A7B-945C-F9EA8CBB3738', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        notificationTypeId: "FB4ACB10-34F0-4DB6-9EF4-473F55BE477A",
                        active: true,
                        sendEmail: true
                    })
                }).then(async response => {
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const updateGrupo2Usuario1 = async () => {

        if (connection2._connectionStarted) {
            //llamada POST/PUT/DELETE
            try {
                fetch('https://localhost:44327/api/1/notification/configuration/' + connectionId2 + '/69F1CB2A-14E9-4A71-A020-2FA328907B01', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        notificationTypeId: "62A80EC5-DC16-4202-B818-63DCDAEB86CE",
                        active: true,
                        sendEmail: true
                    })
                }).then(async response => {
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const updateGrupo2Usuario2 = async () => {

        if (connection3._connectionStarted) {
            //llamada POST/PUT/DELETE
            try {
                fetch('https://localhost:44327/api/1/notification/configuration/' + connectionId3 + '/69F1CB2A-14E9-4A71-A020-2FA328907B01', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        notificationTypeId: "62A80EC5-DC16-4202-B818-63DCDAEB86CE",
                        active: true,
                        sendEmail: true
                    })
                }).then(async response => {
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }


    return (
        <div>
            <button onClick={updateGrupo1}>Update Grupo 1 User 1</button>
            <button onClick={updateGrupo2Usuario1}>Update Grupo 2 User 1</button>
            <button onClick={updateGrupo2Usuario2}>Update Grupo 2 User 2</button>
            <button onClick={sendMessageGrupo1}>SendMessage Grupo 1</button>
            <button onClick={sendMessageGrupo2}>SendMessage Grupo 2</button>
        </div>
    );
};

export default SIignalRTest;
