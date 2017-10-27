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
        this.componentName = ko.observable("header3");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showheader3;

        this.Issue_Number = ko.observable("");
        this.User_ID = ko.observable("");
        this.Issue_Description = ko.observable("");
        this.Issue_Date = ko.observable("");
        this.Issue_Due_Date = ko.observable("");
        this.Urgency = ko.observable("");
        this.Status = ko.observable("");
        this.School_or_Company = ko.observable("");
        this.Current_Assignment = ko.observable("");
        this.selectedTicket = ko.observable({Issue_Number: " ", User_ID: " ", School_or_Company: " ", Issue_Description: " ", Issue_Date: " ", Issue_Due_Date: " ", Urgency: " ", Status: " ", Current_Assignment: " "});

        this.issueHistoryArray = ko.observableArray([]);

        //Subscribing
        this.context.eventManager.subscribe((eventObj) =>{
            this.handleEvent(eventObj);
        },this, "QueryEvent3");

    }

    handleEvent(eventObj) {
        this.selectedTicket(eventObj);
        console.log(this.selectedTicket());
        this.getHistory();
    }

    updateCustomerModal() {

        let url = context.apiUrl + '/issueModalUpdate';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"Issue_Number": this.selectedTicket().Issue_Number, "User_ID": this.selectedTicket().User_ID, "School_or_Company": this.selectedTicket().School_or_Company, "Issue_Description": this.selectedTicket().Issue_Description, "Issue_Date": this.selectedTicket().Issue_Date, "Issue_Due_Date": this.selectedTicket().Issue_Due_Date, "Urgency": this.selectedTicket().Urgency, "Status": this.selectedTicket().Status, "Current_Assignment": this.selectedTicket().Current_Assignment}
        }).then((response) => {
            console.log(response.data);
            context.eventManager.notifySubscribers(null,"reload issue");
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });

    }

    getHistory() {

        let url = context.apiUrl + '/issuesHistoryget';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"Issue_Number": this.selectedTicket().Issue_Number}
        }).then((response) => {
            console.log("Issue History Get");
            console.log(response.data);
            this.issueHistoryArray(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });

    }


}

export default { viewModel: headerModel, template: require('!raw-loader!./header3.html') };