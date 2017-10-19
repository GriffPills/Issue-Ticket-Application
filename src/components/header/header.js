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
        this.componentName = ko.observable("header");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showheader;

        this.UserID = ko.observable("");
        this.First_Name = ko.observable("");
        this.Last_Name = ko.observable("");
        this.Phone_Number = ko.observable("");
        this.School_or_Company = ko.observable("");
        this.email = ko.observable("");
        this.selectedTicket = ko.observable({UserID: " ", First_Name: " ", Last_Name: " ", Phone_Number: " ", School_or_Company: " ", email: " ", Valid: " "});

        //Subscribing
        this.context.eventManager.subscribe((eventObj) =>{
            this.handleEvent(eventObj);
        },this, "QueryEvent");

    }

    handleEvent(eventObj) {
        this.selectedTicket(eventObj);
        console.log(this.selectedTicket());
    }

    updateCustomerModal() {

        let url = context.apiUrl + '/customerModalUpdate';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"UserID": this.selectedTicket().UserID, "First_Name": this.selectedTicket().First_Name, "Last_Name": this.selectedTicket().Last_Name, "Phone_Number": this.selectedTicket().Phone_Number, "School_or_Company": this.selectedTicket().School_or_Company, "email": this.selectedTicket().email, "Valid": this.selectedTicket().Valid}
        }).then((response) => {
            console.log(response.data);
            context.eventManager.notifySubscribers(null,"reload customer");
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });


    }

}

export default { viewModel: headerModel, template: require('!raw-loader!./header.html') };