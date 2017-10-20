/**
 * Created by jpilz on 2/13/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

class footerModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("calendar");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showcalendar;

        this.amIactiveWeekly = ko.observable('active');
        this.amIactiveDaily = ko.observable('');

        this.showWeeklyCalendar = ko.observable(true);
        this.showDailyCalendar = ko.observable(false);

        this.showDay = ko.observable(1);

        this.dayArray = ko.observableArray([]).extend({logChange: 'Day Array Update'});

        console.log(this.dayArray());

        this.init();
    }

    init() {

        this.dayArray.push({day:0});
        this.dayArray.push({day:1});
        this.dayArray.push({day:2});
        this.dayArray.push({day:3});
        this.dayArray.push({day:4});
        this.dayArray.push({day:5});
        this.dayArray.push({day:6});
    }


    removeclass() {
        this.amIactiveWeekly('');
        this.amIactiveDaily('');
    }

    wantsWeekly() {
        this.removeclass();
        this.amIactiveWeekly('active');
        this.showWeeklyCalendar(true);
        this.showDailyCalendar(false);
    }

    wantsDaily() {
        this.removeclass();
        this.amIactiveDaily('active');
        this.showWeeklyCalendar(false);
        this.showDailyCalendar(true);
    }


    addOneDay() {
        if (this.showDay() !== 7) {
            this.showDay(this.showDay() + 1);
            console.log(this.showDay);
        }
    }

    subtractOneDay() {
        if (this.showDay() !== 0) {
            this.showDay(this.showDay() - 1);
            console.log(this.showDay);
        }
    }

    addOneWeek() {

        let maxDay = this.dayArray()[this.dayArray().length - 1].day;

        console.log("maxday: ");
        console.log(maxDay);

        this.dayArray.removeAll();

        for(let i=1, len=8; i < len; i++)
        {
            this.dayArray.push({day: eval(maxDay + i)});
        }

        this.dayArray.valueHasMutated();
    }

    subtractOneWeek() {
        let minDay = this.dayArray()[this.dayArray().length - 6].day;

        console.log("minday: ");
        console.log(minDay);

        this.dayArray.removeAll();

        for(let i=8, len=1; i > len; i--)
        {
            this.dayArray.push({day: eval(minDay - i)});
        }

        this.dayArray.valueHasMutated();
    }



}

export default { viewModel: footerModel, template: require('!raw-loader!./calendar.html') };