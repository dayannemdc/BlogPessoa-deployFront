import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.idUsuario = this.userLogin.idUsuario
      environment.email = this.userLogin.email

      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.idUsuario)
      console.log(environment.email)

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 400){
        alert('Usuário ou senha estão incorretos.')
      }
    })
  }

}
