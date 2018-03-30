import { Injectable } from '@angular/core';
import { BlockScrollStrategy, GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable()
export class PopupService {
  constructor(private overlay: Overlay) { }

  open<T = any>(component: ComponentType<T>) {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const scrollStrategy = this.overlay.scrollStrategies.block();

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'popup-backdrop',
      width: 400,
      height: 400,
    });

    const componentPortal = new ComponentPortal<T>(component);

    overlayRef.attach(componentPortal);

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

    // call overlayRef.dispose() to close
    return overlayRef;
  }
}
