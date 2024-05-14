import { Component, Input } from '@angular/core';
import { Libro } from '../../libro';
import { CommonModule } from '@angular/common';
import { ArchivioService } from '../../archivio.service';

@Component({
  selector: 'app-scheda',
  standalone: true,
  imports: [CommonModule],
  providers: [ArchivioService],
  templateUrl: './scheda.component.html',
  styleUrl: './scheda.component.css'
})
export class SchedaComponent {
  @Input() corrispondenza:Libro;
  @Input() pagina: string;


}
