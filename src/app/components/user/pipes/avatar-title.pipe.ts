import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarTitle'
})
export class AvatarTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const parts = value.split(' ');
    const firstInitial = parts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = parts[1]?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }

}
