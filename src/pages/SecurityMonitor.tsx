import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, RefreshCw, Lock } from 'lucide-react';
import { useSecurityMonitor } from '@/hooks/useSecurityMonitor';
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

export default function SecurityMonitor() {
  const { metrics, isScanning, overallSecurity, rescan } = useSecurityMonitor();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'alert': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'secure': return 'bg-green-500/10 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'alert': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  const getOverallIcon = () => {
    switch (overallSecurity) {
      case 'secure': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'alert': return AlertTriangle;
      default: return Shield;
    }
  };

  const OverallIcon = getOverallIcon();

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
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              <span className="neon-text-cyan">Security</span>{' '}
              <span className="text-foreground">Monitor</span>
            </h1>
            <p className="text-muted-foreground">
              Real-time security status and system integrity monitoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NeonButton 
            variant="purple" 
            onClick={rescan}
            disabled={isScanning}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Rescan Security'}
          </NeonButton>
        </div>
      </motion.header>

      {/* Overall Security Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card neon-border p-6 lg:p-8 mb-8"
      >
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusBg(overallSecurity)}`}>
            <OverallIcon className={`w-8 h-8 ${getStatusColor(overallSecurity)}`} />
          </div>
          
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold mb-2">
              Overall Security Status
            </h2>
            <p className="text-muted-foreground mb-2">
              {overallSecurity === 'secure' && 'All security checks passed. Your system is secure.'}
              {overallSecurity === 'warning' && 'Some security recommendations available. Review warnings below.'}
              {overallSecurity === 'alert' && 'Security issues detected. Immediate attention required.'}
            </p>
            <div className={`text-sm font-medium ${getStatusColor(overallSecurity)}`}>
              Status: {overallSecurity.toUpperCase()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              variants={itemVariants}
            >
              <Card className={`glass-card neon-border p-6 ${getStatusBg(metric.status)}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-display font-semibold mb-1">{metric.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{metric.description}</p>
                    <div className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Security Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-card neon-border p-6"
      >
        <h3 className="font-display text-lg font-semibold mb-4">Security Best Practices</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Always use HTTPS connections for secure data transmission</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep your browser updated for latest security patches</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Enable browser privacy features for enhanced protection</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Regular security scans help maintain system integrity</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
