export const PORTRAIT = 'portrait';
export const LANDSCAPE = 'landscape';
export const AUTOMOBILE = 'automobile';
export const TYPES = [PORTRAIT, LANDSCAPE, AUTOMOBILE];

export interface Filters {
  [PORTRAIT]: boolean;
  [LANDSCAPE]: boolean;
  [AUTOMOBILE]: boolean;
  [key: string]: boolean;
}
