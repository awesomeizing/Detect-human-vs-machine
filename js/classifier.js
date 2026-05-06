/**
 * classifier.js
 * Core NLP classification logic: tokenization + scoring.
 */

/**
 * Tokenize input text, removing stop words and punctuation.
 * @param {string} text
 * @returns {string[]}
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z'\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Classify the given text as AI-generated or human-written.
 * @param {string} text
 * @returns {{ isAI: boolean, conf: number, aiPct: number, aiFound: string[], humanFound: string[], words: number, avgLen: string, tokenCount: number }}
 */
function classify(text) {
  const tokens = tokenize(text);
  let aiScore = 0, humanScore = 0;
  const aiFound = [], humanFound = [];

  tokens.forEach(tok => {
    const cleanTok = tok.replace(/'/g, '');

    if (AI_TOKENS.some(a => cleanTok.includes(a.slice(0, 6)) || a.includes(cleanTok.slice(0, 6)))) {
      aiScore += 2;
      if (!aiFound.includes(cleanTok) && aiFound.length < 8) aiFound.push(cleanTok);
    }

    if (HUMAN_TOKENS.some(h => cleanTok === h)) {
      humanScore += 3;
      if (!humanFound.includes(cleanTok) && humanFound.length < 8) humanFound.push(cleanTok);
    }
  });

  // Average word length heuristic
  const avgLen = tokens.reduce((s, w) => s + w.length, 0) / (tokens.length || 1);
  if (avgLen > 7) aiScore += 4;
  if (avgLen > 9) aiScore += 3;
  if (avgLen < 5) humanScore += 5;

  // Sentence length heuristic
  const sents = text.split(/[.!?]+/).filter(s => s.trim().length > 3);
  const avgSent = tokens.length / (sents.length || 1);
  if (avgSent > 18) aiScore += 3;
  if (avgSent < 8)  humanScore += 3;

  const totalScore = aiScore + humanScore;
  const aiPct = totalScore > 0 ? aiScore / totalScore : 0.5;
  const isAI = aiPct >= 0.5;
  const conf = Math.max(52, Math.min(97,
    Math.round((isAI ? 0.45 + aiPct * 0.6 : 0.45 + (1 - aiPct) * 0.6) * 100)
  ));

  return {
    isAI,
    conf,
    aiPct: Math.round(aiPct * 100),
    aiFound,
    humanFound,
    words: tokens.length,
    avgLen: avgLen.toFixed(1),
    tokenCount: aiFound.length + humanFound.length
  };
}
