import { Directive } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
@Directive({})
export class CommonComponent {
  localNgUnsubscribe: Subject<void> = new Subject<void>();

  canDeactivate(): Observable<boolean> {
    return of(true);
  }

  ngOnDestroy(): void {
    this.localNgUnsubscribe.next();
    this.localNgUnsubscribe.complete();
  }
}

//QA TakeUntil and common component
// Da ne bi bilo situacije sa zaostalim otvorenim observablima koje neko moze da
// triggeruje I emituje vrednost. Ovim zatvaramo subjects na pravilan nacin I sprecavamo curenje memorije.

//QA ngOnDestroy se poziva kada se komponenta unisti, I ukoliko je subscribe na neki subject ostao povezan
//ovo sprecava da se na taj observale emituje jos vrednosti
