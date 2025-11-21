// src/Service/Contribution/dbService.ts

import { pool } from '../../db';
import type { UserInformation } from './index';

export class ContributionDbService {
  
  public async getUserInfo(userId: string): Promise<UserInformation | null> {
    const select = `
      SELECT
        id,
        name,
        email,
        date_of_birth AS "dateOfBirth",
        monthly_salary AS "currentSalary",
        current_age AS "currentAge",
        retirement_age AS "retirementAge",
        created_at AS "createdAt"
      FROM users
      WHERE id = $1
      LIMIT 1;
    `;

    const query = { text: select, values: [userId] };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}
