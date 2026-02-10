import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Calendar, Tag } from 'lucide-react';
import { useState, useMemo } from 'react';
import { blogPosts } from '@/data/blogPosts';
import { BlogPost, BlogCategory, BlogFilter, categoryColors } from '@/types/blog';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { Card } from '@/components/ui/card';

const categories: BlogCategory[] = [
  'Windows',
  'Intune & MDM',
  'BIOS & Firmware',
  'Hardware Diagnostics',
  'Myth Busting',
  'Technician Tips'
];

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

export default function FieldNotesLanding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(undefined);
    setSelectedTag(undefined);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center neon-glow-cyan">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
              <span className="neon-text-cyan">HackRore</span>{' '}
              <span className="text-foreground">Field Notes</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Real-world hardware, Windows, and device-management issues faced by technicians, focusing on analysis, common myths, and ethical solutions.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search field notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value as BlogCategory || undefined)}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <NeonButton variant="cyan" onClick={clearFilters}>
              Clear Filters
            </NeonButton>
          </div>
        </div>
      </motion.header>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card neon-border p-6 mb-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-display text-2xl font-bold neon-text-cyan">{blogPosts.length}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold neon-text-green">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold neon-text-purple">{allTags.length}</div>
            <div className="text-sm text-muted-foreground">Unique Tags</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold neon-text-orange">{filteredPosts.length}</div>
            <div className="text-sm text-muted-foreground">Filtered Results</div>
          </div>
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Categories:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? undefined : category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === category
                  ? categoryColors[category]
                  : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {filteredPosts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="glass-card neon-border p-8 max-w-md mx-auto">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find relevant content.
            </p>
            <NeonButton variant="cyan" onClick={clearFilters} className="mt-4">
              Clear All Filters
            </NeonButton>
          </div>
        </motion.div>
      )}

      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card neon-border p-6"
      >
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 12).map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
