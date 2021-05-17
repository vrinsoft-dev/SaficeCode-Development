import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientManagementComponent } from '../../pages/client-management/client-management.component';
import { QuoteManagementComponent } from '../../pages/quote-management/quote-management.component';
import { InvoiceManagementComponent } from '../../pages/invoice-management/invoice-management.component';
import { ProjectManagementComponent } from '../../pages/project-management/project-management.component';
import { SupportTicketComponent } from '../../pages/support-ticket/support-ticket.component';
import { MasterComponent } from '../../pages/master/master.component';
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
import { AuthGuard } from '../../_helpers/auth.guard';
export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'invoice-management', component: InvoiceManagementComponent, canActivate: [AuthGuard] },
    { path: 'project-management', component: ProjectManagementComponent, canActivate: [AuthGuard] },
    { path: 'client-management', component: ClientManagementComponent, canActivate: [AuthGuard] },
    { path: 'quote-management', component: QuoteManagementComponent, canActivate: [AuthGuard] },
    { path: 'support-ticket', component: SupportTicketComponent, canActivate: [AuthGuard] },
    { path: 'master', component: MasterComponent, canActivate: [AuthGuard] },
    { path: 'quoteview', component: QuoteviewComponent, canActivate: [AuthGuard] },
    { path: 'client-edit/:id', component: ClienteditComponent, canActivate: [AuthGuard] },
    { path: 'create-invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard] },
    { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] },
    { path: 'create-ticket', component: CreateTicketComponent, canActivate: [AuthGuard] },
    { path: 'view-ticket', component: ViewTicketComponent, canActivate: [AuthGuard] },
    { path: 'client-report', component: clientReportComponent, canActivate: [AuthGuard] },
    { path: 'project-report', component: ProjectReportComponent, canActivate: [AuthGuard] },
    { path: 'quote-report', component: QuoteReportComponent, canActivate: [AuthGuard] },
    { path: 'client-type', component: ClientTypeComponent, canActivate: [AuthGuard] },
    { path: 'client-country', component: ClientCountryComponent, canActivate: [AuthGuard] },
    { path: 'project-type', component: ProjectTypeComponent, canActivate: [AuthGuard] },
    { path: 'support-ticket-impact', component: SupportTicketImpactComponent, canActivate: [AuthGuard] },
    { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
    { path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [AuthGuard] },
    { path: 'terms-condition', component: TermsConditionComponent, canActivate: [AuthGuard] }
];