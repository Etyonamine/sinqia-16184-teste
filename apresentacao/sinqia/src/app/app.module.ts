import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoComponent } from './produto/produto.component';
import { HomeComponent } from './home/home.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { MovimentoManualModule } from './movimento-manual/movimento-manual.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    HomeComponent,
    NavegacaoComponent,
    PaginaNaoEncontradaComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialAngularModule,
    MovimentoManualModule,
    SharedModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
