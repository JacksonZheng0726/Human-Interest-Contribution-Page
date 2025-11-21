'use client';

import React, { useState, useEffect, useTransition, useCallback } from 'react';
import {
  ContributionSave,
  ContributionRetrieval,
  LoadUserInfo,
  GetContributionHistory,
} from './Server Action/action';
import { ContributionHistoryItem } from '@/Service/Contribution';
import UserInfoView from './userInfoView';
import ContributionSettingsView from './contribution_settingView';
import ContributionHistoryView from './contribution_historyView';
import MessageDisplay from './messageView';
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
  const [amount, setAmount] = useState<number>(10);
  const [contributionHistory, setContributionHistory] = useState<ContributionHistoryItem[]>([]);
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  // Calculate retirement savings
  const calculateQuickRetirementSavings = () => {
    if (!userInfo?.currentAge || !userInfo?.retirementAge || !userInfo?.currentSalary) {
      return 0;
    }

    const currentAgeVal = userInfo.currentAge;
    const retirementAgeVal = userInfo.retirementAge;
    const salary = userInfo.currentSalary;

    if (currentAgeVal >= retirementAgeVal) {
      return 0;
    }

    const yearsUntilRetirement = retirementAgeVal - currentAgeVal;

    let monthlyContribution = 0;
    if (contributionType === 'percentage') {
      monthlyContribution = salary * (amount / 100);
    } else {
      monthlyContribution = amount;
    }

    const totalMonths = yearsUntilRetirement * 12;
    const futureValue = monthlyContribution * totalMonths + currentBalance;

    return futureValue;
  };

  const retirementSavings = calculateQuickRetirementSavings();

  // Load user info
  const loadUserInfo = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await LoadUserInfo(userId);

        if (result) {
          setUserInfo({
            name: result.name,
            email: result.email,
            currentAge: result.currentAge ?? null,
            retirementAge: result.retirementAge ?? null,
            currentSalary: result.currentSalary ?? null,
          });
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    });
  }, [userId]);

  // Load contribution settings
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

  // Load contribution history
  const loadHistory = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await GetContributionHistory(userId, 12);
        const totalContributions = result.reduce((sum, item) => sum + Number(item.amount), 0);
        setCurrentBalance(totalContributions);

        if (result) {
          setContributionHistory(result);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    });
  }, [userId]);

  // Initial data load
  useEffect(() => {
    loadUserInfo();
    loadContribution();
    loadHistory();
  }, [loadUserInfo, loadContribution, loadHistory]);

  // Handle save contribution
  const handleSaveContribution = () => {
    setLoading(true);
    setMessage('');

    startTransition(async () => {
      try {
        const result = await ContributionSave(userId, {
          contributionType,
          amount,
          userId: userId,
        });

        if (result.success) {
          setMessage('Contribution settings saved successfully!');
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error saving contribution:', error);
        setMessage('Failed to save contribution settings');
      } finally {
        setLoading(false);
      }
    })
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
      day: 'numeric',
    });
  };

  return (
    <div className="contribution-page">
      <div className="container">
        {/* User Info Header */}
        <UserInfoView
          userInfo={userInfo}
          retirementSavings={retirementSavings}
          amount={amount}
          contributionType={contributionType}
          formatCurrency={formatCurrency}
        />

        {/* Message Display */}
        <MessageDisplay message={message} />

        {/* Contribution Settings */}
        <ContributionSettingsView
          contributionType={contributionType}
          amount={amount}
          loading={loading}
          isPending={isPending}
          onContributionTypeChange={setContributionType}
          onAmountChange={setAmount}
          onSave={handleSaveContribution}
        />

        {/* Contribution History */}
        <ContributionHistoryView
          contributionHistory={contributionHistory}
          currentBalance={currentBalance}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}