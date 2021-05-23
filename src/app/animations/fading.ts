import { animate, state, style, transition, trigger } from '@angular/animations';

export const fading=trigger('fade',[
  state('void',style({
    opacity:0,

  })),
  transition('void <=> *' ,  animate(500)),
]);

