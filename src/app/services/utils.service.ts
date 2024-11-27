import { Injectable } from '@angular/core';
import { NiveauExperiences, RemoteWorking, TypeCompany, TypeOfContract } from '../enum/enums';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getEnumEntries(enumObj: any): { key: string; value: string }[] {
    return Object.entries(enumObj).map(([key, value]) => ({
      key,
      value: value as string,
    }));
  }


  getExperienceLabel(key: string): string {
    return this.getLabel(NiveauExperiences, key);
  }

  getRemoteWorkingLabel(key: string): string {
    return this.getLabel(RemoteWorking, key);
  }

  getTypeCompanyLabel(key: string): string {
    return this.getLabel(TypeCompany, key);
  }

  getTypeOfContractLabel(key: string): string {
    return this.getLabel(TypeOfContract, key);
  }

  // Returns the matching label or key if no match
  getLabel(mapping: { [key: string]: string }, key: string): string {
    return mapping[key] || key; 
  }
  
}
