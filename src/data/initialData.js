// Initial seed data for Donation Connect (DTI Project)
// Provides verified and pending NGOs, comprehensive donation categories,
// beneficiary categories, live campaigns, and sample donation tracks.

export const DONATION_CATEGORIES = [
  {
    id: 'clothes',
    title: 'Clothes',
    icon: 'Shirt',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    description: 'Warm clothes, daily wear, school uniforms, and footwear in clean condition.',
    examples: ['Winter jackets', 'Blankets', 'School uniforms', 'Daily cottons', 'Shoes & sandals'],
    conditionRequirement: 'Clean, wearable, no severe tears or missing buttons',
    urgentNeedCount: 14
  },
  {
    id: 'books',
    title: 'Books & Educational Material',
    icon: 'BookOpen',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    description: 'Textbooks, notebooks, storybooks, stationery kits, and school supplies.',
    examples: ['CBSE/State textbooks', 'Storybooks in English/Hindi', 'Notebooks', 'Pencil boxes', 'Geometry kits'],
    conditionRequirement: 'Readable, all pages intact, clean stationery',
    urgentNeedCount: 22
  },
  {
    id: 'food',
    title: 'Food & Dry Rations',
    icon: 'Utensils',
    color: '#10B981',
    bgColor: '#ECFDF5',
    description: 'Packaged dry grains, pulses, cooking oil, biscuits, and infant nutrition.',
    examples: ['Rice & wheat flour', 'Lentils/Dal', 'Cooking oil', 'Packaged milk powder', 'Nutritional biscuits'],
    conditionRequirement: 'Unopened, properly sealed, at least 2 months before expiry',
    urgentNeedCount: 31
  },
  {
    id: 'toys',
    title: 'Toys & Games',
    icon: 'Smile',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    description: 'Educational toys, board games, puzzles, building blocks, and soft toys for orphanages.',
    examples: ['Board games (Ludo, Chess)', 'Puzzles & blocks', 'Dolls & action figures', 'Sports balls'],
    conditionRequirement: 'Safe, non-toxic, all crucial pieces included, clean',
    urgentNeedCount: 9
  },
  {
    id: 'furniture',
    title: 'Furniture',
    icon: 'Armchair',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    description: 'Study tables, chairs, bookshelves, metal cots, and storage cupboards for shelters.',
    examples: ['Study desks', 'Stackable chairs', 'Steel almirahs', 'Single beds/cots', 'Dining benches'],
    conditionRequirement: 'Structurally sturdy, free of sharp splinters or rust',
    urgentNeedCount: 6
  },
  {
    id: 'electronics',
    title: 'Electronics',
    icon: 'Laptop',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    description: 'Working laptops, tablets, smartphones, desktop monitors, and chargers for digital learning.',
    examples: ['Laptops (Core i3+)', 'Android tablets', 'Smartphones for students', 'Printers', 'Webcams'],
    conditionRequirement: 'Fully working, chargers included, data factory reset',
    urgentNeedCount: 18
  },
  {
    id: 'medical',
    title: 'Medical / Support Items',
    icon: 'HeartPulse',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    description: 'Wheelchairs, walking sticks, adult diapers, BP monitors, and first-aid supplies.',
    examples: ['Wheelchairs', 'Folding walkers', 'Crutches', 'Digital thermometers', 'Sanitary pads'],
    conditionRequirement: 'Hygienic, sterilized or unused, equipment fully functional',
    urgentNeedCount: 11
  },
  {
    id: 'money',
    title: 'Money / Monetary Grant',
    icon: 'CircleDollarSign',
    color: '#14B8A6',
    bgColor: '#F0FDFA',
    description: 'Direct 80G tax-exempt monetary contributions for shelter rent, food kitchens, and medical emergencies.',
    examples: ['Emergency shelter fund', 'Mid-day meal program', 'Scholarship sponsorship', 'Medical surgery fund'],
    conditionRequirement: 'Instant receipt & 80G certificate issued electronically',
    urgentNeedCount: 40
  },
  {
    id: 'other',
    title: 'Other Useful Items',
    icon: 'Package',
    color: '#64748B',
    bgColor: '#F8FAFC',
    description: 'Kitchen utensils, bedsheets, towels, solar lamps, raincoats, and miscellaneous essentials.',
    examples: ['Stainless steel utensils', 'Bedsheets & pillows', 'Umbrellas & raincoats', 'Water purifiers'],
    conditionRequirement: 'Functional and respectfully usable by recipient families',
    urgentNeedCount: 8
  }
];

