// src/Service/Contribution/service.ts

import { ContributionDbService } from './dbService';
import type { UserInformation } from './index';


export async function getUserInformation(
  userId: string
): Promise<UserInformation | null> {
  try {
    const db = new ContributionDbService();
    const data = await db.getUserInfo(userId);
    return data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null;
  }
}


