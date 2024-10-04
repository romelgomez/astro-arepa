import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { Button, Flex } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import UploadMedia from './media/components/upload-media.component';
import { useMedia } from './media/hooks/use-media.hook';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const AntExample: React.FC = () => {
  const { mediaList, onRemoveMedia, onChangesMedia, beforeUploadMedia } =
    useMedia();

  return (
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

      <br />
      <br />
      <hr />
      <br />

      <div>
        <h3>
          Test this with yours cloudinary credentials, You will need only:
        </h3>

        <br />

        <li>Cloudinary cloud name</li>
        <li>Cloudinary upload preset</li>

        <p>
          <br />
          <div>
            <b>TODO:</b>
          </div>
          <br />
          <li>Add more security</li>
          <li>
            Add a version that depends more in the API instead of the client and
            cloudinary security settings
          </li>
          <br />
          ref:
          https://cloudinary.com/documentation/developer_onboarding_faq_account_security
        </p>

        <br />

        <UploadMedia
          cloudinaryCloudName=''
          cloudinaryUploadPreset=''
          media={mediaList}
          tagId={uuidv4()}
          onRemove={onRemoveMedia}
          onChanges={onChangesMedia}
          beforeUpload={() => true}
        />
      </div>

      <br />
    </div>
  );
};

export default AntExample;
