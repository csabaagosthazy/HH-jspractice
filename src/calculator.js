
// This calculator is made for calculating monthly salary
// Salary is based on working hours
// Depending on the shedule there are base, evening and night extra payment
// Calculate net and gross salary

// create a dummy array with objects, it might come from user input
// the array contains shift objects
// one shift might start and end other day since there are night shifts

import moment from "moment";
import Shift from "./items/shift"

const format = "HH-mm"
/* 
    Moved to app.js
    const schedule = [
    {start:{yy:2020,mm:9,dd:1,h:13,m:0}, end:{yy:2020,mm:9,dd:1,h:21,m:0}},
    {start:{yy:2020,mm:9,dd:3,h:8,m:0}, end:{yy:2020,mm:9,dd:3,h:16,m:0}},
    {start:{yy:2020,mm:9,dd:5,h:16,m:0}, end:{yy:2020,mm:9,dd:6,h:0,m:0}},
    {start:{yy:2020,mm:9,dd:7,h:22,m:0}, end:{yy:2020,mm:9,dd:8,h:7,m:0}},
    {start:{yy:2020,mm:9,dd:8,h:23,m:15}, end:{yy:2020,mm:9,dd:9,h:7,m:15}},
] */

/*
    There are extra salary for different time of the day
    Base salary:
        from 7:00
        to: 16:00
    Evening:
        from 16:00
        to: 00:00
    Night:
        from: 00:00
        to 7:00
*/

// calculate different salaries in minutes and split them to basic, evening and night minutes

const hourSplitter = {base: "7:00", evening: "18:00", night: "00:00"};

//just for practice IIFE, change the shifts to other format

(function (splitter){
    let modSplit = {base:{start:"", end:""}, evening:{start:"", end:""}, night:{start:"", end:""}};
    //check if the night time starts at 00:00
    if(splitter["night"] === "00:00"){
        modSplit = {
            base:{start: splitter["base"], end: splitter["evening"]}, 
            evening:{start:splitter["evening"], end: "24:00"}, 
            night:{start:splitter["night"], end:splitter["base"]}};
    }
    else{
        modSplit = {
            base:{start: splitter["base"], end: splitter["evening"]}, 
            evening:{start:splitter["evening"], end: splitter["night"]}, 
            night:{start:splitter["night"], end:splitter["base"]}};
    }
    // hourSplitter = {base: modSplit["base"], evening: modSplit["evening"], night: modSplit["night"]}; or
    // hourSplitter = {...modSplit};
    // would not work

    // normal method would be, but mix it up to general method
/*  hourSplitter.base = modSplit["base"];
    hourSplitter.evening = modSplit["evening"];
    hourSplitter.night = modSplit["night"]; */

    Object.keys(hourSplitter).forEach(keyA => {
        let obj = {};
        for(const [key, value] of Object.entries(modSplit[keyA])){
            obj = {...obj, [key]: moment(value, format)};
           
        }
        hourSplitter[keyA] = obj;

    });
    console.log(hourSplitter);
})(hourSplitter);
// Shift start, shift end, period start, period end
const calcPeriodHours = (ss, se, ps, pe) => {

     //calculate time in periods
    //the possible options: 
    //start and end more or less-> return 0, 
    //start between end out -> return period-end minus start
    //start out, end between -> return end minus period start
    //start before end after -> return period end minus period start
    //problem is if it starts before 00:00 -> exception
    const hour = 3600000;

    if(se <= ss){

    // start more the period end and end less than period start
    if(ss >= pe && se <= ps) return 0;
    //start in period and end outside 
    if(ss.isBetween(ps, pe, undefined, '[)') && se <= ps) return (pe-ss)/hour;
    //end in period and start outside 
    if(se.isBetween(ps, pe, undefined, '(]') && ss >= pe) return (se-ps)/hour;
    // start and end between
    if(ss.isBetween(ps, pe, undefined, '()') && se.isBetween(ps, pe, undefined, '()')) return (se-ss + pe-se)/hour;
    // else if none of them, eg. day change and long shifts
    else return (pe-ps)/hour;
       
    }
    
    // start and end less than period start
    if(ss < ps && se <= ps) return 0;
    // start and end more than period end
    if(ss >= pe && se > pe) return 0;
    //start in period and end outside 
    if(ss.isBetween(ps, pe, undefined, '[)') && se >= pe) return (pe-ss)/hour;
    //end in period and start outside 
    if(se.isBetween(ps, pe, undefined, '(]') && ss <= ps) return (se-ps)/hour;
    // start and end between
    if(ss.isBetween(ps, pe, undefined, '()') && se.isBetween(ps, pe, undefined, '()')) return (se-ss)/hour;
    // else if none of them, eg. day change and long shifts
    else return (pe-ps)/hour;
}