export const BENEFICIARY_CATEGORIES = [
  {
    id: 'children',
    title: 'Children',
    icon: 'Baby',
    description: 'Slum schools, street children, malnutrition centres, and child care shelters.',
    urgentNeeds: ['Books', 'Clothes', 'Food', 'Toys'],
    beneficiaryCount: '12,500+ Children'
  },
  {
    id: 'women',
    title: 'Women',
    icon: 'Users',
    description: 'Women empowerment shelters, vocational training centres, and domestic violence survivors.',
    urgentNeeds: ['Clothes', 'Sewing Machines', 'Sanitary Kits', 'Laptops'],
    beneficiaryCount: '4,800+ Women'
  },
  {
    id: 'men-community',
    title: 'Men / Community',
    icon: 'UserCheck',
    description: 'Migrant laborers, daily wage communities, disaster-hit villages, and community centres.',
    urgentNeeds: ['Food', 'Blankets', 'Tools', 'Medical'],
    beneficiaryCount: '8,200+ Families'
  },
  {
    id: 'orphanages',
    title: 'Orphanages',
    icon: 'Home',
    description: 'Registered children care homes providing shelter, schooling, and love.',
    urgentNeeds: ['Furniture', 'Clothes', 'Food', 'Books', 'Toys'],
    beneficiaryCount: '35+ Homes'
  },
  {
    id: 'elderly',
    title: 'Elderly',
    icon: 'HeartHandshake',
    description: 'Old age homes, abandoned senior citizens, and elderly healthcare facilities.',
    urgentNeeds: ['Medical', 'Adult Diapers', 'Blankets', 'Wheelchairs', 'Food'],
    beneficiaryCount: '1,900+ Seniors'
  },
  {
    id: 'disability',
    title: 'Disability Support',
    icon: 'Activity',
    description: 'Specially-abled youth, blind schools, deaf and mute institutes, and rehabilitation centres.',
    urgentNeeds: ['Medical', 'Wheelchairs', 'Audio Learning Kits', 'Braille Books'],
    beneficiaryCount: '3,400+ Beneficiaries'
  },
  {
    id: 'students',
    title: 'Students / Scholarships',
    icon: 'GraduationCap',
    description: 'Meritorious underprivileged students aspiring for higher education, STEM, and competitive exams.',
    urgentNeeds: ['Electronics', 'Laptops', 'Books', 'Money'],
    beneficiaryCount: '5,100+ Students'
  },
  {
    id: 'animals',
    title: 'Animal Welfare',
    icon: 'PawPrint',
    description: 'Stray dog rescues, injured animal shelters, cattle gaushalas, and wildlife first-aid.',
    urgentNeeds: ['Food', 'Old Blankets', 'Medical Supplies', 'Bowls'],
    beneficiaryCount: '6,200+ Rescues'
  },
  {
    id: 'specialised',
    title: 'Specialised Causes',
    icon: 'Flame',
    description: 'Flood relief camps, emergency disaster zones, tribal belt healthcare, and clean water drives.',
    urgentNeeds: ['Food', 'Clothes', 'Water Filters', 'Money'],
    beneficiaryCount: '15,000+ Reached'
  }
];

