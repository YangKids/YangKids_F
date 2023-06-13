import { NotificationFilled } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
const AlarmButton = () => (
  <Space size={'small'}>
    <Badge count={7}>
      <Avatar shape="round" icon={<NotificationFilled />} />
    </Badge>
  </Space>
);
export default AlarmButton;