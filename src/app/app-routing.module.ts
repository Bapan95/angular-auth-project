import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
// import { ApiGuard } from './share/api.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'emp-dashboard',component:EmpDashboardComponent}, 
  {path:'navbar',component:NavbarComponent},
  // {path:'header',component:HeaderComponent},
  {path:'products',component:ProductsComponent},
  {path:'cart',component:CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
