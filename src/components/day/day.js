/**
 * Created by Griffin Pilz on 10/09/17.
 */

"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

class headerModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("day");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showDayComponent;

        this.title = ko.observable();

        this.dayNumeric = params.day;
        this.formHeader(params.day);

        this.ticketarrayIssues = ko.observableArray([]);

        this.getDayIssues();
    }

    formHeader(day) {
        let date = moment();
        console.log(moment().add(day, 'd').format('ddd MM/DD'));
        this.title(moment().add(day, 'd').format('ddd MM/DD'));
    }

    getDayIssues() {
        console.log("Day Numeric");
        console.log(this.dayNumeric);
        this.ticketarrayIssues([]);

        let url = context.apiUrl + '/dayIssues';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"day": this.dayNumeric}
        }).then((response) => {
            this.handleGetDayIssues(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
    }

    handleGetDayIssues(data) {

        this.ticketarrayIssues(data);

    }

}

export default { viewModel: headerModel, template: require('!raw-loader!./day.html') };