/**
 * Created by Griffin Pilz on 10/09/17.
 */

import ko from 'knockout';
import utils from './utils';


class contextModel {

    constructor(params) {
        this.name = "app name";
        this.util = utils;
        this.id = ko.observable(this.util.guid());
        this.location = ko.observable("n/a");
        this.paramObj = ko.observable();
        this.debug = ko.observable(false);
        this.userObj = ko.observable("");

        //Registration Page
        this.showregistration = ko.observable(false);

        //issue history display for modal
        this.showissueHistoryBox = ko.observable(false);

        //customer ticket history
        this.showCustomerTicketHistory = ko.observable(false);

        //Calendar page
        this.showcalendar = ko.observable(false);

        //customer router
        this.showRouter = ko.observable(false);

        // Login page
        this.showlogin = ko.observable(true);

        //Issue Ticket Page
        this.showticketpage = ko.observable(false);

        //thank you page
        this.showthankyoupage = ko.observable(false);

        //query page
        this.showquerypage = ko.observable(false);

        //modal view customer
        this.showheader = ko.observable(true);

        //modal view worker
        this.showheader2 = ko.observable(true);

        //modal view issue
        this.showheader3 = ko.observable(true);

        //day view
        this.showDayComponent = ko.observable(true);

        // Event manager
        this.eventManager = new ko.subscribable();

        // Get API Entry Point
        if(window.location.hostname.indexOf("localhost") != -1)
        {
            //development
            this.apiUrl = 'http://localhost:8000/api/company';
        }
        else
        {
            this.apiUrl = 'http://api.company.com';
        }

        this.apiContentType = {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
        this.apiType = {'Content-type': 'application/json; charset=utf-8'};
    }


}

export let  context = new contextModel();