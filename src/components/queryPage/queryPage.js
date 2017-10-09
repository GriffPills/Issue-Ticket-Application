/**
 * Created by jpilz on 2/13/17.
 */

"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import axios from 'axios';
import $ from 'jquery';

class queryPageModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("thankYouPage");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showquerypage;
        this.ticketarray = ko.observableArray([]);

        this.wantsCustomerID = ko.observable(true);
        this.wantsFirstName = ko.observable(true);
        this.wantsEmail = ko.observable(true);
        this.wantsSchoolCompany = ko.observable(true);
        this.wantsPhone = ko.observable(true);
        this.wantsIssueNumber = ko.observable(true);
        this.wantsIssueDate = ko.observable(true);
        this.wantsIssueDescription = ko.observable(true);
        this.wantsUrgency = ko.observable(true);
        this.wantsStatus = ko.observable(true);
        this.wantsDueDate = ko.observable(true);
        this.wantsNotes = ko.observable(true);
        this.wantsAssignedTo = ko.observable(true);
        this.wantsLastName = ko.observable(true);

        this.showCustomerID = ko.observable(true);
        this.showFirstName = ko.observable(true);
        this.showEmail = ko.observable(true);
        this.showSchoolCompany = ko.observable(true);
        this.showPhone = ko.observable(true);
        this.showIssueNumber = ko.observable(true);
        this.showIssueDate = ko.observable(true);
        this.showIssueDescription = ko.observable(true);
        this.showUrgency = ko.observable(true);
        this.showStatus = ko.observable(true);
        this.showDueDate = ko.observable(true);
        this.showNotes = ko.observable(true);
        this.showAssignedTo = ko.observable(true);
        this.showLastName = ko.observable(true);

        this.getData();
    }

    handleCustomerID() {
        if (this.wantsCustomerID() === true) {
            this.showCustomerID(true);
        } else {
            this.showCustomerID(false);
        }
        if (this.wantsFirstName() === true) {
            this.showFirstName(true);
        } else {
            this.showFirstName(false);
        }
        if (this.wantsEmail() === true) {
            this.showEmail(true);
        } else {
            this.showEmail(false);
        }
        if (this.wantsSchoolCompany() === true) {
            this.showSchoolCompany(true);
        } else {
            this.showSchoolCompany(false);
        }
        if (this.wantsPhone() === true) {
            this.showPhone(true);
        } else {
            this.showPhone(false);
        }
        if (this.wantsIssueNumber() === true) {
            this.showIssueNumber(true);
        } else {
            this.showIssueNumber(false);
        }
        if (this.wantsIssueDate() === true) {
            this.showIssueDate(true);
        } else {
            this.showIssueDate(false);
        }
        if (this.wantsIssueDescription() === true) {
            this.showIssueDescription(true);
        } else {
            this.showIssueDescription(false);
        }
        if (this.wantsUrgency() === true) {
            this.showUrgency(true);
        } else {
            this.showUrgency(false);
        }
        if (this.wantsStatus() === true) {
            this.showStatus(true);
        } else {
            this.showStatus(false);
        }
        if (this.wantsDueDate() === true) {
            this.showDueDate(true);
        } else {
            this.showDueDate(false);
        }
        if (this.wantsNotes() === true) {
            this.showNotes(true);
        } else {
            this.showNotes(false);
        }
        if (this.wantsAssignedTo() === true) {
            this.showAssignedTo(true);
        } else {
            this.showAssignedTo(false);
        }
        if (this.wantsLastName() === true) {
            this.showLastName(true);
        } else {
            this.showLastName(false);
        }
    }

    getData() {

        this.ticketarray([]);

        let url = context.apiUrl + '/issues';

        axios({
            url: url,
            method: 'get',
            headers: this.context.apiType
        }).then((response) => {
            this.handleGetData(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
    }

    modalPop(item, event) {
        /*this.context.showheader(true); */
            $('#myModal').modal('show');
        context.eventManager.notifySubscribers(item,"sampleEvent");
    }

    handleGetData(data) {

        console.log(data);
        this.ticketarray(data);

    /*
            for(var i=0, len=data.length; i < len; i++)
            {
                let newItem = new customerObj(data[i]);
                this.customerArray.push(newItem);
    
                //console.log(newItem);
            }*/
        }



}

export default { viewModel: queryPageModel, template: require('!raw-loader!./queryPage.html') };
