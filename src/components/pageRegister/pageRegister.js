/**
 * Created by jpilz on 2/13/17.
 */

"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';

class pageRegisterModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("pageRegister");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showregistration;

        this.password = ko.observable("");
        this.username = ko.observable("");
        this.firstname = ko.observable("");
        this.phonenumber = ko.observable("");
        this.company = ko.observable("");
        this.email = ko.observable("");
        this.lastname = ko.observable("");
        this.passwordinput = ko.observable("");

    }


    handleBackToLogin() {
        this.context.showregistration(false);
        this.context.showlogin(true);
    }

}

export default { viewModel: pageRegisterModel, template: require('!raw-loader!./pageRegister.html') };