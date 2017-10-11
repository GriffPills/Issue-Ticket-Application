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

        //variables
        this.password = ko.observable("");
        this.username = ko.observable("");
        this.incorrectpassword = ko.observable(false);
        this.incorrectusername = ko.observable(false);
        this.loginmodalclass = ko.observable("");

    }

    //shows registration page and hides login
    handleRegistration() {
        this.context.showregistration(true);
        this.visible(false);
    }

    //post authorization data to node.js. If matches a response, send to handleGetData
    getAuthData() {

        let url = context.apiUrl + '/auth';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"email": this.username(), "Password": this.password()}
        }).then((response) => {
            this.handleGetData(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
    }

    //checks if the status is undefined
    handleGetData(data) {

        if (typeof data.status !== undefined) {
            console.log(data);
            this.handleCheckValidity(data);
        } else {
            this.incorrectusername(true);
            $('.flashThis').animateCss('bounceIn');
            console.log("undefined");
        }
    }

    //checks if the status is valid or invalid. This is set in the DB
    handleCheckValidity(data) {
        if (data.status === "Invalid") {
            this.incorrectusername(true);
            $('.flashThis').animateCss('bounceIn');
            console.log("invalid");
        } else {
            console.log(data);
            this.handleCheckAdmin(data[0]);
        }
    }

    //checks for Admin Boolean. Admin go to query. Customer go to ticket page
    handleCheckAdmin(data) {
        if (data.Admin === 1){
            this.visible(false);
            this.context.showquerypage(true);
            console.log("Admin");
        } else {
            this.visible(false);
            this.context.showticketpage(true);
            console.log("Not an Admin");
            console.log(data)
        }
    }

    }


export default { viewModel: pageLoginModel, template: require('!raw-loader!./pageLogin.html') };