import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/constants/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.davidfajardo.space";
  const currentDate = new Date();

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Individual plan detail pages
  const planPages: MetadataRoute.Sitemap = [
    "student",
    "starter",
    "pro",
    "enterprise",
    "custom",
  ].map((plan) => ({
    url: `${baseUrl}/store/pricing/${plan}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Store pages
    {
      url: `${baseUrl}/store`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/store/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...planPages,
    {
      url: `${baseUrl}/schedule`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
