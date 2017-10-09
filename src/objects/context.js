/**
 * Created by jpilz on 2/13/17.
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

        //Registration Page
        this.showregistration = ko.observable(false);

        // Login page
        this.showlogin = ko.observable(true);

        //Issue Ticket Page
        this.showticketpage = ko.observable(false);

        //thank you page
        this.showthankyoupage = ko.observable(false);

        //query page
        this.showquerypage = ko.observable(false);

        //modal view
        this.showheader = ko.observable(true);

        // Event manager
        this.eventManager = new ko.subscribable();

        // Get API Entry Point
        if(window.location.hostname.indexOf("localhost") != -1)
        {
            //development
            this.apiUrl = 'http://localhost:8000/api/atlantic';
        }
        else
        {
            this.apiUrl = 'http://api.atlantic.com';
        }

        this.apiContentType = {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
        this.apiType = {'Content-type': 'application/json; charset=utf-8'};
    }
}

export let  context = new contextModel();