export const INITIAL_ORGANISATIONS = [
  {
    id: 'org-1',
    name: 'Hope Children Foundation',
    tagline: 'Empowering children through education, nutrition, and care',
    logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    verificationDate: '2025-11-15',
    regNumber: 'REG-MH-2018-847291',
    darpanId: 'MH/2018/0192842',
    taxExempt: '80G & 12A Certified',
    orgType: 'Registered Charitable Trust',
    location: 'Mumbai, Maharashtra',
    address: '42, Vidya Vihar Road, Near Dadar Central, Mumbai - 400014',
    contactPerson: 'Sunita Deshmukh',
    phone: '+91 98201 44521',
    email: 'contact@hopechildren.org',
    website: 'https://hopechildren.org',
    establishedYear: 2018,
    acceptedCategories: ['clothes', 'books', 'food', 'toys', 'electronics', 'money'],
    beneficiaryCategories: ['children', 'orphanages', 'students'],
    currentNeeds: [
      { item: 'Books & Notebooks', category: 'books', needed: 250, received: 180, unit: 'sets', urgency: 'high' },
      { item: 'Children Winter Clothes', category: 'clothes', needed: 150, received: 110, unit: 'sets', urgency: 'high' },
      { item: 'Digital Tablets for Learning', category: 'electronics', needed: 25, received: 12, unit: 'units', urgency: 'urgent' },
      { item: 'Dry Rations & Pulses', category: 'food', needed: 500, received: 420, unit: 'kg', urgency: 'medium' }
    ],
    description: 'Hope Children Foundation runs 4 community learning centres and an shelter home caring for 180 destitute and orphaned children in Mumbai. We ensure every child receives quality holistic education, warm clothing, and nutritional security.',
    impactNumbers: {
      childrenEducated: '3,200+',
      mealsServed: '150,000+',
      donationsReceived: '840+'
    },
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'org-2',
    name: 'Vridh Seva Ashram (Elderly Care)',
    tagline: 'Dignified shelter, compassionate healthcare, and love for abandoned seniors',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    verificationDate: '2025-08-20',
    regNumber: 'REG-DL-2015-110294',
    darpanId: 'DL/2015/0084721',
    taxExempt: '80G & 12A Certified',
    orgType: 'Non-Profit Society',
    location: 'New Delhi, Delhi NCR',
    address: 'Plot 18, Institutional Area, Sector 22, Dwarka, New Delhi - 110077',
    contactPerson: 'Col. (Retd.) R. K. Sharma',
    phone: '+91 98112 55920',
    email: 'info@vridhseva.org',
    website: 'https://vridhseva.org',
    establishedYear: 2015,
    acceptedCategories: ['medical', 'clothes', 'food', 'furniture', 'money', 'other'],
    beneficiaryCategories: ['elderly', 'disability'],
    currentNeeds: [
      { item: 'Adult Incontinence Diapers', category: 'medical', needed: 200, received: 85, unit: 'packs', urgency: 'urgent' },
      { item: 'Lightweight Wheelchairs', category: 'medical', needed: 8, received: 3, unit: 'units', urgency: 'high' },
      { item: 'Warm Woolen Shawls & Blankets', category: 'clothes', needed: 120, received: 95, unit: 'units', urgency: 'high' },
      { item: 'Single Bed Medical Cots', category: 'furniture', needed: 10, received: 4, unit: 'cots', urgency: 'medium' }
    ],
    description: 'Vridh Seva Ashram provides permanent residential care, specialized geriatric medical supervision, and emotional companionship to 95 destitute and abandoned senior citizens.',
    impactNumbers: {
      seniorsSheltered: '450+',
      healthCamps: '80+',
      donationsReceived: '620+'
    },
    rating: 4.8,
    reviewsCount: 98
  },
  {
    id: 'org-3',
    name: 'Nari Shakti Vikas Trust',
    tagline: 'Rebuilding lives through skill training, safe shelters, and women empowerment',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    verificationDate: '2026-01-10',
    regNumber: 'REG-KA-2019-994821',
    darpanId: 'KA/2019/0219481',
    taxExempt: '80G Registered',
    orgType: 'Section 8 Non-Profit',
    location: 'Bengaluru, Karnataka',
    address: '77, 4th Cross, Koramangala 6th Block, Bengaluru - 560095',
    contactPerson: 'Meera Nambiar',
    phone: '+91 97410 88231',
    email: 'reach@narishaktitrust.org',
    website: 'https://narishaktitrust.org',
    establishedYear: 2019,
    acceptedCategories: ['clothes', 'electronics', 'furniture', 'money', 'other'],
    beneficiaryCategories: ['women', 'students'],
    currentNeeds: [
      { item: 'Sewing Machines (Manual/Motor)', category: 'other', needed: 20, received: 14, unit: 'machines', urgency: 'high' },
      { item: 'Refurbished Laptops for IT Training', category: 'electronics', needed: 15, received: 9, unit: 'laptops', urgency: 'urgent' },
      { item: 'Saris and Formal Kurta Sets', category: 'clothes', needed: 100, received: 70, unit: 'sets', urgency: 'medium' }
    ],
    description: 'Nari Shakti Vikas Trust operates shelter homes and livelihood centers for domestic abuse survivors and marginalized women, providing free certified tailoring, computing, and life skills.',
    impactNumbers: {
      womenEmployed: '1,400+',
      livelihoodKits: '850+',
      donationsReceived: '490+'
    },
    rating: 4.9,
    reviewsCount: 115
  },
  {
    id: 'org-4',
    name: 'Paws & Tails Animal Shelter',
    tagline: 'Emergency rescue, animal hospital, and forever home for street animals',
    logo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    verificationDate: '2025-06-12',
    regNumber: 'REG-MH-2017-339102',
    darpanId: 'MH/2017/0073281',
    taxExempt: '80G Registered',
    orgType: 'Animal Welfare Society',
    location: 'Pune, Maharashtra',
    address: 'Survey 48, Baner-Pashan Link Road, Pune - 411045',
    contactPerson: 'Anand Kulkarni',
    phone: '+91 94220 18834',
    email: 'sos@pawsandtails.org',
    website: 'https://pawsandtails.org',
    establishedYear: 2017,
    acceptedCategories: ['food', 'medical', 'clothes', 'money', 'other'],
    beneficiaryCategories: ['animals'],
    currentNeeds: [
      { item: 'Dog/Cat Food Bags (Dry Kibble)', category: 'food', needed: 400, received: 290, unit: 'kg', urgency: 'urgent' },
      { item: 'Old Clean Towels & Bedspreads', category: 'clothes', needed: 150, received: 110, unit: 'pieces', urgency: 'high' },
      { item: 'Antiseptic Solutions & Bandages', category: 'medical', needed: 50, received: 35, unit: 'bottles', urgency: 'high' }
    ],
    description: 'Paws & Tails is an animal sanctuary housing 220+ rescued street dogs, cats, cows, and birds recovering from road trauma and abandonment.',
    impactNumbers: {
      animalsRescued: '5,800+',
      vaccinationsDone: '12,000+',
      donationsReceived: '710+'
    },
    rating: 4.7,
    reviewsCount: 89
  },
  {
    id: 'org-5',
    name: 'Akshara Vidya Sansthan',
    tagline: 'Bridging the rural digital divide with smart classrooms and libraries',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    verificationStatus: 'verified',
    verificationDate: '2025-10-05',
    regNumber: 'REG-RJ-2016-559281',
    darpanId: 'RJ/2016/0129841',
    taxExempt: '80G & 12A Certified',
    orgType: 'Educational Trust',
    location: 'Jaipur, Rajasthan',
    address: 'B-12, Gopalpura Bypass, Near Triveni Flyover, Jaipur - 302018',
    contactPerson: 'Dr. Rameshwar Choudhary',
    phone: '+91 94140 77123',
    email: 'connect@aksharavidya.org',
    website: 'https://aksharavidya.org',
    establishedYear: 2016,
    acceptedCategories: ['books', 'electronics', 'furniture', 'money'],
    beneficiaryCategories: ['students', 'children'],
    currentNeeds: [
      { item: 'Desktop Computers / Laptops', category: 'electronics', needed: 20, received: 11, unit: 'systems', urgency: 'urgent' },
      { item: 'English & Hindi Reading Books', category: 'books', needed: 500, received: 320, unit: 'books', urgency: 'high' },
      { item: 'Wooden Study Tables', category: 'furniture', needed: 15, received: 8, unit: 'tables', urgency: 'medium' }
    ],
    description: 'Akshara Vidya establishes community libraries and computer kiosks across 28 villages in Rajasthan, impacting over 4,500 rural first-generation learners.',
    impactNumbers: {
      librariesOpened: '28',
      ruralScholars: '4,500+',
      donationsReceived: '530+'
    },
    rating: 4.9,
    reviewsCount: 167
  },
  {
    id: 'org-6',
    name: 'Green Earth Relief Shelter',
    tagline: 'Disaster response, community shelters, and sustainable rehabilitation',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&auto=format&fit=crop&q=80',
    verified: false, // PENDING VERIFICATION for Admin demo!
    verificationStatus: 'pending',
    verificationDate: null,
    regNumber: 'REG-WB-2026-904128',
    darpanId: 'WB/2026/0019482',
    taxExempt: '12A Applied',
    orgType: 'Non-Profit Society',
    location: 'Kolkata, West Bengal',
    address: '14/2 Park Circus Avenue, Near Quest Mall, Kolkata - 700017',
    contactPerson: 'Debanjan Chatterjee',
    phone: '+91 98300 66192',
    email: 'help@greenearthshelter.org',
    website: 'https://greenearthshelter.org',
    establishedYear: 2026,
    acceptedCategories: ['clothes', 'food', 'medical', 'other'],
    beneficiaryCategories: ['specialised', 'men-community'],
    currentNeeds: [
      { item: 'Emergency Tarpaulin Sheets', category: 'other', needed: 80, received: 20, unit: 'sheets', urgency: 'high' },
      { item: 'Water Purification Tablets & Filters', category: 'medical', needed: 300, received: 100, unit: 'kits', urgency: 'urgent' },
      { item: 'Dry Ration Food Kits', category: 'food', needed: 250, received: 90, unit: 'kits', urgency: 'high' }
    ],
    description: 'Green Earth Relief provides rapid emergency supplies, temporary shelters, and clean water distribution for flood-affected families in delta regions.',
    impactNumbers: {
      familiesAssisted: '850+',
      reliefKits: '600+',
      donationsReceived: '95'
    },
    rating: 4.5,
    reviewsCount: 19,
    documentsSubmitted: [
      { name: 'Society_Registration_Certificate_2026.pdf', date: '2026-02-18', size: '2.4 MB' },
      { name: 'PAN_and_Darpan_Portal_Acknowledgement.pdf', date: '2026-02-20', size: '1.1 MB' },
      { name: 'Bank_Statement_Last_6_Months.pdf', date: '2026-02-22', size: '3.8 MB' }
    ]
  },
  {
    id: 'org-7',
    name: 'Samarpan Divyang Kendra',
    tagline: 'Enabling differently-abled individuals with mobility, education, and dignity',
    logo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1000&auto=format&fit=crop&q=80',
    verified: false, // PENDING VERIFICATION for Admin demo!
    verificationStatus: 'pending',
    verificationDate: null,
    regNumber: 'REG-TN-2025-781923',
    darpanId: 'TN/2025/0049218',
    taxExempt: '80G Under Process',
    orgType: 'Public Charitable Trust',
    location: 'Chennai, Tamil Nadu',
    address: '88, Anna Salai, T. Nagar, Chennai - 600017',
    contactPerson: 'S. Rajagopalan',
    phone: '+91 98401 22910',
    email: 'info@samarpandivyang.org',
    website: 'https://samarpandivyang.org',
    establishedYear: 2025,
    acceptedCategories: ['medical', 'electronics', 'furniture', 'money'],
    beneficiaryCategories: ['disability', 'students'],
    currentNeeds: [
      { item: 'Braille Learning Tablets & Keyboards', category: 'electronics', needed: 15, received: 5, unit: 'units', urgency: 'urgent' },
      { item: 'Adjustable Crutches & Walkers', category: 'medical', needed: 40, received: 18, unit: 'pairs', urgency: 'high' }
    ],
    description: 'Samarpan provides assistive mobility aids, braille literacy programs, and vocational training for visually and physically challenged youth.',
    impactNumbers: {
      aidsDistributed: '320+',
      youthTrained: '140+',
      donationsReceived: '65'
    },
    rating: 4.6,
    reviewsCount: 24,
    documentsSubmitted: [
      { name: 'Trust_Deed_Registered_Chennai.pdf', date: '2026-01-14', size: '4.2 MB' },
      { name: 'Disability_Commission_Affiliation.pdf', date: '2026-01-15', size: '1.8 MB' }
    ]
  }
];

