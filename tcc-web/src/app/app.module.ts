import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './guards/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginModule } from './modulos/login/login.module';
import { HomeComponent } from './modulos/home/home.component';
import { BoardComponent } from './modulos/board/board.component';
import { UtilsService } from './funcoes/utils.service';
import { AnaliseCadastroComponent } from './modulos/board/analise-cadastro/analise-cadastro.component';
import { PerfilComponent } from './modulos/board/perfil/perfil.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    AnaliseCadastroComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    FormsModule
  ],
  providers: [CookieService, AuthGuardService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
