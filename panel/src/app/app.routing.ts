import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { IndexColaboradorComponent } from "./components/colaborador/index-colaborador/index-colaborador.component";
import { CreateColaboradorComponent } from "./components/colaborador/create-colaborador/create-colaborador.component";
import { EditColaboradorComponent } from "./components/colaborador/edit-colaborador/edit-colaborador.component";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { VerificarCuentaComponent } from "./components/verificar-cuenta/verificar-cuenta.component";
import { DashboardClienteComponent } from "./components/clientes/buyer/dashboard-cliente/dashboard-cliente.component";
import { ProspeccionClienteComponent } from "./components/clientes/buyer/prospeccion-cliente/prospeccion-cliente.component";
import { InteresesClienteComponent } from "./components/clientes/buyer/prospeccion/intereses-cliente/intereses-cliente.component";
import { CorreosClienteComponent } from "./components/clientes/buyer/prospeccion/correos-cliente/correos-cliente.component";
import { LlamdasClienteComponent } from "./components/clientes/buyer/prospeccion/llamdas-cliente/llamdas-cliente.component";
import { TareasClienteComponent } from "./components/clientes/buyer/prospeccion/tareas-cliente/tareas-cliente.component";
import { IndexCursosComponent } from "./components/cursos/index-cursos/index-cursos.component";
import { CreateCursosComponent } from "./components/cursos/create-cursos/create-cursos.component";
import { EditCursosComponent } from "./components/cursos/edit-cursos/edit-cursos.component";
import { IndexCicloComponent } from "./components/ciclos/index-ciclo/index-ciclo.component";
import { CreateCicloComponent } from "./components/ciclos/create-ciclo/create-ciclo.component";
import { VencidosCicloComponent } from "./components/ciclos/vencidos-ciclo/vencidos-ciclo.component";
import { EditCicloComponent } from "./components/ciclos/edit-ciclo/edit-ciclo.component";
import { IndexMatriculaComponent } from "./components/matriculas/index-matricula/index-matricula.component";
import { CreateMatriculaComponent } from "./components/matriculas/create-matricula/create-matricula.component";
import { DetallesMatriculaComponent } from "./components/matriculas/detalles-matricula/detalles-matricula.component";
import { ContratoMatriculaComponent } from "./components/matriculas/contrato-matricula/contrato-matricula.component";
import { PagoMatriculaComponent } from "./components/matriculas/pago-matricula/pago-matricula.component";
import { SatisfaccionEncuestaComponent } from "./components/encuestas/satisfaccion-encuesta/satisfaccion-encuesta.component";
import { ShowEncuestaMatriculaComponent } from "./components/matriculas/show-encuesta-matricula/show-encuesta-matricula.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { EditProductoComponent } from "./components/productos/edit-producto/edit-producto.component";
import { InventarioProductoComponent } from "./components/productos/inventario-producto/inventario-producto.component";
import { IndexVentaComponent } from "./components/ventas/index-venta/index-venta.component";
import { CreateVentaComponent } from "./components/ventas/create-venta/create-venta.component";
import { ConfiguracionesComponent } from "./components/configuraciones/configuraciones.component";

import { AuthGuard } from "./guards/auth.guard";
import { InventarioGeneralComponent } from "./components/inventario/inventario-general/inventario-general.component";
import { InventarioEntradaComponent } from "./components/inventario/inventario-entrada/inventario-entrada.component";
import { InventarioSalidaComponent } from "./components/inventario/inventario-salida/inventario-salida.component";
import { ListasContactosComponent } from "./components/marketing/emails/listas-contactos/listas-contactos.component";
import { EmailCampaignsComponent } from "./components/marketing/emails/email-campaigns/email-campaigns.component";
import { KpiMensualComponent } from "./components/rendimiento/kpi-mensual/kpi-mensual.component";

