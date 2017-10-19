/**
 * Created by jpilz on 2/13/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import axios from 'axios';

class footerModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("calendar");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showcalendar;

    }

}

export default { viewModel: footerModel, template: require('!raw-loader!./calendar.html') };