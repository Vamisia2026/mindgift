// Part 2 of 4 - Continues in maPart3.ts
export const maPart2 = {
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
      "id": "ma13",
      "title": "Career & Ambition Drive",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma13-l1",
          "question": "What is this person's primary motivation when looking at professional growth?",
          "options": [
            {
              "id": "ma13-l1-o1",
              "tag": "ambition-status",
              "label": "High-Impact & Leadership",
              "variants": [
                "This person actively chases promotions, authority, leadership roles, and prestige within the industry.",
                "This person thrives on competition, major projects, and achieving a high professional status."
              ]
            },
            {
              "id": "ma13-l1-o2",
              "tag": "ambition-balance",
              "label": "Stability & Lifestyle Balance",
              "variants": [
                "This person prioritizes work-life balance, choosing predictable schedules and stress-free environments.",
                "This person views a job as a means to support a fulfilling personal life, avoiding corporate ladder politics."
              ]
            }
          ]
        },
        {
          "id": "ma13-l2",
          "question": "How does this person handle professional risks or sudden career shifts?",
          "options": [
            {
              "id": "ma13-l2-o1",
              "tag": "risk-entrepreneurial",
              "label": "Bold & Autonomously Driven",
              "variants": [
                "This person embraces calculated risks, showing an entrepreneurial mindset or a love for continuous innovation.",
                "This person is comfortable with uncertainty if it means full creative control and unlimited upside."
              ]
            },
            {
              "id": "ma13-l2-o2",
              "tag": "risk-conservative",
              "label": "Secure & Methodical Steps",
              "variants": [
                "This person prefers long-term institutional security, clear guidelines, and a steady corporate trajectory.",
                "This person minimizes professional volatility, valuing solid contracts and predictable professional environments."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma14",
      "title": "Learning & Skill Acquisition",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma14-l1",
          "question": "How does this person prefer to acquire a new professional skill or piece of knowledge?",
          "options": [
            {
              "id": "ma14-l1-o1",
              "tag": "learning-structured",
              "label": "Formal & Academic Framework",
              "variants": [
                "This person prefers structured courses, professional certifications, or official textbooks with a clear syllabus.",
                "This person values authorized credentials, structured lectures, and methodical learning paths designed by experts."
              ]
            },
            {
              "id": "ma14-l1-o2",
              "tag": "learning-practical",
              "label": "Experimental & Self-Taught",
              "variants": [
                "This person dives directly into practical trials, learning on the go through tutorials and immediate experimentation.",
                "This person relies on rapid documentation search, forums, and hands-on trouble-shooting without formal training."
              ]
            }
          ]
        },
        {
          "id": "ma14-l2",
          "question": "What kind of skill development does this person prioritize?",
          "options": [
            {
              "id": "ma14-l2-o1",
              "tag": "skill-technical",
              "label": "Hard Technical Mastery",
              "variants": [
                "This person focuses heavily on technical tools, code, data analysis, or specific physical machinery.",
                "This person enjoys mastering hard, quantifiable skills that yield deterministic and highly technical results."
              ]
            },
            {
              "id": "ma14-l2-o2",
              "tag": "skill-creative",
              "label": "Soft Skills & Human Dynamics",
              "variants": [
                "This person prioritizes communication, psychology, creative direction, or public speaking abilities.",
                "This person focuses on emotional intelligence, narrative design, or interpersonal persuasion strategies."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma15",
      "title": "Public Exposure & Networking",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma15-l1",
          "question": "How does this person approach corporate networking and building professional relationships?",
          "options": [
            {
              "id": "ma15-l1-o1",
              "tag": "networking-active",
              "label": "The Social Connector",
              "variants": [
                "This person actively attends industry events, exchanges digital contacts, and builds a massive professional network.",
                "This person loves working the room, initiating conversations with strangers, and maintaining high social visibility."
              ]
            },
            {
              "id": "ma15-l1-o2",
              "tag": "networking-selective",
              "label": "The Niche Specialist",
              "variants": [
                "This person prefers a tiny circle of highly trusted close collaborators, avoiding superficial business mixers.",
                "This person relies strictly on competence and delivery, allowing professional results to speak for this person."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma16",
      "title": "Tech Device Preference",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma16-l1",
          "question": "What is this person's philosophy when choosing personal hardware or mobile devices?",
          "options": [
            {
              "id": "ma16-l1-o1",
              "tag": "tech-premium",
              "label": "Ecosystem & Premium Design",
              "variants": [
                "This person prefers high-end, premium brands with unified ecosystems and sleek industrial aesthetics.",
                "This person values smooth integration, premium materials, and out-of-the-box status over raw customizability."
              ]
            },
            {
              "id": "ma16-l1-o2",
              "tag": "tech-custom",
              "label": "Open Platform & Performance",
              "variants": [
                "This person chooses open platforms, focusing purely on spec sheets, raw performance, and custom configuration.",
                "This person values flexibility, value-for-money, and the ability to modify or control hardware settings deeply."
              ]
            }
          ]
        },
        {
          "id": "ma16-l2",
          "question": "How does this person treat hardware upgrades and tech accessories?",
          "options": [
            {
              "id": "ma16-l2-o1",
              "tag": "upgrade-early",
              "label": "Early Adopter & Enthusiast",
              "variants": [
                "This person upgrades to the latest model quickly, loving new features, premium docks, and top-tier accessories.",
                "This person stays cutting-edge, investing regularly in high-tech gadgets and specialized peripheral devices."
              ]
            },
            {
              "id": "ma16-l2-o2",
              "tag": "upgrade-utilitarian",
              "label": "Utilitarian Conservation",
              "variants": [
                "This person keeps a device for many years until it stops working, using basic, no-frills protective gear.",
                "This person views hardware purely as a tool, avoiding consumer hypes or unnecessary technical additions."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma17",
      "title": "Financial & Investment Philosophy",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma17-l1",
          "question": "What is this person's primary focus when managing personal money or investments?",
          "options": [
            {
              "id": "ma17-l1-o1",
              "tag": "finance-growth",
              "label": "Long-Term Growth & Assets",
              "variants": [
                "This person actively researches markets, building a portfolio focused on long-term equity growth or dividend stocks.",
                "This person values compounding wealth, financial planning, and strategic asset accumulation over casual spending."
              ]
            },
            {
              "id": "ma17-l1-o2",
              "tag": "finance-spending",
              "label": "Immediate Experience & Liquidity",
              "variants": [
                "This person treats money as a tool for current lifestyle experiences, travel, and immediate personal comfort.",
                "This person prefers high liquidity, avoiding complex market locking to keep capital accessible for instant use."
              ]
            }
          ]
        },
        {
          "id": "ma17-l2",
          "question": "How does this person approach risk and budgeting decisions?",
          "options": [
            {
              "id": "ma17-l2-o1",
              "tag": "risk-calculated",
              "label": "Data-Driven & Calculated Risk",
              "variants": [
                "This person uses digital applications or sheets to monitor portfolios, tolerating volatility for strategic returns.",
                "This person makes detached financial choices based on statistics, metrics, and global economic analysis."
              ]
            },
            {
              "id": "ma17-l2-o2",
              "tag": "risk-conservative",
              "label": "Safety & Capital Preservation",
              "variants": [
                "This person prioritizes government bonds, secure savings accounts, or tangible real estate protection.",
                "This person minimizes market exposure, preferring absolute downside protection and peace of mind over high yields."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma18",
      "title": "Artistic & Visual Aesthetics",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma18-l1",
          "question": "What kind of visual art style and illustration era resonates most with this person?",
          "options": [
            {
              "id": "ma18-l1-o1",
              "tag": "style-classic",
              "label": "Classic Golden Era",
              "variants": [
                "This person loves the warmth and charm of classic hand-drawn art, vintage character design, and traditional animation.",
                "This person deeply appreciates nostalgic, expressive aesthetics inspired by mid-century animation and storybooks."
              ]
            },
            {
              "id": "ma18-l1-o2",
              "tag": "style-modern",
              "label": "Contemporary & Digital Art",
              "variants": [
                "This person prefers ultra-modern digital styles, minimalist flat vectors, or sleek 3D render designs.",
                "This person values cutting-edge digital aesthetics, sharp contemporary interfaces, and highly polished modern visuals."
              ]
            }
          ]
        },
        {
          "id": "ma18-l2",
          "question": "How does this person approach artistic creations or personal design choices?",
          "options": [
            {
              "id": "ma18-l2-o1",
              "tag": "art-narrative",
              "label": "Story-Driven & Expressive",
              "variants": [
                "This person values creative storytelling, character depth, and emotional connection within artistic works.",
                "This person treats art and illustrations as a medium to convey rich narratives, character charm, and imagination."
              ]
            },
            {
              "id": "ma18-l2-o2",
              "tag": "art-abstract",
              "label": "Conceptual & Geometric",
              "variants": [
                "This person focuses on abstract harmony, geometric patterns, balance, or conceptual depth over character stories.",
                "This person appreciates high functional layout, structural symmetry, and pure conceptual art designs."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma19",
      "title": "Workplace Authority & Hierarchy",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma19-l1",
          "question": "How does this person prefer to navigate organizational structures and authority?",
          "options": [
            {
              "id": "ma19-l1-o1",
              "tag": "hierarchy-flat",
              "label": "Horizontal & Decentralized",
              "variants": [
                "This person thrives in flat organizations, valuing open collaboration, autonomy, and direct access to decision-makers.",
                "This person prefers informal professional dynamics where ideas carry more weight than job titles or corporate ranks."
              ]
            },
            {
              "id": "ma19-l1-o2",
              "tag": "hierarchy-structured",
              "label": "Traditional & Vertical",
              "variants": [
                "This person respects clear corporate ladders, structured chains of command, and defined operational protocols.",
                "This person feels most secure when lines of authority, reporting channels, and formal ranks are strictly enforced."
              ]
            }
          ]
        },
        {
          "id": "ma19-l2",
          "question": "What is this person's leadership and operational style when running a project?",
          "options": [
            {
              "id": "ma19-l2-o1",
              "tag": "leadership-autonomous",
              "label": "Independent Visionary",
              "variants": [
                "This person acts as an autonomous director, taking full ownership of decisions and driving the vision forward.",
                "This person leads with decisive, independent strategy, expecting execution speed and clear alignment from partners."
              ]
            },
            {
              "id": "ma19-l2-o2",
              "tag": "leadership-consensus",
              "label": "Consensus Builder",
              "variants": [
                "This person manages projects through collective agreement, involving team members in every major strategic vote.",
                "This person prioritizes democratic choices, ensuring total group alignment before executing a new step."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma20",
      "title": "AI & Future Automation Stance",
      "eligibility": {
        "ageGroups": ["age-teen", "age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma20-l1",
          "question": "How does this person integrate artificial intelligence and automation into daily workflows?",
          "options": [
            {
              "id": "ma20-l1-o1",
              "tag": "ai-centric",
              "label": "AI-First Integrator",
              "variants": [
                "This person heavily leverages advanced AI models, prompts, and automated systems to optimize creative or operational workflows.",
                "This person acts as an early adopter, delegating coding, writing, or analysis to digital systems to maximize output speed."
              ]
            },
            {
              "id": "ma20-l1-o2",
              "tag": "ai-skeptic",
              "label": "Human-Crafted Traditionalist",
              "variants": [
                "This person prefers manual human execution, relying strictly on traditional cognitive skills and personal intuition.",
                "This person minimizes the use of automated generators, valuing the unprompted originality of raw human craftsmanship."
              ]
            }
          ]
        },
        {
          "id": "ma20-l2",
          "question": "What is this person's long-term outlook on rapid technological automation?",
          "options": [
            {
              "id": "ma20-l2-o1",
              "tag": "tech-optimist",
              "label": "Accelerated Innovation",
              "variants": [
                "This person welcomes total digital transformation, viewing full automation as an inevitable tool for global scaling.",
                "This person feels excited about future technological breakthroughs, adapting immediately to new computational systems."
              ]
            },
            {
              "id": "ma20-l2-o2",
              "tag": "tech-cautious",
              "label": "Pragmatic & Regulated",
              "variants": [
                "This person urges caution regarding fast-paced automation, prioritizing ethics, privacy, or intellectual property rights.",
                "This person approaches tech hype with deep critical thinking, choosing to adopt new networks only when strictly necessary."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma21",
      "title": "Time Management",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma21-l1",
          "question": "How strictly does this person plan and monitor daily schedules and professional deadlines?",
          "options": [
            {
              "id": "ma21-l1-o1",
              "tag": "time-structured",
              "label": "Meticulous & Calendar-Driven",
              "variants": [
                "This person maps out every hour on digital calendars, feeling severe anxiety or frustration when a meeting runs over time.",
                "This person operates with absolute punctuality, tracking tasks to the minute and demanding strict adherence to schedules."
              ]
            },
            {
              "id": "ma21-l1-o2",
              "tag": "time-fluid",
              "label": "Improvisational & Last-Minute",
              "variants": [
                "This person prefers a flexible workflow, handling urgencies as this person arise rather than following a rigid timeline.",
                "This person works best under close-deadline pressure, relying on last-minute focus and natural adaptability."
              ]
            }
          ]
        },
        {
          "id": "ma21-l2",
          "question": "What is this person's natural response when unexpected tasks disrupt the daily professional plan?",
          "options": [
            {
              "id": "ma21-l2-o1",
              "tag": "disruption-stressed",
              "label": "High-Control Preservation",
              "variants": [
                "This person experiences noticeable stress when unexpected requests derail the pre-established agenda.",
                "This person fights to protect structural routines, pushing back against tasks that compromise current micro-planning."
              ]
            },
            {
              "id": "ma21-l2-o2",
              "tag": "disruption-adaptive",
              "label": "Fluid Re-prioritization",
              "variants": [
                "This person shifts focus instantly, treating disruptions as a normal, organic part of the corporate routine.",
                "This person thrives in chaotic, fast-moving environments where the daily target changes constantly."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma22",
      "title": "Professional Attire",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma22-l1",
          "question": "What is this person's approach to clothing and dress codes in a professional environment?",
          "options": [
            {
              "id": "ma22-l1-o1",
              "tag": "attire-formal",
              "label": "Traditional Formal",
              "variants": [
                "This person wears sharp corporate suits, ironed jackets, or high-end formal wear to communicate authority.",
                "This person adheres strictly to established corporate dress codes, believing formal elegance reflects professionalism."
              ]
            },
            {
              "id": "ma22-l1-o2",
              "tag": "attire-casual",
              "label": "Tech Casual & Comfort",
              "variants": [
                "This person prefers hoodies, simple t-shirts, sneakers, or tech-casual clothing for maximum comfort at work.",
                "This person rejects formal business suits, prioritizing a practical wardrobe that focuses on substance over corporate appearance."
              ]
            }
          ]
        },
        {
          "id": "ma22-l2",
          "question": "How does this person approach physical branding and grooming details for business interactions?",
          "options": [
            {
              "id": "ma22-l2-o1",
              "tag": "grooming-premium",
              "label": "High-End Visual Branding",
              "variants": [
                "This person pairs office outfits with visible luxury watches, premium leather accessories, or distinct fragrances.",
                "This person uses premium styling and meticulous personal presentation as a deliberate tool for corporate positioning."
              ]
            },
            {
              "id": "ma22-l2-o2",
              "tag": "grooming-functional",
              "label": "Low-Profile Practicality",
              "variants": [
                "This person wears basic, unbranded accessories, keeping personal grooming purely functional and minimalist.",
                "This person prefers a low-profile aesthetic, avoiding any display of status symbols or expensive styling elements."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma23",
      "title": "Commute & Business Travel",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma23-l1",
          "question": "What is this person's preferred method for daily commuting or business transport?",
          "options": [
            {
              "id": "ma23-l1-o1",
              "tag": "commute-private",
              "label": "Private Vehicle Control",
              "variants": [
                "This person prefers driving a personal vehicle or motorcycle, valuing private space, autonomy, and status on the road.",
                "This person chooses the isolation and control of a private car, avoiding the schedules and crowds of public transport."
              ]
            },
            {
              "id": "ma23-l1-o2",
              "tag": "commute-public",
              "label": "Public Transit & Efficiency",
              "variants": [
                "This person relies on trains, subways, or buses, using the travel time to read, work, or listen to audio content.",
                "This person prefers public infrastructure or shared mobility, bypassing traffic stress and parking logistics entirely."
              ]
            }
          ]
        },
        {
          "id": "ma23-l2",
          "question": "How does this person handle packing and logistics for professional trips or frequent travel?",
          "options": [
            {
              "id": "ma23-l2-o1",
              "tag": "travel-minimalist",
              "label": "Streamlined Carry-On",
              "variants": [
                "This person travels with a single, highly organized carry-on bag, optimizing for speed and skipping baggage claims.",
                "This person packs strictly the essentials in a tactical, structured layout, moving swiftly through airports or stations."
              ]
            },
            {
              "id": "ma23-l2-o2",
              "tag": "travel-prepared",
              "label": "Maximalist & Fully Prepared",
              "variants": [
                "This person packs large luggage to prepare for any unexpected situation, bringing extra outfits and multiple gear options.",
                "This person accepts the weight of substantial baggage to ensure maximum personal comfort and choices during a trip."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ma24",
      "title": "Meeting & Socializing Behavior",
      "eligibility": {
        "ageGroups": ["age-young-adult", "age-adult", "age-mature", "age-senior"],
        "relationships": ["partner", "close-friend-family", "coworker-client-acquaintance", "line-manager-supervisor"]
      },
      "levels": [
        {
          "id": "ma24-l1",
          "question": "What role does this person naturally assume during professional meetings and group discussions?",
          "options": [
            {
              "id": "ma24-l1-o1",
              "tag": "meeting-speaker",
              "label": "Active Protagonist",
              "variants": [
                "This person frequently takes the floor, pitched ideas confidently and driving the group narrative.",
                "This person commands attention in discussions, actively directing the conversation and leading brainstorming sessions."
              ]
            },
            {
              "id": "ma24-l1-o2",
              "tag": "meeting-listener",
              "label": "Silent Observer",
              "variants": [
                "This person prefers to listen quietly, analyzing data and speaking up only when strictly necessary.",
                "This person stays in the background during group debates, absorbing details and avoiding unnecessary spotlight."
              ]
            }
          ]
        },
        {
          "id": "ma24-l2",
          "question": "How does this person approach corporate networking and building professional relationships?",
          "options": [
            {
              "id": "ma24-l2-o1",
              "tag": "networking-proactive",
              "label": "High-Visibility Connector",
              "variants": [
                "This person actively seeks out business mixers, exchanges digital contacts, and builds a massive professional network.",
                "This person works the room effortlessly, initiating conversations with strangers to expand commercial reach."
              ]
            },
            {
              "id": "ma24-l2-o2",
              "tag": "networking-isolated",
              "label": "Selective Specialist",
              "variants": [
                "This person prefers a tiny circle of highly trusted close collaborators, avoiding superficial corporate small talk.",
                "This person isolates from industry socializing, allowing raw professional output to speak for itself."
              ]
            }
          ]
        }
      ]
    }
  ]
};
// End of Part 2 of 4
