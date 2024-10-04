import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { Button, Flex } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const AntExample: React.FC = () => (
  <div>
    <div>
      <Flex gap='small' wrap>
        <Button type='primary'>Primary Button</Button>
        <Button>Default Button</Button>
        <Button type='dashed'>Dashed Button</Button>
        <Button type='text'>Text Button</Button>
        <Button type='link'>Link Button</Button>
      </Flex>
    </div>

    <br />

    <Space direction='vertical'>
      <DatePicker onChange={onChange} />
      <DatePicker onChange={onChange} picker='week' />
      <DatePicker onChange={onChange} picker='month' />
      <DatePicker onChange={onChange} picker='quarter' />
      <DatePicker onChange={onChange} picker='year' />
    </Space>
  </div>
);

export default AntExample;
