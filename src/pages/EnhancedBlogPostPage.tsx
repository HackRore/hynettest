import { useParams } from 'react-router-dom';
import { enhancedBlogPosts } from '@/data/enhancedBlogPosts';
import { EnhancedBlogPostContent } from '@/components/blog/EnhancedBlogPostContent';
import { NeonButton } from '@/components/ui/NeonButton';
import { ArrowLeft, Calendar, Clock, Monitor, HardDrive, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnhancedBlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const post = enhancedBlogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The field note you're looking for doesn't exist.</p>
          <Link to="/field-notes">
            <NeonButton variant="cyan">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Field Notes
            </NeonButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Navigation Header */}
      <div className="mb-8">
        <Link to="/field-notes">
          <NeonButton variant="cyan">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Field Notes
          </NeonButton>
        </Link>
      </div>

      {/* Post Content */}
      <EnhancedBlogPostContent 
        title={post.title} 
        content={post.content} 
        difficulty={post.difficulty}
        affectedDevices={post.affectedDevices}
        affectedOS={post.os}
      />

      {/* Post Meta */}
      <div className="mt-12 glass-card neon-border p-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Published: {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              {post.os.join(', ')}
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              {post.affectedDevices.length} device types
            </div>
          </div>
          <div>
            Author: {post.author}
          </div>
        </div>
      </div>
    </div>
  );
}
