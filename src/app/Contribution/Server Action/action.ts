// src/app/Contribution/actions.ts
'use server';

import { ContributionHistoryItem, ContributionRecord } from '@/Service/Contribution';
import { getContribution, saveContribution, getHistory} from '../../../Service/Contribution/service';
import { getUserInformation} from '../../../Service/user/service';

export interface ContributionDetail {
  contributionType: 'fixed' | 'percentage';
  amount: number;
}


/**
 * Get contribution history
 */
export async function GetContributionHistory(
  userId: string, 
  limit: number = 12
): Promise<ContributionHistoryItem[]> {
  if (!userId) {
    console.error('User ID is required');
    return [];
  }
  
  return await getHistory(userId, limit);
}

export async function LoadUserInfo(userId: string) {
  return await getUserInformation(userId);
}

/**
 * Save contribution settings
 */
export async function ContributionSave(
  userId: string, 
  contributionDetail: ContributionDetail
) {
  try {
    if (!userId) throw new Error('User ID is required');

    if (!contributionDetail.contributionType || contributionDetail.amount === undefined) {
      throw new Error('Contribution type and amount are required');
    }

    const saved = await saveContribution(userId, {
      userId,
      contributionType: contributionDetail.contributionType,
      amount: contributionDetail.amount,
    });

    return {
      success: true,
      data: saved,
      message: 'Contribution saved successfully'
    };
  } catch (error) {
    console.error('Error saving contribution:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save contribution'
    };
  }
}

/**
 * Get contribution settings for a user
 */
export async function ContributionRetrieval(userId: string): Promise<ContributionRecord | null> {
  if (!userId) {
    console.error('User ID is required');
    return null;
  }

  return await getContribution(userId);
}


