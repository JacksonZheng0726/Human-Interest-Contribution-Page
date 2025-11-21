'use client';

import React from 'react';

interface ContributionSettingsViewProps {
  contributionType: 'fixed' | 'percentage';
  amount: number;
  loading: boolean;
  isPending: boolean;
  onContributionTypeChange: (type: 'fixed' | 'percentage') => void;
  onAmountChange: (amount: number) => void;
  onSave: () => void;
}

export default function ContributionSettingsView({
  contributionType,
  amount,
  loading,
  isPending,
  onContributionTypeChange,
  onAmountChange,
  onSave
}: ContributionSettingsViewProps) {
  return (
    <div className="card">
      <h2>Contribution Settings</h2>

      {/* Contribution Type Selection */}
      <div className="form-group">
        <label>Contribution Type</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="percentage"
              checked={contributionType === 'percentage'}
              onChange={() => onContributionTypeChange('percentage')}
            />
            <span>Percentage of Paycheck</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="fixed"
              checked={contributionType === 'fixed'}
              onChange={() => onContributionTypeChange('fixed')}
            />
            <span>Fixed Dollar Amount</span>
          </label>
        </div>
      </div>

      {/* Amount Input */}
      <div className="form-group">
        <label>
          {contributionType === 'percentage'
            ? 'Contribution Percentage (%)'
            : 'Contribution Amount ($)'}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
          min={0}
          max={contributionType === 'percentage' ? 100 : undefined}
          step={contributionType === 'percentage' ? 0.5 : 50}
          className="input-field"
        />
      </div>

      {/* Save Button */}
      <button
        className="btn btn-primary"
        onClick={onSave}
        disabled={loading || isPending}
      >
        {loading || isPending ? 'Saving...' : 'Save Contribution Rate'}
      </button>
    </div>
  );
}