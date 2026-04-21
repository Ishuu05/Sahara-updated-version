import { DISASTER_QA, QAPair } from '../data/disasterQA';

export function findOfflineAnswer(query: string): string {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 3);
  
  let best = { score: 0, answer: '', category: '' };
  
  // Scoring weights
  for (const qa of DISASTER_QA) {
    let score = 0;
    
    // Exact phrase match in question (highest priority)
    if (q.includes(qa.question.toLowerCase())) {
      score += 15;
    }

    // Keyword matches (very high priority)
    const keywordMatches = qa.keywords.filter(k => q.includes(k.toLowerCase())).length;
    score += keywordMatches * 5;
    
    // Question word matches (medium priority)
    const questionWordMatches = words.filter(w => qa.question.toLowerCase().includes(w)).length;
    score += questionWordMatches * 2;
    
    if (score > best.score) {
      best = { score, answer: qa.answer, category: qa.category };
    }
  }
  
  // CATEGORY FALLBACK ADVICE
  const CATEGORY_ADVICE: Record<string, string> = {
    flood: "FLOOD SAFETY: Move to higher ground immediately. Do not walk or drive through water. Turn off electricity if safe. Call 112 for rescue.",
    earthquake: "EARTHQUAKE SAFETY: Drop, Cover, and Hold On. Stay away from windows and falling objects. Stay outside if already there. Call 112.",
    medical: "MEDICAL EMERGENCY: Call 108 immediately. Keep the victim still and warm. Do not give food or water if unconscious. Apply pressure to bleeding.",
    water: "WATER SAFETY: Drink only bottled or boiled water. Use 8 drops of bleach per gallon if necessary. Avoid contact with floodwater.",
    food: "FOOD SAFETY: Avoid food that touched floodwater. Check for spoilage or strange smells. Use ORS for dehydration. Keep food covered.",
    cyclone: "CYCLONE SAFETY: Stay indoors in a strong room. Stay away from windows. Listen to radio for updates. Do not go outside during the calm eye.",
    general: "GENERAL SAFETY: Stay calm. Keep an emergency kit ready with water, food, and radio. Follow authority instructions. Call 112 for help."
  };

  if (best.score < 3) {
    // Detect category from query anyway to give relevant general advice
    const detectedCategory = DISASTER_QA.find(qa => 
      qa.keywords.some(k => q.includes(k.toLowerCase()))
    )?.category || 'general';

    return CATEGORY_ADVICE[detectedCategory] + "\n\n_(I couldn't find a specific answer, but here is general advice for your situation. Please stay safe!)_";
  }
  
  return best.answer + '\n\n_(Offline response)_';
}
