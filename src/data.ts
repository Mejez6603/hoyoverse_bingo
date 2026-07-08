export interface Character {
  name: string;
  game: string;
  img?: string;
  color: string;
}

export const genshinNames = [
  // Mondstadt
  { name: "Albedo", region: "Mondstadt" },
  { name: "Alice", region: "Mondstadt" },
  { name: "Amber", region: "Mondstadt" },
  { name: "Barbara", region: "Mondstadt" },
  { name: "Bennett", region: "Mondstadt" },
  { name: "Dahlia", region: "Mondstadt" },
  { name: "Diluc", region: "Mondstadt" },
  { name: "Diona", region: "Mondstadt" },
  { name: "Durin", region: "Mondstadt" },
  { name: "Eula", region: "Mondstadt" },
  { name: "Fischl", region: "Mondstadt" },
  { name: "Jean", region: "Mondstadt" },
  { name: "Kaeya", region: "Mondstadt" },
  { name: "Klee", region: "Mondstadt" },
  { name: "Lisa", region: "Mondstadt" },
  { name: "Lohen", region: "Mondstadt" },
  { name: "Mika", region: "Mondstadt" },
  { name: "Mona", region: "Mondstadt" },
  { name: "Noelle", region: "Mondstadt" },
  { name: "Razor", region: "Mondstadt" },
  { name: "Rosaria", region: "Mondstadt" },
  { name: "Sucrose", region: "Mondstadt" },
  { name: "Varka", region: "Mondstadt" },
  { name: "Venti", region: "Mondstadt" },

  // Liyue
  { name: "Baizhu", region: "Liyue" },
  { name: "Beidou", region: "Liyue" },
  { name: "Chongyun", region: "Liyue" },
  { name: "Gaming", region: "Liyue" },
  { name: "Ganyu", region: "Liyue" },
  { name: "Hu Tao", region: "Liyue" },
  { name: "Keqing", region: "Liyue" },
  { name: "Ningguang", region: "Liyue" },
  { name: "Qiqi", region: "Liyue" },
  { name: "Shenhe", region: "Liyue" },
  { name: "Xiangling", region: "Liyue" },
  { name: "Xianyun", region: "Liyue" },
  { name: "Xiao", region: "Liyue" },
  { name: "Xingqiu", region: "Liyue" },
  { name: "Xinyan", region: "Liyue" },
  { name: "Yaoyao", region: "Liyue" },
  { name: "Yelan", region: "Liyue" },
  { name: "Yun Jin", region: "Liyue" },
  { name: "Zhongli", region: "Liyue" },
  { name: "Zibai", region: "Liyue" },

  // Inazuma
  { name: "Arataki Itto", region: "Inazuma" },
  { name: "Chiori", region: "Inazuma" },
  { name: "Gorou", region: "Inazuma" },
  { name: "Kaedehara Kazuha", region: "Inazuma" },
  { name: "Kamisato Ayaka", region: "Inazuma" },
  { name: "Kamisato Ayato", region: "Inazuma" },
  { name: "Kirara", region: "Inazuma" },
  { name: "Kujou Sara", region: "Inazuma" },
  { name: "Kuki Shinobu", region: "Inazuma" },
  { name: "Raiden Shogun", region: "Inazuma" },
  { name: "Sangonomiya Kokomi", region: "Inazuma" },
  { name: "Sayu", region: "Inazuma" },
  { name: "Shikanoin Heizou", region: "Inazuma" },
  { name: "Thoma", region: "Inazuma" },
  { name: "Yae Miko", region: "Inazuma" },
  { name: "Yoimiya", region: "Inazuma" },

  // Sumeru
  { name: "Alhaitham", region: "Sumeru" },
  { name: "Candace", region: "Sumeru" },
  { name: "Collei", region: "Sumeru" },
  { name: "Cyno", region: "Sumeru" },
  { name: "Dehya", region: "Sumeru" },
  { name: "Dori", region: "Sumeru" },
  { name: "Faruzan", region: "Sumeru" },
  { name: "Kaveh", region: "Sumeru" },
  { name: "Layla", region: "Sumeru" },
  { name: "Nahida", region: "Sumeru" },
  { name: "Nilou", region: "Sumeru" },
  { name: "Sethos", region: "Sumeru" },
  { name: "Tighnari", region: "Sumeru" },
  { name: "Wanderer", region: "Sumeru" },

  // Fontaine
  { name: "Charlotte", region: "Fontaine" },
  { name: "Chevreuse", region: "Fontaine" },
  { name: "Clorinde", region: "Fontaine" },
  { name: "Emilie", region: "Fontaine" },
  { name: "Escoffier", region: "Fontaine" },
  { name: "Freminet", region: "Fontaine" },
  { name: "Furina", region: "Fontaine" },
  { name: "Lynette", region: "Fontaine" },
  { name: "Lyney", region: "Fontaine" },
  { name: "Navia", region: "Fontaine" },
  { name: "Neuvillette", region: "Fontaine" },
  { name: "Odette", region: "Fontaine" },
  { name: "Sigewinne", region: "Fontaine" },
  { name: "Wriothesley", region: "Fontaine" },

  // Natlan
  { name: "Chasca", region: "Natlan" },
  { name: "Citlali", region: "Natlan" },
  { name: "Iansan", region: "Natlan" },
  { name: "Ifa", region: "Natlan" },
  { name: "Kachina", region: "Natlan" },
  { name: "Kinich", region: "Natlan" },
  { name: "Mavuika", region: "Natlan" },
  { name: "Mualani", region: "Natlan" },
  { name: "Nefer", region: "Natlan" },
  { name: "Xilonen", region: "Natlan" },

  // Snezhnaya & Nod-Krai
  { name: "Aino", region: "Snezhnaya & Nod-Krai" },
  { name: "Alyosha", region: "Snezhnaya & Nod-Krai" },
  { name: "Arlecchino", region: "Snezhnaya & Nod-Krai" },
  { name: "Columbina", region: "Snezhnaya & Nod-Krai" },
  { name: "Flins", region: "Snezhnaya & Nod-Krai" },
  { name: "Illuga", region: "Snezhnaya & Nod-Krai" },
  { name: "Ineffa", region: "Snezhnaya & Nod-Krai" },
  { name: "Jahoda", region: "Snezhnaya & Nod-Krai" },
  { name: "Lauma", region: "Snezhnaya & Nod-Krai" },
  { name: "Linnea", region: "Snezhnaya & Nod-Krai" },
  { name: "Manekin", region: "Snezhnaya & Nod-Krai" },
  { name: "Manekina", region: "Snezhnaya & Nod-Krai" },
  { name: "Prune", region: "Snezhnaya & Nod-Krai" },
  { name: "Sandrone", region: "Snezhnaya & Nod-Krai" },
  { name: "Tartaglia", region: "Snezhnaya & Nod-Krai" },

  // Unaffiliated & Other Realms
  { name: "Aloy (Crossover)", region: "Unaffiliated & Other Realms" },
  { name: "Nicole", region: "Unaffiliated & Other Realms" },
  { name: "Skirk", region: "Unaffiliated & Other Realms" },
  { name: "Aether", region: "Unaffiliated & Other Realms" },
  { name: "Lumine", region: "Unaffiliated & Other Realms" }
];

