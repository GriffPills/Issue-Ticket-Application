/**
 * Created by Griffin Pilz on 10/09/17.
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
        this.ticketarray1 = ko.observableArray([]);
        this.ticketarray2 = ko.observableArray([]);
        this.ticketarray3 = ko.observableArray([]);

        this.showCustomers = ko.observable(true);
        this.showEmployees = ko.observable(false);
        this.showIssues = ko.observable(false);
        this.amIactive1 = ko.observable('active');
        this.amIactive2 = ko.observable('');
        this.amIactive3 = ko.observable('');

        this.getData1();
        this.getData2();
        this.getData3();

        this.context.eventManager.subscribe(() =>{
            this.getData1();
        },this, "reload customer");

        this.context.eventManager.subscribe(() =>{
            this.getData2();
        },this, "reload worker");

        this.context.eventManager.subscribe(() =>{
            this.getData3();
        },this, "reload issue");

    }

    removeclass() {
        this.amIactive1('');
        this.amIactive2('');
        this.amIactive3('');
    }

    wantsCustomers() {
        this.showEmployees(false);
        this.showIssues(false);
        this.showCustomers(true);
        this.removeclass();
        this.amIactive1('active');

    }

    wantsEmployees() {
        this.showEmployees(true);
        this.showIssues(false);
        this.showCustomers(false);
        this.removeclass();
        this.amIactive2('active');

    }

    wantsIssues() {
        this.showEmployees(false);
        this.showIssues(true);
        this.showCustomers(false);
        this.removeclass();
        this.amIactive3('active');
    }

    getData3() {

        this.ticketarray3([]);

        let url = context.apiUrl + '/issues';

        axios({
            url: url,
            method: 'get',
            headers: this.context.apiType
        }).then((response) => {
            this.handleGetData3(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });

    }

    getData2() {

        this.ticketarray2([]);

        let url = context.apiUrl + '/employees';

        axios({
            url: url,
            method: 'get',
            headers: this.context.apiType
        }).then((response) => {
            this.handleGetData2(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
    }

    getData1() {

        this.ticketarray1([]);

        let url = context.apiUrl + '/customers';

        axios({
            url: url,
            method: 'get',
            headers: this.context.apiType
        }).then((response) => {
            this.handleGetData1(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
    }

    modalPop(item, event) {
            $('#myModal').modal('show');
        context.eventManager.notifySubscribers(item,"QueryEvent");
    }

    modalPop2(item, event) {
        $('#myModal2').modal('show');
        context.eventManager.notifySubscribers(item,"QueryEvent2");
    }

    modalPop3(item, event) {
        $('#myModal3').modal('show');
        context.eventManager.notifySubscribers(item,"QueryEvent3");
    }

    modalPop4(item, event) {
        $('#myModal4').modal('show');
        context.eventManager.notifySubscribers(item,"QueryEvent4");
    }

    handleGetData1(data) {

        this.ticketarray1(data);

        }

    handleGetData2(data) {

        this.ticketarray2(data);

    }

    handleGetData3(data) {

        this.ticketarray3(data);

    }

}

export default { viewModel: queryPageModel, template: require('!raw-loader!./queryPage.html') };
