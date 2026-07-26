// Part 4 of 4 - End of sequence
export const maPart4 = {
  "config": {
    "ageMapping": [
      { "group": "age-child",         "min": 0,  "max": 12 },
      { "group": "age-teen",          "min": 13, "max": 17 },
      { "group": "age-young-adult",   "min": 18, "max": 25 },
      { "group": "age-adult",         "min": 26, "max": 45 },
      { "group": "age-mature",        "min": 46, "max": 65 },
      { "group": "age-senior",        "min": 66, "max": 999 }
    ],
    "budgetBases": {
      "partner": { "min": 150, "max": 250 },
      "close-friend-family": { "min": 100, "max": 150 },
      "line-manager-supervisor": { "min": 80, "max": 120 },
      "coworker-client-acquaintance": { "min": 50, "max": 100 }
    },
    "occasionMultipliers": {
      "major-milestone": 1.5,
      "regular-celebration": 1.0,
      "casual-gesture": 0.6
    },
    "bondModifiers": {
      "deeply-care-remember-me": 0.20,
      "great-impression-professional-distance": 0.0,
      "formal-duty-tasteful-present": -0.15
    }
  },
  "screeningQuestions": [
    {
      "id": "sq-1",
      "question": "What is the gender of this person?",
      "inputType": "single-choice",
      "options": [
        { "value": "male", "label": "Male", "target": "target-male" },
        { "value": "female", "label": "Female", "target": "target-female" },
        { "value": "neutral", "label": "It does not matter for this gift", "target": "target-neutral" }
      ]
    },
    {
      "id": "sq-2",
      "question": "How old is this person?",
      "inputType": "number",
      "min": 0,
      "max": 120,
      "backendField": "age"
    },
    {
      "id": "sq-3",
      "question": "What is your relationship with this person?",
      "inputType": "single-choice",
      "options": [
        { "value": "partner", "label": "Partner", "baseTier": "partner" },
        { "value": "close-friend-family", "label": "Close friend or family member", "baseTier": "close-friend-family" },
        { "value": "coworker-client-acquaintance", "label": "Coworker, client, or acquaintance", "baseTier": "coworker-client-acquaintance" },
        { "value": "line-manager-supervisor", "label": "Line manager or supervisor", "baseTier": "line-manager-supervisor" }
      ]
    },
    {
      "id": "sq-4",
      "question": "What kind of occasion are you celebrating?",
      "inputType": "single-choice",
      "options": [
        { "value": "major-milestone", "label": "A major milestone (Wedding, Milestone Birthday, Big Promotion)", "multiplierKey": "major-milestone" },
        { "value": "regular-celebration", "label": "A regular celebration (Annual Birthday, Christmas, Holiday)", "multiplierKey": "regular-celebration" },
        { "value": "casual-gesture", "label": "A casual event or just a simple thank-you gesture", "multiplierKey": "casual-gesture" }
      ]
    },
    {
      "id": "sq-5",
      "question": "What is your main goal with this gift?",
      "inputType": "single-choice",
      "options": [
        { "value": "deeply-care-remember-me", "label": "I deeply care about this person and want this person to remember me through this gift", "modifierKey": "deeply-care-remember-me" },
        { "value": "great-impression-professional-distance", "label": "I want to make a great impression, but keeping a professional distance", "modifierKey": "great-impression-professional-distance" },
        { "value": "formal-duty-tasteful-present", "label": "It is a formal duty, I just need a tasteful and appropriate present", "modifierKey": "formal-duty-tasteful-present" }
      ]
    }
  ],
  "macroAreas": [
    {
      "id": "ma37",
      "title": "Reading & Book Habits",
      "eligibility": {
        "ageGroups": ["age-child", "age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma37-l1",
          "question": "How central is book reading to this person's lifestyle and daily leisure time?",
          "options": [
            {
              "id": "ma37-l1-o1",
              "tag": "reader-avid",
              "label": "Avid Reader & Book Lover",
              "variants": [
                "This person devours books regularly, maintaining a dedicated reading routine and a growing personal library.",
                "This person prioritizes physical books or digital e-readers, consistently blocking out quiet time to dive into literature."
              ]
            },
            {
              "id": "ma37-l1-o2",
              "tag": "reader-casual",
              "label": "Casual or Audio-Visual Focus",
              "variants": [
                "This person reads books occasionally, preferring to consume stories and information through podcasts, video essays, or practical articles.",
                "This person rarely buys books, choosing fast digital media or experiential learning over long-form written text."
              ]
            }
          ]
        },
        {
          "id": "ma37-l2",
          "question": "What core genre and intent drive this person's choice of reading material?",
          "options": [
            {
              "id": "ma37-l2-o1",
              "tag": "genre-fiction",
              "label": "Narrative Fiction & Creative Worlds",
              "variants": [
                "This person seeks emotional escape through fiction, creative novels, fantasy world-building, or historical sagas.",
                "This person values complex storytelling, literary styles, and character development that stimulate the imagination."
              ]
            },
            {
              "id": "ma37-l2-o2",
              "tag": "genre-nonfiction",
              "label": "Pragmatic Non-Fiction & Learning",
              "variants": [
                "This person selects biographies, business strategy, essays, or personal growth manuals to acquire direct, actionable knowledge.",
                "This person uses reading as an intellectual tool, focusing strictly on factual data, real-world mechanics, and skills."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma38",
      "title": "Gaming & Interactive Media",
      "eligibility": {
        "ageGroups": ["age-child", "age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma38-l1",
          "question": "What is this person's engagement level and investment in video games?",
          "options": [
            {
              "id": "ma38-l1-o1",
              "tag": "gaming-active",
              "label": "Immersive Gamer",
              "variants": [
                "This person dedicates regular free time to gaming, tracking new releases and investing in specialized hardware or consoles.",
                "This person actively plays complex interactive titles, treating video games as a core entertainment medium and hobby."
              ]
            },
            {
              "id": "ma38-l1-o2",
              "tag": "gaming-casual-none",
              "label": "Casual or Non-Gamer",
              "variants": [
                "This person rarely plays games, occasionally opening a simple smartphone app just to pass the time.",
                "This person completely bypasses interactive gaming, preferring passive entertainment or real-world physical hobbies."
              ]
            }
          ]
        },
        {
          "id": "ma38-l2",
          "question": "Which gaming style and player dynamic best describes this person's choice of interactive experience?",
          "options": [
            {
              "id": "ma38-l2-o1",
              "tag": "gameplay-competitive",
              "label": "Competitive & Social Multiplayer",
              "variants": [
                "This person thrives in online multiplayer matches, competitive ranking systems, and cooperative team challenges.",
                "This person seeks high adrenaline, digital strategy, and intense social coordination when playing online."
              ]
            },
            {
              "id": "ma38-l2-o2",
              "tag": "gameplay-narrative",
              "label": "Solitary Narrative & Exploration",
              "variants": [
                "This person prefers single-player experiences, rich cinematic story-driven adventures, and deep atmospheric world-building.",
                "This person treats gaming as a solitary escape, enjoying slow exploration and unhurried puzzle-solving at this person's own pace."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma39",
      "title": "Music & Audio Consumption",
      "eligibility": {
        "ageGroups": ["age-child", "age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma39-l1",
          "question": "How central and intentional is music or audio content in this person's daily environment?",
          "options": [
            {
              "id": "ma39-l1-o1",
              "tag": "audio-active",
              "label": "Passionate Audio Curator",
              "variants": [
                "This person actively curates custom playlists, tracks artists closely, or collects physical formats like vinyl records.",
                "This person values high-fidelity sound, treating listening as an active, deliberate experience rather than simple background noise."
              ]
            },
            {
              "id": "ma39-l1-o2",
              "tag": "audio-passive",
              "label": "Casual & Functional Listener",
              "variants": [
                "This person uses commercial radio, charts, or automated background algorithms purely to fill the silence while working or driving.",
                "This person maintains a casual approach to audio content, rarely searching for new releases or tracking specific musical subcultures."
              ]
            }
          ]
        },
        {
          "id": "ma39-l2",
          "question": "What primary format and audio substance does this person prefer during long listening sessions?",
          "options": [
            {
              "id": "ma39-l2-o1",
              "tag": "format-music",
              "label": "Melodic & Artistic Music",
              "variants": [
                "This person seeks pure musical art, focusing on melody, instrumental complexity, rhythms, or specific genre aesthetics.",
                "This person uses songs as an emotional engine, connecting deeply with the atmosphere and creative vision of musicians."
              ]
            },
            {
              "id": "ma39-l2-o2",
              "tag": "format-spoken",
              "label": "Spoken Word & Educational Podcasts",
              "variants": [
                "This person prioritizes long-form talk shows, conversational podcasts, audiobooks, or true-crime investigations.",
                "This person prefers learning or following human dialogues, using this person's listening bandwidth to acquire facts, stories, and information."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma40",
      "title": "Cooking & Kitchen Dynamic",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma40-l1",
          "question": "What is this person's active engagement and mindset when it comes to preparing meals?",
          "options": [
            {
              "id": "ma40-l1-o1",
              "tag": "cooking-creative",
              "label": "Passionate Chef & Foodie",
              "variants": [
                "This person loves experimenting in the kitchen, sourcing fresh ingredients, and turning cooking into a creative, relaxing ritual.",
                "This person treats meal preparation as an art form, enjoying complex recipes, precision plating, or hosting dinner parties."
              ]
            },
            {
              "id": "ma40-l1-o2",
              "tag": "cooking-functional",
              "label": "Pragmatic & Convenience-Driven",
              "variants": [
                "This person cooks out of necessity, preferring quick, simple meals, pre-made options, or efficient food delivery.",
                "This person views food primarily as sustenance, minimizing time spent over the stove in favor of immediate utility."
              ]
            }
          ]
        },
        {
          "id": "ma40-l2",
          "question": "How does this person manage the organization and cleanup of the kitchen environment?",
          "options": [
            {
              "id": "ma40-l2-o1",
              "tag": "kitchen-meticulous",
              "label": "Meticulous & Clean-As-You-Go",
              "variants": [
                "This person keeps a spotless kitchen, washing utensils immediately and maintaining a strict, organized workspace.",
                "This person despises chaotic setups, ensuring countertops are wiped down and everything is returned to its precise place."
              ]
            },
            {
              "id": "ma40-l2-o2",
              "tag": "kitchen-relaxed",
              "label": "Relaxed & Post-Meal Cleanup",
              "variants": [
                "This person focuses entirely on the cooking process, leaving dishes and pans piled up to be cleaned much later.",
                "This person operates comfortably in a busy, messy kitchen environment, prioritizing the dining experience over instant order."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma41",
      "title": "Home Decor & Living Space Style",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma41-l1",
          "question": "What primary aesthetic and stylistic philosophy drives this person's home environment?",
          "options": [
            {
              "id": "ma41-l1-o1",
              "tag": "decor-minimalist",
              "label": "Sleek, Modern & Minimalist",
              "variants": [
                "This person prefers clean lines, open spaces, and hidden storage, keeping the house free of visual clutter or small ornaments.",
                "This person curates a highly functional, contemporary interior where every single piece of furniture has a clear purpose."
              ]
            },
            {
              "id": "ma41-l1-o2",
              "tag": "decor-maximalist",
              "label": "Cozy, Warm & Personalized",
              "variants": [
                "This person fills the rooms with vintage objects, books, framed art, and warm lighting, creating a deeply personal, lived-in nest.",
                "This person loves eclecticism, rich textures, and meaningful souvenirs that tell a distinct story to anyone walking in."
              ]
            }
          ]
        },
        {
          "id": "ma41-l2",
          "question": "How strictly does this person enforce order, neatness, and placement rules inside this person's living space?",
          "options": [
            {
              "id": "ma41-l2-o1",
              "tag": "home-ordered",
              "label": "Meticulous & Showroom Order",
              "variants": [
                "This person maintains flawless, near-obsessive cleanliness, returning every cushion and item to its exact spot daily.",
                "This person feels anxious in a messy environment, demanding absolute order and geometric precision in the common areas."
              ]
            },
            {
              "id": "ma41-l2-o2",
              "tag": "home-relaxed",
              "label": "Relaxed & Forgiving Comfort",
              "variants": [
                "This person tolerates casual domestic mess, prioritizing total human comfort over unrealistic showroom perfection.",
                "This person allows personal projects, clothes, or objects to sit out for days, enjoying an organic, unhurried lifestyle."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma43",
      "title": "Social Media & Online Presence",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma43-l1",
          "question": "What is this person's active behavior regarding posting and sharing content on social networks?",
          "options": [
            {
              "id": "ma43-l1-o1",
              "tag": "presence-active",
              "label": "Public Sharer & Content Creator",
              "variants": [
                "This person frequently updates this person's profiles, sharing personal milestones, daily thoughts, or aesthetic photos with this person's network.",
                "This person maintains a highly visible digital identity, enjoying public interaction, comments, and online social connection."
              ]
            },
            {
              "id": "ma43-l1-o2",
              "tag": "presence-passive-ghost",
              "label": "Silent Observer or Ghost Account",
              "variants": [
                "This person uses social media purely to consume content or message friends, rarely posting pictures or personal life updates.",
                "This person prioritizes absolute digital privacy, keeping this person's profiles strictly locked or completely non-existent."
              ]
            }
          ]
        },
        {
          "id": "ma43-l2",
          "question": "How does this person react to dynamic viral trends, notifications, and algorithm feeds?",
          "options": [
            {
              "id": "ma43-l2-o1",
              "tag": "feed-engaged",
              "label": "Trend-Aware & High Engagement",
              "variants": [
                "This person closely tracks viral memes, trending short videos, and hot topics, spending significant daily time scrolling through active feeds.",
                "This person thrives on instant digital notifications, staying highly connected to the modern internet zeitgeist and pop culture."
              ]
            },
            {
              "id": "ma43-l2-o2",
              "tag": "feed-detached",
              "label": "Algorithmic Detachment & Intentional Use",
              "variants": [
                "This person deliberately limits screen time, ignoring viral hypes to focus strictly on targeted information or specific professional channels.",
                "This person feels drained by algorithmic noise, maintaining a detached, low-frequency approach to online entertainment."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma44",
      "title": "Physical Fitness & Exercise Routine",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma44-l1",
          "question": "How structured and central is physical exercise in this person's weekly lifestyle?",
          "options": [
            {
              "id": "ma44-l1-o1",
              "tag": "fitness-structured",
              "label": "Dedicated & Disciplined Athlete",
              "variants": [
                "This person follows a strict training program, blocking out sacred calendar slots for the gym, running, or specific sports.",
                "This person treats physical fitness as a non-negotiable pillar of health, tracking metrics, performance, or body composition regularly."
              ]
            },
            {
              "id": "ma44-l1-o2",
              "tag": "fitness-casual-none",
              "label": "Sedentary or Organic Movement",
              "variants": [
                "This person prefers casual walks or active daily tasks over structured workouts, avoiding intense gym cultures completely.",
                "This person exercises occasionally when the mood strikes, prioritizing total physical comfort and relaxation over rigorous training cycles."
              ]
            }
          ]
        },
        {
          "id": "ma44-l2",
          "question": "What primary training dynamic and social environment does this person prefer for this person's physical activity?",
          "options": [
            {
              "id": "ma44-l2-o1",
              "tag": "workout-solitary",
              "label": "Solitary & Introspective Focus",
              "variants": [
                "This person trains alone with headphones on, using exercise as a private mental escape to decompress and hit personal targets.",
                "This person enjoys individual disciplines like solo weightlifting, running, or cycling, avoiding the distraction of group dynamics."
              ]
            },
            {
              "id": "ma44-l2-o2",
              "tag": "workout-social-team",
              "label": "Social Group & Team Dynamic",
              "variants": [
                "This person thrives in group fitness classes, crossfit boxes, or recreational team sports that offer built-in community and shared energy.",
                "This person uses exercise as a social outlet, staying motivated through friendly competition, team spirit, and collective accountability."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma45",
      "title": "Gardening & Plant Care",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma45-l1",
          "question": "What is this person's active investment and responsibility regarding keeping plants alive?",
          "options": [
            {
              "id": "ma45-l1-o1",
              "tag": "green-thumb",
              "label": "Passionate Botanist & Cultivator",
              "variants": [
                "This person carefully monitors soil moisture, repots regularly, and curates a thriving collection of indoor plants or a garden.",
                "This person finds deep mental relaxation in pruning, watering, and researching the exact micro-nutrients or light requirements for this person's flora."
              ]
            },
            {
              "id": "ma45-l1-o2",
              "tag": "plant-detached",
              "label": "No Plants or Artificial Greenery",
              "variants": [
                "This person prefers a plant-free home or uses high-quality artificial greenery to completely avoid the chore of watering and maintenance.",
                "This person consistently forgets to look after live flora, choosing a practical, synthetic, or minimalist space that requires zero care."
              ]
            }
          ]
        },
        {
          "id": "ma45-l2",
          "question": "What scale and purpose drive this person's interaction with plant environments?",
          "options": [
            {
              "id": "ma45-l2-o1",
              "tag": "botany-aesthetic",
              "label": "Decorative & Aesthetic Indoor Greenery",
              "variants": [
                "This person treats plants strictly as structural interior design assets, choosing specific species to complement room visual styling.",
                "This person focuses on elegant foliage and visual placement in common rooms to maximize domestic peace and modern look."
              ]
            },
            {
              "id": "ma45-l2-o2",
              "tag": "botany-productive",
              "label": "Productive Garden & Edible Herbs",
              "variants": [
                "This person grows active vegetable patches, fruit trees, or small kitchen herb pots specifically to harvest fresh ingredients for cooking.",
                "This person values the functional output of dirt cultivation, enjoying the process of seed-to-table production and organic utility."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma46",
      "title": "Art, Museum & Exhibition Habits",
      "eligibility": {
        "ageGroups": ["age-child", "age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma46-l1",
          "question": "How frequently and intentionally does this person seek out fine arts and cultural exhibitions?",
          "options": [
            {
              "id": "ma46-l1-o1",
              "tag": "art-enthusiast",
              "label": "Active Cultural Explorer",
              "variants": [
                "This person actively tracks new museum openings, contemporary art galleries, or historic exhibitions, turning visits into dedicated weekend plans.",
                "This person considers art as an essential intellectual fuel, spending significant free time admiring visual works and learning about artists."
              ]
            },
            {
              "id": "ma46-l1-o2",
              "tag": "art-casual-none",
              "label": "Occasional or Functional Sightseer",
              "variants": [
                "This person visits museums only during major vacations or when accompanying friends, preferring other forms of entertainment.",
                "This person rarely engages with classical or fine art galleries, finding traditional museum setups slow or distant from this person's daily focus."
              ]
            }
          ]
        },
        {
          "id": "ma46-l2",
          "question": "Which specific era and aesthetic philosophy resonates most with this person's visual taste?",
          "options": [
            {
              "id": "ma46-l2-o1",
              "tag": "aesthetic-classical",
              "label": "Classical, Renaissance & Traditional",
              "variants": [
                "This person appreciates formal technical mastery, narrative depth, historical realism, and the absolute aesthetic order of classical eras.",
                "This person is drawn to timeless masterpieces, rich oil paintings, and grand architecture that carry deep, established historical value."
              ]
            },
            {
              "id": "ma46-l2-o2",
              "tag": "aesthetic-modern",
              "label": "Modern, Contemporary & Pop Culture",
              "variants": [
                "This person prefers avant-garde concepts, abstract layouts, street art, or dynamic modern graphic design installations.",
                "This person seeks provoking ideas, subversion, and modern pop icons, valuing bold experimental expressions over traditional rules."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma47",
      "title": "Fashion & Apparel Styling",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma47-l1",
          "question": "What is this person's financial, emotional, and time investment in fashion and clothing?",
          "options": [
            {
              "id": "ma47-l1-o1",
              "tag": "fashion-conscious",
              "label": "Style-Conscious & Trend-Aware",
              "variants": [
                "This person carefully curates this person's outfits, follows current style movements, and invests significantly in high-quality garments or brand aesthetic.",
                "This person treats dressing up as an active form of self-expression, paying close attention to fit, color coordination, and personal image."
              ]
            },
            {
              "id": "ma47-l1-o2",
              "tag": "fashion-casual",
              "label": "Casual & Comfort-First",
              "variants": [
                "This person dresses purely for comfort and utility, grabbing simple, reliable basics without tracking trends or shopping for luxury brands.",
                "This person maintains a highly practical wardrobe, spending minimal time or budget on styling, as long as the apparel is functional."
              ]
            }
          ]
        },
        {
          "id": "ma47-l2",
          "question": "What core aesthetic direction defines this person's choice of clothing and presentation?",
          "options": [
            {
              "id": "ma47-l2-o1",
              "tag": "style-formal-classic",
              "label": "Formal, Tailored & Timeless Elegance",
              "variants": [
                "This person gravitates toward sharp, classic silhouettes, tailored suits, elegant dresses, or minimalist premium structures.",
                "This person prefers a polished, sophisticated look that commands professional respect and maintains timeless stylistic authority."
              ]
            },
            {
              "id": "ma47-l2-o2",
              "tag": "style-street-casual",
              "label": "Streetwear, Casual & Alternative",
              "variants": [
                "This person loves relaxed urban fits, graphic tees, hoodies, sneakers, or bold alternative/subcultural clothing items.",
                "This person prioritizes dynamic movement, casual ease, and a youthful, unpretentious aesthetic that fits an active lifestyle."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma48",
      "title": "Charity, Volunteering & Social Causes",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma48-l1",
          "question": "How actively does this person dedicate personal resources or time to charitable causes?",
          "options": [
            {
              "id": "ma48-l1-o1",
              "tag": "charity-active",
              "label": "Active Altruist & Volunteer",
              "variants": [
                "This person regularly volunteers this person's time, donates money to specific organizations, or participates directly in community support projects.",
                "This person treats civic and social responsibility as a core moral priority, integrating activism or charity into this person's lifestyle."
              ]
            },
            {
              "id": "ma48-l1-o2",
              "tag": "charity-private-none",
              "label": "Private or Low-Involvement",
              "variants": [
                "This person focuses primarily on immediate family or professional demands, keeping this person's charitable contributions rare or completely private.",
                "This person maintains a detached stance toward organized social advocacy, preferring to offer direct, localized help only when strictly necessary."
              ]
            }
          ]
        },
        {
          "id": "ma48-l2",
          "question": "What primary channel or approach does this person prefer when supporting a cause?",
          "options": [
            {
              "id": "ma48-l2-o1",
              "tag": "cause-structural",
              "label": "Institutional & Structural Advocacy",
              "variants": [
                "This person supports large-scale systemic causes, structured NGOs, global environmental pacts, or formal human rights institutions.",
                "This person values long-term, organized campaigns that aim to change laws, infrastructure, or global cultural standards."
              ]
            },
            {
              "id": "ma48-l2-o2",
              "tag": "cause-localized",
              "label": "Localized, Direct & Practical Relief",
              "variants": [
                "This person prefers grass-roots, hands-on initiatives, such as local animal shelters, immediate food drives, or helping a neighbor in need.",
                "This person seeks tangible, immediate impact where this person can see the direct results of this person's effort without corporate or bureaucratic filters."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma49",
      "title": "Gifting Philosophy & Love Languages",
      "eligibility": {
        "ageGroups": ["age-child", "age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma49-l1",
          "question": "What is this person's primary focus and language when expressing deep appreciation or love?",
          "options": [
            {
              "id": "ma49-l1-o1",
              "tag": "gifting-material-thought",
              "label": "Thoughtful Material Gifts",
              "variants": [
                "This person places high value on physical tokens of affection, tracking details for months to surprise others with a tangible, meaningful object.",
                "This person views a well-chosen gift as a powerful symbol of attentiveness, using material surprises to show this person truly care."
              ]
            },
            {
              "id": "ma49-l1-o2",
              "tag": "gifting-experiential-time",
              "label": "Shared Quality Time & Experiences",
              "variants": [
                "This person prioritizes undivided attention, weekend getaways, or shared activities over any physical item or commercial product.",
                "This person believes that creating lasting memories together is the ultimate form of affection, leaving objects in second place."
              ]
            }
          ]
        },
        {
          "id": "ma49-l2",
          "question": "What structural criteria does this person appreciate most when receiving or selecting a physical item?",
          "options": [
            {
              "id": "ma49-l2-o1",
              "tag": "gift-utilitarian",
              "label": "Utilitarian & Practical Value",
              "variants": [
                "This person prefers hyper-functional, high-utility items that solve a current problem or fit a precise, everyday need.",
                "This person dislikes decorative or purely symbolic objects, feeling genuinely satisfied only when a gift is highly practical."
              ]
            },
            {
              "id": "ma49-l2-o2",
              "tag": "gift-emotional-surprise",
              "label": "Emotional Resonance & Surprise",
              "variants": [
                "This person seeks the wow-factor, poetic connections, custom-made keepsakes, or unexpected items that carry a deep internal joke.",
                "This person values the emotional narrative behind the gesture, preferring a whimsical or highly symbolic surprise over tool-like utility."
              ]
            }
          ]
        }
      ]
    }
  ]
};
// End of Part 4 of 4