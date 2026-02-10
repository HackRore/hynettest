import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost, categoryColors } from '@/types/blog';
import { Card } from '@/components/ui/card';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const categoryColor = categoryColors[post.category];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card neon-border h-full group cursor-pointer overflow-hidden">
        <Link to={`/field-notes/${post.slug}`}>
          <div className="p-6 h-full flex flex-col">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </div>
              </div>
              <div className="font-medium">
                {post.author}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
