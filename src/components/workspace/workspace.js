/**
 * Created by Griffin Pilz on 10/09/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';
import $ from 'jquery';
import moment from 'moment';
import axios from 'axios';


class workspaceModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("workspace");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showticketpage;

        this.radioSelected = ko.observable("3");
        this.datetime = moment().format('YYYY-MM-DD kk:mm:ss');
        this.duedatetime = moment().format('YYYY-MM-DD kk:mm:ss');
        this.issuedescription = ko.observable("");
        this.hassucID = ko.observable('');
    }

    handleValidation() {
        let checkTF = true;

        if (this.checkIssueDescription() === false) {
            checkTF = false;
        }
        if (checkTF === true){
            this.duedatetime = moment().add(this.radioSelected(), 'days').format('YYYY-MM-DD kk:mm:ss');
            this.postTicketInsert();
        } else {
            console.log("False");
        }

        return checkTF;
    }

    checkIssueDescription() {
        if (this.issuedescription().length > 0) {
            this.hassucID('has-success');
            return true;
        } else {
            $('.flashThisID').animateCss('bounceIn');
            this.hassucID('has-error');
            return false;
        }
    }

    postTicketInsert() {

        let url = context.apiUrl + '/ticketInsert';

        axios({
            url: url,
            method: 'post',
            headers: this.context.apiType,
            data: {"Issue_Number": 0, "Issue_Date": this.datetime, "User_ID": this.context.userObj().UserID, "School_or_Company": this.context.userObj().School_or_Company, "Issue_Due_Date": this.duedatetime, "Issue_Description": this.issuedescription(), "Urgency": this.radioSelected(), "Status": "1", "Current_Assignment": 0}
        }).then((response) => {
            console.log(response.data);
        }).catch((error) =>{
            console.log("customerTable: getData Error");
            console.log(error);
        });
        this.visible(false);
        this.context.showthankyoupage(true);
    }

}

export default { viewModel: workspaceModel, template: require('!raw-loader!./workspace.html') };
