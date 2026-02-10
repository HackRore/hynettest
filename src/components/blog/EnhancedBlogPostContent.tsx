import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Lightbulb, Shield, BookOpen, Terminal, Monitor, HardDrive, Cpu, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { EnhancedBlogContent } from '@/types/enhancedBlog';

interface EnhancedBlogPostContentProps {
  title: string;
  content: EnhancedBlogContent;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  affectedDevices: string[];
  affectedOS: string[];
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function EnhancedBlogPostContent({ title, content, difficulty, affectedDevices, affectedOS }: EnhancedBlogPostContentProps) {
  const sections = [
    {
      icon: AlertTriangle,
      title: 'Problem Overview',
      content: content.problemTitle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      isCodeBlock: false
    },
    {
      icon: Info,
      title: 'Symptoms Observed',
      content: content.symptomsObserved,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      isCodeBlock: false
    },
    {
      icon: BookOpen,
      title: 'Root Cause Analysis',
      content: content.rootCauseAnalysis,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      isCodeBlock: false
    },
    {
      icon: Terminal,
      title: 'Step-by-Step Diagnosis',
      content: content.stepByStepDiagnosis,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      isCodeBlock: true
    },
    {
      icon: Monitor,
      title: 'Commands & Tools Used',
      content: content.commandsToolsUsed.join('\n'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      isCodeBlock: true
    },
    {
      icon: Shield,
      title: 'Final Resolution',
      content: content.finalResolution,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      isCodeBlock: false
    },
    {
      icon: Lightbulb,
      title: 'Prevention & Best Practices',
      content: content.preventionBestPractices.join('\n'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      isCodeBlock: false
    }
  ];

  const renderContent = (section: any) => {
    if (section.isCodeBlock) {
      if (Array.isArray(section.content)) {
        return (
          <div className="space-y-4">
            {Object.entries(section.content).map(([key, commands]) => {
              if (!Array.isArray(commands) || commands.length === 0) return null;
              
              return (
                <div key={key}>
                  <h4 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">
                    {key.toUpperCase()}
                  </h4>
                  <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm">
                    {commands.map((command, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <code className="text-green-400">{command}</code>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      } else {
        return (
          <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm">
            <code className="text-green-400">{section.content}</code>
          </div>
        );
      }
    } else {
      if (Array.isArray(section.content)) {
        return (
          <ul className="space-y-2">
            {section.content.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <div className="text-foreground leading-relaxed">
            {section.content.split('\n\n').map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        );
      }
    }
  };

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
          <p className="text-muted-foreground text-lg mb-4">
            Professional technician troubleshooting guide with step-by-step diagnosis
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                difficulty === 'Beginner' ? 'bg-green-500/10 text-green-500' :
                difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>{affectedOS.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              <span>{affectedDevices.length} device types</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Affected Devices & OS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card neon-border p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              Affected Operating Systems
            </h3>
            <div className="flex flex-wrap gap-2">
              {affectedOS.map((os) => (
                <span
                  key={os}
                  className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {os}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" />
              Affected Devices
            </h3>
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
              {affectedDevices.map((device) => (
                <span
                  key={device}
                  className="inline-flex items-center px-3 py-1 bg-muted rounded text-sm text-muted-foreground"
                >
                  {device}
                </span>
              ))}
            </div>
          </div>
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
                {renderContent(section)}
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
