import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BodyComponent } from './body/body.component';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { PanelNavigationComponentComponent } from './panel-navigation-component/panel-navigation-component.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ProgressBarGraphComponent } from './progress-bar-graph/progress-bar-graph.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    NavigationComponent, HeaderComponent, SubHeaderComponent, BodyComponent,
    PanelBodyComponent, PanelNavigationComponentComponent, ProgressBarGraphComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PerfectScrollbarModule,
    MatExpansionModule,
    MatMenuModule,
    TranslateModule.forChild(),
    NgxSmartModalModule.forChild()
  ],
  exports: [
    NavigationComponent, HeaderComponent, SubHeaderComponent, BodyComponent,
    PanelBodyComponent, PanelNavigationComponentComponent, ProgressBarGraphComponent
  ]
})
export class SharedModule { }
