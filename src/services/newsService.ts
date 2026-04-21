export interface NewsArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source_id: string;
}

const NEWS_CACHE_KEY = 'sahara_news_cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const FALLBACK_NEWS: NewsArticle[] = [
  {
    title: "NDMA Issues Guidelines for Monsoon Preparedness 2024",
    description: "The National Disaster Management Authority has released a comprehensive guide for states and citizens to prepare for the upcoming monsoon season.",
    link: "https://ndma.gov.in",
    pubDate: "2024-05-15",
    source_id: "NDMA"
  },
  {
    title: "IMD Forecasts Above-Normal Rainfall for Western Coast",
    description: "The India Meteorological Department predicts high intensity rainfall for Maharashtra, Goa and Karnataka coastal regions this month.",
    link: "https://mausam.imd.gov.in",
    pubDate: "2024-05-20",
    source_id: "IMD"
  },
  {
    title: "Government Activates Emergency Response Teams in Flood-Prone Districts",
    description: "State governments have deployed NDRF and SDRF teams to vulnerable areas as a primary precautionary measure.",
    link: "#",
    pubDate: "2024-05-21",
    source_id: "State Government"
  },
  {
    title: "Red Cross Deploys 500 Volunteers for Disaster Relief Operations",
    description: "Volunteers have been trained in first aid and emergency shelter management to support local authorities.",
    link: "https://indianredcross.org",
    pubDate: "2024-05-22",
    source_id: "Red Cross"
  },
  {
    title: "New Early Warning System Installed in 12 Coastal Districts",
    description: "The multi-hazard warning system will provide real-time alerts to village panchayats and local communities.",
    link: "#",
    pubDate: "2024-05-22",
    source_id: "Tech Desk"
  }
];

export async function fetchNews(): Promise<NewsArticle[]> {
  const cached = localStorage.getItem(NEWS_CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  try {
    const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
    if (!apiKey) throw new Error('NewsData API Key missing');
    
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&category=top&language=en`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('News API failed');
    const result = await response.json();

    const articles = result.results.map((r: any) => ({
      title: r.title,
      description: r.description,
      link: r.link,
      pubDate: r.pubDate,
      source_id: r.source_id
    }));

    localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({
      data: articles,
      timestamp: Date.now()
    }));

    return articles;
  } catch (error) {
    console.warn("News Service failing - using fallback:", error);
    return FALLBACK_NEWS;
  }
}
