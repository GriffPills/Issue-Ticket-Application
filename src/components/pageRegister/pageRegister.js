/**
 * Created by Griffin Pilz on 10/09/17.
 */

"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import axios from 'axios';

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
        this.hassucFN = ko.observable('');
        this.hassucLN = ko.observable('');
        this.hassucPW = ko.observable('');
        this.hassucEM = ko.observable('');
        this.hassucCO = ko.observable('');
        this.hassucPN = ko.observable('');
        this.hassuccglypFN = ko.observable(false);
        this.hasfailglypFN = ko.observable(false);
        this.hassuccglypLN = ko.observable(false);
        this.hasfailglypLN = ko.observable(false);
        this.hassuccglypEM = ko.observable(false);
        this.hasfailglypEM = ko.observable(false);
        this.hassuccglypPW = ko.observable(false);
        this.hasfailglypPW = ko.observable(false);
        this.hassuccglypCO = ko.observable(false);
        this.hasfailglypCO = ko.observable(false);
        this.hassuccglypPN = ko.observable(false);
        this.hasfailglypPN = ko.observable(false);
    }

    handleValidation() {
        let checkTF = true;

        if (this.checkFirstName() === false) {
            checkTF = false;
        }

        if (this.checkLastName() === false) {
            checkTF = false;
        }

        if (this.checkPassword() === false) {
            checkTF = false;
        }

        if (this.checkEmail() === false) {
            checkTF = false;
        }

        if (this.checkPhoneNumber() === false) {
            checkTF = false;
        }

        if (this.checkCompany() === false) {
            checkTF = false;
        }

        if (checkTF === true){
            this.postCustomerUpdate();
            this.handleBackToLogin();
        } else {
            console.log("False");
        }

        return checkTF;
    }

    checkFirstName() {
        let myRE = /^[a-z0-9]+$/i;

        if (myRE.test(this.firstname())) {
            this.hassucFN('has-success');
            this.hassuccglypFN(true);
            this.hasfailglypFN(false);
            return true;
        } else {
            $('.flashThisFN').animateCss('bounceIn');
            this.hassucFN('has-error');
            this.hasfailglypFN(true);
            this.hassuccglypFN(false);
            return false;
        }
    }

    checkLastName() {
        let myREX = /^[a-z0-9]+$/i;

        if (myREX.test(this.lastname())) {
            this.hassucLN('has-success');
            this.hasfailglypLN(false);
            this.hassuccglypLN(true);
            return true;
        } else {
            $('.flashThisLN').animateCss('bounceIn');
            this.hassucLN('has-error');
            this.hassuccglypLN(false);
            this.hasfailglypLN(true);
            return false;
        }
    }

    checkPassword() {
        let strongRegex = new RegExp("^(?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])");

        if (strongRegex.test(this.password())) {
            this.hassucPW('has-success');
            this.hasfailglypPW(false);
            this.hassuccglypPW(true);
            return true;
        } else {
            $('.flashThisPW').animateCss('bounceIn');
            this.hassucPW('has-error');
            this.hassuccglypPW(false);
            this.hasfailglypPW(true);
            return false;
        }
    }

    checkEmail() {
        let myREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (myREG.test(this.email())) {
            this.hassucEM('has-success');
            this.hassuccglypEM(true);
            this.hasfailglypEM(false);
            return true;
        } else {
            $('.flashThisEM').animateCss('bounceIn');
            this.hassucEM('has-error');
            this.hasfailglypEM(true);
            this.hassuccglypEM(false);
            return false;
        }
    }

    checkPhoneNumber() {
        let phonenum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if(phonenum.test(this.phonenumber())) {
            this.hassucPN('has-success');
            this.hassuccglypPN(true);
            this.hasfailglypPN(false);
            return true;
        } else {
            $('.flashThisPN').animateCss('bounceIn');
            this.hassucPN('has-error');
            this.hassuccglypPN(false);
            this.hasfailglypPN(true);
            return false;
        }
    }

    checkCompany() {
        if (this.company().length > 0) {
            this.hassucCO('has-success');
            this.hassuccglypCO(true);
            this.hasfailglypCO(false);
            return true;
        } else {
            $('.flashThisCO').animateCss('bounceIn');
            this.hassucCO('has-error');
            this.hasfailglypCO(true);
            this.hassuccglypCO(false);
            return false;
        }
    }


    handleBackToLogin() {
        this.context.showregistration(false);
        this.context.showlogin(true);
    }

    postCustomerUpdate() {

        let url = context.apiUrl + '/customerUpdate';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"UserID": 0, "email": this.email(), "Password": this.password(), "First_Name": this.firstname(), "Last_Name": this.lastname(), "Admin": 0, "School_or_Company": this.company(), "Phone_Number": this.phonenumber(), "Valid": 1}
        }).then((response) => {
            console.log(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
    }

}

export default { viewModel: pageRegisterModel, template: require('!raw-loader!./pageRegister.html') };