import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-save-sector',
  templateUrl: './save-sector.component.html',
  styleUrls: ['./save-sector.component.scss']
})
export class SaveSectorComponent {
  @Input() sector: Sector | null = null; // Secteur sélectionné pour modification
  @Output() save = new EventEmitter<void>();
  sectorForm: FormGroup;
  sectorData: Sector = {
    name: ''
  };
  
  constructor(private sectorService: SectorService) {
    this.sectorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  } 

  ngOnChanges(): void {
    // Réinitialise le formulaire avec les données du secteur sélectionné
    if (this.sector) {
      this.sectorForm.patchValue({
        name: this.sector.name 
      })
    } else {
      this.sectorData = { name: '' };
    }
  }

  saveSector() {
    if (this.sectorData.id) { console.log("Is updateeeee")
      // Mise à jour
      this.sectorService.updateSector(this.sectorData.id, this.sectorData).subscribe(() => {
        this.save.emit();
      });
    } else {console.log("Is newwwwww")
      // Ajout
      this.sectorData = this.sectorForm.getRawValue();
      this.sectorService.createSector(this.sectorData).subscribe(() => {
        this.sectorForm.reset();
        this.save.emit();
      });
    }
  }
 
}
