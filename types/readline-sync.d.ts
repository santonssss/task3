declare module "readline-sync" {
  export function question(query: string): string;
  export function keyInSelect(items: string[], query: string): number;
  export function keyInYN(query: string): boolean;
  export function prompt(): string;
}
