import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification.map((n) => (
    <div
      style={{
        ...style,
        color: n.notificationType === "success" ? "green" : "red",
      }}
      key={n.notificationId}
    >
      <div>{n.notificationMessage}</div>
    </div>
  ));
};

export default Notification;
