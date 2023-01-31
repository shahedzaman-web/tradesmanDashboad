import React, {createContext} from "react";
import NotificationAlert from "react-notification-alert";

const NotifyContext = createContext({});

export const NotifyProvider = ({children}) => {
    const notificationAlertRef = React.useRef(null);
    function Notify(type, message, page) {
        let options = {
            place: "tr",
            message: (
                <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
              {page} Notification
          </span>
                    <span data-notify="message">{message}</span>
                </div>
            ),
            type: type,
            icon: "ni ni-bell-55",
            autoDismiss: 7,
        };
        notificationAlertRef.current?.notificationAlert(options);
    }

    return (
        <NotifyContext.Provider
            value={{
                Notify
            }}
        >
            {children}
            <div className="rna-wrapper">
                <NotificationAlert ref={notificationAlertRef}/>
            </div>
        </NotifyContext.Provider>
    );
};

export default NotifyContext;
