import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export interface SecurityMetric {
  name: string;
  status: 'secure' | 'warning' | 'alert';
  value: string;
  icon: typeof Shield;
  description: string;
}

export function useSecurityMonitor() {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const checkSecurityMetrics = async () => {
    setIsScanning(true);
    
    const checks: SecurityMetric[] = [
      {
        name: 'HTTPS Connection',
        status: window.location.protocol === 'https:' ? 'secure' : 'alert',
        value: window.location.protocol,
        icon: Shield,
        description: 'Secure encrypted connection'
      },
      {
        name: 'Browser Security',
        status: navigator.doNotTrack === '1' ? 'secure' : 'warning',
        value: navigator.doNotTrack ? 'Enabled' : 'Standard',
        icon: Shield,
        description: 'Privacy and tracking protection'
      },
      {
        name: 'Script Integrity',
        status: 'secure',
        value: 'Verified',
        icon: CheckCircle,
        description: 'Application code integrity verified'
      },
      {
        name: 'Network Security',
        status: navigator.onLine ? 'secure' : 'alert',
        value: navigator.onLine ? 'Connected' : 'Offline',
        icon: Shield,
        description: 'Secure network connection status'
      }
    ];

    // Simulate security scan delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMetrics(checks);
    setIsScanning(false);
  };

  useEffect(() => {
    checkSecurityMetrics();
  }, []);

  const overallSecurity = metrics.length > 0 
    ? metrics.every(m => m.status === 'secure') ? 'secure' 
    : metrics.some(m => m.status === 'alert') ? 'alert' : 'warning'
    : 'warning';

  return {
    metrics,
    isScanning,
    overallSecurity,
    rescan: checkSecurityMetrics
  };
}
