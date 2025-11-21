export interface UserInformation {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string | null;
  currentSalary: number | null;
  currentAge: number | null;
  retirementAge: number | null;
  contributionStartYear: number | null;
  createdAt: string;
  updatedAt: string;
}
