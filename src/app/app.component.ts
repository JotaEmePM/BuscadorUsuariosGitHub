import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { GithubServicesService } from './services/github-services.service';
import { User } from './model/user';
import { map, Observable } from 'rxjs';
import { PaginatePipe} from 'ngx-pagination'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'github_search_20220419';

  userList: User[] = [];
  usuarios : any;
  cantResultados: number = 0;
  userText: string = "";
  page = 1;


  constructor(private github: GithubServicesService) {

  }

  pageChanged(event: any) {
    this.userList = [];
    this.page = event;
    this.buscar(event)
    console.log(event);
  }

  search(event: any) {
    this.userList = [];
    this.userText = event.target.value;
    this.buscar(1);
  }

  buscar(pagina: number){
    this.github.getUsers(this.userText, pagina).subscribe(response => {
      this.cantResultados = response['total_count'];
      this.usuarios = response['items'];

      this.usuarios.forEach((usuario: { login: any; id: any; avatar_url: any; url: any; html_url: any; repos_url: any; }) => {

        this.github.getUser(usuario.login).subscribe(respUser => {

          const u: User = {
            login: usuario.login,
            id: usuario.id,
            avatar_url : usuario.avatar_url,
            url : usuario.url,
            html_url: usuario.html_url,
            repos_url: usuario.repos_url,

            name: respUser.name,
            email:respUser.email,
            company: respUser.company,
            location: respUser.location,
            bio: respUser.bio,
            public_repos: respUser.public_repos,
            public_gist: respUser.public_gist,
            followers: respUser.followers,
            following: respUser.following
          }
          this.userList.push(u);
        });





      });


    });
  }
}
