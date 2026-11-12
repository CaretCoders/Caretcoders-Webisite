import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { loadPublications } from '../utils/contentLoader';
import { BlogPost } from '../types';
import { Search, Clock, Calendar, ChevronRight, X, ArrowLeft, BookOpen, Share2, Check, ExternalLink, Link2 } from 'lucide-react';
import Markdown from 'react-markdown';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const publications = loadPublications();
  const categories = ['All', 'Software Engineering', 'AI & Automation', 'SaaS Development', 'Mobile Development', 'Startup Insights'];

  const filteredPosts = publications.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = publications.find(p => p.featured) || publications[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#EBEFEE] py-16 sm:py-24 text-[#4A413C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
            Publications & Engineering Memos
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#4A413C]">
            Research & Systems Papers
          </h1>
          <p className="text-sm sm:text-base text-[#746860] leading-relaxed">
            In-depth technical architecture breakdowns, field telemetry findings, cryptographic invariants, and venture operating memos.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#948880] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research papers, algorithms, tags..."
              className="w-full bg-white border border-[#DED8D0] rounded-md pl-10 pr-4 py-2 text-xs sm:text-sm text-[#4A413C] focus:outline-none focus:border-[#BB6C43] transition-colors placeholder:text-[#948880]/60"
            />
          </div>

          <div className="flex flex-wrap gap-1 p-1 rounded-md bg-[#F3EFEA] border border-[#DED8D0] self-start md:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-[#4A413C] shadow-sm border border-[#DED8D0]'
                    : 'text-[#746860] hover:text-[#4A413C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Publication Hero Banner */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div
            className="studio-surface rounded-lg p-6 sm:p-10 lg:p-12 space-y-6 group cursor-pointer"
            onClick={() => setSelectedPost(featuredPost)}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[#948880]">
              <span className="font-semibold text-[#C8906D]">FEATURED RESEARCH</span>
              <span aria-hidden="true">·</span>
              <span>{featuredPost.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
            </div>

            <div className="space-y-3 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#4A413C] group-hover:text-[#BB6C43] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-sm sm:text-base text-[#746860] leading-relaxed line-clamp-3">
                {featuredPost.summary}
              </p>
            </div>

            {featuredPost.image && (
              <div className="w-full max-h-72 overflow-hidden rounded-md border border-[#DED8D0]">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DED8D0]">
              <div className="flex items-center space-x-3">
                <img 
                  src={featuredPost.author.avatar} 
                  alt={featuredPost.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#DED8D0]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-medium text-xs text-[#4A413C] block">{featuredPost.author.name}</span>
                  <span className="text-[11px] text-[#948880] block">{featuredPost.author.role}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {featuredPost.referenceUrl && (
                  <span className="text-xs font-mono text-[#C8906D] flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Has Reference Paper</span>
                  </span>
                )}
                <span className="studio-link text-xs sm:text-sm">
                  <span>Read Full Paper</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Publications Grid or Empty State */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="studio-surface rounded-lg p-6 sm:p-7 flex flex-col justify-between space-y-6 group cursor-pointer hover:border-[#BB6C43] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#948880] border-b border-[#DED8D0] pb-2.5">
                    <span className="text-[#C8906D] font-medium">{post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>

                  {post.image && (
                    <div className="w-full h-40 overflow-hidden rounded-md border border-[#DED8D0]">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold tracking-tight text-[#4A413C] group-hover:text-[#BB6C43] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#746860] leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Clean unboxed tags with · separators */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs font-mono text-[#C8906D]">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        {tIdx > 0 && <span aria-hidden="true" className="text-[#948880]">·</span>}
                        <span>#{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#DED8D0] text-xs">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#DED8D0]"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] text-[#948880]">{post.author.name}</span>
                  </div>

                  <span className="studio-link text-xs">
                    <span>Read Paper</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="studio-surface rounded-lg p-12 sm:p-16 text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center mx-auto text-[#BB6C43]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-semibold text-[#4A413C] tracking-tight">
                No Publications Available
              </h3>
              <p className="text-xs sm:text-sm text-[#746860] max-w-md mx-auto leading-relaxed">
                Research papers, technical whitepapers, and engineering memos will be published here as projects conclude their respective review cycles.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Full Paper Reading View Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="studio-surface rounded-lg max-w-3xl w-full p-6 sm:p-10 space-y-8 max-h-[90vh] overflow-y-auto text-[#4A413C]"
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between border-b border-[#DED8D0] pb-4">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center space-x-1.5 text-xs text-[#746860] hover:text-[#4A413C] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Publications</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded hover:bg-[#F3EFEA] text-[#746860] hover:text-[#4A413C] transition-colors text-xs flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-[#BB6C43]" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded hover:bg-[#F3EFEA] text-[#746860] hover:text-[#4A413C] transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#948880]">
                  <span className="uppercase text-[#C8906D] font-medium">{selectedPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#4A413C]">
                  {selectedPost.title}
                </h1>

                {/* Author Card & Reference Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#F8F6F3] rounded border border-[#DED8D0]">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#DED8D0]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#4A413C] block">{selectedPost.author.name}</span>
                      <span className="text-[11px] text-[#948880] block">{selectedPost.author.role}</span>
                    </div>
                  </div>

                  {selectedPost.referenceUrl && (
                    <a
                      href={selectedPost.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white border border-[#DED8D0] text-xs font-mono text-[#BB6C43] hover:border-[#BB6C43] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Paper Reference / Citation</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Banner / Diagram Image (if available) */}
              {selectedPost.image && (
                <div className="w-full max-h-96 overflow-hidden rounded-md border border-[#DED8D0]">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Markdown Content */}
              <div className="text-sm sm:text-base text-[#4A413C] leading-relaxed space-y-4 font-normal">
                <div className="markdown-body">
                  <Markdown>{selectedPost.content}</Markdown>
                </div>
              </div>

              {/* Tags & Footer */}
              <div className="pt-6 border-t border-[#DED8D0] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#C8906D]">
                  {selectedPost.tags.map((t, idx) => (
                    <React.Fragment key={t}>
                      {idx > 0 && <span aria-hidden="true" className="text-[#948880]">·</span>}
                      <span>#{t}</span>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  {selectedPost.referenceUrl && (
                    <a
                      href={selectedPost.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-btn-secondary flex items-center space-x-1 text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Reference</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="studio-btn-primary"
                  >
                    Close Document
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
