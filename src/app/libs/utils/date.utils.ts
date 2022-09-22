import { StrUtils } from "./str.utils";

export default class DateUtils {
    static transformEsESToDate(dateStr: string) {
        if (StrUtils.contains(dateStr, '/')) {
            const dateSplits = dateStr.split('/');
            return new Date(Number(dateSplits[2]), Number(dateSplits[1]) - 1, Number(dateSplits[0]));
        } else {
            return new Date(dateStr);
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
}