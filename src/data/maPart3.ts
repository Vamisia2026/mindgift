// Part 3 of 4 - Continues in maPart4.ts
export const maPart3 = {
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
      "id": "ma25",
      "title": "Tech Dependency at Work",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma25-l1",
          "question": "To what extent does this person integrate advanced digital tools and AI into this person's daily workflows?",
          "options": [
            {
              "id": "ma25-l1-o1",
              "tag": "worktech-digital",
              "label": "AI-First & Gadget Driven",
              "variants": [
                "This person heavily leverages cutting-edge AI software, custom prompts, and multiple screen displays to maximize operational speed.",
                "This person automates repetitive tasks immediately, relying on a vast stack of digital apps and the latest hardware setups."
              ]
            },
            {
              "id": "ma25-l1-o2",
              "tag": "worktech-analog",
              "label": "Minimalist & Traditionalist",
              "variants": [
                "This person prefers traditional methods, utilizing a simple notebook, pen, or basic corporate software to track thoughts.",
                "This person minimizes reliance on complex software layers, favoring unprompted human execution and raw cognitive focus."
              ]
            }
          ]
        },
        {
          "id": "ma25-l2",
          "question": "How does this person react when technical glitches or platform outages disrupt this person's work environment?",
          "options": [
            {
              "id": "ma25-l2-o1",
              "tag": "techoutage-blocked",
              "label": "Highly Disruptive Paralysis",
              "variants": [
                "This person experiences severe workflow blockage, finding it difficult to operate when cloud servers or digital tools go down.",
                "This person treats digital infrastructure as absolute oxygen, feeling completely derailed by unexpected connection issues."
              ]
            },
            {
              "id": "ma25-l2-o2",
              "tag": "techoutage-resilient",
              "label": "Offline Adaptability",
              "variants": [
                "This person switches easily to offline notes, conceptual tasks, or phone calls, treating tech crashes as minor incidents.",
                "This person maintains absolute composure during digital blackouts, shifting effortlessly to old-school manual routines."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma26",
      "title": "Leadership & Team Dynamics",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma26-l1",
          "question": "What is this person's natural positioning when running a team or project?",
          "options": [
            {
              "id": "ma26-l1-o1",
              "tag": "leadership-director",
              "label": "Autonomous Authority & Vision",
              "variants": [
                "This person acts as an independent director, taking full ownership of macro decisions and enforcing clear execution goals.",
                "This person leads with decisive, unilateral strategy, expecting speed and direct alignment from team members."
              ]
            },
            {
              "id": "ma26-l1-o2",
              "tag": "leadership-collaborator",
              "label": "Autonomous Contributor & Performer",
              "variants": [
                "This person prefers executing tasks independently as an individual contributor, avoiding management or corporate hierarchy politics.",
                "This person operates best when left alone to deliver expert results, resisting the responsibility of supervising other people."
              ]
            }
          ]
        },
        {
          "id": "ma26-l2",
          "question": "How does this person approach task delegation and operational control?",
          "options": [
            {
              "id": "ma26-l2-o1",
              "tag": "delegation-high",
              "label": "Macro Management & Trust",
              "variants": [
                "This person delegates large chunks of responsibility easily, trusting collaborators to find this person's own solutions.",
                "This person focuses entirely on the big picture, giving collaborators full autonomy over minor operational details."
              ]
            },
            {
              "id": "ma26-l2-o2",
              "tag": "delegation-low",
              "label": "Hands-On Perfectionism",
              "variants": [
                "This person micro-manages outputs, checking every decimal or detail because this person struggles to trust others' precision.",
                "This person prefers to do critical tasks personally, ensuring the final delivery meets this person's exact standards."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma27",
      "title": "Break Time Habits",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma27-l1",
          "question": "How does this person prefer to spend this person's mid-day break or lunch hours at work?",
          "options": [
            {
              "id": "ma27-l1-o1",
              "tag": "break-social",
              "label": "Social Networking & Café",
              "variants": [
                "This person uses break time to socialize, grab a quick coffee with colleagues at a busy bar, and talk business.",
                "This person treats office breaks as a high-visibility opportunity to network, chat with teammates, and build rapport."
              ]
            },
            {
              "id": "ma27-l1-o2",
              "tag": "break-solitary",
              "label": "Solitary Recharge & Wellness",
              "variants": [
                "This person prefers a quiet, solitary lunch or a healthy walk alone to disconnect completely from corporate chatter.",
                "This person uses breaks to isolate, avoid office gossip, and reset this person's mental energy in total peace."
              ]
            }
          ]
        },
        {
          "id": "ma27-l2",
          "question": "What kind of nourishment or ritual does this person prioritize during a quick workday pause?",
          "options": [
            {
              "id": "ma27-l2-o1",
              "tag": "ritual-functional",
              "label": "Fast Fuel & Caffeine",
              "variants": [
                "This person runs on quick espresso shots from the office vending machine or fast food, treating food purely as fuel.",
                "This person prioritizes immediate energy hits, using sugary snacks or coffee to power through the next shift."
              ]
            },
            {
              "id": "ma27-l2-o2",
              "tag": "ritual-mindful",
              "label": "Mindful & Health-Conscious",
              "variants": [
                "This person prepares specialized healthy meals from home, tracking nutrition and sipping herbal tea or water.",
                "This person maintains a strict dietary routine, avoiding processed corporate snacks in favor of clean nutrition."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma28",
      "title": "Financial & Budget Mindset",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma28-l1",
          "question": "What is this person's primary focus when managing finances, tracking budgets, or investing capital?",
          "options": [
            {
              "id": "ma28-l1-o1",
              "tag": "finance-strategic",
              "label": "Strategic Accumulation & Investments",
              "variants": [
                "This person actively researches markets, building a portfolio focused on long-term equity growth or dividend stocks.",
                "This person values compounding wealth, meticulous financial tracking, and protecting corporate or personal assets."
              ]
            },
            {
              "id": "ma28-l1-o2",
              "tag": "finance-generous",
              "label": "Experiential Spending & Open-Handed",
              "variants": [
                "This person treats money as a tool for immediate lifestyle experiences, commercial generosity, or instant comforts.",
                "This person avoids complex market locking, keeping capital highly liquid and spending freely on valuable opportunities."
              ]
            }
          ]
        },
        {
          "id": "ma28-l2",
          "question": "How does this person naturally react to strict corporate budgeting or personal expense constraints?",
          "options": [
            {
              "id": "ma28-l2-o1",
              "tag": "budget-frugal",
              "label": "Analytical Cost-Cutting",
              "variants": [
                "This person monitors outlays to the penny, optimizing resources and cutting unnecessary overheads with analytical precision.",
                "This person enforces tight budget discipline, preferring safety margins and absolute downside protection."
              ]
            },
            {
              "id": "ma28-l2-o2",
              "tag": "budget-expansive",
              "label": "Growth-Driven Allocation",
              "variants": [
                "This person prefers investing heavily to accelerate results, treating high spending as a necessary engine for growth.",
                "This person dislikes penny-pinching constraints, prioritizing execution speed and top-tier tools over saving costs."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma29",
      "title": "Reaction to Professional Stress",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma29-l1",
          "question": "What is this person's primary behavioral mechanism when dealing with severe professional pressure or high-stakes crises?",
          "options": [
            {
              "id": "ma29-l1-o1",
              "tag": "stress-externalized",
              "label": "Physical Release & Externalization",
              "variants": [
                "This person releases built-up tension through intense physical exercise, sports, or venting frustration outside the office.",
                "This person needs to move, change environment, or actively discharge stress to maintain mental equilibrium."
              ]
            },
            {
              "id": "ma29-l1-o2",
              "tag": "stress-internalized",
              "label": "Overtime Focus & Internalization",
              "variants": [
                "This person internalizes anxiety, shutting down socially and locking this person in the office for long overnight sessions to solve the issue.",
                "This person absorbs the pressure silently, doubling down on isolation and working deeper into the night until the task is fully controlled."
              ]
            }
          ]
        },
        {
          "id": "ma29-l2",
          "question": "How does this person's communication style shift when a professional emergency peaks?",
          "options": [
            {
              "id": "ma29-l2-o1",
              "tag": "communication-sharp",
              "label": "Direct & Urgent Command",
              "variants": [
                "This person becomes extremely direct, blunt, and urgent, stripping away social pleasantries to accelerate execution.",
                "This person cuts small talk completely during crises, demanding instant updates and absolute clarity from everyone."
              ]
            },
            {
              "id": "ma29-l2-o2",
              "tag": "communication-withdrawn",
              "label": "Quiet & Hyper-Focused Isolation",
              "variants": [
                "This person goes completely silent, avoiding messages or calls to protect this person's cognitive bandwidth from external noise.",
                "This person retreats into absolute operational isolation, refusing to discuss the situation until a concrete solution is found."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma30",
      "title": "Coffee & Caffeine Ritual",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma30-l1",
          "question": "What is this person's relationship with coffee quality, sourcing, and preparation rituals?",
          "options": [
            {
              "id": "ma30-l1-o1",
              "tag": "coffee-connoisseur",
              "label": "Artisanal Specialty & Ritual",
              "variants": [
                "This person treats coffee as a refined culinary art, favoring specialty single-origin beans, precise filter methods, or artisanal barista creations.",
                "This person enjoys the detailed chemistry of brewing, investing time and money into specific temperatures, scales, or premium independent roasters."
              ]
            },
            {
              "id": "ma30-l1-o2",
              "tag": "coffee-functional",
              "label": "High-Speed Fuel & Energy",
              "variants": [
                "This person drinks standard commercial espresso pods, quick office vending machine mixtures, or high-caffeine energy drinks.",
                "This person uses caffeine purely as a metabolic stimulant to wake up or power through a shift, bypassing complex artisanal preparation."
              ]
            }
          ]
        },
        {
          "id": "ma30-l2",
          "question": "How central is the caffeine intake to this person's social identity and daily lifestyle?",
          "options": [
            {
              "id": "ma30-l2-o1",
              "tag": "caffeine-dependent",
              "label": "High-Frequency Essential Routine",
              "variants": [
                "This person relies on multiple cups throughout the day, structuring entire professional breaks or morning routines around the next fix.",
                "This person exhibits strong daily dependency, admitting that peak mental performance is unattainable without a structured caffeine cycle."
              ]
            },
            {
              "id": "ma30-l2-o2",
              "tag": "caffeine-casual",
              "label": "Low-Frequency or Decaf Lifestyle",
              "variants": [
                "This person drinks coffee occasionally for pure taste, or prefers herbal teas, water, and a decaffeinated lifestyle.",
                "This person maintains a stable natural energy curve, avoiding physical reliance on chemical stimulants to get through the workday."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma31",
      "title": "Gadget & Tech Obsession",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma31-l1",
          "question": "How quickly and enthusiastically does this person adopt new tech hardware and smart devices?",
          "options": [
            {
              "id": "ma31-l1-o1",
              "tag": "tech-enthusiast",
              "label": "Early Adopter & Smart Ecosystem",
              "variants": [
                "This person purchases the latest smartphone flagship models immediately and loves automating this person's home with complex smart devices.",
                "This person tracks hardware keynotes, prioritizing cutting-edge tech gadgets and premium digital interfaces as a core hobby."
              ]
            },
            {
              "id": "ma31-l1-o2",
              "tag": "tech-utilitarian",
              "label": "Utilitarian & Pragmatic User",
              "variants": [
                "This person keeps electronic devices for many years, upgrading hardware only when the old system breaks or becomes completely obsolete.",
                "This person views technology as a basic utility tool, refusing to invest money or interest into unnecessary smart gadgets or upgrade hype."
              ]
            }
          ]
        },
        {
          "id": "ma31-l2",
          "question": "What is this person's aesthetic and practical approach to managing this person's hardware setup?",
          "options": [
            {
              "id": "ma31-l2-o1",
              "tag": "setup-premium",
              "label": "Sleek & Optimized Aesthetics",
              "variants": [
                "This person invests in custom desk layouts, organized cable management, and visually striking, high-end accessories.",
                "This person curates a highly aesthetic digital environment, matching tech brands and hardware design for maximum visual harmony."
              ]
            },
            {
              "id": "ma31-l2-o2",
              "tag": "setup-functional",
              "label": "Basic & Uncluttered Function",
              "variants": [
                "This person uses standard out-of-the-box accessories, focusing purely on whether the device works rather than how the setup looks.",
                "This person prefers a minimalist, non-intrusive approach, avoiding complex technical configurations or multi-device networks."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma32",
      "title": "Weekend Escape Habits",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma32-l1",
          "question": "What is this person's default tendency when planning activities for the weekend?",
          "options": [
            {
              "id": "ma32-l1-o1",
              "tag": "weekend-explorer",
              "label": "Proactive Day Tripper",
              "variants": [
                "This person constantly plans day trips, outdoor excursions, or quick out-of-town getaways to break the weekly routine.",
                "This person packs a bag immediately on Friday afternoon, seeking new geographical environments and active stimulation."
              ]
            },
            {
              "id": "ma32-l1-o2",
              "tag": "weekend-homebody",
              "label": "Domestic Recharge & Slow Pace",
              "variants": [
                "This person prefers complete domestic relaxation, avoiding unnecessary travel to stay inside a familiar, comfortable home space.",
                "This person treats the weekend as a sacred bubble of total laziness and slow routines, resetting energy without moving far."
              ]
            }
          ]
        },
        {
          "id": "ma32-l2",
          "question": "How structured and organized is this person's approach to managing this person's personal free time?",
          "options": [
            {
              "id": "ma32-l2-o1",
              "tag": "freetime-structured",
              "label": "Event-Driven & Scheduled",
              "variants": [
                "This person fills the weekend calendar with specific dinner reservations, museum visits, or strict social appointments.",
                "This person coordinates personal free time meticulously, ensuring every hour offers maximum cultural or social output."
              ]
            },
            {
              "id": "ma32-l2-o2",
              "tag": "freetime-spontaneous",
              "label": "Improvisational & Open",
              "variants": [
                "This person leaves the schedule completely blank, waking up without a plan and choosing activities based on the mood of the moment.",
                "This person rejects rigid social bookings on weekends, prioritizing total freedom to change this person's mind at the last second."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma33",
      "title": "Gift Giving Behavior",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma33-l1",
          "question": "What is this person's psychological investment and strategy when selecting a gift?",
          "options": [
            {
              "id": "ma33-l1-o1",
              "tag": "gift-thoughtful",
              "label": "Deeply Personalized & Bespoke",
              "variants": [
                "This person spends days searching for meaningful items, creating handmade gestures, or finding unique pieces based on emotional nuances.",
                "This person prioritizes deep psychological alignment, tracking hidden hints to deliver highly tailored, memorable gifts."
              ]
            },
            {
              "id": "ma33-l1-o2",
              "tag": "gift-practical",
              "label": "Convenient & Functional",
              "variants": [
                "This person chooses immediate digital gift cards, practical items, or cash equivalents to ensure maximum utility for the recipient.",
                "This person avoids the stress of overthinking, purchasing popular, high-utility, or last-minute products that are guaranteed to work."
              ]
            }
          ]
        },
        {
          "id": "ma33-l2",
          "question": "How does this person manage the timing and execution of buying and presenting gifts?",
          "options": [
            {
              "id": "ma33-l2-o1",
              "tag": "gift-organized",
              "label": "Proactive Planning & Presentation",
              "variants": [
                "This person buys gifts months in advance, wrapping this person meticulously and ensuring flawless presentation for the occasion.",
                "This person tracks dynamic calendars for celebrations, preventing any rush by securing items ahead of schedule."
              ]
            },
            {
              "id": "ma33-l2-o2",
              "tag": "gift-spontaneous",
              "label": "Last-Minute Spontaneity",
              "variants": [
                "This person purchases items on the exact day of the event, relying on instant online delivery or fast local shopping.",
                "This person operates entirely under pressure, selecting gifts in a spontaneous rush right before entering the party."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma34",
      "title": "Vehicle & Transport Choice",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma34-l1",
          "question": "What is this person's emotional and aesthetic relationship with this person's personal vehicle?",
          "options": [
            {
              "id": "ma34-l1-o1",
              "tag": "vehicle-pride",
              "label": "Meticulous Care & Status Symbol",
              "variants": [
                "This person maintains a spotless vehicle, cleaning it meticulously every week and treating it as an extension of identity or status.",
                "This person invests significant interest into premium automotive specifications, pristine paintwork, and flawless mechanical upkeep."
              ]
            },
            {
              "id": "ma34-l1-o2",
              "tag": "vehicle-utility",
              "label": "Utilitarian Tool & Disordered Space",
              "variants": [
                "This person views the vehicle as a simple, messy tool for moving from point A to point B, ignoring scratches or cabin clutter.",
                "This person leaves personal items or technical gear piled in the back, prioritizing raw functional transport over aesthetic appearance."
              ]
            }
          ]
        },
        {
          "id": "ma34-l2",
          "question": "What primary features does this person prioritize when selecting a personal mode of transit?",
          "options": [
            {
              "id": "ma34-l2-o1",
              "tag": "vehicle-performance",
              "label": "Power, Tech & Driving Dynamics",
              "variants": [
                "This person seeks high horse-power, precise handling, or advanced digital dashboards to maximize driving engagement.",
                "This person selects dynamic engines and sporty aesthetics, valuing the emotional experience of acceleration and control."
              ]
            },
            {
              "id": "ma34-l2-o2",
              "tag": "vehicle-efficiency",
              "label": "Eco-Efficiency & Practical Space",
              "variants": [
                "This person prioritizes low fuel consumption, smart cabin space, or sustainable hybrid/electric architectures.",
                "This person values pragmatic trunk space and absolute cost-per-kilometer optimization over premium brand prestige."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma35",
      "title": "Alcohol & Nightlife Habits",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma35-l1",
          "question": "What is this person's natural environment and preference for late-night socializing?",
          "options": [
            {
              "id": "ma35-l1-o1",
              "tag": "nightlife-active",
              "label": "High-Energy Bars & Clubs",
              "variants": [
                "This person loves crowded, vibrant cocktail bars, music events, or lively urban spots that stay open until late at night.",
                "This person thrives in loud, energetic social settings, enjoying the dynamic buzz of nightlife culture and weekend parties."
              ]
            },
            {
              "id": "ma35-l1-o2",
              "tag": "nightlife-intimate",
              "label": "Quiet Pubs & Speakeasies",
              "variants": [
                "This person prefers intimate speakeasies, quiet craft beer pubs, or hosting a few selected friends at home for private talks.",
                "This person avoids chaotic, overcrowded clubs, choosing comfortable environments where people can actually hear each other speak."
              ]
            }
          ]
        },
        {
          "id": "ma35-l2",
          "question": "How does this person approach the selection and appreciation of drinks or evening rituals?",
          "options": [
            {
              "id": "ma35-l2-o1",
              "tag": "drinking-premium",
              "label": "Craft Mixology & Fine Wines",
              "variants": [
                "This person explores premium craft cocktails, specialized spirits, or fine vintage wines, valuing taste profiles and expert preparation.",
                "This person treats evening drinks as a refined sensory experience, investing in high-quality labels or artisanal local breweries."
              ]
            },
            {
              "id": "ma35-l2-o2",
              "tag": "drinking-sober-basic",
              "label": "Sober or Standard Function",
              "variants": [
                "This person sticks to standard sodas, mocktails, non-alcoholic drinks, or simple classic beers without overthinking the options.",
                "This person maintains a highly casual approach, avoiding complex mixology trends or choosing a completely sober lifestyle."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma36",
      "title": "Pets & Animal Companionship",
      "eligibility": {
        "ageGroups": ["age-child", "age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance"]
      },
      "levels": [
        {
          "id": "ma36-l1",
          "question": "What is this person's emotional investment and lifestyle integration regarding pets?",
          "options": [
            {
              "id": "ma36-l1-o1",
              "tag": "pet-devoted",
              "label": "Passionate Pet Owner",
              "variants": [
                "This person treats pets as full family members, structuring daily routines, trips, and home spaces around this person's companion's well-being.",
                "This person shares an intense emotional bond with animals, investing deep care, time, and attention into this person's pet's lifestyle."
              ]
            },
            {
              "id": "ma36-l1-o2",
              "tag": "pet-detached",
              "label": "No Pets or Low-Maintenance",
              "variants": [
                "This person prefers a home layout without pet constraints, prioritizing absolute personal freedom and uncomplicated logistics.",
                "This person avoids the long-term responsibility of animal care, favoring a minimalist domestic routine free of pet duties."
              ]
            }
          ]
        },
        {
          "id": "ma36-l2",
          "question": "Which animal dynamic best aligns with this person's domestic energy and social personality?",
          "options": [
            {
              "id": "ma36-l2-o1",
              "tag": "pet-canine",
              "label": "Active Canine Energy",
              "variants": [
                "This person loves the loyal, outgoing, and energetic nature of dogs, enjoying outdoor walks, active play, and constant social presence.",
                "This person prefers a visible, affectionate animal companion that requires interactive outdoor routines and deep daily engagement."
              ]
            },
            {
              "id": "ma36-l2-o2",
              "tag": "pet-feline-independent",
              "label": "Independent Feline Energy",
              "variants": [
                "This person appreciates the quiet, autonomous, and low-profile nature of cats or independent indoor animals.",
                "This person favors a calm domestic environment, choosing a pet that respects personal boundaries and requires less physical maintenance."
              ]
            }
          ]
        }
      ]
    }
  ]
};
// End of Part 3 of 4
