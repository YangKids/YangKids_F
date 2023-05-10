import { NotificationFilled } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
const Alarm = () => (
  <Space size={24}>
    <Badge count={77}>
      <Avatar shape="round" icon={<NotificationFilled />} />
    </Badge>
  </Space>
);
export default Alarm;