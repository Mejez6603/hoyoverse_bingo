import React, { useState, useEffect } from 'react';

interface HoyoverseImageProps {
  name: string;
  game: string;
  imgUrl?: string; // Explicit URL if provided by the custom object
  className?: string;
}

export const HoyoverseImage: React.FC<HoyoverseImageProps> = ({ name, game, imgUrl, className }) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState<string[]>([]);

  useEffect(() => {
    const list: string[] = [];
    const lookupName = name === "Aloy (Crossover)" ? "Aloy" : name;
    const formattedName = encodeURIComponent(lookupName.replace(/ /g, '_'));

    if (imgUrl) {
      list.push(imgUrl);
    }

    // Add specific custom mappings for ZZZ characters whose names are shortened or altered on wiki
    if (game === "Zenless Zone Zero") {
      const zzzMappings: Record<string, string[]> = {
        "Anby Demara": ["Agent_Anby_Demara_Icon.png", "Agent_Anby_Icon.png"],
        "Anby": ["Agent_Anby_Demara_Icon.png", "Agent_Anby_Icon.png"],
        "Billy Kid": ["Agent_Billy_Kid_Icon.png", "Agent_Billy_Icon.png"],
        "Billy": ["Agent_Billy_Kid_Icon.png", "Agent_Billy_Icon.png"],
        "Nicole Demara": ["Agent_Nicole_Demara_Icon.png", "Agent_Nicole_Icon.png"],
        "Nicole": ["Agent_Nicole_Demara_Icon.png", "Agent_Nicole_Icon.png"],
        "Nekomiya Mana (Nekomata)": ["Agent_Nekomiya_Mana_Icon.png", "Agent_Nekomata_Icon.png", "Agent_Nekomiya_Icon.png"],
        "Nekomata": ["Agent_Nekomiya_Mana_Icon.png", "Agent_Nekomata_Icon.png", "Agent_Nekomiya_Icon.png"],
        "Alexandrina Sebastiane (Rina)": ["Agent_Rina_Icon.png", "Agent_Alexandrina_Sebastiane_Icon.png"],
        "Corin Wickes": ["Agent_Corin_Wickes_Icon.png", "Agent_Corin_Icon.png"],
        "Corin": ["Agent_Corin_Wickes_Icon.png", "Agent_Corin_Icon.png"],
        "Ellen Joe": ["Agent_Ellen_Joe_Icon.png", "Agent_Ellen_Icon.png"],
        "Von Lycaon": ["Agent_Lycaon_Icon.png", "Agent_Von_Lycaon_Icon.png"],
        "Anton Ivanov": ["Agent_Anton_Ivanov_Icon.png", "Agent_Anton_Icon.png"],
        "Ben Bigger": ["Agent_Ben_Bigger_Icon.png", "Agent_Ben_Icon.png"],
        "Grace Howard": ["Agent_Grace_Howard_Icon.png", "Agent_Grace_Icon.png"],
        "Koleda Belobog": ["Agent_Koleda_Belobog_Icon.png", "Agent_Koleda_Icon.png"],
        "Burnice White": ["Agent_Burnice_White_Icon.png", "Agent_Burnice_Icon.png"],
        "Caesar King": ["Agent_Caesar_King_Icon.png", "Agent_Caesar_Icon.png"],
        "Lighter": ["Agent_Lighter_Icon.png"],
        "Luciana de Montefio (Lucy)": ["Agent_Lucy_Icon.png", "Agent_Luciana_de_Montefio_Icon.png"],
        "Piper Wheel": ["Agent_Piper_Wheel_Icon.png", "Agent_Piper_Icon.png"],
        "Pulchra Fellini": ["Agent_Pulchra_Fellini_Icon.png", "Agent_Pulchra_Icon.png"],
        "Jane Doe": ["Agent_Jane_Doe_Icon.png", "Agent_Jane_Icon.png"],
        "Qingyi": ["Agent_Qingyi_Icon.png"],
        "Seth Lowell": ["Agent_Seth_Lowell_Icon.png", "Agent_Seth_Icon.png"],
        "Zhu Yuan": ["Agent_Zhu_Yuan_Icon.png"],
        "Asaba Harumasa": ["Agent_Harumasa_Icon.png", "Agent_Asaba_Harumasa_Icon.png"],
        "Hoshimi Miyabi": ["Agent_Hoshimi_Miyabi_Icon.png", "Agent_Miyabi_Icon.png"],
        "Miyabi": ["Agent_Hoshimi_Miyabi_Icon.png", "Agent_Miyabi_Icon.png"],
        "Soukaku": ["Agent_Soukaku_Icon.png"],
        "Tsukishiro Yanagi": ["Agent_Yanagi_Icon.png", "Agent_Tsukishiro_Yanagi_Icon.png"],
        "Orphie Magnusson & Magus": ["Agent_Orphie_Magnusson_%26_Magus_Icon.png", "Agent_Orphie_Icon.png"],
        "Seed": ["Agent_Seed_Icon.png"],
        "Soldier 11": ["Agent_Soldier_11_Icon.png"],
        "Soldier 0 - Anby": ["Agent_Soldier_0_-_Anby_Icon.png", "Agent_Soldier_0_Anby_Icon.png"],
        "Trigger": ["Agent_Trigger_Icon.png"],
        "Astra Yao": ["Agent_Astra_Yao_Icon.png", "Agent_Astra_Icon.png"],
        "Evelyn Chevalier": ["Agent_Evelyn_Chevalier_Icon.png", "Agent_Evelyn_Icon.png"],
        "Hugo Vlad": ["Agent_Hugo_Vlad_Icon.png", "Agent_Hugo_Icon.png"],
        "Vivian Banshee": ["Agent_Vivian_Banshee_Icon.png", "Agent_Vivian_Icon.png"],
        "Ju Fufu": ["Agent_Ju_Fufu_Icon.png"],
        "Pan Yinhu": ["Agent_Pan_Yinhu_Icon.png"],
        "Ye Shunguang": ["Agent_Ye_Shunguang_Icon.png"],
        "Yixuan": ["Agent_Yixuan_Icon.png"],
        "Alice Thymefield": ["Agent_Alice_Thymefield_Icon.png"],
        "Komano Manato": ["Agent_Komano_Manato_Icon.png"],
        "Lucia Elowen": ["Agent_Lucia_Elowen_Icon.png"],
        "Ukinami Yuzuha": ["Agent_Ukinami_Yuzuha_Icon.png"],
        "Banyue": ["Agent_Banyue_Icon.png"],
        "Dialyn": ["Agent_Dialyn_Icon.png"],
        "Promeia": ["Agent_Promeia_Icon.png"],
        "Zhao": ["Agent_Zhao_Icon.png"],
        "Aria": ["Agent_Aria_Icon.png"],
        "Nangong Yu": ["Agent_Nangong_Yu_Icon.png"],
        "Sunna": ["Agent_Sunna_Icon.png"],
        "Cissia": ["Agent_Cissia_Icon.png"],
        "Norma Hollowell": ["Agent_Norma_Hollowell_Icon.png"],
        "Pyrois": ["Agent_Pyrois_Icon.png"],
        "Remielle Dan": ["Agent_Remielle_Dan_Icon.png"],
        "Sigrid de L'Azur": ["Agent_Sigrid_de_L'Azur_Icon.png"],
        "Velina Airgid": ["Agent_Velina_Airgid_Icon.png"],
        "Wise": ["Agent_Wise_Icon.png"],
        "Belle": ["Agent_Belle_Icon.png"]
      };

      if (zzzMappings[lookupName]) {
        zzzMappings[lookupName].forEach(fileName => {
          list.push(`https://zenless-zone-zero.fandom.com/wiki/Special:FilePath/${fileName}`);
        });
      }
      list.push(`https://zenless-zone-zero.fandom.com/wiki/Special:FilePath/Agent_${formattedName}_Icon.png`);
      list.push(`https://zenless-zone-zero.fandom.com/wiki/Special:FilePath/${formattedName}_Icon.png`);
      list.push(`https://zenless-zone-zero.fandom.com/wiki/Special:FilePath/Agent_${formattedName}.png`);
    } else if (game === "Honkai: Star Rail") {
      const hsrMappings: Record<string, string[]> = {
        "Dan Heng • Imbibitor Lunae": ["Dan_Heng_%E2%80%A2_Imbibitor_Lunae", "Imbibitor_Lunae"],
        "Topaz & Numby": ["Topaz_and_Numby", "Topaz"],
        "March 7th (The Hunt)": ["March_7th_(The_Hunt)", "March_7th"],
        "Saber (Crossover)": ["Saber"],
        "Archer (Crossover)": ["Archer"],
        "Gilgamesh (Crossover)": ["Gilgamesh"],
        "Rin Tohsaka (Crossover)": ["Rin_Tohsaka"],
        "Silver Wolf LV.999": ["Silver_Wolf"],
        "Aventurine • Waveflair": ["Aventurine"],
        "Robin • Summeretto": ["Robin"],
        "Himeko • Nova": ["Himeko"],
        "Trailblazer (Destruction)": ["Stelle", "Caelus", "Trailblazer"],
        "Trailblazer (Harmony)": ["Stelle", "Caelus", "Trailblazer"],
        "Trailblazer (Preservation)": ["Stelle", "Caelus", "Trailblazer"],
        "Trailblazer (Remembrance)": ["Stelle", "Caelus", "Trailblazer"],
        "Trailblazer (Elation)": ["Stelle", "Caelus", "Trailblazer"]
      };

      if (hsrMappings[lookupName]) {
        hsrMappings[lookupName].forEach(val => {
          list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/Character_${val}_Icon.png`);
          list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/${val}_Icon.png`);
          list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/Character_${val}.png`);
          list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/${val}.png`);
        });
      }

      list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/Character_${formattedName}_Icon.png`);
      list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/${formattedName}_Icon.png`);
      list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/Character_${formattedName}.png`);
      list.push(`https://honkai-star-rail.fandom.com/wiki/Special:FilePath/${formattedName}.png`);
    } else if (game === "Genshin Impact") {
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/Character_${formattedName}_Icon.png`);
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/${formattedName}_Icon.png`);
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/Character_${formattedName}_Card.png`);
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/${formattedName}_Card.png`);
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/Character_${formattedName}_Portrait.png`);
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/${formattedName}_Portrait.png`);
      list.push(`https://genshin-impact.fandom.com/wiki/Special:FilePath/${formattedName}.png`);
    } else if (game === "Honkai Impact 3rd") {
      const hi3Mappings: Record<string, string[]> = {
        "Ai Hyperion \u039b": ["Chrono_Navi"],
        "Aponia": ["Disciplinary_Perdition"],
        "Carole Pepper": ["Sweet_%27n%27_Spicy", "Sweet_n_Spicy"],
        "Coralie 6626 Planck": ["Valkyrie_Boltstorm"],
        "Durandal": ["Palatinus_Equinox", "Bright_Knight:_Excelsis", "Dea_Anchora"],
        "Eden": ["Golden_Diva"],
        "Elysia": ["Miss_Pink_Elf%E2%99%AA", "Herrscher_of_Human:_Ego", "Miss_Pink_Elf"],
        "Erd\u0151s Helia": ["Valkyrie_Blastmetal"],
        "Fu Hua": ["Azure_Empyrea", "Fenghuang_of_Vicissitude", "Shadow_Knight", "Phoenix"],
        "Griseo": ["Starry_Impression", "Cosmic_Expression"],
        "Kallen Kaslana": ["Sixth_Serenade", "Ritual_Imayoh"],
        "Kiana Kaslana": ["Herrscher_of_Finality", "Herrscher_of_Flamescion", "Herrscher_of_the_Void"],
        "Lantern": ["Lone_Destruction_-_Shadowchaser", "Lone_Destruction:_Shadowchaser"],
        "Li Sushang": ["Jade_Knight"],
        "Liliya Olenyeva": ["Blueberry_Blitz"],
        "Misteln Schariac (Hare)": ["Dreamweaver"],
        "Mobius": ["Infinite_Ouroboros"],
        "Murata Himeko": ["Vermilion_Knight:_Eclipse", "Blood_Rose"],
        "Natasha Cioara (Raven)": ["Midnight_Absinthe"],
        "Pardofelis": ["Reverist_Calico"],
        "PROMETHEUS": ["Terminal_Aide_0017"],
        "Raiden Mei": ["Herrscher_of_Origin", "Herrscher_of_Thunder"],
        "Rita Rossweisse": ["Spina_Astera", "Fallen_Rosemary", "Argent_Knight:_Artemis"],
        "Rozaliya Olenyeva": ["Molotov_Cherry"],
        "Seele Vollerei": ["Herrscher_of_Rebirth", "Stygian_Nymph", "Swallowtail_Phantasm"],
        "Senadina": ["Deepspace_Anchor_-_First_Light", "Deepspace_Anchor:_First_Light"],
        "Senti": ["Herrscher_of_Sentience"],
        "Shigure Kira": ["Sugary_Starburst"],
        "Songque": ["Jovial_Deception_-_Shadowdimmer", "Jovial_Deception:_Shadowdimmer"],
        "Susannah Manatt": ["Valkyrie_Quicksand"],
        "Thelema": ["Mad_Pleasure_-_Shadowbringer", "Mad_Pleasure:_Shadowbringer"],
        "Thelema Nutriscu": ["Mad_Pleasure_-_Shadowbringer", "Mad_Pleasure:_Shadowbringer"],
        "Theresa Apocalypse": ["Lunar_Vow_-_Crimson_Love", "Lunar_Vow:_Crimson_Love", "Starlit_Astrologos", "Celestial_Hymn"],
        "Veliona": ["Starchasm_Nyx", "Stygian_Nymph"],
        "Vill-V": ["Helical_Contraption"],
        "Vita": ["Lone_Planetfarer"],
        "Yae Sakura": ["Gyakushinn_Miko", "Flame_Sakitama"],
        "Bronie (Haxxor Bunny)": ["Haxxor_Bunny"],
        "Delta (Fervent Tempo \u0394)": ["Fervent_Tempo_%CE%94", "Fervent_Tempo_Delta"],
        "Fallen Rosemary": ["Fallen_Rosemary"],
        "Lunar Vow": ["Lunar_Vow_-_Crimson_Love", "Lunar_Vow:_Crimson_Love"],
        "Sirin": ["Miracle_%E2%98%86_Magical_Girl", "Sirin"],
        "TeRiRi": ["TeRiRi%27s_Magical_Quest", "Valkyrie_Pledge"],
        "Yae Kasumi (Darkbolt Jonin)": ["Darkbolt_Jonin"],
        "Zhuge Kongming": ["Starlit_Astrologos"]
      };

      const suits = hi3Mappings[name] || [];
      for (const suit of suits) {
        list.push(`https://honkaiimpact3.fandom.com/wiki/Special:FilePath/${suit}_(Icon).png`);
        list.push(`https://honkaiimpact3.fandom.com/wiki/Special:FilePath/${suit}_Icon.png`);
        list.push(`https://honkaiimpact3.fandom.com/wiki/Special:FilePath/${suit}.png`);
      }

      list.push(`https://honkaiimpact3.fandom.com/wiki/Special:FilePath/${formattedName}_(Icon).png`);
      list.push(`https://honkaiimpact3.fandom.com/wiki/Special:FilePath/${formattedName}_Icon.png`);
      list.push(`https://honkaiimpact3.fandom.com/wiki/Special:FilePath/${formattedName}.png`);
    }

    setCandidates(list);
    setCandidateIndex(0);
  }, [name, game, imgUrl]);

  const handleError = () => {
    if (candidateIndex < candidates.length) {
      setCandidateIndex(prev => prev + 1);
    }
  };

  // Render a clean fallback card when loading or when all URLs fail
  if (candidateIndex >= candidates.length || candidates.length === 0) {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    // Theme colors based on game
    let bgClass = "bg-slate-800 text-slate-300";
    let borderClass = "border-slate-700";
    if (game === "Genshin Impact") {
      bgClass = "bg-gradient-to-br from-amber-950 to-amber-900 text-amber-200";
      borderClass = "border-amber-700/50";
    } else if (game === "Honkai: Star Rail") {
      bgClass = "bg-gradient-to-br from-blue-950 to-blue-900 text-blue-200";
      borderClass = "border-blue-700/50";
    } else if (game === "Zenless Zone Zero") {
      bgClass = "bg-gradient-to-br from-yellow-950 to-yellow-900 text-yellow-200";
      borderClass = "border-yellow-700/50";
    } else if (game === "Honkai Impact 3rd") {
      bgClass = "bg-gradient-to-br from-pink-950 to-pink-900 text-pink-200";
      borderClass = "border-pink-700/50";
    }

    return (
      <div className={`${className} flex flex-col items-center justify-center p-1 text-center border rounded-md select-none ${bgClass} ${borderClass}`}>
        <span className="text-xl font-bold tracking-wider">{initials}</span>
        <span className="text-[10px] mt-1 leading-tight truncate w-full font-semibold px-1">{name}</span>
      </div>
    );
  }

  return (
    <img
      src={candidates[candidateIndex]}
      alt={name}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={`${className} object-cover w-full h-full rounded-md`}
    />
  );
};
