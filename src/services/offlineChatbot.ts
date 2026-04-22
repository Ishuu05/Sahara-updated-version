import { DISASTER_QA, QAPair } from '../data/disasterQA';

export function findOfflineAnswer(query: string, qaData: QAPair[] = DISASTER_QA): string {
  const q = query.toLowerCase().trim()
  const queryWords = q.split(/\s+/).filter(w => w.length > 2)
  
  let scored = qaData.map(qa => {
    let score = 0
    // Exact keyword matches (highest weight)
    qa.keywords.forEach(keyword => {
      if (q.includes(keyword.toLowerCase())) score += 10
    })
    // Question word matches
    queryWords.forEach(word => {
      if (qa.question.toLowerCase().includes(word)) score += 3
      qa.keywords.forEach(k => {
        if (k.toLowerCase().includes(word) || word.includes(k.toLowerCase())) score += 2
      })
    })
    // Category boost
    if (qa.category && q.includes(qa.category.toLowerCase())) score += 8
    
    // Exact question match
    if (q === qa.question.toLowerCase()) score += 50

    return { qa, score }
  })
  
  scored.sort((a, b) => b.score - a.score)
  
  // Set a threshold for matching
  if (scored[0].score < 5) {
    return "I am Sahara AI, your emergency assistant. I'm trained to help with floods, earthquakes, medical emergencies, and survival in India. \n\nI couldn't find a specific match for your question in my offline database. For any immediate danger, please call **112**. \n\nCan you try asking about a specific emergency like 'How to treat a burn' or 'Flood safety'?"
  }
  
  // Return top match
  return scored[0].qa.answer + "\n\n_(Offline response — based on pre-loaded emergency data)_"
}
