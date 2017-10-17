import { Directive, OnInit, HostBinding } from '@angular/core';

import { Calendar } from 'primeng/primeng';

@Directive({ selector: 'p-calendar[default-config]' })
export class CalendarDefaultConfigDirective implements OnInit {

  constructor(
    private calendar: Calendar,
  ) { }

  ngOnInit() {
    this.calendar.locale = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
    };
    this.calendar.dateFormat = 'dd/mm/yy';
    this.calendar.readonlyInput = true;
    this.calendar.showIcon = true;
  }
}
