import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const [
    behind,
    caseStudies,
    design,
    forBusiness,
    guides,
    portfolios,
  ] = await Promise.all([
    getCollection('behind-the-build'),
    getCollection('case-studies'),
    getCollection('design'),
    getCollection('for-business'),
    getCollection('guides'),
    getCollection('portfolios'),
  ]);

  const posts = [
    ...behind,
    ...caseStudies,
    ...design,
    ...forBusiness,
    ...guides,
    ...portfolios,
  ];

  return rss({
    title: '24 Hour Journey',
    description: 'Articles, guides, case studies, and design insights.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${post.collection}/${post.id}/`,
      })),
  });
}