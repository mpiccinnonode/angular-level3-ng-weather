import { TimeInfo } from '../models/time-info.model';

export class TimeUtils {
    private static millisPerSecond = 1000;
    private static millisPerMinute = 60 * this.millisPerSecond;
    private static millisPerHour = 60 * this.millisPerMinute;

    static timeInfoToMillis(timeInfos: TimeInfo): number {
        const { hours, minutes, seconds } = timeInfos;
        const hoursMillis = hours * this.millisPerHour;
        const minutesMillis = minutes * this.millisPerMinute;
        const secondsMillis = seconds * this.millisPerSecond;
        return hoursMillis + minutesMillis + secondsMillis;
    }
}
