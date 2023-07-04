import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).local().format(format);
}

export function zhToFormat(
  zhString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs(zhString).format(format);
}

export function diffTime(dateTime: string, nextDateTime: string) {
  if (
    dateTime != "0001-01-01T00:00:00Z" &&
    nextDateTime != "0001-01-01T00:00:00Z"
  ) {
    if (dayjs(dateTime).diff(nextDateTime, "minute") < 0) {
      return "";
    }
    return dayjs(dateTime).diff(nextDateTime, "minute") + "分钟";
  }
  return "";
}

export function ISOTimeToLocal(ISOtime: any) {
  const localTime = new Date(ISOtime);
  return localTime.toLocaleString();
}

export function toTimeStamp(time: any) {
  const localTime = new Date(time);
  const timeStamp = localTime.getTime();
  return timeStamp;
}
