// Example texts for quick loading
const examples = {
  ai: "This essay investigates the multifaceted implications of artificial intelligence on modern healthcare infrastructure. The systematic integration of machine learning algorithms has demonstrated significant potential in optimizing diagnostic accuracy and treatment protocols. Furthermore, the implementation of predictive analytics enables healthcare providers to enhance patient outcomes while simultaneously reducing operational costs. The comprehensive analysis reveals that these methodologies represent a paradigm shift in medical decision-making processes.",
  human: "idk man today was just… weird like nothing went how i thought it would?? but also not like totally bad just kinda off you know? my boss was being super passive aggressive and i definitely stress-ate like half a bag of chips at my desk lmaooo. anyway hope tomorrow's better ig. anyone else feel like mondays should just be optional at this point lol",
  academic: "This study investigates the performance analysis of human peripheral blood cells and the chemical composition of results obtained through standardized laboratory procedures. Systematic data collection methods were employed across multiple experimental iterations to ensure reproducibility of findings. The results demonstrate a statistically significant correlation between sample preparation techniques and subsequent analytical outcomes."
};

// Token lists used for classification
const AI_TOKENS = [
  "systematic","implementation","furthermore","demonstrates","significant",
  "optimizing","infrastructure","multifaceted","protocols","simultaneously",
  "analyzing","comprehensive","utilizing","methodology","examination",
  "paradigm","integration","furthermore","leveraging","robust","facilitate",
  "streamline","holistic","crucial","pivotal","transformative","innovative",
  "strategic","ensure","moreover","additionally","nevertheless","consequently",
  "therefore","subsequently"
];

const HUMAN_TOKENS = [
  "idk","lol","omg","tbh","ngl","kinda","gonna","wanna","stuff","thing",
  "like","just","really","super","totally","honestly","literally","basically",
  "anyway","pretty","sorta","maybe","actually","literally","ughhh","lmao",
  "lmaooo","ig","wait","omg","btw","smh","haha","ahh","ugh","okay","ok",
  "yeah","yep","nope","nah","hmm"
];

const STOP_WORDS = new Set([
  "the","a","an","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","could","should","may","might",
  "must","shall","to","of","in","for","on","with","at","by","from","as",
  "into","through","during","before","after","above","below","between",
  "out","off","over","under","again","further","then","once","here","there",
  "when","where","why","how","all","both","each","few","more","most","other",
  "some","such","no","nor","not","only","own","same","so","than","too",
  "very","just","about","against","during","i","you","he","she","it","we",
  "they","this","that","these","those","and","but","or","if","while",
  "although","because","since","though","unless","until","what","which",
  "who","whom","whose","my","your","his","her","its","our","their","me",
  "him","us","them"
]);
