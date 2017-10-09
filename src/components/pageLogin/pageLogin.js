/**
 * Created by Griffin Pilz on 10/09/17.
 */

"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import axios from 'axios';

class pageLoginModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("pageLogin");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showlogin;
        this.ticketarray = ko.observableArray([]);

        this.password = ko.observable("");
        this.username = ko.observable("");
        this.incorrectpassword = ko.observable(false);
        this.incorrectusername = ko.observable(false);
        this.loginmodalclass = ko.observable("");

        this.getAuthData();

    }


    handleRegistration() {
        this.context.showregistration(true);
        this.visible(false);
    }

    handleTicketPage() {
        this.visible(false);
        this.context.showticketpage(true);
    }

    handleQueryPage() {
        this.visible(false);
        this.context.showquerypage(true);
    }

    checkUserName() {

        if (this.username() === "admin" && this.password() === "thereisnone") {
            this.visible(false);
            this.context.showquerypage(true);
        } else if (this.username() === "guest" && this.password() === "guest") {
            this.visible(false);
            this.context.showticketpage(true);
        } else {
            this.incorrectusername(true);
            $('.flashThis').animateCss('bounceIn');;
        }
        }

    getAuthData() {

        this.ticketarray([]);

        let url = context.apiUrl + '/auth';

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

    }




export default { viewModel: pageLoginModel, template: require('!raw-loader!./pageLogin.html') };