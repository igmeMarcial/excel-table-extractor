import dayjs from 'dayjs'; // Import dayjs library
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('es');
dayjs.extend(relativeTime);

const formatTimestamp = (timestamp: number, format?: string) => {
  format = format || 'DD/MM/YYYY hh:mm A';
  return dayjs(timestamp).format(format);
};

export default formatTimestamp;
