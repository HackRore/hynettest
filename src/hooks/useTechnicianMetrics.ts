import { useState, useEffect } from 'react';
import { Cpu, HardDrive, Battery, Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';

export interface TechnicianMetric {
  id: string;
  name: string;
  status: 'critical' | 'warning' | 'good' | 'unknown';
  value: string;
  unit: string;
  recommendation: string;
  icon: typeof Cpu;
  category: 'hardware' | 'software' | 'security';
}

export function useTechnicianMetrics() {
  const [metrics, setMetrics] = useState<TechnicianMetric[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [overallHealth, setOverallHealth] = useState<'critical' | 'warning' | 'good'>('good');

  const runTechnicianScan = async () => {
    setIsScanning(true);
    
    // Simulate technician-grade diagnostics
    const scanResults: TechnicianMetric[] = [
      {
        id: 'cpu-health',
        name: 'CPU Load & Throttling',
        status: 'good',
        value: '15',
        unit: '% load',
        recommendation: 'CPU operating normally. No throttling detected.',
        icon: Cpu,
        category: 'hardware'
      },
      {
        id: 'storage-health',
        name: 'Storage I/O Response',
        status: 'warning',
        value: '125',
        unit: 'ms',
        recommendation: 'Slower than optimal response. Consider disk cleanup or replacement.',
        icon: HardDrive,
        category: 'hardware'
      },
      {
        id: 'battery-wear',
        name: 'Battery Wear Level',
        status: 'warning',
        value: '23',
        unit: '% wear',
        recommendation: 'Battery showing moderate wear. Monitor for replacement.',
        icon: Battery,
        category: 'hardware'
      },
      {
        id: 'thermal-behavior',
        name: 'System Temperature',
        status: 'good',
        value: '42',
        unit: '°C',
        recommendation: 'Normal operating temperature. No cooling issues detected.',
        icon: Thermometer,
        category: 'hardware'
      },
      {
        id: 'os-responsiveness',
        name: 'OS Responsiveness',
        status: 'good',
        value: '98',
        unit: '%',
        recommendation: 'System responding normally. No OS bottlenecks detected.',
        icon: CheckCircle,
        category: 'software'
      },
      {
        id: 'security-posture',
        name: 'Security Posture',
        status: 'critical',
        value: '2',
        unit: 'issues',
        recommendation: 'Security vulnerabilities detected. Immediate attention required.',
        icon: AlertTriangle,
        category: 'security'
      }
    ];

    // Simulate realistic scan time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setMetrics(scanResults);
    
    // Calculate overall health
    const criticalCount = scanResults.filter(m => m.status === 'critical').length;
    const warningCount = scanResults.filter(m => m.status === 'warning').length;
    
    if (criticalCount > 0) setOverallHealth('critical');
    else if (warningCount > 0) setOverallHealth('warning');
    else setOverallHealth('good');
    
    setIsScanning(false);
  };

  useEffect(() => {
    runTechnicianScan();
  }, []);

  const getMetricsByCategory = (category: 'hardware' | 'software' | 'security') => {
    return metrics.filter(m => m.category === category);
  };

  const getCriticalIssues = () => {
    return metrics.filter(m => m.status === 'critical');
  };

  const getActionableRecommendations = () => {
    return metrics
      .filter(m => m.status !== 'good')
      .map(m => `${m.name}: ${m.recommendation}`);
  };

  return {
    metrics,
    isScanning,
    overallHealth,
    runTechnicianScan,
    getMetricsByCategory,
    getCriticalIssues,
    getActionableRecommendations
  };
}
