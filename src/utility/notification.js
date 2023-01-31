// export default async function sendPushNotification() {
//     try {
//         // const sendRequest = {
//         //     to: "ExponentPushToken[HUQeMiK_wvpDPbLzn-2qcX]",
//         //     title: "hello",
//         //     body: "world"
//         // }
//         const message = {
//             to: "ExponentPushToken[HUQeMiK_wvpDPbLzn-2qcX]",
//             sound: 'default',
//             title: 'Original Title',
//             body: 'And here is the body!',
//             data: { someData: 'goes here' },
//         };

    //     await fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             "Accept": 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //             "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true",
    //             "Access-Control-Max-Age": "1800",
    //             "Access-Control-Allow-Headers": "content-type",
    //             "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH,OPTIONS"
    // },
    //     await fetch('https://tradesmanbackend.onrender.com/api/sendNotification', {
    //         method: 'POST',
    //         headers: {
    //             "Accept": 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //             "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true",
    //             "Access-Control-Max-Age": "1800",
    //             "Access-Control-Allow-Headers": "content-type",
    //             "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH,OPTIONS"
    // },
    //         body: JSON.stringify(message),
    //     });
    // } catch (error) {
    //     console.log(error.message)
    // }
    export default async function sendPushNotification(token, status) {
        try {
            let message = "";
            if(status === "Approved"){
                message = "Your account has been Approved by Locality. You can now send proposal and contact with the client."
            } 
            else if(status === "Disapproved"){
                message = "Your account has been Disapproved by Locality."
            }

            else {
                message = "We are going through your details. Please stay with Locality."
            }
            const sendRequest = {
                token: token,
                message: message
            }
            // const { data } = axios.post("https://exp.host/--/api/v2/push/send", {
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Origin": "*",
            //         "accept": "application / json",
            //         "accept-encoding": "gzip, deflate",
            //         "content- type": "application / json"
            //     },
            //     body: JSON.stringify(sendRequest)
            // })
            fetch("https://tradesmanbackend.onrender.com/api/sendNotification", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(sendRequest)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        } catch (error) {
            console.log(error.message)
        }
}