'use client';

import React from 'react';

interface UserInfoViewProps {
  userInfo: {
    name: string;
    email: string;
    currentAge: number | null;
    retirementAge: number | null;
    currentSalary: number | null;
  } | null;
  retirementSavings: number;
  amount: number;
  contributionType: 'fixed' | 'percentage';
  formatCurrency: (value: number) => string;
}

export default function UserInfoView({
  userInfo,
  retirementSavings,
  amount,
  contributionType,
  formatCurrency
}: UserInfoViewProps) {
  if (!userInfo) {
    return null;
  }

  return (
    <header className="header">
      <h1>401(k) Contribution Manager</h1>
      <p>Manage your retirement savings contributions</p>

      <div className="user-summary">
        <div><strong>User:</strong> {userInfo.name}</div>
        
        {userInfo.email && (
          <div><strong>Email:</strong> {userInfo.email}</div>
        )}
        
        {userInfo.currentAge !== null && (
          <div><strong>Current Age:</strong> {userInfo.currentAge}</div>
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
            <span className="estimate-note">
              (at {amount}{contributionType === 'percentage' ? '%' : '$'} contribution)
            </span>
          </div>
        )}
      </div>
    </header>
  );
}