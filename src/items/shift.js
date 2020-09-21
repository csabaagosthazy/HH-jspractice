
import moment from "moment";
// create a shift class which recieves start and end data 
// creates readable date formats

//{start:{yy:2020,mm:9,dd:1,h:13,m:0}, end:{yy:2020,mm:9,dd:1,h:21,m:0}}

export default class Shift {
    constructor({start: s , end: e }){
        this.sy = s.yy;
        this.sm = s.mm;
        this.sd = s.dd;
        this.sh = s.h;
        this.smin = s.m;
        this.ey = e.yy;
        this.em = e.mm;
        this.ed = e.dd;
        this.eh = e.h;
        this.emin = e.m;
    }
    dateHourFormat = "YYYY-MM-DD hh:mm"
    //Method
    createDate(y,m,d,h,min){

        let date = moment(`${y}-${m}-${d} ${h}:${min}`, this.dateHourFormat);
        return date;

    }
    
    get startDate(){
        const {sy, sm, sd, sh, smin} = this;

        return this.createDate(sy, sm, sd, sh, smin).format("YYYY-MM-DD");
    }

    get endDate(){
        const {ey, em, ed, eh, emin} = this;
        return this.createDate(ey, em, ed, eh, emin).format("YYYY-MM-DD");
    }

    get startTime(){
        const {sy, sm, sd, sh, smin} = this;
         let sTime = this.createDate(sy, sm, sd, sh, smin).format("HH:mm");
        return moment(sTime, "HH-mm");
    }

    get endTime(){
        const {ey, em, ed, eh, emin} = this;
        let eTime = this.createDate(ey, em, ed, eh, emin).format("HH:mm");
        return moment(eTime, "HH-mm");
    }

}