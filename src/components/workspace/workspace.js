/**
 * Created by Griffin Pilz on 10/09/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';

class workspaceModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("workspace");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showticketpage;

        this.high = ko.observable("");
        this.medium = ko.observable("");
        this.low = ko.observable("");

    }

    handleThankYouPage() {
        this.visible(false);
        this.context.showthankyoupage(true);
        console.log("hi");
    }

}

export default { viewModel: workspaceModel, template: require('!raw-loader!./workspace.html') };
