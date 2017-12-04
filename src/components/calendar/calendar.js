/**
 * Created by jpilz on 2/13/17.
 */
"use strict";
import b{context} from '../../objects/context.js';
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


        this.addWeekVisible = ko.observable(true);
        this.subtractWeekVisible = ko.observable(true);

        this.showDay = ko.observableArray([{day:0}]).extend({logChange: 'showDay Update'});

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
    }


    removeclass() {
        this.amIactiveWeekly('');
        this.amIactiveDaily('');
    }


    addOneDay() {
        let onlyDay = this.showDay()[this.showDay().length - 1].day;

        this.showDay.removeAll();
        this.showDay.push({day: eval(onlyDay + 1)});
        this.showDay.valueHasMutated();
        console.log(this.showDay());
    }

    subtractOneDay() {
        let onlyDay = this.showDay()[0].day;

        this.showDay.removeAll();
        this.showDay.push({day: eval(onlyDay - 1)});
        this.showDay.valueHasMutated();
    }

    addOneWeek() {

        let maxDay = this.dayArray()[this.dayArray().length - 1].day;

        console.log("maxday: ");

        this.dayArray.removeAll();

        for(let i=1, len=6; i < len; i++)
        {
            this.dayArray.push({day: eval(maxDay + i)});
        }

        this.dayArray.valueHasMutated();
    }

    subtractOneWeek() {
        let minDay = this.dayArray()[this.dayArray().length - 4].day;


        this.dayArray.removeAll();

        for(let i=6, len=1; i > len; i--)
        {
            this.dayArray.push({day: eval(minDay - i)});
        }

        this.dayArray.valueHasMutated();
    }



}

export default { viewModel: footerModel, template: require('!raw-loader!./calendar.html') };