export const hsrNames = [
  // The Destruction
  { name: "Arlan", path: "The Destruction" },
  { name: "Blade", path: "The Destruction" },
  { name: "Clara", path: "The Destruction" },
  { name: "Dan Heng • Imbibitor Lunae", path: "The Destruction" },
  { name: "Firefly", path: "The Destruction" },
  { name: "Gilgamesh (Crossover)", path: "The Destruction" },
  { name: "Hook", path: "The Destruction" },
  { name: "Jingliu", path: "The Destruction" },
  { name: "Misha", path: "The Destruction" },
  { name: "Mydei", path: "The Destruction" },
  { name: "Phainon", path: "The Destruction" },
  { name: "Saber (Crossover)", path: "The Destruction" },
  { name: "Xueyi", path: "The Destruction" },
  { name: "Yunli", path: "The Destruction" },
  { name: "Trailblazer (Destruction)", path: "The Destruction" },

  // The Hunt
  { name: "Archer (Crossover)", path: "The Hunt" },
  { name: "Ashveil", path: "The Hunt" },
  { name: "Boothill", path: "The Hunt" },
  { name: "Dan Heng", path: "The Hunt" },
  { name: "Dr. Ratio", path: "The Hunt" },
  { name: "Feixiao", path: "The Hunt" },
  { name: "March 7th (The Hunt)", path: "The Hunt" },
  { name: "Moze", path: "The Hunt" },
  { name: "Seele", path: "The Hunt" },
  { name: "Sushang", path: "The Hunt" },
  { name: "Topaz & Numby", path: "The Hunt" },
  { name: "Yanqing", path: "The Hunt" },

  // The Erudition
  { name: "Anaxa", path: "The Erudition" },
  { name: "Argenti", path: "The Erudition" },
  { name: "Herta", path: "The Erudition" },
  { name: "Himeko", path: "The Erudition" },
  { name: "Himeko • Nova", path: "The Erudition" },
  { name: "Jade", path: "The Erudition" },
  { name: "Jing Yuan", path: "The Erudition" },
  { name: "Qingque", path: "The Erudition" },
  { name: "Rappa", path: "The Erudition" },
  { name: "Rin Tohsaka (Crossover)", path: "The Erudition" },
  { name: "Serval", path: "The Erudition" },
  { name: "The Herta", path: "The Erudition" },

  // The Harmony
  { name: "Asta", path: "The Harmony" },
  { name: "Bronya", path: "The Harmony" },
  { name: "Cerydra", path: "The Harmony" },
  { name: "Hanya", path: "The Harmony" },
  { name: "Robin", path: "The Harmony" },
  { name: "Ruan Mei", path: "The Harmony" },
  { name: "Sparkle", path: "The Harmony" },
  { name: "Sunday", path: "The Harmony" },
  { name: "Tingyun", path: "The Harmony" },
  { name: "Tribbie", path: "The Harmony" },
  { name: "Yukong", path: "The Harmony" },
  { name: "Trailblazer (Harmony)", path: "The Harmony" },

  // The Nihility
  { name: "Acheron", path: "The Nihility" },
  { name: "Black Swan", path: "The Nihility" },
  { name: "Cipher", path: "The Nihility" },
  { name: "Fugue", path: "The Nihility" },
  { name: "Guinaifen", path: "The Nihility" },
  { name: "Hysilens", path: "The Nihility" },
  { name: "Jiaoqiu", path: "The Nihility" },
  { name: "Kafka", path: "The Nihility" },
  { name: "Luka", path: "The Nihility" },
  { name: "Mortenax Blade", path: "The Nihility" },
  { name: "Pela", path: "The Nihility" },
  { name: "Sampo", path: "The Nihility" },
  { name: "Silver Wolf", path: "The Nihility" },
  { name: "The Dahlia", path: "The Nihility" },
  { name: "Welt", path: "The Nihility" },

  // The Preservation
  { name: "Aventurine", path: "The Preservation" },
  { name: "Dan Heng • Permansor Terrae", path: "The Preservation" },
  { name: "Fu Xuan", path: "The Preservation" },
  { name: "Gepard", path: "The Preservation" },
  { name: "March 7th", path: "The Preservation" },
  { name: "Trailblazer (Preservation)", path: "The Preservation" },

  // The Abundance
  { name: "Bailu", path: "The Abundance" },
  { name: "Gallagher", path: "The Abundance" },
  { name: "Huohuo", path: "The Abundance" },
  { name: "Lingsha", path: "The Abundance" },
  { name: "Luocha", path: "The Abundance" },
  { name: "Lynx", path: "The Abundance" },
  { name: "Natasha", path: "The Abundance" },

  // The Remembrance
  { name: "Aglaea", path: "The Remembrance" },
  { name: "Castorice", path: "The Remembrance" },
  { name: "Cyrene", path: "The Remembrance" },
  { name: "Evernight", path: "The Remembrance" },
  { name: "Hyacine", path: "The Remembrance" },
  { name: "Robin • Summeretto", path: "The Remembrance" },
  { name: "Trailblazer (Remembrance)", path: "The Remembrance" },

  // The Elation
  { name: "Aventurine • Waveflair", path: "The Elation" },
  { name: "Evanescia", path: "The Elation" },
  { name: "Silver Wolf LV.999", path: "The Elation" },
  { name: "Sparxie", path: "The Elation" },
  { name: "Yao Guang", path: "The Elation" },
  { name: "Trailblazer (Elation)", path: "The Elation" }
];

