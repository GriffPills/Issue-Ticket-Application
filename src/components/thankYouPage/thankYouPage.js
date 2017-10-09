/**
 * Created by Griffin Pilz on 10/09/17.
 */
"use strict";
import {context} from '../../objects/context.js';
import ko from 'knockout';

class thankYouPageModel {

    constructor(params) {
        // Profile
        this.componentName = ko.observable("thankYouPage");
        this.context = context;
        this.id = this.context.util.guid();
        this.visible = context.showthankyoupage;

    }


}

export default { viewModel: thankYouPageModel, template: require('!raw-loader!./thankYouPage.html') };
