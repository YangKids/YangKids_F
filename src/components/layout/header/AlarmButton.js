import { NotificationFilled } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import useDeviceTypeStore from "../../../stores/deviceTypeStore";

const AlarmButton = (props) => {
  const { deviceType } = useDeviceTypeStore();
  return (
    <Space size={"small"}>
      {props.cnt > 0 ? (
        <Badge count={props.cnt}>
          {deviceType === "web" ? (
            <Avatar shape="round" icon={<NotificationFilled />} size={45}/>
          ) : (
            <Avatar shape="round" icon={<NotificationFilled />} size={40} />
          )}
        </Badge>
      ) : (
        <>
          {deviceType === "web" ? (
            <Avatar shape="round" icon={<NotificationFilled />} size={45} />
          ) : (
            <Avatar shape="round" icon={<NotificationFilled />} size={40} />
          )}
        </>
      )}
    </Space>
  );
};
export default AlarmButton;
