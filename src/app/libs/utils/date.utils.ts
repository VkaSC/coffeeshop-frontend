import { StrUtils } from "./str.utils";

export default class DateUtils {

    static getDaysInMillis(dayNumber: number){
        return (24*60*60*1000) * dayNumber;
    }

    static transformEsESToDate(dateStr: string) {
        if (StrUtils.contains(dateStr, '/')) {
            const dateSplits = dateStr.split('/');
            return new Date(Number(dateSplits[2]), Number(dateSplits[1]) - 1, Number(dateSplits[0]));
        } else {
            return new Date(dateStr);
        }
    }

    static transformEsESToISODate(dateStr: string) {
        if (StrUtils.contains(dateStr, '/')) {
            const dateSplits = dateStr.split('/');
            return dateSplits[2] + '-' + dateSplits[1] + '-' + dateSplits[0];
        } else {
            return dateStr;
        }
    }

    static formatShortEnUS(date: Date) {
        return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    static formatShortISO(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let monthStr = '';
        let dayStr = '';
        if (month < 10) {
            monthStr = '0' + month;
        } else {
            monthStr = String(month);
        }
        if (day < 10) {
            dayStr = '0' + day;
        } else {
            dayStr = String(day);
        }
        return '' + year + '-' + month + '-' + day;
    }

    static formatShortEsES(date: Date) {
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    static formatDateTimeEsES(date: Date) {
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: "2-digit", minute: "2-digit", second: "2-digit" })
    }

    static formatTimeEsES(date: Date) {
        return date.toLocaleDateString('es-ES', { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    static spanishTimeZone(date: Date) {
        return DateUtils.transformEsESToISODate(DateUtils.formatShortEsES(date)) + 'T' + DateUtils.formatTimeEsES(date).split(' ')[1].trim() + 'Z';
    }

    static todayEsES(){
        return new Date(DateUtils.spanishTimeZone(new Date()));
    }

    static exactDate(year: number, month: number, day: number, hour: number, minutes: number, seconds: number){
        let hourStr = hour < 10 ?  '0' + hour : String(hour);
        let minuteStr = minutes < 10 ?  '0' + minutes : String(minutes);
        let secondStr = seconds < 10 ?  '0' + seconds : String(seconds);
        let monthStr = month < 10 ?  '0' + month : String(month);
        let dayStr = day < 10 ? '0' + day : String(day)
        return new Date('' + year + '-' + monthStr + '-' + dayStr + 'T' + hourStr + ':' + minuteStr + ':' + secondStr + '.000Z');
    }
}