export const zzzNames = [
  // Cunning Hares (Gentle House)
  { name: "Anby Demara", faction: "Cunning Hares (Gentle House)" },
  { name: "Billy Kid", faction: "Cunning Hares (Gentle House)" },
  { name: "Nicole Demara", faction: "Cunning Hares (Gentle House)" },
  { name: "Nekomiya Mana (Nekomata)", faction: "Cunning Hares (Gentle House)" },

  // Victoria Housekeeping Co.
  { name: "Alexandrina Sebastiane (Rina)", faction: "Victoria Housekeeping Co." },
  { name: "Corin Wickes", faction: "Victoria Housekeeping Co." },
  { name: "Ellen Joe", faction: "Victoria Housekeeping Co." },
  { name: "Von Lycaon", faction: "Victoria Housekeeping Co." },

  // Belobog Heavy Industries
  { name: "Anton Ivanov", faction: "Belobog Heavy Industries" },
  { name: "Ben Bigger", faction: "Belobog Heavy Industries" },
  { name: "Grace Howard", faction: "Belobog Heavy Industries" },
  { name: "Koleda Belobog", faction: "Belobog Heavy Industries" },

  // Sons of Calydon
  { name: "Burnice White", faction: "Sons of Calydon" },
  { name: "Caesar King", faction: "Sons of Calydon" },
  { name: "Lighter", faction: "Sons of Calydon" },
  { name: "Luciana de Montefio (Lucy)", faction: "Sons of Calydon" },
  { name: "Piper Wheel", faction: "Sons of Calydon" },
  { name: "Pulchra Fellini", faction: "Sons of Calydon" },

  // Criminal Investigation Special Response Team (N.E.P.S.)
  { name: "Jane Doe", faction: "Criminal Investigation Special Response Team (N.E.P.S.)" },
  { name: "Qingyi", faction: "Criminal Investigation Special Response Team (N.E.P.S.)" },
  { name: "Seth Lowell", faction: "Criminal Investigation Special Response Team (N.E.P.S.)" },
  { name: "Zhu Yuan", faction: "Criminal Investigation Special Response Team (N.E.P.S.)" },

  // Hollow Special Operations Section 6
  { name: "Asaba Harumasa", faction: "Hollow Special Operations Section 6" },
  { name: "Hoshimi Miyabi", faction: "Hollow Special Operations Section 6" },
  { name: "Soukaku", faction: "Hollow Special Operations Section 6" },
  { name: "Tsukishiro Yanagi", faction: "Hollow Special Operations Section 6" },

  // New Eridu Defense Force & Obol Squad
  { name: "Orphie Magnusson & Magus", faction: "New Eridu Defense Force & Obol Squad" },
  { name: "Seed", faction: "New Eridu Defense Force & Obol Squad" },
  { name: "Soldier 11", faction: "New Eridu Defense Force & Obol Squad" },
  { name: "Soldier 0 - Anby", faction: "New Eridu Defense Force & Obol Squad" },
  { name: "Trigger", faction: "New Eridu Defense Force & Obol Squad" },

  // Stars of Lyra
  { name: "Astra Yao", faction: "Stars of Lyra" },
  { name: "Evelyn Chevalier", faction: "Stars of Lyra" },

  // Mockingbird
  { name: "Hugo Vlad", faction: "Mockingbird" },
  { name: "Vivian Banshee", faction: "Mockingbird" },

  // Yunkui Summit
  { name: "Ju Fufu", faction: "Yunkui Summit" },
  { name: "Pan Yinhu", faction: "Yunkui Summit" },
  { name: "Ye Shunguang", faction: "Yunkui Summit" },
  { name: "Yixuan", faction: "Yunkui Summit" },

  // Spook Shack
  { name: "Alice Thymefield", faction: "Spook Shack" },
  { name: "Komano Manato", faction: "Spook Shack" },
  { name: "Lucia Elowen", faction: "Spook Shack" },
  { name: "Ukinami Yuzuha", faction: "Spook Shack" },

  // Krampus Compliance Authority
  { name: "Banyue", faction: "Krampus Compliance Authority" },
  { name: "Dialyn", faction: "Krampus Compliance Authority" },
  { name: "Promeia", faction: "Krampus Compliance Authority" },
  { name: "Zhao", faction: "Krampus Compliance Authority" },

  // Angels of Delusion
  { name: "Aria", faction: "Angels of Delusion" },
  { name: "Nangong Yu", faction: "Angels of Delusion" },
  { name: "Sunna", faction: "Angels of Delusion" },

  // Other Factions & Departments
  { name: "Cissia", faction: "Other Factions & Departments" },
  { name: "Norma Hollowell", faction: "Other Factions & Departments" },
  { name: "Pyrois", faction: "Other Factions & Departments" },
  { name: "Remielle Dan", faction: "Other Factions & Departments" },
  { name: "Sigrid de L'Azur", faction: "Other Factions & Departments" },
  { name: "Velina Airgid", faction: "Other Factions & Departments" },
  { name: "Wise", faction: "Other Factions & Departments" },
  { name: "Belle", faction: "Other Factions & Departments" }
];

