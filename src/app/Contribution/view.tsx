'use client';

import React, { useState, useEffect, useTransition, useCallback } from 'react';
import { 
  ContributionSave, 
  ContributionRetrieval, 
  LoadUserInfo,
  GetContributionHistory,
} from './action';
import './Contribution.css';

export default function ContributionPage() {
  const [userId] = useState('jack123');
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    currentAge: number | null;
    retirementAge: number | null;
    currentSalary: number | null;
  } | null>(null);

  const [contributionType, setContributionType] = useState<'fixed' | 'percentage'>('percentage');
  const [amount, setAmount] = useState<number>(0);
  const [contributionHistory, setContributionHistory] = useState<ContributionHistoryItem[]>([]);


  const [currentBalance, SetCurrentBalance] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

    const calculateQuickRetirementSavings = () => {
    if (!userInfo?.currentAge || !userInfo?.retirementAge || !userInfo?.currentSalary || amount === 0) {
      return 0;
    }

    const currentAgeVal = userInfo.currentAge;
    const retirementAgeVal = userInfo.retirementAge;
    const salary = userInfo.currentSalary;

    if (currentAgeVal >= retirementAgeVal) {
      return 0;
    }

    const yearsUntilRetirement = retirementAgeVal - currentAgeVal;
    const monthlySalary = salary;

    let monthlyContribution = 0;
    if (contributionType === 'percentage') {
      monthlyContribution = monthlySalary * (amount / 100);
    } else {
      monthlyContribution = amount;
    }

    const totalMonths = yearsUntilRetirement * 12;

    if (monthlyContribution === 0) {
      return 0;
    }

    const futureValue = monthlyContribution * totalMonths + currentBalance

    return futureValue;
  };

  const retirementSavings = calculateQuickRetirementSavings();
  /**
   * Load user info - FIX: Check for result.success and result.data
   */
  const loadUserInfo = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await LoadUserInfo(userId);
        
        if (result) {
          const data = result;
          setUserInfo({
            name: data.name,
            email: data.email,
            currentAge: data.currentAge ?? null,
            retirementAge: data.retirementAge ?? null,
            currentSalary: data.currentSalary ?? null,
          });
        } else {
          console.error('Failed to load user info:', result);
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    });
  }, [userId]);

  /**
   * Load contribution settings
   */
  const loadContribution = useCallback(() => {
    startTransition(async () => {
      try {
        const data = await ContributionRetrieval(userId);

        if (data) {
          setContributionType(data.contributionType);
          setAmount(data.amount);
        }
      } catch (error) {
        console.error('Error loading contribution:', error);
      }
    });
  }, [userId]);

  /**
   * Load contribution history
   */
  const loadHistory = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await GetContributionHistory(userId, 12);
        const totalContributions = result.reduce((sum, item) => sum + Number(item.amount), 0);
        SetCurrentBalance(totalContributions);
        
        if (result) {
          setContributionHistory(result);
          
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    });
  }, [userId]);

  useEffect(() => {
    loadUserInfo();
    loadContribution();
    loadHistory();
  }, [loadUserInfo, loadContribution, loadHistory]);

  /**
   * Handle save contribution
   */
  const handleSaveContribution = () => {
    setLoading(true);
    setMessage('');

    startTransition(async () => {
      try {
        const result = await ContributionSave(userId, {
          contributionType,
          amount,
        });

        if (result.success) {
          setMessage('✓ Contribution settings saved successfully!');
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage(`Error: ${result.error}`);
        }
      } catch (error) {
        setMessage('Failed to save contribution settings');
        console.error('Error saving contribution:', error);
      } finally {
        setLoading(false);
      }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="contribution-page">
      <div className="container">
        <header className="header">
          <h1>401(k) Contribution Manager</h1>
          <p>Manage your retirement savings contributions</p>

          {userInfo && (
            <div className="user-summary">
              <div><strong>User:</strong> {userInfo.name}</div>
              {userInfo.email && (
                <div><strong>Email:</strong> {userInfo.email}</div>
              )}
              {userInfo.currentAge !== null && (
                <div><strong>Current_Age:</strong> {userInfo.currentAge}</div>
              )}
              {userInfo.retirementAge !== null && (
                <div><strong>Retirement Age:</strong> {userInfo.retirementAge}</div>
              )}
              {userInfo.currentSalary !== null && (
                <div><strong>Monthly Salary:</strong> {formatCurrency(userInfo.currentSalary)}</div>
              )}
              {retirementSavings > 0 && (
                <div className="retirement-estimate">
                  <strong>Est. Retirement Savings:</strong> 
                  <span className="savings-highlight">{formatCurrency(retirementSavings)}</span>
                  <span className="estimate-note">(at {amount}{contributionType === 'percentage' ? '%' : '$'} contribution)</span>
                </div>
              )}
            </div>
          )}
        </header>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="card">
          <h2>Contribution Settings</h2>

          <div className="form-group">
            <label>Contribution Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="percentage"
                  checked={contributionType === 'percentage'}
                  onChange={() => setContributionType('percentage')}
                />
                <span>Percentage of Paycheck</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="fixed"
                  checked={contributionType === 'fixed'}
                  onChange={() => setContributionType('fixed')}
                />
                <span>Fixed Dollar Amount</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>
              {contributionType === 'percentage'
                ? 'Contribution Percentage (%)'
                : 'Contribution Amount ($)'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              min={0}
              max={contributionType === 'percentage' ? 100 : undefined}
              step={contributionType === 'percentage' ? 0.5 : 50}
              className="input-field"
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSaveContribution}
            disabled={loading || isPending}
          >
            {loading || isPending ? 'Saving...' : 'Save Contribution Rate'}
          </button>
        </div>
        <div className="card">
          <h2>Contribution History</h2>
          <p className="subtitle">Your recent contributions</p>

          {contributionHistory.length > 0 ? (
            <div className="history-container">
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
              <p> No contribution history yet</p>
              <p className="no-history-hint">
                Your contributions will appear here once you start making them.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}