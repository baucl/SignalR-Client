import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const token = 'token jwt';
const SIignalRTest = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44327/notification', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on('GetNotifications', async () => {
                        //llamadas GET alls o de actualizacion
                        fetch('https://localhost:44327/api/1/notification/all', {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token,
                            }
                        }).then(async response => {
                            var result = await response.json()
                            console.info(result)
                        });
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async () => {

        if (connection._connectionStarted) {
            //llamada POST/PUT/DELETE
            try {
                fetch('https://localhost:44327/api/1/notification/manual', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        'title': 'Notificacion prueba',
                        'date': '28/09/2022',
                        'description': 'prueba',
                        'notificationId': 'BEEB8518-5A4g-4D2C-B565-FAF878BCA7D2',
                        'notificationTypeId': 'C7CE17B9-12CD-4EE3-A07B-F80D8FCAE26D',
                        'accountId': '3fdbc978-051a-4eax-a0fb-cf3366cb7c72'
                    })
                }).then(async response => {
                    var result = await response.json()
                    console.info(result)
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
            <button onClick={sendMessage}>Enviar post</button>
        </div>
    );
};

export default SIignalRTest;
