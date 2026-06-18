'use client';

import { useEffect, useState } from 'react';

interface AutoDismissMessageProps {
  message: string;
  durationMs?: number;
  className?: string;
}

export function AutoDismissMessage({
  message,
  durationMs = 2000,
  className,
}: AutoDismissMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(id);
  }, [durationMs]);

  if (!visible) return null;

  return <p className={className}>{message}</p>;
}
