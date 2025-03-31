import { format } from 'date-fns';

export default function formatPlainDate(datetime, formatString) {
  if (!(datetime instanceof Date)) return '';

  try {
    return format(datetime, formatString);
  } catch (e) {
    console.error(e);
    return '';
  }
}
