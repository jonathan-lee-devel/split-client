import {ExpenseFrequency} from './enum/ExpenseFrequency';

export interface ExpenseDto {
  id: string;
  title: string;
  propertyId: string;
  amount: string;
  frequency: ExpenseFrequency;
  startDate: Date;
  endDate: Date;
  createdBy: string | null | undefined;
}
