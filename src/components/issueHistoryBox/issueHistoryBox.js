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
        this.componentName = ko.observable("issuehistorybox");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = ko.observable(true);

        this.Issue_Number = ko.observable('');
        this.Notes = params.data.Notes;
        this.Date_Added = params.data.Date_Added;

        console.log("Issue History Box 1");
        console.log(params);
        console.log("Issue History Box 2");


    }


}

export default { viewModel: headerModel, template: require('!raw-loader!./issueHistoryBox.html') };