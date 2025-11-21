'use client';

import React from 'react';
import { ContributionHistoryItem } from '@/Service/Contribution';

interface ContributionHistoryViewProps {
  contributionHistory: ContributionHistoryItem[];
  currentBalance: number;
  formatCurrency: (value: number) => string;
  formatDate: (date: Date) => string;
}

export default function ContributionHistoryView({
  contributionHistory,
  currentBalance,
  formatCurrency,
  formatDate
}: ContributionHistoryViewProps) {
  return (
    <div className="card">
      <h2>Contribution History</h2>
      <p className="subtitle">Your recent contributions</p>

      {contributionHistory.length > 0 ? (
        <div className="history-container">
          {/* History Table */}
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Contribution Amount</th>
              </tr>
            </thead>
            <tbody>
              {contributionHistory.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.contributionDate)}</td>
                  <td>
                    <span className={`badge badge-${item.contributionType}`}>
                      {item.contributionType}
                    </span>
                  </td>
                  <td className="amount">{formatCurrency(Number(item.amount))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Section */}
          <div className="history-summary">
            <div className="summary-item">
              <span className="summary-label">Total Contributions:</span>
              <span className="summary-value">
                {formatCurrency(currentBalance)}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Number of Contributions:</span>
              <span className="summary-value">{contributionHistory.length}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-history">
          <p>No contribution history yet</p>
          <p className="no-history-hint">
            Your contributions will appear here once you start making them.
          </p>
        </div>
      )}
    </div>
  );
}