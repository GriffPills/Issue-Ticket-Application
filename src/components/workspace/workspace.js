/**
 * Created by Griffin Pilz on 10/09/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import moment from 'moment';

class workspaceModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("workspace");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showticketpage;

        this.radioSelected = ko.observable("3");

    }

    handleThankYouPage() {
        this.visible(false);
        this.context.showthankyoupage(true);
    }

    makeDateTime() {
        let datetime = moment().format('YYYY-D-05 h:mm:ss');
        console.log(datetime);
        this.makeDueDateTime();
    }

    makeDueDateTime() {
        let duedatetime = moment().format('YYYY-D-05 h:mm:ss');
        console.log(duedatetime);

        console.log(this.radioSelected());

    }

}

export default { viewModel: workspaceModel, template: require('!raw-loader!./workspace.html') };
