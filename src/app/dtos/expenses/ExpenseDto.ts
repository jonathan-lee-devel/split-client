import {ExpenseFrequency} from './enum/ExpenseFrequency';

export interface ExpenseDto {
  id: string | null | undefined;
  title: string;
  propertyId: string;
  amount: string;
  frequency: ExpenseFrequency;
  startDate: Date;
  endDate: Date;
  createdBy: string | null | undefined;
}
