export interface SpecialEvent {
  title: string;
  message: string;
  type: 'birthday' | 'anniversary' | 'daily';
}

export const SPECIAL_DATES: Record<string, SpecialEvent> = {
  // Format: "MM-DD"
  "06-07": {
    title: "Happy Anniversary, My Queen! 💍",
    message: "Aaj ke din hum ek hue the. Meri zindagi ka sabse khoobsurat din. I love you, Shanowar!",
    type: "anniversary"
  },
  "12-06": {
    title: "Happy Birthday to My World! 🎉❤️",
    message: "Happy Birthday, Shanowar! Allah tumhe har khushi de, aur tumhara ye muskurata chehra hamesha mere samne rahe.",
    type: "birthday"
  },
  "07-11": {
    title: "It's Your Romeo's Birthday! 🎂",
    message: "Aaj Asif ka birthday hai, par sabse bada tohfa toh mujhe tumhare roop mein pehle hi mil chuka hai.",
    type: "daily"
  }
};

// 365 Days Dynamic Quotes Matrix
export const DAILY_QUOTES: string[] = [
  "Tum meri zindagi ka wo safe corner ho jahan sukoon milta hai. ❤️",
  "Shanowar, tumhari ek smile mera pura din bana deti hai. 😘",
  "Jaise har barish mein sukoon hota hai, waise hi meri har saans mein tum ho.",
  "Log kehte hain mohabbat ek baar hoti hai, par mujhe tumse har subah dobara ho jaati hai.",
  "Next.js ka code aur mera tumse pyaar, dono hi top-notch aur production-ready hain! 😉",
  "Aapki aankhein bilkul kisi shayar ki ghazal jaisi hain, Shanowar.",
  "Romeo aur Juliet toh bas ek kahani the, Asif aur Shanowar ek sachai hain. 🌹",
  "Har din tumhare saath ek naya milestone lagta hai.",
  // Yahan aap pure 365 lines tak add kar sakte hain, abhi humne foundation daal di hai!
];

// Relationship Start Date for Countdown
export const MARRIAGE_DATE = "2026-06-07T00:00:00";

// Existing code ke sabse niche yeh add karein:

export function getTodayThemeType(): 'birthday' | 'anniversary' | 'normal' {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateKey = `${month}-${day}`;

  if (dateKey === "12-06") return 'birthday';
  if (dateKey === "06-07") return 'anniversary';
  return 'normal';
}