import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ImageDrawingModule } from 'ngx-image-drawing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { routing } from "./app.routing";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TopComponent } from './components/top/top.component';
import { IndexColaboradorComponent } from './components/colaborador/index-colaborador/index-colaborador.component';
import { CreateColaboradorComponent } from './components/colaborador/create-colaborador/create-colaborador.component';
import { EditColaboradorComponent } from './components/colaborador/edit-colaborador/edit-colaborador.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { VerificarCuentaComponent } from './components/verificar-cuenta/verificar-cuenta.component';
import { DashboardClienteComponent } from './components/clientes/buyer/dashboard-cliente/dashboard-cliente.component';
import { ProspeccionClienteComponent } from './components/clientes/buyer/prospeccion-cliente/prospeccion-cliente.component';
import { AsideClienteComponent } from './components/clientes/buyer/aside-cliente/aside-cliente.component';
import { InteresesClienteComponent } from './components/clientes/buyer/prospeccion/intereses-cliente/intereses-cliente.component';
import { TareasClienteComponent } from './components/clientes/buyer/prospeccion/tareas-cliente/tareas-cliente.component';
import { LlamdasClienteComponent } from './components/clientes/buyer/prospeccion/llamdas-cliente/llamdas-cliente.component';
import { CorreosClienteComponent } from './components/clientes/buyer/prospeccion/correos-cliente/correos-cliente.component';
import { IndexCursosComponent } from './components/cursos/index-cursos/index-cursos.component';
import { CreateCursosComponent } from './components/cursos/create-cursos/create-cursos.component';
import { EditCursosComponent } from './components/cursos/edit-cursos/edit-cursos.component';
import { IndexCicloComponent } from './components/ciclos/index-ciclo/index-ciclo.component';
import { CreateCicloComponent } from './components/ciclos/create-ciclo/create-ciclo.component';
import { VencidosCicloComponent } from './components/ciclos/vencidos-ciclo/vencidos-ciclo.component';
import { EditCicloComponent } from './components/ciclos/edit-ciclo/edit-ciclo.component';
import { IndexMatriculaComponent } from './components/matriculas/index-matricula/index-matricula.component';
import { CreateMatriculaComponent } from './components/matriculas/create-matricula/create-matricula.component';
import { DetallesMatriculaComponent } from './components/matriculas/detalles-matricula/detalles-matricula.component';
import { ContratoMatriculaComponent } from './components/matriculas/contrato-matricula/contrato-matricula.component';
import { PagoMatriculaComponent } from './components/matriculas/pago-matricula/pago-matricula.component';
import { FzillPipe } from './pipes/fzill.pipe';
import { SatisfaccionEncuestaComponent } from './components/encuestas/satisfaccion-encuesta/satisfaccion-encuesta.component';
import { ShowEncuestaMatriculaComponent } from './components/matriculas/show-encuesta-matricula/show-encuesta-matricula.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { EditProductoComponent } from './components/productos/edit-producto/edit-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { IndexVentaComponent } from './components/ventas/index-venta/index-venta.component';
import { CreateVentaComponent } from './components/ventas/create-venta/create-venta.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { InventarioGeneralComponent } from './components/inventario/inventario-general/inventario-general.component';
import { InventarioEntradaComponent } from './components/inventario/inventario-entrada/inventario-entrada.component';
import { InventarioSalidaComponent } from './components/inventario/inventario-salida/inventario-salida.component';
import { ListasContactosComponent } from './components/marketing/emails/listas-contactos/listas-contactos.component';
import { EmailCampaignsComponent } from './components/marketing/emails/email-campaigns/email-campaigns.component';
import { KpiMensualComponent } from './components/rendimiento/kpi-mensual/kpi-mensual.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    TopComponent,
    IndexColaboradorComponent,
    CreateColaboradorComponent,
    EditColaboradorComponent,
    NotfoundComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    VerificarCuentaComponent,
    DashboardClienteComponent,
    ProspeccionClienteComponent,
    AsideClienteComponent,
    InteresesClienteComponent,
    TareasClienteComponent,
    LlamdasClienteComponent,
    CorreosClienteComponent,
    IndexCursosComponent,
    CreateCursosComponent,
    EditCursosComponent,
    IndexCicloComponent,
    CreateCicloComponent,
    VencidosCicloComponent,
    EditCicloComponent,
    IndexMatriculaComponent,
    CreateMatriculaComponent,
    DetallesMatriculaComponent,
    ContratoMatriculaComponent,
    PagoMatriculaComponent,
    FzillPipe,
    SatisfaccionEncuestaComponent,
    ShowEncuestaMatriculaComponent,
    IndexProductoComponent,
    CreateProductoComponent,
    EditProductoComponent,
    InventarioProductoComponent,
    IndexVentaComponent,
    CreateVentaComponent,
    ConfiguracionesComponent,
    InventarioGeneralComponent,
    InventarioEntradaComponent,
    InventarioSalidaComponent,
    ListasContactosComponent,
    EmailCampaignsComponent,
    KpiMensualComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/',
    }),
    ImageDrawingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
