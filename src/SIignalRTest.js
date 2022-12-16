import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const SIignalRTest = () => {
    const [connection1, setConnection1] = useState(null);
    const [connection2, setConnection2] = useState(null);
    const [connection3, setConnection3] = useState(null);
    const [connection4, setConnection4] = useState(null);
    let connectionId1 = null;
    let connectionId2 = null;
    let connectionId3 = null;
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRldkBjYWxpbWF0ZWNobm9sb2dpZXMuY29tIiwicm9sZSI6InN1cGVyLWFkbWluIiwibmFtZWlkIjoiNzJiMjVhMmItMThhNi00N2NmLTk0YjYtNTEwZGMzNzk4MjlkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IjQyODAxMjc5LTc3YTMtNGNlMi05YWNlLTI4OTI5N2MzODcxMSIsImdyb3Vwc2lkIjoiYjIwOTliNmItN2ZlNy00NTJiLTk2OWItYTEwNmU2MWQyNWYyIiwidXNlcnR5cGUiOiIiLCJqdGkiOiI3YWNkY2Y4NC0wYTBmLTRkZTUtOTlhZS1hYTQyZWUzYjdiZTQiLCJuYmYiOjE2NzEyMTQ0MjEsImV4cCI6MTY3MTIzMjQyMSwiaWF0IjoxNjcxMjE0NDIxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjEwMTE1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDoxMDExNSJ9.ya8KlA2BkujSEkhnh8p1A3ASrqBVaogm5wnsGzKIx64'
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

        const newConnection4 = new HubConnectionBuilder()
            .withUrl('https://localhost:44327/notification', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();
        setConnection4(newConnection4);
    }, []);

    useEffect(() => {
        if (connection1) {
            connection1.start()
                .then(result => {
                    console.log(result);

                })
                .catch(e => console.log('Connection failed: ', e));

            connection1.on('ReceiveMessage', (mess) => {
                console.info(mess)
            });
        }
        if (connection2) {
            connection2.start()
                .then(result => {
                    console.log(result);
                })
                .catch(e => console.log('Connection failed: ', e));

            connection2.on('ReceiveMessage', (mess) => {
                console.info(mess)
            });
        }

        if (connection3) {
            connection3.start()
                .then(result => {
                    console.log(result);

                })
                .catch(e => console.log('Connection failed: ', e));

            connection3.on('ReceiveMessage', (mess) => {
                console.info(mess)
            });
        }

        if (connection4) {
            connection4.start()
                .then(result => {
                    console.log(result);

                })
                .catch(e => console.log('Connection failed: ', e));

            connection4.on('ReceiveMessage', (mess) => {
                console.info(mess)
            });
        }

    }, [connection1, connection2, connection3, connection4]);

    const joinGrupoError1 = async () => {
        console.log('connection1');
        if (connection1._connectionStarted) {

            try {
                connection1.invoke('JoinGroup', '62A80EC5-DC16-4202-B818-63DCDAEB86CE')
                .then((result) => {
                    console.log(result);
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

    const joinGrupoError2 = async () => {
        console.log('connection2');
        if (connection2._connectionStarted) {

            try {
                connection2.invoke('JoinGroup', '62A80EC5-DC16-4202-B818-63DCDAEB86CE')
                .then((result) => {
                    console.log(result);
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

    const joinGrupoError3 = async () => {
        console.log('connection3');
        if (connection3._connectionStarted) {

            try {
                connection3.invoke('JoinGroup', '4A42E149-583E-4005-B836-E75C9BF33705')
                .then((result) => {
                    console.log(result);
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

    const joinGrupoError4 = async () => {
        console.log('connection4');
        if (connection4._connectionStarted) {

            try {
                connection4.invoke('JoinGroup', '4A42E149-583E-4005-B836-E75C9BF33705')
                .then((result) => {
                    console.log(result);
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

    const sendMessageGrupoError1 = async () => {
        console.log('connection1');
        if (connection1._connectionStarted) {

            try {
                connection1.invoke('SendMessageToGroup', '62A80EC5-DC16-4202-B818-63DCDAEB86CE', 'Mensaje de error Usuario 1')
                .then((result) => {
                    console.log(result);
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

    const sendMessageGrupoError2 = async () => {
        console.log('connection2');
        if (connection2._connectionStarted) {

            try {
                connection2.invoke('SendMessageToGroup', '62A80EC5-DC16-4202-B818-63DCDAEB86CE', 'Mensaje de error Usuario 2')
                .then((result) => {
                    console.log(result);
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

    const sendMessageGrupoError3 = async () => {
        console.log('connection2');
        if (connection3._connectionStarted) {

            try {
                connection3.invoke('SendMessageToGroup', '4A42E149-583E-4005-B836-E75C9BF33705', 'Mensaje de actualizacoin Usuario 3')
                .then((result) => {
                    console.log(result);
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
            <button onClick={joinGrupoError1}>Join Grupo Error Usuario 1</button>
            <button onClick={joinGrupoError2}>Join Grupo Error Usuario 2</button>
            <button onClick={joinGrupoError3}>Join Grupo actualizacion Usuario 3</button>
            <button onClick={joinGrupoError4}>Join Grupo actualizacion Usuario 4</button>
            <button onClick={sendMessageGrupoError1}>enviar mensaje grupo de error Usuario 1</button>
            <button onClick={sendMessageGrupoError2}>enviar mensaje grupo de error usuario 2</button>
            <button onClick={sendMessageGrupoError3}>enviar mensaje grupo de actualizacion usuario 2</button>
        </div>
    );
};

export default SIignalRTest;
