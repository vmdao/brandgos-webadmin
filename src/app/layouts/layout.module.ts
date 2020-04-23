import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUIModule } from '../app-ui.module';
import { RouterModule } from '@angular/router';
import { LayoutDefaultSidebarComponent } from './default/sidebar/sidebar.component';
import { LayoutDefaultHeaderComponent } from './default/header/header.component';
import { MUserComponent } from './default/@components/m-user/m-user.component';
import { LayoutProWidgetUserComponent } from './default/@components/user/user.component';
import { MHeaderTaskComponent } from './default/@components/m-task/m-task.component';
import { LayoutProLogoComponent } from './default/@components/logo/logo.component';
import { LayoutProFooterComponent } from './default/@components/footer/footer.component';
import { LayoutProHeaderComponent } from './default/@components/header/header.component';
import { LayoutProMenuComponent } from './default/@components/menu/menu.component';
import { ProPageHeaderWrapperComponent } from './default/@components/page-header-wrapper/page-header-wrapper.component';
import { ProPageGridComponent } from './default/@components/page-grid/page-grid.component';
import { LayoutProHeaderWidgetComponent } from './default/@components/widget/widget.component';
import { ProSettingDrawerComponent } from './default/setting-drawer/setting-drawer.component';
import { SharedModule } from '../@shared/shared.module';
import { LayoutDefaultComponent } from './default/default.component';
import { LayoutAuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    LayoutAuthComponent,
    LayoutDefaultComponent,

    LayoutProHeaderWidgetComponent,
    MHeaderTaskComponent,
    LayoutDefaultSidebarComponent,
    LayoutDefaultHeaderComponent,
    MUserComponent,
    LayoutProLogoComponent,
    LayoutProFooterComponent,
    LayoutProHeaderComponent,
    ProSettingDrawerComponent,
    LayoutProMenuComponent,
    ProPageHeaderWrapperComponent,
    ProPageGridComponent,
    LayoutProWidgetUserComponent,
  ],
  exports: [ProPageHeaderWrapperComponent, ProPageGridComponent],
  imports: [AppUIModule, RouterModule, CommonModule, SharedModule],
})
export class LayoutModule {}