export const INITIAL_CAMPAIGNS = [
  {
    id: 'camp-1',
    title: 'Mission Winter Warmth: 2,000 Blankets for Homeless',
    orgId: 'org-2',
    orgName: 'Vridh Seva Ashram (Elderly Care)',
    category: 'clothes',
    beneficiary: 'elderly',
    goalAmount: 2000,
    currentAmount: 1560,
    unit: 'blankets',
    daysLeft: 12,
    donorCount: 342,
    bannerImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&auto=format&fit=crop&q=80',
    urgent: true,
    description: 'Winter temperatures in Northern India drop to bone-chilling 4°C. We are distributing heavy insulated blankets to abandoned elderly citizens living under flyovers and open spaces.'
  },
  {
    id: 'camp-2',
    title: 'Back to School 2026: 1,000 Scholar Kits',
    orgId: 'org-1',
    orgName: 'Hope Children Foundation',
    category: 'books',
    beneficiary: 'children',
    goalAmount: 1000,
    currentAmount: 680,
    unit: 'school kits',
    daysLeft: 18,
    donorCount: 219,
    bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    urgent: false,
    description: 'Every kit includes school bags, 6 notebooks, geometry sets, pens, and storybooks for children from daily wage families entering Grade 1 to 8.'
  },
  {
    id: 'camp-3',
    title: 'Feed 500 Stray Animals Emergency Kibble Drive',
    orgId: 'org-4',
    orgName: 'Paws & Tails Animal Shelter',
    category: 'food',
    beneficiary: 'animals',
    goalAmount: 2500,
    currentAmount: 2150,
    unit: 'kg food',
    daysLeft: 5,
    donorCount: 410,
    bannerImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80',
    urgent: true,
    description: 'Our shelter food reserves are critically low. Help us feed 220 shelter animals and 300 community dogs across Pune with high-nutrition dry kibble.'
  },
  {
    id: 'camp-4',
    title: 'Refurbished Tech: 50 Laptops for Rural Girls in STEM',
    orgId: 'org-3',
    orgName: 'Nari Shakti Vikas Trust',
    category: 'electronics',
    beneficiary: 'women',
    goalAmount: 50,
    currentAmount: 28,
    unit: 'laptops',
    daysLeft: 24,
    donorCount: 88,
    bannerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    urgent: false,
    description: 'Enabling young women from underprivileged backgrounds who earned engineering and coding scholarships with reliable laptops for coursework.'
  }
];

