import { pool } from '../../db';
import { ContributionRecord, ContributionData} from './index';


export class ContributionDbService {
  /**
   Get current contribution settings for a user
   */
  public async getContribution(userId: string): Promise<ContributionRecord | null> {
    const select = `
      SELECT 
        id,
        user_id as "userId",
        contribution_type as "contributionType",
        amount,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM contribution_setting
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    const query = {
      text: select,
      values: [userId],
    };
    
    const result = await pool.query(query);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  /*
   * update contribution settings for a user
   */
  public async saveContribution(data: ContributionData): Promise<ContributionRecord> {
    const existing = await this.getContribution(data.userId);

    if (existing) {
      const update = `
        UPDATE contribution_setting
        SET 
          contribution_type = $2,
          amount = $3,
          updated_at = NOW()
        WHERE user_id = $1
        RETURNING 
          id,
          user_id as "userId",
          contribution_type as "contributionType",
          amount,
          created_at as "createdAt",
          updated_at as "updatedAt"
      `;
      
      const query = {
        text: update,
        values: [
          data.userId,
          data.contributionType,
          data.amount
        ],
      };
      
      const result = await pool.query(query);
      return result.rows[0];
    } else {
      const insert = `
        INSERT INTO contribution_setting (user_id, contribution_type, amount)
        VALUES ($1, $2, $3)
        RETURNING 
          id,
          user_id as "userId",
          contribution_type as "contributionType",
          amount,
          created_at as "createdAt",
          updated_at as "updatedAt"
      `;
      
      const query = {
        text: insert,
        values: [
          data.userId,
          data.contributionType,
          data.amount
        ],
      };
      
      const result = await pool.query(query);
      return result.rows[0];
    }
  }


/**
 * Get contribution history for a user
 */
public async getContributionHistory(
  userId: string, 
  limit: number = 12
): Promise<Array<{
  id: string;
  contributionDate: Date;
  amount: number;
  contributionType: string;
}>> {
  const select = `
    SELECT 
      id,
      contribution_date as "contributionDate",
      amount,
      contribution_type as "contributionType",
      created_at as "createdAt"
    FROM contribution_history
    WHERE user_id = $1
    ORDER BY contribution_date DESC
    LIMIT $2
  `;
  
  const result = await pool.query({
    text: select,
    values: [userId, limit]
  });
  
  return result.rows;
}

}

export const contributionDbService = new ContributionDbService();