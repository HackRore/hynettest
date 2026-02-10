import { motion } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  Battery, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Wrench,
  FileText,
  Download,
  RefreshCw
} from 'lucide-react';
import { useTechnicianMetrics } from '@/hooks/useTechnicianMetrics';
import { NeonButton } from '@/components/ui/NeonButton';
import { Card } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TechnicianDashboard() {
  const { 
    metrics, 
    isScanning, 
    overallHealth, 
    runTechnicianScan, 
    getMetricsByCategory, 
    getCriticalIssues, 
    getActionableRecommendations 
  } = useTechnicianMetrics();

  const hardwareMetrics = getMetricsByCategory('hardware');
  const softwareMetrics = getMetricsByCategory('software');
  const securityMetrics = getMetricsByCategory('security');
  const criticalIssues = getCriticalIssues();
  const recommendations = getActionableRecommendations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/10 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'critical': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  const getOverallIcon = () => {
    switch (overallHealth) {
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Activity;
    }
  };

  const OverallIcon = getOverallIcon();

  const generateReport = () => {
    // Generate technician report
    const report = {
      timestamp: new Date().toISOString(),
      overallHealth,
      criticalIssues: criticalIssues.length,
      recommendations,
      metrics: metrics.map(m => ({
        name: m.name,
        status: m.status,
        value: m.value,
        unit: m.unit,
        recommendation: m.recommendation
      }))
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackrore-diagnostic-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center neon-glow-cyan">
            <Wrench className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              <span className="neon-text-cyan">Technician</span>{' '}
              <span className="text-foreground">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Professional diagnostic and security analysis for system specialists
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NeonButton 
            variant="purple" 
            onClick={runTechnicianScan}
            disabled={isScanning}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning System...' : 'Run Full Diagnostic'}
          </NeonButton>
          <NeonButton variant="green" onClick={generateReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </NeonButton>
        </div>
      </motion.header>

      {/* Overall System Health */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card neon-border p-6 lg:p-8 mb-8 ${getStatusBg(overallHealth)}`}
      >
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusBg(overallHealth)}`}>
            <OverallIcon className={`w-8 h-8 ${getStatusColor(overallHealth)}`} />
          </div>
          
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold mb-2">
              System Health Status
            </h2>
            <p className="text-muted-foreground mb-2">
              {overallHealth === 'good' && 'All systems operating within normal parameters.'}
              {overallHealth === 'warning' && 'Some issues detected. Review recommendations below.'}
              {overallHealth === 'critical' && 'Critical issues found. Immediate attention required.'}
            </p>
            <div className={`text-sm font-medium ${getStatusColor(overallHealth)}`}>
              Status: {overallHealth.toUpperCase()} • {criticalIssues.length} Critical Issues
            </div>
          </div>
        </div>
      </motion.div>

      {/* Critical Issues Alert */}
      {criticalIssues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card neon-border p-6 mb-8 bg-red-500/10 border-red-500/20"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="font-display text-lg font-semibold mb-2 text-red-500">
                Critical Issues Detected
              </h3>
              <ul className="space-y-1 text-sm">
                {criticalIssues.map(issue => (
                  <li key={issue.id} className="text-muted-foreground">
                    <span className="text-red-500 font-medium">{issue.name}:</span> {issue.recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Diagnostic Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Hardware Diagnostics */}
        <motion.section variants={itemVariants}>
          <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
            🔧 Hardware Diagnostics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hardwareMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.id} className={`glass-card neon-border p-5 ${getStatusBg(metric.status)}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold mb-1">{metric.name}</h3>
                      <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value} {metric.unit}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{metric.recommendation}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.section>

        {/* Software Health */}
        <motion.section variants={itemVariants}>
          <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
            💻 Software & OS Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {softwareMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.id} className={`glass-card neon-border p-5 ${getStatusBg(metric.status)}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold mb-1">{metric.name}</h3>
                      <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value} {metric.unit}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{metric.recommendation}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.section>

        {/* Security Monitor */}
        <motion.section variants={itemVariants}>
          <h2 className="font-display text-lg font-semibold mb-4 text-muted-foreground">
            🔐 Security & Integrity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.id} className={`glass-card neon-border p-5 ${getStatusBg(metric.status)}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold mb-1">{metric.name}</h3>
                      <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value} {metric.unit}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{metric.recommendation}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.section>
      </motion.div>

      {/* Actionable Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 glass-card neon-border p-6"
        >
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Technician Recommendations
          </h3>
          <ul className="space-y-2 text-sm">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
