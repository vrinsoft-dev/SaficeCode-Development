import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientManagementComponent } from '../../pages/client-management/client-management.component';
import { QuoteManagementComponent } from '../../pages/quote-management/quote-management.component';
import { InvoiceManagementComponent } from '../../pages/invoice-management/invoice-management.component';
import { SupportTicketComponent } from '../../pages/support-ticket/support-ticket.component';
import { MasterComponent } from '../../pages/master/master.component';
import { ProjectManagementComponent } from '../../pages/project-management/project-management.component';
import { QuoteviewComponent } from '../../pages/quoteview/quoteview.component';
import { ClienteditComponent } from '../../pages/client-edit/client-edit.component';
import { CreateInvoiceComponent } from '../../pages/create-invoice/create-invoice.component';
import { CreateProjectComponent } from '../../pages/create-project/create-project.component';
import { CreateTicketComponent } from '../../pages/create-ticket/create-ticket.component';
import { ViewTicketComponent } from '../../pages/view-ticket/view-ticket.component';
import { clientReportComponent } from '../../pages/client-report/client-report.component';
import { ProjectReportComponent } from '../../pages/project-report/project-report.component';
import { QuoteReportComponent } from '../../pages/quote-report/quote-report.component';
import { ClientTypeComponent } from '../../pages/client-type/client-type.component';
import { ClientCountryComponent } from '../../pages/client-country/client-country.component';
import { ProjectTypeComponent } from '../../pages/project-type/project-type.component';
import { SupportTicketImpactComponent } from '../../pages/support-ticket-impact/support-ticket-impact.component';
import { AboutUsComponent } from '../../pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from '../../pages/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from '../../pages/terms-condition/terms-condition.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../components/_modal';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ModalModule,

  ],
  declarations: [
    DashboardComponent,
    InvoiceManagementComponent,
    SupportTicketComponent,
    MasterComponent,
    ProjectManagementComponent,
    ClientManagementComponent,
    QuoteManagementComponent,
    QuoteviewComponent,
    ClienteditComponent,
    CreateInvoiceComponent,
    CreateProjectComponent,
    CreateTicketComponent,
    ViewTicketComponent,
    clientReportComponent,
    ProjectReportComponent,
    QuoteReportComponent,
    ClientTypeComponent,
    ClientCountryComponent,
    ProjectTypeComponent,
    SupportTicketImpactComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent

  ]
})

export class AdminLayoutModule { }
