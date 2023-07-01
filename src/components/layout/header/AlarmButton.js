import { NotificationFilled } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";

const AlarmButton = (props) => (
  <Space size={"small"}>
    {props.cnt > 0 ? (
      <Badge count={props.cnt}>
        <Avatar shape="round" icon={<NotificationFilled />} />
      </Badge>
    ) : (
      <Avatar shape="round" icon={<NotificationFilled />} />
    )}
  </Space>
);
export default AlarmButton;