export const hi3Names = [
  "Ai Hyperion \u039b", "Aponia",
  { name: "Bronya Zaychik", img: "https://honkaiimpact3.fandom.com/wiki/Special:FilePath/Silverwing_-_N-EX_(Icon).png" },
  "Carole Pepper", "Coralie 6626 Planck", "Durandal", "Eden", "Elysia", "Erd\u0151s Helia", "Fu Hua", "Griseo", "Kallen Kaslana", "Kiana Kaslana", "Lantern", "Li Sushang", "Liliya Olenyeva", "Misteln Schariac (Hare)", "Mobius", "Murata Himeko", "Natasha Cioara (Raven)", "Pardofelis", "PROMETHEUS", "Raiden Mei", "Rita Rossweisse", "Rozaliya Olenyeva", "Seele Vollerei", "Senadina", "Senti", "Shigure Kira", "Songque", "Susannah Manatt", "Thelema Nutriscu", "Theresa Apocalypse", "Veliona", "Vill-V", "Vita", "Yae Sakura", "Bronie (Haxxor Bunny)", "Delta (Fervent Tempo \u0394)", "Fallen Rosemary", "Lunar Vow", "Sirin", "TeRiRi", "Yae Kasumi (Darkbolt Jonin)", "Zhuge Kongming"
];

export const GAME_THEMES = {
  "Genshin Impact": {
    color: "d4af37", // Gold
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40"
  },
  "Honkai: Star Rail": {
    color: "3b82f6", // Star Rail Blue
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40"
  },
  "Zenless Zone Zero": {
    color: "eab308", // Yellow Neon
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
  },
  "Honkai Impact 3rd": {
    color: "ec4899", // HI3 Pink
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/40"
  }
};
