import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';
import { registry } from '@common/registry';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { observer } from 'mobx-react';

const SetupList = observer(() => {
  const { notificationService } = registry;

  return (
    <List>
      <Typography level="h3" fontSize="xl2" fontWeight="xl" mb={1}>
        알림 설정
      </Typography>
      <ListDivider />
      <ListItem>
        <ListItemContent component="label">알림 허용</ListItemContent>
        <Switch
          size="lg"
          color="success"
          checked={notificationService.activation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => (notificationService.activation = e.target.checked)}
        />
      </ListItem>
      <ListItem>
        <ListItemContent component="label">방해금지 시간 설정</ListItemContent>
        <Switch
          size="lg"
          color="success"
          checked={notificationService.disturbMode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => (notificationService.disturbMode = e.target.checked)}
        />
      </ListItem>
      {notificationService.disturbMode && (
        <>
          <ListItem>
            <ListItemContent component="label">시작 시간</ListItemContent>
            <DatePicker
              selected={notificationService.disturbStartTime}
              onChange={(date) => (notificationService.disturbStartTime = date)}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="hh:mm aa"
            />
          </ListItem>
          <ListItem>
            <ListItemContent component="label">종료 시간</ListItemContent>
            <DatePicker
              selected={notificationService.disturbEndTime}
              onChange={(date) => (notificationService.disturbEndTime = date)}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="hh:mm aa"
            />
          </ListItem>
        </>
      )}
    </List>
  );
});

export default SetupList;
