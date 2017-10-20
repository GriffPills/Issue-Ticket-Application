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
        this.visible = ko.observable(true);

        this.title = ko.observable();
        this.formHeader(params.day);
    }

    formHeader(day) {
        let date = moment();
        console.log(moment().add(day, 'd').format('ddd MM/DD'));
        this.title(moment().add(day, 'd').format('ddd MM/DD'));
    }

}

export default { viewModel: headerModel, template: require('!raw-loader!./day.html') };