export interface ContributionData {
  userId: string;
  contributionType: 'fixed' | 'percentage';
  amount: number;

}

export interface ContributionRecord {
  id: string;
  userId: string;
  contributionType: 'fixed' | 'percentage';
  amount: number;
  yearToDateContributions: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectionResult {
  projectedSavings: number;
  yearsUntilRetirement: number;
  totalContributions: number;
  totalInterestEarned: number;
  monthlyContribution: number;
  annualContribution: number;
}


export interface ContributionHistoryItem {
  id: string;
  contributionDate: Date;
  amount: number;
  contributionType: string;
  createdAt?: Date;
}