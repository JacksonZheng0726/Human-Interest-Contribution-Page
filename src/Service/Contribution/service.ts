import { ContributionDbService } from './dbService';
import { ContributionData, ContributionRecord, ContributionHistoryItem} from './index';

/**
 * Get contribution settings for a user
 */
export async function getContribution(userId: string): Promise<ContributionRecord | null> {
  try {
    const service = new ContributionDbService();
    const data = await service.getContribution(userId);
    return data;
  } catch (error) {
    console.error('Error getting contribution:', error);
    return null;
  }
}

/**
 * Save contribution settings
 */
export async function saveContribution(
  userId: string,
  contributionDetail: ContributionData
): Promise<ContributionRecord | null> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!contributionDetail.contributionType || contributionDetail.amount === undefined) {
      throw new Error('Contribution type and amount are required');
    }

    const service = new ContributionDbService();
    const data = await service.saveContribution({
      userId,
      contributionType: contributionDetail.contributionType,
      amount: contributionDetail.amount,
    });
    return data;
  } catch (error) {
    console.error('Error saving contribution:', error);
    return null;
  }
}

export async function updateAmount(
  userId: string,
  newAmount: number
): Promise<ContributionRecord | null> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (newAmount === undefined || newAmount < 0) {
      throw new Error('Valid amount is required');
    }

    const service = new ContributionDbService();
    const existing = await service.getContribution(userId);
    
    if (!existing) {
      throw new Error('No contribution found for this user');
    }

    const data = await service.saveContribution({
      userId,
      contributionType: existing.contributionType,
      amount: newAmount,
    });

    return data;
  } catch (error) {
    console.error('Error updating amount:', error);
    return null;
  }
}

/**
 * Get contribution history
 * @returns Array of ContributionHistoryItem, empty array on failure
 */
export async function getHistory(
  userId: string, 
  limit: number = 12
): Promise<ContributionHistoryItem[]> {
  try {
    const service = new ContributionDbService();
    const history = await service.getContributionHistory(userId, limit);
    return history;
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}