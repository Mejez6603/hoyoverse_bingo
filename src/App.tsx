import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  Shuffle, 
  RotateCcw, 
  Play, 
  Hammer, 
  Check, 
  Sparkles, 
  Trash2, 
  Grid, 
  Info,
  CheckSquare,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  genshinNames, 
  hsrNames, 
  zzzNames, 
  hi3Names, 
  GAME_THEMES 
} from './data';
import { HoyoverseImage } from './components/HoyoverseImage';

interface RosterCharacter {
  name: string;
  game: string;
  img?: string;
  fallbackColor: string;
  region?: string;
  path?: string;
  faction?: string;
}

// 5x5 Winning Line configurations
const WIN_LINES = [
  [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], // Rows
  [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], // Columns
  [0, 6, 12, 18, 24], [4, 8, 12, 16, 20] // Diagonals
];

const ACCENT_THEMES = {
  indigo: {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-600",
    lightBg: "bg-indigo-50",
    lightBorder: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-800",
    ring: "ring-indigo-500",
    shadow: "shadow-indigo-100/50",
    accentDot: "bg-indigo-500",
  },
  teal: {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-100",
    text: "text-teal-600",
    border: "border-teal-600",
    lightBg: "bg-teal-50",
    lightBorder: "border-teal-200",
    badge: "bg-teal-100 text-teal-800",
    ring: "ring-teal-500",
    shadow: "shadow-teal-100/50",
    accentDot: "bg-teal-500",
  },
  amber: {
    primary: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-100",
    text: "text-amber-600",
    border: "border-amber-600",
    lightBg: "bg-amber-50",
    lightBorder: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    ring: "ring-amber-500",
    shadow: "shadow-amber-100/50",
    accentDot: "bg-amber-500",
  },
  rose: {
    primary: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-100",
    text: "text-rose-600",
    border: "border-rose-600",
    lightBg: "bg-rose-50",
    lightBorder: "border-rose-200",
    badge: "bg-rose-100 text-rose-800",
    ring: "ring-rose-500",
    shadow: "shadow-rose-100/50",
    accentDot: "bg-rose-500",
  }
};

const CARD_BG_THEMES = {
  white: {
    name: "Pure White",
    bgClass: "bg-white border-white/60",
    textTitle: "text-slate-900",
    textSubtitle: "text-slate-400",
    textWatermark: "text-slate-300",
    borderClass: "border-slate-100",
    tileBg: "bg-slate-50 hover:bg-slate-100/50",
    tileBorder: "border-slate-200 hover:border-slate-300",
    tileText: "text-slate-300 group-hover:text-slate-500",
    tileTextSec: "text-slate-300 group-hover:text-slate-400",
    dotBg: "bg-slate-200"
  },
  slateDark: {
    name: "Deep Obsidian",
    bgClass: "bg-slate-950 border-slate-900/80",
    textTitle: "text-slate-50",
    textSubtitle: "text-slate-400",
    textWatermark: "text-slate-600",
    borderClass: "border-slate-900",
    tileBg: "bg-slate-900/40 hover:bg-slate-900/70",
    tileBorder: "border-slate-800 hover:border-slate-700",
    tileText: "text-slate-600 group-hover:text-slate-400",
    tileTextSec: "text-slate-600 group-hover:text-slate-500",
    dotBg: "bg-slate-850"
  },
  slateLight: {
    name: "Cool Slate",
    bgClass: "bg-slate-100 border-slate-200",
    textTitle: "text-slate-800",
    textSubtitle: "text-slate-500",
    textWatermark: "text-slate-400",
    borderClass: "border-slate-200",
    tileBg: "bg-white/80 hover:bg-white",
    tileBorder: "border-slate-300 hover:border-slate-400",
    tileText: "text-slate-400 group-hover:text-slate-600",
    tileTextSec: "text-slate-400 group-hover:text-slate-500",
    dotBg: "bg-slate-300"
  },
  cream: {
    name: "Warm Parchment",
    bgClass: "bg-amber-50/80 border-amber-100",
    textTitle: "text-amber-950",
    textSubtitle: "text-amber-700/60",
    textWatermark: "text-amber-600/40",
    borderClass: "border-amber-100/60",
    tileBg: "bg-amber-100/20 hover:bg-amber-100/40",
    tileBorder: "border-amber-200/50 hover:border-amber-200",
    tileText: "text-amber-300 group-hover:text-amber-600",
    tileTextSec: "text-amber-300/80 group-hover:text-amber-500",
    dotBg: "bg-amber-200/40"
  },
  indigoDark: {
    name: "Cosmic Indigo",
    bgClass: "bg-indigo-950 border-indigo-900/60",
    textTitle: "text-indigo-50",
    textSubtitle: "text-indigo-300/70",
    textWatermark: "text-indigo-700/50",
    borderClass: "border-indigo-900",
    tileBg: "bg-indigo-900/30 hover:bg-indigo-900/50",
    tileBorder: "border-indigo-800/60 hover:border-indigo-700",
    tileText: "text-indigo-700 group-hover:text-indigo-400",
    tileTextSec: "text-indigo-700 group-hover:text-indigo-500",
    dotBg: "bg-indigo-900/80"
  }
};