const appRoutes : Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

    {path: 'colaborador', component:IndexColaboradorComponent, canActivate: [AuthGuard]},
    {path: 'colaborador/create', component:CreateColaboradorComponent, canActivate: [AuthGuard]},
    {path: 'colaborador/:id', component:EditColaboradorComponent, canActivate: [AuthGuard]},

    {path: 'cliente', component:IndexClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/create', component:CreateClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/:id', component:EditClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/buyer/:id/dashboard', component:DashboardClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/buyer/:id/prospeccion', component:ProspeccionClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/buyer/:id/prospeccion/intereses', component:InteresesClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/buyer/:id/prospeccion/correos', component:CorreosClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/buyer/:id/prospeccion/llamadas', component:LlamdasClienteComponent, canActivate: [AuthGuard]},
    {path: 'cliente/buyer/:id/prospeccion/tareas', component:TareasClienteComponent, canActivate: [AuthGuard]},

    {path: 'cursos', component:IndexCursosComponent, canActivate: [AuthGuard]},
    {path: 'cursos/create', component:CreateCursosComponent, canActivate: [AuthGuard]},
    {path: 'cursos/:id', component:EditCursosComponent, canActivate: [AuthGuard]},

    {path: 'cursos/:id/ciclo', component:IndexCicloComponent, canActivate: [AuthGuard]},
    {path: 'cursos/:id/ciclo/create', component:CreateCicloComponent, canActivate: [AuthGuard]},
    {path: 'cursos/:id/ciclo/vencidos', component:VencidosCicloComponent, canActivate: [AuthGuard]},
    {path: 'cursos/:id/ciclo/edit/:idciclo', component:EditCicloComponent, canActivate: [AuthGuard]},

    {path: 'matriculas', component:IndexMatriculaComponent, canActivate: [AuthGuard]},
    {path: 'matriculas/create', component:CreateMatriculaComponent, canActivate: [AuthGuard]},
    {path: 'matriculas/detalles/:id', component:DetallesMatriculaComponent, canActivate: [AuthGuard]},
    {path: 'matriculas/contrato/:id', component:ContratoMatriculaComponent, canActivate: [AuthGuard]},
    {path: 'matriculas/pagos/:id', component:PagoMatriculaComponent, canActivate: [AuthGuard]},
    {path: 'matriculas/encuesta/:id', component:ShowEncuestaMatriculaComponent, canActivate: [AuthGuard]},

    {path: 'productos', component:IndexProductoComponent, canActivate: [AuthGuard]},
    {path: 'productos/create', component:CreateProductoComponent, canActivate: [AuthGuard]},
    {path: 'productos/edit/:id', component:EditProductoComponent, canActivate: [AuthGuard]},
    {path: 'productos/inventario', component:InventarioProductoComponent, canActivate: [AuthGuard]},

    {path: 'ventas', component:IndexVentaComponent, canActivate: [AuthGuard]},
    {path: 'ventas/create', component:CreateVentaComponent, canActivate: [AuthGuard]},

    {path: 'configuraciones', component:ConfiguracionesComponent, canActivate: [AuthGuard]},

    {path: 'inventario/general', component:InventarioGeneralComponent, canActivate: [AuthGuard]},
    {path: 'inventario/entrada', component:InventarioEntradaComponent, canActivate: [AuthGuard]},
    {path: 'inventario/salida', component:InventarioSalidaComponent, canActivate: [AuthGuard]},

    {path: 'marketing/email/listas', component:ListasContactosComponent, canActivate: [AuthGuard]},
    {path: 'marketing/email/campaigns', component:EmailCampaignsComponent, canActivate: [AuthGuard]},

    {path: 'rendimiento/mensual', component:KpiMensualComponent, canActivate: [AuthGuard]},
    ///////////////////////
    {path: 'encuesta-satiscaccion/:token', component:SatisfaccionEncuestaComponent},
    {path: 'verification/:token', component: VerificarCuentaComponent},

    {path: '', component: LoginComponent}
]

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);