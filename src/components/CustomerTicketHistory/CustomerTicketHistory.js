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
        this.componentName = ko.observable("customertickethistory");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showCustomerTicketHistory;

    }

}

export default { viewModel: headerModel, template: require('!raw-loader!./CustomerTicketHistory.html') };