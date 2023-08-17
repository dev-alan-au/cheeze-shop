export type DiscountCodes = {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}