export default function App() {
  // 1. Build the full unified roster
  const roster = useMemo(() => {
    const list: RosterCharacter[] = [];

    genshinNames.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        list.push({
          name: item.name,
          game: "Genshin Impact",
          img: item.img,
          fallbackColor: GAME_THEMES["Genshin Impact"].color,
          region: item.region
        });
      } else {
        list.push({
          name: item,
          game: "Genshin Impact",
          fallbackColor: GAME_THEMES["Genshin Impact"].color
        });
      }
    });

    hsrNames.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        list.push({
          name: item.name,
          game: "Honkai: Star Rail",
          fallbackColor: GAME_THEMES["Honkai: Star Rail"].color,
          path: item.path,
          img: item.img
        });
      } else {
        list.push({
          name: item,
          game: "Honkai: Star Rail",
          fallbackColor: GAME_THEMES["Honkai: Star Rail"].color
        });
      }
    });

    zzzNames.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        list.push({
          name: item.name,
          game: "Zenless Zone Zero",
          faction: item.faction,
          img: item.img,
          fallbackColor: GAME_THEMES["Zenless Zone Zero"].color
        });
      } else {
        list.push({
          name: item,
          game: "Zenless Zone Zero",
          fallbackColor: GAME_THEMES["Zenless Zone Zero"].color
        });
      }
    });

    hi3Names.forEach(item => {
      if (typeof item === 'object') {
        list.push({
          name: item.name,
          game: "Honkai Impact 3rd",
          img: item.img,
          fallbackColor: GAME_THEMES["Honkai Impact 3rd"].color
        });
      } else {
        list.push({
          name: item,
          game: "Honkai Impact 3rd",
          fallbackColor: GAME_THEMES["Honkai Impact 3rd"].color
        });
      }
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // 2. Local Storage Persistence & State
  const [board, setBoard] = useState<(RosterCharacter | null)[]>(() => {
    const saved = localStorage.getItem('hoyobingo_board');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return Array(25).fill(null);
  });

  const [marked, setMarked] = useState<number[]>(() => {
    const saved = localStorage.getItem('hoyobingo_marked');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Always ensure the center is marked
          if (!parsed.includes(12)) {
            return [...parsed, 12];
          }
          return parsed;
        }
      } catch (e) {
        // Fallback
      }
    }
    return [12]; // Center FREE SPACE is marked by default
  });

  const [isPlayMode, setIsPlayMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hoyobingo_play_mode');
    return saved === 'true';
  });

  const [activeTileIndex, setActiveTileIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('All');
  const [selectedGenshinRegionFilter, setSelectedGenshinRegionFilter] = useState<string>('All Regions');
  const [selectedHsrPathFilter, setSelectedHsrPathFilter] = useState<string>('All Paths');
  const [selectedZzzFactionFilter, setSelectedZzzFactionFilter] = useState<string>('All Factions');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Track previous win count to trigger Bingo celebrations on *new* matches
  const [lastBingoCount, setLastBingoCount] = useState(0);
  const [showWinOverlay, setShowWinOverlay] = useState(false);

  // Customizable Title, Subtitle, and Accent States
  const [bingoTitle, setBingoTitle] = useState(() => {
    return localStorage.getItem('hoyobingo_title') || 'HOYOVERSE BINGO';
  });
  const [bingoSubtitle, setBingoSubtitle] = useState(() => {
    return localStorage.getItem('hoyobingo_subtitle') || 'ACCOUNT MILESTONE TRACKER';
  });
  const [accent, setAccent] = useState<'indigo' | 'teal' | 'amber' | 'rose'>(() => {
    return (localStorage.getItem('hoyobingo_accent') as 'indigo' | 'teal' | 'amber' | 'rose') || 'indigo';
  });
  const [bingoUid, setBingoUid] = useState(() => {
    return localStorage.getItem('hoyobingo_uid') || '802144356';
  });
  const [cardBgTheme, setCardBgTheme] = useState<keyof typeof CARD_BG_THEMES>(() => {
    return (localStorage.getItem('hoyobingo_card_bg_theme') as keyof typeof CARD_BG_THEMES) || 'white';
  });
  const [freeSpaceText, setFreeSpaceText] = useState(() => {
    return localStorage.getItem('hoyobingo_free_space_text') || 'FREE SPACE';
  });

  useEffect(() => {
    localStorage.setItem('hoyobingo_title', bingoTitle);
  }, [bingoTitle]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_subtitle', bingoSubtitle);
  }, [bingoSubtitle]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_uid', bingoUid);
  }, [bingoUid]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_card_bg_theme', cardBgTheme);
  }, [cardBgTheme]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_free_space_text', freeSpaceText);
  }, [freeSpaceText]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('hoyobingo_board', JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_marked', JSON.stringify(marked));
  }, [marked]);

  useEffect(() => {
    localStorage.setItem('hoyobingo_play_mode', String(isPlayMode));
  }, [isPlayMode]);

  // Determine winning lines
  const markedSet = useMemo(() => new Set(marked), [marked]);
  const activeWinLines = useMemo(() => {
    return WIN_LINES.filter(line => line.every(idx => markedSet.has(idx)));
  }, [markedSet]);

  const winningCellIndices = useMemo(() => {
    const cells = new Set<number>();
    activeWinLines.forEach(line => line.forEach(idx => cells.add(idx)));
    return cells;
  }, [activeWinLines]);

  // Trigger win overlay when a new line is completed
  useEffect(() => {
    const winCount = activeWinLines.length;
    if (winCount > lastBingoCount && winCount > 0) {
      setShowWinOverlay(true);
    }
    setLastBingoCount(winCount);
  }, [activeWinLines.length, lastBingoCount]);

  // Reset filters when active game filter changes
  useEffect(() => {
    setSelectedGenshinRegionFilter('All Regions');
    setSelectedHsrPathFilter('All Paths');
    setSelectedZzzFactionFilter('All Factions');
  }, [selectedGameFilter]);

  // Filter roster for the modal
  const filteredRoster = useMemo(() => {
    return roster.filter(char => {
      const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGame = selectedGameFilter === 'All' || char.game === selectedGameFilter;
      const matchesRegion = 
        selectedGameFilter !== 'Genshin Impact' || 
        selectedGenshinRegionFilter === 'All Regions' || 
        char.region === selectedGenshinRegionFilter;
      const matchesPath = 
        selectedGameFilter !== 'Honkai: Star Rail' || 
        selectedHsrPathFilter === 'All Paths' || 
        char.path === selectedHsrPathFilter;
      const matchesFaction = 
        selectedGameFilter !== 'Zenless Zone Zero' || 
        selectedZzzFactionFilter === 'All Factions' || 
        char.faction === selectedZzzFactionFilter;
      return matchesSearch && matchesGame && matchesRegion && matchesPath && matchesFaction;
    });
  }, [roster, searchQuery, selectedGameFilter, selectedGenshinRegionFilter, selectedHsrPathFilter, selectedZzzFactionFilter]);

  // 3. Tile Interaction Logic
  const handleTileClick = (index: number) => {
    if (index === 12) return; // FREE SPACE is locked

    if (isPlayMode) {
      // Toggle play mode marks
      if (board[index]) {
        setMarked(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          } else {
            return [...prev, index];
          }
        });
      }
    } else {
      // Open builder modal
      setActiveTileIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleSelectCharacter = (character: RosterCharacter) => {
    if (activeTileIndex === null) return;

    setBoard(prev => {
      const copy = [...prev];
      copy[activeTileIndex] = character;
      return copy;
    });

    setIsModalOpen(false);
    setActiveTileIndex(null);
  };

  const handleRemoveTileCharacter = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBoard(prev => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    setMarked(prev => prev.filter(i => i !== index));
  };

  // 4. Utility Actions
  const handleRandomize = () => {
    // Collect random unique characters to fill all 24 non-free slots
    const pool = [...roster];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const newBoard = Array(25).fill(null);
    
    let poolIndex = 0;
    for (let i = 0; i < 25; i++) {
      if (i === 12) continue; // Skip free space
      newBoard[i] = shuffled[poolIndex] || null;
      poolIndex++;
    }

    setBoard(newBoard);
    // Keep only center marked
    setMarked([12]);
  };

  const handleClearBoard = () => {
    setBoard(Array(25).fill(null));
    setMarked([12]);
  };

  const handleResetMarks = () => {
    setMarked([12]);
  };

  const renderSidebarContent = (isMobile: boolean = false) => (
    <div className="flex flex-col gap-5 h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Card Configuration</h3>
        <div className="space-y-4">
          
          {/* Bingo Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Bingo Title</label>
            <input 
              type="text" 
              value={bingoTitle}
              onChange={(e) => {
                setBingoTitle(e.target.value.toUpperCase());
              }}
              maxLength={26}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-slate-800 font-bold tracking-tight"
            />
          </div>

          {/* Bingo Subtitle Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Theme Subtitle</label>
            <input 
              type="text" 
              value={bingoSubtitle}
              onChange={(e) => {
                setBingoSubtitle(e.target.value);
              }}
              maxLength={40}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-slate-600 font-medium"
            />
          </div>

          {/* Free Space Label Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Free Space Label</label>
            <input 
              type="text" 
              value={freeSpaceText}
              onChange={(e) => {
                setFreeSpaceText(e.target.value);
              }}
              maxLength={20}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-slate-600 font-medium"
            />
          </div>

          {/* Theme Accent Switcher */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Theme Accent</label>
            <div className="flex gap-2">
              {(['indigo', 'teal', 'amber', 'rose'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setAccent(color);
                  }}
                  className={`w-6 h-6 rounded-full transition-all duration-200 cursor-pointer ${
                    color === 'indigo' ? 'bg-indigo-500' :
                    color === 'teal' ? 'bg-teal-500' :
                    color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  } ${accent === color ? 'ring-2 ring-offset-2 ' + ACCENT_THEMES[color].ring : ''}`}
                  title={`${color.charAt(0).toUpperCase() + color.slice(1)} Accent`}
                />
              ))}
            </div>
          </div>

          {/* Card Background Theme Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Card Background</label>
            <div className="flex gap-2">
              {(Object.keys(CARD_BG_THEMES) as (keyof typeof CARD_BG_THEMES)[]).map((themeKey) => {
                const themeData = CARD_BG_THEMES[themeKey];
                const isSelected = cardBgTheme === themeKey;
                const previewBg = 
                  themeKey === 'white' ? 'bg-white border-slate-200' :
                  themeKey === 'slateDark' ? 'bg-slate-950 border-slate-950' :
                  themeKey === 'slateLight' ? 'bg-slate-200 border-slate-300' :
                  themeKey === 'cream' ? 'bg-[#fcf8f2] border-amber-200' :
                  'bg-indigo-950 border-indigo-950';

                return (
                  <button
                    key={themeKey}
                    onClick={() => setCardBgTheme(themeKey)}
                    className={`w-6 h-6 rounded-full border transition-all duration-200 cursor-pointer ${previewBg} ${
                      isSelected 
                        ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' 
                        : 'hover:scale-105'
                    }`}
                    title={themeData.name}
                    aria-label={themeData.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Watermark UID Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Watermark UID</label>
            <input 
              type="text" 
              value={bingoUid}
              onChange={(e) => {
                setBingoUid(e.target.value);
              }}
              placeholder="e.g. 802144356"
              maxLength={15}
              className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-slate-700 font-medium font-mono"
            />
          </div>

        </div>
      </div>

      {/* Play/Build Mode switch */}
      <div className="border-t border-slate-100 pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Play Controls</h3>
        <button
          onClick={() => {
            setIsPlayMode(!isPlayMode);
          }}
          className={`w-full flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl text-sm shadow-md transition-all duration-300 cursor-pointer ${
            isPlayMode 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-100'
              : ACCENT_THEMES[accent].primary + " " + ACCENT_THEMES[accent].shadow
          }`}
        >
          {isPlayMode ? <Play className="w-4 h-4 fill-current" /> : <Hammer className="w-4 h-4" />}
          <span>{isPlayMode ? 'Switch to Build Mode' : 'Switch to Play Mode'}</span>
        </button>

        <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 justify-center">
          <span className="font-semibold text-slate-400">Status:</span>
          <span className={isPlayMode ? 'text-emerald-600 font-bold' : ACCENT_THEMES[accent].text + " font-bold"}>
            {isPlayMode ? 'PLAYING (Mark Tiles)' : 'BUILDING (Edit Tiles)'}
          </span>
        </div>
      </div>

      {/* Quick instructions and Actions */}
      <div className="border-t border-slate-100 pt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            Quick Guide
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {isPlayMode 
              ? "Click character slots on your board to stamp matches. Score 5 marked cells in any line to BINGO!"
              : "Click any blank slot to assign a custom character. Click on an filled slot to replace or delete them."}
          </p>
        </div>

        {/* Utility Buttons */}
        <div className="space-y-2 pt-4 mt-auto">
          {!isPlayMode ? (
            <>
              <button
                onClick={() => {
                  handleRandomize();
                }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5 text-slate-400" />
                Auto Fill Card
              </button>
              <button
                onClick={() => {
                  handleClearBoard();
                }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                Clear All Slots
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleResetMarks();
              }}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              Unmark All Tiles
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const activeCardTheme = CARD_BG_THEMES[cardBgTheme];

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col font-sans overflow-hidden text-slate-800">
      
      {/* Header Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-50 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
            aria-label="Toggle settings"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${ACCENT_THEMES[accent].primary} rounded-lg flex items-center justify-center transition-all duration-300`}>
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              HoyoSpace <span className={ACCENT_THEMES[accent].text}>{accent.charAt(0).toUpperCase() + accent.slice(1)}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4 text-sm font-semibold text-slate-400">
            <span className={accent === 'indigo' ? 'text-indigo-600' : 'hover:text-slate-600 transition-colors cursor-pointer'} onClick={() => setAccent('indigo')}>Genshin</span>
            <span className={accent === 'teal' ? 'text-teal-600' : 'hover:text-slate-600 transition-colors cursor-pointer'} onClick={() => setAccent('teal')}>Star Rail</span>
            <span className={accent === 'amber' ? 'text-amber-600' : 'hover:text-slate-600 transition-colors cursor-pointer'} onClick={() => setAccent('amber')}>ZZZ</span>
            <span className={accent === 'rose' ? 'text-rose-600' : 'hover:text-slate-600 transition-colors cursor-pointer'} onClick={() => setAccent('rose')}>HI3</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/60 z-40 md:hidden"
              />
              {/* Drawer */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed top-0 bottom-0 left-0 w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-5 overflow-y-auto select-none z-50 md:hidden shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-700 uppercase tracking-wider">Settings Drawer</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  {renderSidebarContent(true)}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar Controls */}
        <aside className="w-72 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col gap-5 shrink-0 overflow-y-auto select-none">
          {renderSidebarContent(false)}
        </aside>

        {/* Bingo Canvas Area */}
        <section className="flex-1 bg-slate-100 p-3 xs:p-4 sm:p-6 md:p-8 flex items-center justify-center relative overflow-y-auto">
          {/* Ambient light indicators inside canvas */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

          {/* Bingo Card Sheet Container */}
          <div className={`${activeCardTheme.bgClass} w-full max-w-[580px] aspect-square rounded-2xl sm:rounded-3xl shadow-2xl ${ACCENT_THEMES[accent].shadow} border p-3.5 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300 relative z-10`}>
            
            <div className="text-center mb-3 sm:mb-4 md:mb-5 shrink-0 select-none">
              <h2 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-black ${activeCardTheme.textTitle} tracking-tighter uppercase font-display leading-tight`}>
                {bingoTitle}
              </h2>
              <p className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs ${activeCardTheme.textSubtitle} font-bold uppercase tracking-widest mt-0.5 sm:mt-1`}>
                {bingoSubtitle}
              </p>
            </div>

            {/* The 5x5 Bingo Grid */}
            <div className="flex-1 grid grid-cols-5 grid-rows-5 gap-1.5 sm:gap-2 md:gap-2.5 min-h-0">
              {board.map((char, index) => {
                const isFreeSpace = index === 12;
                const isMarked = markedSet.has(index);
                const isWinning = winningCellIndices.has(index);

                // 1. FREE SPACE CELL
                if (isFreeSpace) {
                  return (
                    <div
                      key="free-space"
                      className={`aspect-square ${ACCENT_THEMES[accent].lightBg} ${ACCENT_THEMES[accent].lightBorder} border-2 rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-center p-0.5 sm:p-1 cursor-default select-none relative overflow-hidden`}
                    >
                      <div className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 ${ACCENT_THEMES[accent].accentDot} rounded-full`}></div>
                      <Sparkles className={`w-3.5 h-3.5 sm:w-5 h-5 ${ACCENT_THEMES[accent].text} mb-0.5 animate-pulse`} />
                      <span className={`text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs font-black ${ACCENT_THEMES[accent].text} tracking-tighter leading-none uppercase`}>
                        {freeSpaceText}
                      </span>
                    </div>
                  );
                }

                const theme = char ? GAME_THEMES[char.game as keyof typeof GAME_THEMES] : null;

                // 2. CHARACTER TILE CELL
                return (
                  <div
                    key={index}
                    onClick={() => handleTileClick(index)}
                    className={`aspect-square relative rounded-lg sm:rounded-xl md:rounded-2xl border transition-all duration-200 overflow-hidden group select-none ${
                      isWinning 
                        ? 'border-emerald-400 bg-emerald-50/30' 
                        : char 
                          ? `${activeCardTheme.tileBorder} ${activeCardTheme.tileBg}` 
                          : `border-dashed ${activeCardTheme.tileBorder} bg-opacity-40 ${activeCardTheme.tileBg}`
                    } cursor-pointer`}
                  >
                    {char ? (
                      <>
                        {/* Render high performance avatar or beautiful game-themed card if failing */}
                        <HoyoverseImage 
                          name={char.name} 
                          game={char.game} 
                          imgUrl={char.img}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />

                        {/* Character name subtitle */}
                        <div className="absolute bottom-0 inset-x-0 bg-slate-900/85 backdrop-blur-[1px] py-0.5 px-0.5 border-t border-slate-800 text-[6.5px] xs:text-[7.5px] sm:text-[8px] md:text-[9px] text-white text-center truncate font-semibold z-10 select-none leading-none">
                          {char.name}
                        </div>

                        {/* Build Mode delete button */}
                        {!isPlayMode && (
                          <button
                            onClick={(e) => handleRemoveTileCharacter(index, e)}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white hover:bg-red-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-md z-20"
                            title="Remove Character"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        )}

                        {/* Play Mode checked overlay stamp */}
                        {isPlayMode && isMarked && (
                          <motion.div 
                            initial={{ scale: 1.15, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 bg-emerald-500/40 border-2 border-emerald-400 flex items-center justify-center z-10"
                          >
                            <div className="bg-slate-950/90 text-emerald-400 p-0.5 sm:p-1 rounded-full shadow-md border border-emerald-400/40">
                              <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5 stroke-[3.5]" />
                            </div>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      // Empty Cell state
                      <div className="w-full h-full flex flex-col items-center justify-center p-0.5 text-center">
                        <span className={`${activeCardTheme.tileText} text-sm sm:text-lg md:text-xl transition-colors font-semibold leading-none`}>+</span>
                        <span className={`${activeCardTheme.tileTextSec} text-[6px] xs:text-[7px] sm:text-[8px] transition-colors font-bold tracking-wider uppercase mt-0.5 font-sans leading-none`}>
                          Add
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Watermark/UID Row */}
            <div className={`mt-4 pt-4 border-t ${activeCardTheme.borderClass} flex justify-between items-center select-none shrink-0`}>
              <span className={`text-[8px] md:text-[10px] font-bold ${activeCardTheme.textWatermark} tracking-widest uppercase font-mono`}>
                UID: {bingoUid || '802144356'}
              </span>
              <div className="flex gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${activeCardTheme.dotBg}`}></div>
                <div className={`w-1.5 h-1.5 rounded-full ${activeCardTheme.dotBg}`}></div>
                <div className={`w-1.5 h-1.5 rounded-full ${activeCardTheme.dotBg}`}></div>
              </div>
            </div>

          </div>
        </section>

        {/* Right Asset Side Panel */}
        <aside className="w-20 bg-white border-l border-slate-200 py-6 hidden lg:flex flex-col items-center gap-6 shrink-0 select-none">
          <div className={`w-12 h-12 ${ACCENT_THEMES[accent].lightBg} ${ACCENT_THEMES[accent].text} rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17l.343-.343" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </aside>

      </main>

      {/* Bottom Bar Info Footer */}
      <footer className="h-8 bg-slate-900 text-slate-400 flex items-center px-8 justify-between text-[10px] font-semibold select-none shrink-0 border-t border-slate-950">
        <div className="flex gap-4">
          <span className="text-emerald-400 font-bold">STATUS: READY FOR EXPORT</span>
          <span>VERSION: 2.4.1</span>
        </div>
        <div>CREATED WITH HOYOSPACE DESIGN KIT</div>
      </footer>

      {/* CHARACTER LIST / SEARCH DIALOG MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-100">Select Character</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">Tile {activeTileIndex !== null ? activeTileIndex + 1 : ''} Setup</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filtering Deck */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col gap-3">
                {/* Search field */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-500 w-4.5 h-4.5" />
                  <input
                    type="text"
                    placeholder="Search character name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-slate-600 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none placeholder:text-slate-500"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Game Selection Pills */}
                <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                  {['All', 'Genshin Impact', 'Honkai: Star Rail', 'Zenless Zone Zero', 'Honkai Impact 3rd'].map(gameName => {
                    const isSelected = selectedGameFilter === gameName;
                    return (
                      <button
                        key={gameName}
                        onClick={() => setSelectedGameFilter(gameName)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                          isSelected 
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-inner' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-750'
                        }`}
                      >
                        {gameName === 'All' ? 'All Games' : gameName.replace('Genshin Impact', 'Genshin').replace('Honkai: ', '').replace(' Impact 3rd', ' HI3')}
                      </button>
                    );
                  })}
                </div>

                {/* Genshin Region Selection Pills */}
                {selectedGameFilter === 'Genshin Impact' && (
                  <div className="flex flex-wrap gap-1.5 pt-2.5 max-h-[120px] overflow-y-auto pr-1 border-t border-slate-850">
                    {['All Regions', 'Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine', 'Natlan', 'Snezhnaya & Nod-Krai', 'Unaffiliated & Other Realms'].map(regionName => {
                      const isSelected = selectedGenshinRegionFilter === regionName;
                      return (
                        <button
                          key={regionName}
                          onClick={() => setSelectedGenshinRegionFilter(regionName)}
                          className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                            isSelected 
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-inner' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-750'
                          }`}
                        >
                          {regionName}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Star Rail Path Selection Pills */}
                {selectedGameFilter === 'Honkai: Star Rail' && (
                  <div className="flex flex-wrap gap-1.5 pt-2.5 max-h-[120px] overflow-y-auto pr-1 border-t border-slate-850">
                    {['All Paths', 'The Destruction', 'The Hunt', 'The Erudition', 'The Harmony', 'The Nihility', 'The Preservation', 'The Abundance', 'The Remembrance', 'The Elation'].map(pathName => {
                      const isSelected = selectedHsrPathFilter === pathName;
                      return (
                        <button
                          key={pathName}
                          onClick={() => setSelectedHsrPathFilter(pathName)}
                          className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                            isSelected 
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-inner' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-750'
                          }`}
                        >
                          {pathName.replace('The ', '')}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Zenless Zone Zero Faction Selection Pills */}
                {selectedGameFilter === 'Zenless Zone Zero' && (
                  <div className="flex flex-wrap gap-1.5 pt-2.5 max-h-[140px] overflow-y-auto pr-1 border-t border-slate-850">
                    {[
                      'All Factions',
                      'Cunning Hares (Gentle House)',
                      'Victoria Housekeeping Co.',
                      'Belobog Heavy Industries',
                      'Sons of Calydon',
                      'Criminal Investigation Special Response Team (N.E.P.S.)',
                      'Hollow Special Operations Section 6',
                      'New Eridu Defense Force & Obol Squad',
                      'Stars of Lyra',
                      'Mockingbird',
                      'Yunkui Summit',
                      'Spook Shack',
                      'Krampus Compliance Authority',
                      'Angels of Delusion',
                      'Other Factions & Departments'
                    ].map(factionName => {
                      const isSelected = selectedZzzFactionFilter === factionName;
                      return (
                        <button
                          key={factionName}
                          onClick={() => setSelectedZzzFactionFilter(factionName)}
                          className={`text-[10px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                            isSelected 
                              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 shadow-inner' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-750'
                          }`}
                        >
                          {factionName.includes('(') ? factionName.split(' (')[0] : factionName}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Characters Selection Roster List */}
              <div className="overflow-y-auto flex-1 divide-y divide-slate-800 p-2">
                {filteredRoster.length > 0 ? (
                  filteredRoster.map(char => {
                    const theme = GAME_THEMES[char.game as keyof typeof GAME_THEMES];
                    return (
                      <div
                        key={char.name}
                        onClick={() => handleSelectCharacter(char)}
                        className="flex items-center gap-4 p-3 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                      >
                        {/* Miniature Avatar Preview */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 relative flex-shrink-0">
                          <HoyoverseImage 
                            name={char.name} 
                            game={char.game} 
                            imgUrl={char.img} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Character Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-200 group-hover:text-slate-100 truncate">
                            {char.name}
                          </h4>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            <span className={`inline-flex text-[9px] px-1.5 py-0.5 rounded border font-mono ${theme.badge}`}>
                              {char.game}
                            </span>
                            {char.region && (
                              <span className="inline-flex text-[9px] px-1.5 py-0.5 rounded border border-slate-750 bg-slate-800 text-slate-400 font-mono">
                                {char.region}
                              </span>
                            )}
                            {char.path && (
                              <span className="inline-flex text-[9px] px-1.5 py-0.5 rounded border border-slate-750 bg-slate-800 text-slate-400 font-mono">
                                {char.path}
                              </span>
                            )}
                            {char.faction && (
                              <span className="inline-flex text-[9px] px-1.5 py-0.5 rounded border border-slate-750 bg-slate-800 text-slate-400 font-mono">
                                {char.faction}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold pr-1">
                          SELECT &rarr;
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 px-4">
                    <p className="text-slate-500 text-sm">No characters found matching search terms</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedGameFilter('All'); }}
                      className="text-xs text-emerald-400 font-bold underline mt-2 hover:text-emerald-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS WIN CONE BINGO CELEBRATION MODAL */}
      <AnimatePresence>
        {showWinOverlay && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              {/* Particle glow ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded-full border border-emerald-500/40 shadow-inner mb-4">
                  <Sparkles className="w-10 h-10 animate-bounce" />
                </div>
                
                <h3 className="text-3xl font-extrabold font-display text-emerald-400 tracking-tight">
                  BINGO!
                </h3>
                <p className="text-slate-300 text-sm mt-3 px-2">
                  Congratulations! You've successfully marked a completed winning line on your Hoyoverse Bingo card!
                </p>

                <div className="mt-6 flex flex-col items-center justify-center bg-slate-950/80 border border-slate-800/80 py-2.5 px-5 rounded-2xl font-mono text-xs text-slate-400">
                  <span className="font-bold text-emerald-400 text-sm">{activeWinLines.length} Line(s) Complete!</span>
                </div>

                <button
                  onClick={() => setShowWinOverlay(false)}
                  className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer"
                >
                  Awesome! Keep Playing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
