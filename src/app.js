/**
 * Created by Griffin Pilz on 10/09/17.
 */
import $ from 'jquery';
import 'babel-polyfill';
import ko from 'knockout';
import 'bootstrap';

// Css Imports
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import 'animate.css/animate.min.css';
import 'font-awesome/css/font-awesome.css';

ko.components.register('app-header', require('./components/header/header').default);
ko.components.register('app-workspace', require('./components/workspace/workspace').default);
ko.components.register('app-calendar', require('./components/calendar/calendar').default);

// Add Additional Components here
ko.components.register('pagelogin', require('./components/pageLogin/pageLogin').default);
ko.components.register('pageregister', require('./components/pageRegister/pageRegister').default);
ko.components.register('thankyoupage', require('./components/thankYouPage/thankYouPage').default);
ko.components.register('querypage', require('./components/queryPage/queryPage').default);
ko.components.register('header2', require('./components/header2/header2').default);
ko.components.register('header3', require('./components/header3/header3').default);
ko.components.register('header4', require('./components/header4/header4').default);
ko.components.register('calendar', require('./components/calendar/calendar').default);

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

$(document).ready(function(){
    ko.applyBindings({});
});

