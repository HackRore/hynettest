import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Lightbulb, Shield, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BlogPostContentProps {
  title: string;
  content: {
    problemOverview: string;
    commonAttempts: string;
    technicalReality: string;
    safeResolution: string;
    technicianAdvice: string;
    verdict: string;
  };
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function BlogPostContent({ title, content }: BlogPostContentProps) {
  const sections = [
    {
      icon: AlertTriangle,
      title: 'Problem Overview',
      content: content.problemOverview,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: Info,
      title: 'Common Attempts / Myths',
      content: content.commonAttempts,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: BookOpen,
      title: 'Technical Reality',
      content: content.technicalReality,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Shield,
      title: 'Safe & Legal Resolution',
      content: content.safeResolution,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Lightbulb,
      title: 'Technician Advice',
      content: content.technicianAdvice,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: CheckCircle,
      title: 'Verdict / Summary',
      content: content.verdict,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
          <span className="neon-text-cyan">{title}</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg">
            Technical analysis and ethical troubleshooting guidance for system professionals
          </p>
        </div>
      </motion.div>

      {/* Content Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <motion.section
            key={section.title}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass-card neon-border p-6 lg:p-8 ${section.bgColor}`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.bgColor}`}>
                  <Icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <h2 className="font-display text-xl font-bold">
                  {section.title}
                </h2>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="text-foreground leading-relaxed">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          </motion.section>
        );
      })}

      {/* Safety Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card neon-border p-6 bg-red-500/5 border-red-500/20"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-display text-lg font-semibold mb-2 text-red-500">
              Safety & Ethics Notice
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site focuses on technical analysis and ethical troubleshooting. It does not provide bypass techniques for security controls. 
              All content is intended for legitimate system administration, repair, and educational purposes only. 
              Always follow applicable laws, organizational policies, and ethical guidelines when working with computer systems.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
