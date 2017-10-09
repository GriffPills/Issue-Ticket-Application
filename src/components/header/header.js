/**
 * Created by Griffin Pilz on 10/09/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';

class headerModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("header");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showheader;

        this.User_ID = ko.observable("");
        this.Due_Date = ko.observable("");
        this.First_Name = ko.observable("");
        this.Issue_Date = ko.observable("");
        this.Issue_Description = ko.observable("");
        this.Current_Assignment = ko.observable("");
        this.Notes = ko.observable("");
        this.Last_Name = ko.observable("");
        this.Issue_Number = ko.observable("");
        this.Phone_Number = ko.observable("");
        this.School_or_Company = ko.observable("");
        this.Status = ko.observable("");
        this.Urgency = ko.observable("");
        this.email = ko.observable("");
        this.selectedTicket = ko.observable({Current_Assignment: " ", Due_Date: " ", First_Name: " ", Issue_Date: " ", Issue_Description: " ", Issue_Number: 0, Last_Name: " ", Notes: " ", Phone_Number: " ", School_or_Company: " ", Status: " ", Urgency: 0, User_ID: 0, email: " "
        });

        //Subscribing
        this.context.eventManager.subscribe((eventObj) =>{
            this.handleEvent(eventObj);
        },this, "sampleEvent");

    }

    handleEvent(eventObj) {
        this.selectedTicket(eventObj);
        console.log(this.selectedTicket());
    }


}

export default { viewModel: headerModel, template: require('!raw-loader!./header.html') };