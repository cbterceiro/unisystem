"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CalendarDefaultConfigDirective = (function () {
    function CalendarDefaultConfigDirective(calendar) {
        this.calendar = calendar;
    }
    CalendarDefaultConfigDirective.prototype.ngOnInit = function () {
        this.calendar.locale = {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
            clear: 'Limpar',
            today: 'Hoje'
        };
        this.calendar.dateFormat = 'dd/mm/yy';
        this.calendar.readonlyInput = true;
        this.calendar.showIcon = true;
    };
    return CalendarDefaultConfigDirective;
}());
CalendarDefaultConfigDirective = __decorate([
    core_1.Directive({ selector: 'p-calendar[default-config]' })
], CalendarDefaultConfigDirective);
exports.CalendarDefaultConfigDirective = CalendarDefaultConfigDirective;
