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
        this.componentName = ko.observable("header2");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showheader2;

        this.WorkerID = ko.observable("");
        this.Name = ko.observable("");
        this.Email = ko.observable("");
        this.Phone = ko.observable("");
        this.Valid = ko.observable("");
        this.selectedTicket = ko.observable({WorkerID: " ", Name: " ", Email: " ", Phone: " ", Valid: " "});

        //Subscribing
        this.context.eventManager.subscribe((eventObj) =>{
            this.handleEvent(eventObj);
        },this, "QueryEvent2");

    }

    handleEvent(eventObj) {
        this.selectedTicket(eventObj);
        console.log(this.selectedTicket());
    }

    updateWorkerModal() {

        let url = context.apiUrl + '/workerModalUpdate';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"WorkerID": this.selectedTicket().WorkerID, "Name": this.selectedTicket().Name, "Email": this.selectedTicket().Email, "Phone": this.selectedTicket().Phone, "Valid": this.selectedTicket().Valid}
        }).then((response) => {
            console.log(response.data);
            context.eventManager.notifySubscribers(null,"reload worker");
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });

    }

}

export default { viewModel: headerModel, template: require('!raw-loader!./header2.html') };