import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const notificationSlice = createSlice(
  {
    name: "notification",
    initialState: [],
    reducers: {
      setNotification: (state, action) => {
        return [
          ...state,
          {
            notificationType: action.payload.notificationType,
            notificationMessage: action.payload.notificationMessage,
            notificationTimeout: action.payload.notificationTimeout,
            notificationId: action.payload.notificationId,
          },
        ];
      },
      clearNotification: (state, action) => {
        return state.filter(
          (notification) => notification.notificationId !== action.payload
        );
      },
      clearAllNotifications: (state) => {
        return [];
      },
    },
  },
  {}
);

export const sendNotification = (message, type, sticky = false) => {
  return (dispatch) => {
    const id = getId();
    dispatch(
      setNotification({
        notificationType: type,
        notificationMessage: message,
        notificationTimeout: 5000,
        notificationId: id,
      })
    );
    if (!sticky) {
      setTimeout(() => {
        dispatch(clearNotification(id));
      }, 5000);
    }
  };
};

export const removeAllNotifications = () => {
  return (dispatch) => {
    dispatch(clearAllNotifications());
  };
};

export const { setNotification, clearNotification, clearAllNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
