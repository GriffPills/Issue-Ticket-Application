/**
 * Created by Griffin Pilz on 10/09/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import axios from 'axios';

class headerModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("header4");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showheader4;

        this.Issue_Number = ko.observable("");
        this.WorkerID = ko.observable("");
        this.Resolved_Date = ko.observable("");
        this.Due_Date = ko.observable("");
        this.Notes = ko.observable("");
        this.selectedTicket = ko.observable({Issue_Number: " ", WorkerID: " ", Resolved_Date: " ", Due_Date: " ", Notes: " "});

        //Subscribing
        this.context.eventManager.subscribe((eventObj) =>{
            this.handleEvent(eventObj);
        },this, "QueryEvent4");

    }

    handleEvent(eventObj) {
        this.selectedTicket(eventObj);
        console.log(this.selectedTicket());
    }

    updateIssueHistory() {

        let url = context.apiUrl + '/issueHistoryModalUpdate';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"Issue_Number": this.selectedTicket().Issue_Number, "WorkerID": this.selectedTicket().WorkerID, "Resolved_Date": this.selectedTicket().Resolved_Date, "Due_Date": this.selectedTicket().Due_Date, "Notes": this.selectedTicket().Notes}
        }).then((response) => {
            console.log(response.data);
            context.eventManager.notifySubscribers(null,"reload issueHistory");
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });

    }


}

export default { viewModel: headerModel, template: require('!raw-loader!./header4.html') };