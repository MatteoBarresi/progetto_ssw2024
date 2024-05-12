import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {
  title: string = 'titolo prova';
  pagina: string='';
  inserimento(){
    this.pagina = 'inserimento';
    console.log(this.pagina);
  }
}
