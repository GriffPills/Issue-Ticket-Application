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
        this.visible = context.showRouter;

    }

    showTicket() {
        this.visible(false);
        this.context.showticketpage(true);
    }

    showTicketHistory() {
        this.visible(false);
        this.context.showCustomerTicketHistory(true);
    }

}

export default { viewModel: headerModel, template: require('!raw-loader!./router.html') };