export const INITIAL_DONATIONS = [
  {
    id: 'DC-2026-89421',
    donorId: 'user-donor-1',
    donorName: 'Priya Sharma',
    donorPhone: '+91 98765 43210',
    donorEmail: 'priya.sharma@example.com',
    orgId: 'org-1',
    orgName: 'Hope Children Foundation',
    category: 'books',
    beneficiary: 'children',
    itemTitle: 'CBSE Class 6-10 Books & 15 Clean Notebooks',
    quantity: 25,
    unit: 'books & notebooks',
    condition: 'Gently Used / Excellent',
    description: 'Complete set of high school NCERT math and science books, plus unused ruled notebooks and stationery kits.',
    pickupAddress: 'Flat 402, Sunshine Heights, Andheri West, Mumbai - 400053',
    pickupDate: '2026-10-03',
    pickupSlot: 'Morning (09:00 AM - 12:00 PM)',
    status: 'pickup_scheduled', // requested -> accepted -> logistics_assigned -> pickup_scheduled -> in_transit -> delivered
    statusHistory: [
      { step: 'Request Placed', timestamp: '2026-09-28 14:30', completed: true },
      { step: 'NGO Approved', timestamp: '2026-09-29 10:15', completed: true },
      { step: 'Logistics Assigned', timestamp: '2026-09-29 16:45', completed: true },
      { step: 'Pickup Scheduled', timestamp: '2026-09-30 09:00', completed: true },
      { step: 'Out for Pickup', timestamp: 'Pending', completed: false },
      { step: 'Delivered & Impact Verified', timestamp: 'Pending', completed: false }
    ],
    courier: {
      name: 'Rajesh Verma (Express Logistics Partner)',
      phone: '+91 98210 11442',
      vehicle: 'Hero Electric Van (MH-02-CB-4912)',
      liveLocation: '3.2 km away (Andheri Link Road)'
    },
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-09-28T14:30:00Z',
    receiptUrl: '#',
    estimatedValue: '₹3,500'
  },
  {
    id: 'DC-2026-77194',
    donorId: 'user-donor-1',
    donorName: 'Priya Sharma',
    donorPhone: '+91 98765 43210',
    donorEmail: 'priya.sharma@example.com',
    orgId: 'org-2',
    orgName: 'Vridh Seva Ashram (Elderly Care)',
    category: 'clothes',
    beneficiary: 'elderly',
    itemTitle: '10 Woolen Shawls & 4 Thick Quilts',
    quantity: 14,
    unit: 'pieces',
    condition: 'Brand New',
    description: 'Unused warm blankets and wool shawls donated for the Winter Warmth shelter drive.',
    pickupAddress: 'Flat 402, Sunshine Heights, Andheri West, Mumbai - 400053',
    pickupDate: '2026-09-20',
    pickupSlot: 'Afternoon (12:00 PM - 04:00 PM)',
    status: 'delivered',
    statusHistory: [
      { step: 'Request Placed', timestamp: '2026-09-18 11:00', completed: true },
      { step: 'NGO Approved', timestamp: '2026-09-18 15:30', completed: true },
      { step: 'Logistics Assigned', timestamp: '2026-09-19 09:45', completed: true },
      { step: 'Pickup Scheduled', timestamp: '2026-09-20 12:30', completed: true },
      { step: 'Out for Pickup', timestamp: '2026-09-20 13:45', completed: true },
      { step: 'Delivered & Impact Verified', timestamp: '2026-09-20 17:15', completed: true }
    ],
    courier: {
      name: 'Vikram Joshi',
      phone: '+91 98110 33819',
      vehicle: 'Tata Ace (MH-03-AY-8819)',
      liveLocation: 'Delivered'
    },
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-09-18T11:00:00Z',
    receiptUrl: '#',
    estimatedValue: '₹5,800',
    impactCertificateId: 'CERT-DC-2026-09281'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'user-donor-1',
    role: 'donor',
    title: 'Donation Request Approved! 🎉',
    message: 'Hope Children Foundation accepted your 25 Books donation request (Tracking: DC-2026-89421).',
    timestamp: '2 hours ago',
    type: 'success',
    read: false,
    link: '/track/DC-2026-89421'
  },
  {
    id: 'notif-2',
    userId: 'user-donor-1',
    role: 'donor',
    title: 'Pickup Scheduled for Tomorrow',
    message: 'Logistics partner Rajesh Verma is scheduled for pickup on Oct 03 between 09:00 AM - 12:00 PM.',
    timestamp: '5 hours ago',
    type: 'info',
    read: false,
    link: '/track/DC-2026-89421'
  },
  {
    id: 'notif-3',
    userId: 'user-donor-1',
    role: 'donor',
    title: 'Impact Certificate Ready',
    message: 'Your donation to Vridh Seva Ashram was verified. Your 80G tax exemption certificate is available.',
    timestamp: '3 days ago',
    type: 'certificate',
    read: true,
    link: '/history'
  },
  {
    id: 'notif-4',
    userId: 'admin-1',
    role: 'admin',
    title: 'New NGO Registration Pending Review',
    message: 'Green Earth Relief Shelter uploaded registration documents and is awaiting verification.',
    timestamp: '1 day ago',
    type: 'warning',
    read: false,
    link: '/admin'
  }
];
