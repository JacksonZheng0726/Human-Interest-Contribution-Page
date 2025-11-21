'use client';

import React from 'react';

interface MessageDisplayProps {
  message: string;
}

export default function MessageDisplay({ message }: MessageDisplayProps) {
  if (!message) {
    return null;
  }

  return (
    <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
      {message}
    </div>
  );
}