import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [NavigationComponent, HeaderComponent, SubHeaderComponent, BodyComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavigationComponent, HeaderComponent, SubHeaderComponent]
})
export class SharedModule { }
