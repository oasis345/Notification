import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(localeData);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

export { dayjs, localeData, relativeTime, timezone, utc };