const splitShift = (shift, {base: b, evening: e, night: n}) => {


    let base = calcPeriodHours(shift.startTime, shift.endTime, b.start, b.end );
    let evening = calcPeriodHours(shift.startTime, shift.endTime ,e.start, e.end );
    let night = calcPeriodHours(shift.startTime, shift.endTime ,n.start, n.end );

    //console.log(`Base: ${base}, evening: ${evening}, night: ${night}`);

    return {base, evening, night};

   
//test1

//let t = {ss: moment("10:00", format), se: moment("19:00", format), ps: moment("7:00", format), pe: moment("18:00", format)}
/* for(let a = 0; a <= 24; a++){

   

    let ss = moment(`${a}:00`, format);
    let se = moment(`07:00`, format);
    console.log(`Start: ${a}:00, end: 07:00`);
    let base = calcPeriodHours(ss, se, b.start, b.end );
    let evening = calcPeriodHours(ss, se,e.start, e.end );
    let night = calcPeriodHours(ss, se,n.start, n.end );
    
    /*     let base = calcPeriodHours(shift.startTime, shift.endTime,b.start, b.end );
    let evening = calcPeriodHours(shift.startTime, shift.endTime,e.start, e.end );
    let night = calcPeriodHours(shift.startTime, shift.endTime,n.start, n.end ); 
    
    console.log(`Base: ${base}, evening: ${evening}, night: ${night}`);
} */



//test2
  /*   for (let a = 0; a <= 24; a++){
        let test= moment(`${a}:00`, format);
        console.log(test._i);

        if(test.isBetween(b.start, b.end, undefined, '[)')){
            console.log(`${test._i} is between ${b.start._i} and ${b.end._i}`);
        }
        else if(test.isBetween(e.start, e.end, undefined, '[)')){
            console.log(`${test._i} is between ${e.start._i} and ${e.end._i}`);
        }
        else if(test.isBetween(n.start, n.end, undefined, '[)')){
            console.log(`${test._i} is between ${n.start._i} and ${n.end._i}`);
        }
        else console.log("No match");
        
    } */
/*     const x = moment("13:30", format)
    console.log((x-b.start)/3600000); */
}




export default function calculator (schedule, salary, tax){

let result = [];

schedule.forEach(shift => {

    const sh = new Shift(shift);
    
    const shiftStartDate = sh.startDate;
    let shiftHours = splitShift(sh, hourSplitter);
    
    let sumSalary = {gross: 0, net: 0};
    let sumHours = 0;
    let salaryByPeriod = {};
    
    Object.keys(shiftHours).forEach(key => {
        sumSalary.gross += shiftHours[key]*salary[key];
        sumSalary.net += shiftHours[key]*salary[key]*(1-tax);
        sumHours += shiftHours[key];
        salaryByPeriod = {...salaryByPeriod, [key]:{gross: shiftHours[key]*salary[key], net: shiftHours[key]*salary[key]*(1-tax)}};
    } );
    
    let resultObj = {date: shiftStartDate, periodHours: shiftHours, workHours: sumHours, periodSalary: salaryByPeriod, salary: sumSalary};

    result = [...result, resultObj];
})
    return result;

}