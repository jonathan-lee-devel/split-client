import {ExpenseFrequency} from './enum/ExpenseFrequency';

export interface ExpenseDto {
  id: string | null | undefined;
  title: string;
  propertyId: string;
  amount: string;
  frequency: ExpenseFrequency;
  date: Date;
  createdBy: string | null | undefined;
}
