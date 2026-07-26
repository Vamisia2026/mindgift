// Part 1 of 4 - Continues in maPart2.ts
export const maPart1 = {
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
      "id": "ma1",
      "title": "Environment & Spaces",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma1-l1",
          "question": "How does this person usually spend time when inside a house?",
          "options": [
            {
              "id": "ma1-l1-o1",
              "tag": "lifestyle-introvert",
              "label": "Total Sanctuary Isolation",
              "variants": [
                "This person stays in a private room to read, game, or work in complete silence.",
                "This person enjoys relaxing in the living room, but only if no guests are around."
              ]
            },
            {
              "id": "ma1-l1-o2",
              "tag": "lifestyle-extrovert",
              "label": "The Open-Door Social Hub",
              "variants": [
                "This person constantly invites friends over for dinners, board games, or casual drinks.",
                "The house is a busy crossroads of family members, neighbors, and continuous movement."
              ]
            }
          ]
        },
        {
          "id": "ma1-l2",
          "question": "If you look at this person's room or workspace, what is the dominant visual vibe?",
          "options": [
            {
              "id": "ma1-l2-o1",
              "tag": "aesthetic-minimalist",
              "label": "Ruthless Minimalism",
              "variants": [
                "Bare surfaces, hidden cables, neutral colors, and absolutely zero functional clutter.",
                "High-end design with essential, sharp-edged furniture and premium materials."
              ]
            },
            {
              "id": "ma1-l2-o2",
              "tag": "aesthetic-maximalist",
              "label": "Maximalist Layering & Memories",
              "variants": [
                "Walls covered in posters, shelves packed with collectibles, action figures, or travel souvenirs.",
                "A warm environment filled with plants, rugs, blankets, and stacks of books."
              ]
            }
          ]
        },
        {
          "id": "ma1-l3",
          "question": "What kind of artificial atmosphere does this person actively create in a personal space?",
          "options": [
            {
              "id": "ma1-l3-o1",
              "tag": "tech-lighting",
              "label": "High-Tech & Ambient FX",
              "variants": [
                "LED smart-bulbs, RGB light strips behind screens, and customized neon color scenes.",
                "Futuristic setups with voice-controlled dimmers and synchronized media illumination."
              ]
            },
            {
              "id": "ma1-l3-o2",
              "tag": "cozy-lighting",
              "label": "Traditional & Organic Warmth",
              "variants": [
                "Scented candles, fairy lights, warm yellow desk lamps, and fireplace simulations.",
                "Natural sunlight reliance during the day, switching to basic, non-intrusive soft lighting at night."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma2",
      "title": "Nature vs City",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma2-l1",
          "question": "Where does this person prefer to spend a free weekend afternoon?",
          "options": [
            {
              "id": "ma2-l1-o1",
              "tag": "environment-nature",
              "label": "The Great Outdoors",
              "variants": [
                "This person heads straight to the mountains, countryside, or beach to escape civilization.",
                "This person prefers hiking trails, parks, or any open green space far away from traffic."
              ]
            },
            {
              "id": "ma2-l1-o2",
              "tag": "environment-city",
              "label": "The Urban Core",
              "variants": [
                "This person loves exploring crowded city streets, visiting museums, or trying new cafes.",
                "This person thrives in an urban environment surrounded by architecture, shopping districts, and concrete."
              ]
            }
          ]
        },
        {
          "id": "ma2-l2",
          "question": "What is this person's ideal type of vacation travel?",
          "options": [
            {
              "id": "ma2-l2-o1",
              "tag": "travel-adventure",
              "label": "Wild Exploration",
              "variants": [
                "Camping, cabin rentals, or road trips through scenic natural landscapes.",
                "An active trip focused on scenery, wildlife, and disconnect from digital networks."
              ]
            },
            {
              "id": "ma2-l2-o2",
              "tag": "travel-metropolis",
              "label": "Metropolitan Hubs",
              "variants": [
                "Booking a boutique hotel in a major world capital to experience culture and nightlife.",
                "An organized city-break full of fine dining, theater, gallery visits, and modern comforts."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma3",
      "title": "Personal Grooming & Style",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma3-l1",
          "question": "How much effort does this person put into daily personal styling and presentation?",
          "options": [
            {
              "id": "ma3-l1-o1",
              "tag": "style-high-effort",
              "label": "Meticulous Presentation",
              "variants": [
                "This person never leaves the house without a curated outfit, perfect hair, and matching accessories.",
                "Every detail of appearance is calculated, from specific fragrances to pristine footwear."
              ]
            },
            {
              "id": "ma3-l1-o2",
              "tag": "style-low-effort",
              "label": "Practical Simplicity",
              "variants": [
                "This person prioritizes comfort and speed, choosing functional clothing that requires zero maintenance.",
                "Appearance is clean but completely casual, showing no interest in fashion trends or elaborate grooming routines."
              ]
            }
          ]
        },
        {
          "id": "ma3-l2",
          "question": "What is the dominant theme in this person's wardrobe choices?",
          "options": [
            {
              "id": "ma3-l2-o1",
              "tag": "wardrobe-classic",
              "label": "Timeless & Sharp",
              "variants": [
                "Tailored jackets, elegant shirts, premium fabrics, and traditional classic cuts.",
                "A structured collection of formal or smart-casual clothing designed to project sophistication."
              ]
            },
            {
              "id": "ma3-l2-o2",
              "tag": "wardrobe-casual",
              "label": "Relaxed & Streetwear",
              "variants": [
                "Hoodies, graphic tees, sneakers, and highly flexible casual garments.",
                "An unpretentious wardrobe dominated by athletic wear, denim, and utility-focused clothes."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma4",
      "title": "Cooking & Food Relationship",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma4-l1",
          "question": "How does this person approach daily meals and nutrition?",
          "options": [
            {
              "id": "ma4-l1-o1",
              "tag": "food-gourmet",
              "label": "Culinary Ritual & Craft",
              "variants": [
                "This person views cooking as an art, spending hours selecting raw premium ingredients and preparing dishes.",
                "This person loves experimenting with complex recipes, artisanal techniques, and high-quality kitchen tools."
              ]
            },
            {
              "id": "ma4-l1-o2",
              "tag": "food-practical",
              "label": "Pure Fuel & Efficiency",
              "variants": [
                "This person treats food as pure fuel, prioritizing quick meals, meal preps, or fast-delivery services.",
                "This person prefers simple, functional nutrition that requires minimal cleanup and zero time investment."
              ]
            }
          ]
        },
        {
          "id": "ma4-l2",
          "question": "What is this person's attitude toward dining experiences outside the house?",
          "options": [
            {
              "id": "ma4-l2-o1",
              "tag": "dining-premium",
              "label": "Gastronomic Exploration",
              "variants": [
                "This person actively seeks out fine dining, hidden local gems, or upscale cocktail pairings.",
                "This person values the atmosphere, ingredient sourcing, and status of premium restaurant experiences."
              ]
            },
            {
              "id": "ma4-l2-o2",
              "tag": "dining-casual",
              "label": "Unpretentious Comfort",
              "variants": [
                "This person is perfectly happy with classic street food, casual diners, or local pub food.",
                "This person avoids overly formal settings, choosing comfortable places focused on quantity and easy socialization."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma5",
      "title": "Reading & Intellectual Consumption",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma5-l1",
          "question": "How does this person usually consume deep or long-form information?",
          "options": [
            {
              "id": "ma5-l1-o1",
              "tag": "content-analog",
              "label": "Traditional Physical Media",
              "variants": [
                "This person heavily prefers physical books, holding paper copies, and turning real pages.",
                "This person curates a personal bookshelf and enjoys the tactile experience of reading print media."
              ]
            },
            {
              "id": "ma5-l1-o2",
              "tag": "content-digital",
              "label": "Digital & Audio Formats",
              "variants": [
                "This person prefers e-readers, tablets, or listening to audiobooks and podcasts on the move.",
                "This person consumes information strictly through digital screens or audio streaming platforms for speed."
              ]
            }
          ]
        },
        {
          "id": "ma5-l2",
          "question": "What is the primary topic of interest when this person selects something to read?",
          "options": [
            {
              "id": "ma5-l2-o1",
              "tag": "reading-nonfiction",
              "label": "Pragmatic Knowledge",
              "variants": [
                "This person reads non-fiction, focusing on history, business, biography, or self-improvement.",
                "This person chooses educational books, technical essays, or news analysis to learn practical skills."
              ]
            },
            {
              "id": "ma5-l2-o2",
              "tag": "reading-fiction",
              "label": "Imaginative Narrative",
              "variants": [
                "This person dives into fiction, including novels, fantasy, sci-fi, or deep psychological thrillers.",
                "This person reads for escape, valuing creative storytelling, literature, and narrative depth."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma6",
      "title": "Digital & Screen Entertainment",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma6-l1",
          "question": "What is this person's primary mode of interaction with digital screens for entertainment?",
          "options": [
            {
              "id": "ma6-l1-o1",
              "tag": "screen-passive",
              "label": "Cinematic Consumption",
              "variants": [
                "This person prefers passive relaxation, streaming high-quality movies, documentaries, or series.",
                "This person enjoys lean-back entertainment, valuing premium visual storytelling and curated streaming channels."
              ]
            },
            {
              "id": "ma6-l1-o2",
              "tag": "screen-active",
              "label": "Interactive & Gaming Hub",
              "variants": [
                "This person engages in active digital entertainment, playing video games on a console, PC, or phone.",
                "This person prefers interactive media, spending free time in competitive gaming or immersive digital worlds."
              ]
            }
          ]
        },
        {
          "id": "ma6-l2",
          "question": "How does this person select and follow online trends or media creators?",
          "options": [
            {
              "id": "ma6-l2-o1",
              "tag": "media-curated",
              "label": "Independent & Specialized",
              "variants": [
                "This person follows niche creators, long-form video essays, or technical tech channels.",
                "This person avoids mainstream feeds, seeking out curated analysis, independent media, or specialized forums."
              ]
            },
            {
              "id": "ma6-l2-o2",
              "tag": "media-mainstream",
              "label": "Fast-Paced & Social Feed",
              "variants": [
                "This person consumes rapid social media content, following viral trends, short-form clips, and influencers.",
                "This person keeps up with mainstream digital culture, browsing dynamic feeds and popular social platforms daily."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma7",
      "title": "Physical Activity & Fitness",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma7-l1",
          "question": "How central is physical exercise to this person's weekly routine?",
          "options": [
            {
              "id": "ma7-l1-o1",
              "tag": "fitness-active",
              "label": "Dedicated Athlete",
              "variants": [
                "This person trains regularly, making gym sessions, running, or sport a non-negotiable priority.",
                "This person maintains an active lifestyle, tracking metrics, performance, or physical conditioning consistently."
              ]
            },
            {
              "id": "ma7-l1-o2",
              "tag": "fitness-passive",
              "label": "Sedentary or Casual",
              "variants": [
                "This person prefers low-energy relaxation, avoiding structured workouts or intense physical training.",
                "This person prioritizes mental rest, choosing light walks or casual movement over heavy gym routines."
              ]
            }
          ]
        },
        {
          "id": "ma7-l2",
          "question": "What kind of workout environment does this person prefer?",
          "options": [
            {
              "id": "ma7-l2-o1",
              "tag": "sport-structured",
              "label": "Structured & Tech-Driven",
              "variants": [
                "This person prefers high-tech gyms, specialized crossfit boxes, or data-driven indoor training.",
                "This person uses specialized equipment, fitness trackers, or professional training facilities to execute a workout."
              ]
            },
            {
              "id": "ma7-l2-o2",
              "tag": "sport-outdoor",
              "label": "Recreational & Outdoor",
              "variants": [
                "This person prefers outdoor sports, open-air jogging, or informal group games with friends.",
                "This person enjoys casual, unpretentious physical recreation without relying on strict corporate gym memberships."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma8",
      "title": "Morning vs Night Persona",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma8-l1",
          "question": "When does this person experience the peak of personal energy and focus?",
          "options": [
            {
              "id": "ma8-l1-o1",
              "tag": "energy-morning",
              "label": "Early Riser & Morning Focus",
              "variants": [
                "This person wakes up early, executing key tasks and routines while the morning is quiet.",
                "This person thrives at dawn, preferring to tackle the most demanding projects before midday."
              ]
            },
            {
              "id": "ma8-l1-o2",
              "tag": "energy-night",
              "label": "Night Owl & Evening Flow",
              "variants": [
                "This person becomes creative and alert late at night, long after normal business hours end.",
                "This person prefers to extend evening hours, finding relaxation or deep focus during the night."
              ]
            }
          ]
        },
        {
          "id": "ma8-l2",
          "question": "How does this person usually handle a free evening after a long day?",
          "options": [
            {
              "id": "ma8-l2-o1",
              "tag": "evening-recharge",
              "label": "Early Wind-Down",
              "variants": [
                "This person values a quiet, predictable evening routine, preparing for an early sleep schedule.",
                "This person uses the evening purely to decompress, shutting down major cognitive activities early."
              ]
            },
            {
              "id": "ma8-l2-o2",
              "tag": "evening-extend",
              "label": "Extended Activity",
              "variants": [
                "This person uses evening hours for socializing, hobbies, late-night entertainment, or extra work.",
                "This person resists going to bed early, treating the night as the true personal space of the day."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma9",
      "title": "Pet & Animal Bond",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma9-l1",
          "question": "What is this person's connection with domestic animals or pets?",
          "options": [
            {
              "id": "ma9-l1-o1",
              "tag": "pet-owner",
              "label": "Dedicated Pet Parent",
              "variants": [
                "This person shares a home with a beloved pet, treating the animal as an absolute family member.",
                "This person actively spends time, resources, and energy to ensure the maximum well-being of a personal pet."
              ]
            },
            {
              "id": "ma9-l1-o2",
              "tag": "pet-none",
              "label": "No Pet Commitment",
              "variants": [
                "This person does not own animals, prioritizing a home dynamic free from pet management responsibilities.",
                "This person enjoys general wildlife or other people's animals but prefers a pet-free living space."
              ]
            }
          ]
        },
        {
          "id": "ma9-l2",
          "question": "How does this person interact with nature and animal life in general?",
          "options": [
            {
              "id": "ma9-l2-o1",
              "tag": "animal-advocate",
              "label": "Deep Nature & Wildlife Affinity",
              "variants": [
                "This person follows wildlife documentaries, supports animal welfare, or loves spotting fauna in nature.",
                "This person feels a strong emotional response toward animal-themed art, stories, or conservation projects."
              ]
            },
            {
              "id": "ma9-l2-o2",
              "tag": "animal-detached",
              "label": "Urban & Human-Centric Focus",
              "variants": [
                "This person keeps a clear separation between personal lifestyle choices and the animal kingdom.",
                "This person focuses entirely on human-centric designs, technologies, and urban spaces without animal-related elements."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma10",
      "title": "Attachment to Memories",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma10-l1",
          "question": "How does this person handle physical mementos, old photos, and tokens from the past?",
          "options": [
            {
              "id": "ma10-l1-o1",
              "tag": "memory-nostalgic",
              "label": "Sentimental & Nostalgic",
              "variants": [
                "This person carefully preserves physical keepsakes, old tickets, and family photos to look back on.",
                "This person places high emotional value on objects linked to specific life milestones and personal history."
              ]
            },
            {
              "id": "ma10-l1-o2",
              "tag": "memory-detached",
              "label": "Forward-Looking Minimalist",
              "variants": [
                "This person lets go of old physical items easily, preferring a clean space unburdened by past clutter.",
                "This person believes memories reside in the mind, keeping very few physical tokens or nostalgic objects around."
              ]
            }
          ]
        },
        {
          "id": "ma10-l2",
          "question": "What kind of items does this person appreciate keeping on display or collecting?",
          "options": [
            {
              "id": "ma10-l2-o1",
              "tag": "display-heritage",
              "label": "Heritage & Vintage Charm",
              "variants": [
                "This person loves antique furniture, vintage items, or traditional family decorations with a story.",
                "This person prefers a home style that feels lived-in, warm, and rich with historical or personal context."
              ]
            },
            {
              "id": "ma10-l2-o2",
              "tag": "display-modern",
              "label": "Sleek & Contemporary",
              "variants": [
                "This person populates personal spaces with modern, functional items bought recently for this person's utility.",
                "This person prefers a fresh, cutting-edge aesthetic over old-fashioned items or family relics."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma11",
      "title": "Workspace Organization",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma11-l1",
          "question": "What is the physical state of this person's main desk or working environment?",
          "options": [
            {
              "id": "ma11-l1-o1",
              "tag": "desk-minimalist",
              "label": "Strict Minimalist Order",
              "variants": [
                "This person maintains a perfectly clean, sterile desk with only the absolute essentials visible.",
                "This person feels stressed by physical clutter, organizing cables and documents out of sight."
              ]
            },
            {
              "id": "ma11-l1-o2",
              "tag": "desk-creative",
              "label": "Dynamic Creative Chaos",
              "variants": [
                "This person works comfortably amidst multiple notebooks, loose sticky notes, and personal items.",
                "This person thrives in a busy, personalized workspace where everything is kept within arm's reach."
              ]
            }
          ]
        },
        {
          "id": "ma11-l2",
          "question": "How does this person prefer to organize digital files, desktops, and active tools?",
          "options": [
            {
              "id": "ma11-l2-o1",
              "tag": "digital-structured",
              "label": "Meticulous Digital Architecture",
              "variants": [
                "This person uses a strict system of nested folders, clear naming rules, and an empty email inbox.",
                "This person categorizes files immediately, ensuring a clean digital screen and quick data retrieval."
              ]
            },
            {
              "id": "ma11-l2-o2",
              "tag": "digital-fluid",
              "label": "Fluid Search-Driven Setup",
              "variants": [
                "This person saves files directly to the desktop or a single folder, relying heavily on search bars later.",
                "This person prioritizes immediate speed over formal classification, leaving multiple browser tabs open constantly."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma12",
      "title": "Professional Communication Style",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma12-l1",
          "question": "What is this person's preferred channel for handling business communication?",
          "options": [
            {
              "id": "ma12-l1-o1",
              "tag": "comm-asynchronous",
              "label": "Written & Precise",
              "variants": [
                "This person heavily prefers structured emails or text messages to maintain a clear black-and-white paper trail.",
                "This person avoids unscheduled phone calls, favoring written communication that allows time for a calculated reply."
              ]
            },
            {
              "id": "ma12-l1-o2",
              "tag": "comm-synchronous",
              "label": "Direct & Verbal",
              "variants": [
                "This person prefers picking up the phone or jumping on a quick video call to solve issues instantly.",
                "This person values real-time human conversation, finding vocal interaction much more efficient than long email threads."
              ]
            }
          ]
        },
        {
          "id": "ma12-l2",
          "question": "How does this person express ideas and feedback during professional meetings?",
          "options": [
            {
              "id": "ma12-l2-o1",
              "tag": "meeting-assertive",
              "label": "Direct & Goal-Oriented",
              "variants": [
                "This person gets straight to the point, favoring raw honesty and data over diplomatic soft-talk.",
                "This person speaks with authority, addressing bottlenecks directly without wasting time on pleasantries."
              ]
            },
            {
              "id": "ma12-l2-o2",
              "tag": "meeting-diplomatic",
              "label": "Collaborative & Empathetic",
              "variants": [
                "This person uses careful diplomacy, ensuring everyone feels heard and comfortable before making a point.",
                "This person prioritizes team harmony, wrapping critiques in positive reinforcement and collaborative language."
              ]
            }
          ]
        }
      ]
    }
  ]
};
// End of Part 1 of 4
