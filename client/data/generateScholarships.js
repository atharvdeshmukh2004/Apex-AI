const categories = ["Any", "SC", "ST", "OBC", "EWS", "Girls", "PWD"];
const educationLevels = ["10th", "12th", "Engineering", "Graduation"];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomScholarshipName(level) {
  const prefixes = [
    "National",
    "Global",
    "Prime",
    "EduAid",
    "BrightFuture",
    "Vidyadhan",
    "Inspire",
    "SkillUp",
    "DreamIndia",
    "Hope",
  ];
  const suffixes = ["Fellowship", "Scholarship", "Yojana", "Fund", "Program"];
  return `${randomChoice(prefixes)} ${level} ${randomChoice(suffixes)}`;
}

export function generateScholarships() {
  const data = [];
  let id = 1;

  educationLevels.forEach((level) => {
    for (let i = 0; i < 1000; i++) {
      const minPercentage = Math.floor(Math.random() * 30) + 50; // 50–80%
      const maxIncome = Math.floor(Math.random() * 10) * 100000 + 200000; // 2L–12L
      const category = randomChoice(categories);
      const name = randomScholarshipName(level);
      const link = "https://scholarships.gov.in/";

      data.push({
        id: id++,
        name,
        educationLevel: level,
        minPercentage,
        maxIncome,
        category,
        link,
      });
    }
  });

  return data;
}
