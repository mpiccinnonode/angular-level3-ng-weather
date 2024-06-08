import { TimeInfo } from '../models/time-info.model';

/**
 * Utility class for formatting and de-formatting time
 */
export class TimeUtils {
    private static _millisPerSecond = 1000;
    private static _millisPerMinute = 60 * this._millisPerSecond;
    private static _millisPerHour = 60 * this._millisPerMinute;

    static timeInfoToMillis(timeInfos: TimeInfo): number {
        const { hours, minutes, seconds } = timeInfos;
        const hoursMillis = hours * this._millisPerHour;
        const minutesMillis = minutes * this._millisPerMinute;
        const secondsMillis = seconds * this._millisPerSecond;
        return hoursMillis + minutesMillis + secondsMillis;
    }

    static millisToTimeInfo(millis: number): TimeInfo {
        const zeroDay = new Date(0); // UNIX epoch start
        zeroDay.setTime(millis);
        return {
            hours: zeroDay.getUTCHours(),
            minutes: zeroDay.getUTCMinutes(),
            seconds: zeroDay.getUTCSeconds(),
        };
    }
}
