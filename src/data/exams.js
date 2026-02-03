const exams = [
    {
        id: 1,
        name: 'UPSC Civil Services Exam',
        icon: '🏛️',
        description: 'The UPSC Civil Services Examination is a nationwide competitive examination in India conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India.',
        eligibility: 'Bachelor\'s degree from a recognized university. Age: 21-32 years (with relaxations).',
        syllabus: ['Preliminary Exam: General Studies, CSAT', 'Mains: General Studies Papers, Optional Subject', 'Interview'],
        examDates: 'Preliminary: May/June, Mains: September/October',
        applicationFee: '₹100 for General/OBC, Exempted for SC/ST/PwD',
        officialWebsite: 'https://www.upsc.gov.in',
        ojasFeatures: [
            { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/1/video-lectures' },
            { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/1/study-materials' },
            { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/1/test-series' },
            { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/1/doubt-clearing' }
        ]
    },
    {
        id: 2,
        name: 'SSC CGL',
        icon: '📊',
        description: 'Staff Selection Commission Combined Graduate Level Examination for recruitment to Group B and C posts in various ministries.',
        eligibility: 'Bachelor\'s degree. Age: 18-32 years.',
        syllabus: ['Tier 1: General Intelligence, Reasoning, General Awareness, Quantitative Aptitude', 'Tier 2: Quantitative Abilities, English Language, Statistics', 'Tier 3: Descriptive Paper', 'Tier 4: Computer Proficiency Test'],
        examDates: 'Tier 1: April-May, Tier 2: September-October',
        applicationFee: '₹100',
        officialWebsite: 'https://ssc.nic.in',
        ojasFeatures: [
            { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/2/video-lectures' },
            { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/2/study-materials' },
            { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/2/test-series' },
            { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/2/doubt-clearing' }
        ]
    },
    {
        id: 3,
        name: 'SSC CHSL',
        icon: '📋',
        description: 'Staff Selection Commission Combined Higher Secondary Level Examination for recruitment to various posts like LDC, JSA, PA/SA.',
        eligibility: 'Class 12 pass. Age: 18-27 years.',
        syllabus: ['Tier 1: General Intelligence, English Language, Quantitative Aptitude, General Awareness', 'Tier 2: English Language, Descriptive Paper'],
        examDates: 'Tier 1: March-May, Tier 2: July-August',
        applicationFee: '₹100',
        officialWebsite: 'https://ssc.nic.in',
        ojasFeatures: [
            { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/3/video-lectures' },
            { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/3/study-materials' },
            { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/3/test-series' },
            { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/3/doubt-clearing' }
        ]
    },
    {
        id: 4,
        name: 'SSC MTS',
        icon: '📋',
        description: 'Staff Selection Commission Multi Tasking Staff Examination for recruitment to non-technical posts.',
        eligibility: 'Class 10 pass. Age: 18-25 years.',
    syllabus: ['Physics', 'Chemistry', 'Biology'],
    examDates: 'May',
    applicationFee: '₹1700 (General), ₹1600 (General-EWS/OBC), ₹1000 (SC/ST/PwD)',
    officialWebsite: 'https://neet.nta.nic.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/neet/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/neet/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/neet/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/neet/doubt-clearing' }
    ]
  },
  {
    id: 'gate',
    name: 'GATE',
    icon: '⚙️',
    description: 'Graduate Aptitude Test in Engineering – for M.Tech/Ph.D. admissions and PSU recruitment.',
    eligibility: "Bachelor's degree in Engineering/Technology/Science/Architecture or final year students. No age limit.",
    syllabus: ['General Aptitude + Core Subject (chosen paper)'],
    examDates: 'February (2026 exam: Feb 7, 8, 14, 15 – already conducted)',
    applicationFee: '₹900 (Female/SC/ST/PwD), ₹1800 (Others)',
    officialWebsite: 'https://gate2026.iitg.ac.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/gate/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/gate/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/gate/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/gate/doubt-clearing' }
    ]
  },
  {
    id: 'ssc-cgl',
    name: 'SSC CGL',
    icon: '📊',
    description: 'Staff Selection Commission Combined Graduate Level exam for Group B & C posts.',
    eligibility: "Bachelor's degree. Age: 18–32 years (varies by post).",
    syllabus: ['General Intelligence & Reasoning', 'General Awareness', 'Quantitative Aptitude', 'English'],
    examDates: 'Tier 1: June–July, Tier 2: September–October',
    applicationFee: '₹100 (exempted for SC/ST/PwD/Ex-Servicemen/Women)',
    officialWebsite: 'https://ssc.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ssc-cgl/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ssc-cgl/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ssc-cgl/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ssc-cgl/doubt-clearing' }
    ]
  },
  {
    id: 'ibps-po',
    name: 'IBPS PO',
    icon: '🏦',
    description: 'Institute of Banking Personnel Selection Probationary Officer exam.',
    eligibility: "Bachelor's degree. Age: 20–30 years.",
    syllabus: ['English', 'Quantitative Aptitude', 'Reasoning', 'General Awareness', 'Computer'],
    examDates: 'Preliminary: October, Main: November',
    applicationFee: '₹850 (General/OBC), ₹175 (SC/ST/PwD)',
    officialWebsite: 'https://www.ibps.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ibps-po/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ibps-po/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ibps-po/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ibps-po/doubt-clearing' }
    ]
  },
  {
    id: 'sbi-po',
    name: 'SBI PO',
    icon: '🏪',
    description: 'State Bank of India Probationary Officer recruitment exam.',
    eligibility: "Bachelor's degree. Age: 21–30 years.",
    syllabus: ['English', 'Quantitative Aptitude', 'Reasoning', 'General Awareness', 'Computer'],
    examDates: 'Preliminary: Oct–Nov, Main: Dec–Jan',
    applicationFee: '₹750 (General/OBC), ₹125 (SC/ST/PwD)',
    officialWebsite: 'https://sbi.co.in/web/careers',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/sbi-po/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/sbi-po/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/sbi-po/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/sbi-po/doubt-clearing' }
    ]
  },
  {
    id: 'railway-ntpc',
    name: 'Railway NTPC',
    icon: '🚂',
    description: 'Railway Recruitment Board Non-Technical Popular Categories exam.',
    eligibility: '10th / 12th / Graduate depending on post. Age: 18–33 years.',
    syllabus: ['General Awareness', 'Mathematics', 'General Intelligence & Reasoning'],
    examDates: 'Varies (as per notification)',
    applicationFee: '₹500 (General/OBC), ₹250 (SC/ST/Ex-Servicemen/PwBD)',
    officialWebsite: 'https://indianrailways.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/railway-ntpc/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/railway-ntpc/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/railway-ntpc/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/railway-ntpc/doubt-clearing' }
    ]
  },
  {
    id: 'nda',
    name: 'NDA',
    icon: '🎖️',
    description: 'National Defence Academy exam for Army, Navy, Air Force entry.',
    eligibility: '12th pass. Age: 16.5–19.5 years.',
    syllabus: ['Mathematics', 'General Ability Test (GAT)'],
    examDates: 'April & September',
    applicationFee: '₹100',
    officialWebsite: 'https://upsc.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/nda/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/nda/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/nda/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/nda/doubt-clearing' }
    ]
  },
  {
    id: 'cds',
    name: 'CDS',
    icon: '🛡️',
    description: 'Combined Defence Services exam for IMA, INA, AFA, OTA.',
    eligibility: "Bachelor's degree (varies by academy). Age: 19–25 years.",
    syllabus: ['English', 'General Knowledge', 'Elementary Mathematics'],
    examDates: 'February, May, September, November',
    applicationFee: '₹200',
    officialWebsite: 'https://upsc.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/cds/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/cds/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/cds/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/cds/doubt-clearing' }
    ]
  },
  {
    id: 'ctet',
    name: 'CTET',
    icon: '👩‍🏫',
    description: 'Central Teacher Eligibility Test for teaching posts in central schools.',
    eligibility: "Bachelor's degree + B.Ed or equivalent.",
    syllabus: ['Child Development & Pedagogy', 'Languages', 'Maths & EVS / Science & Social Studies'],
    examDates: 'July & December',
    applicationFee: '₹1000 (General/OBC), ₹500 (SC/ST)',
    officialWebsite: 'https://ctet.nic.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ctet/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ctet/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ctet/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ctet/doubt-clearing' }
    ]
  },
  {
    id: 'ugc-net',
    name: 'UGC NET',
    icon: '🎓',
    description: 'University Grants Commission National Eligibility Test for Assistant Professor & JRF.',
    eligibility: "Master's degree with 55% marks (50% for reserved categories).",
    syllabus: ['Paper 1: Teaching & Research Aptitude', 'Paper 2: Subject specific'],
    examDates: 'June & December',
    applicationFee: '₹1150 (General), ₹600 (OBC), ₹325 (SC/ST/PwD)',
    officialWebsite: 'https://ugcnet.nta.ac.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ugc-net/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ugc-net/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ugc-net/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ugc-net/doubt-clearing' }
    ]
  },
  {
    id: 'cat',
    name: 'CAT',
    icon: '📈',
    description: 'Common Admission Test for admission to IIMs and other top B-schools.',
    eligibility: "Bachelor's degree with 50% marks (45% for SC/ST/PwD).",
    syllabus: ['Verbal Ability & Reading Comprehension', 'Data Interpretation & Logical Reasoning', 'Quantitative Ability'],
    examDates: 'Last Sunday of November',
    applicationFee: '₹2500 (General), ₹1250 (SC/ST/PwD)',
    officialWebsite: 'https://iimcat.ac.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/cat/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/cat/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/cat/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/cat/doubt-clearing' }
    ]
  },
  {
    id: 'mat',
    name: 'MAT',
    icon: '📊',
    description: 'Management Aptitude Test for MBA/PGDM admissions.',
    eligibility: "Bachelor's degree.",
    syllabus: ['Language Comprehension', 'Mathematical Skills', 'Data Analysis & Sufficiency', 'Intelligence & Critical Reasoning', 'Indian & Global Environment'],
    examDates: 'February, May, September, December',
    applicationFee: '₹2100',
    officialWebsite: 'https://mat.aima.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/mat/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/mat/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/mat/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/mat/doubt-clearing' }
    ]
  },
  {
    id: 'xat',
    name: 'XAT',
    icon: '📉',
    description: 'Xavier Aptitude Test for XLRI and other management institutes.',
    eligibility: "Bachelor's degree.",
    syllabus: ['Verbal & Logical Ability', 'Decision Making', 'Quantitative Ability & Data Interpretation', 'General Knowledge', 'Essay'],
    examDates: 'First Sunday of January',
    applicationFee: '₹2100',
    officialWebsite: 'https://xatonline.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/xat/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/xat/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/xat/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/xat/doubt-clearing' }
    ]
  },
  {
    id: 'clat',
    name: 'CLAT',
    icon: '⚖️',
    description: 'Common Law Admission Test for National Law Universities.',
    eligibility: '12th pass with 45% marks (40% for SC/ST).',
    syllabus: ['English Language', 'Current Affairs & GK', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
    examDates: 'First week of December',
    applicationFee: '₹4000 (General/OBC), ₹3500 (SC/ST/BPL/PwD)',
    officialWebsite: 'https://consortiumofnlus.ac.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/clat/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/clat/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/clat/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/clat/doubt-clearing' }
    ]
  },
  {
    id: 'nift',
    name: 'NIFT',
    icon: '👗',
    description: 'National Institute of Fashion Technology entrance exam.',
    eligibility: '12th pass.',
    syllabus: ['Creative Ability Test (CAT)', 'General Ability Test (GAT)', 'Situation Test'],
    examDates: 'January–February',
    applicationFee: '₹3000 (General/OBC), ₹1500 (SC/ST/PwD)',
    officialWebsite: 'https://nift.ac.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/nift/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/nift/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/nift/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/nift/doubt-clearing' }
    ]
  },
  {
    id: 'nid',
    name: 'NID',
    icon: '🎨',
    description: 'National Institute of Design entrance exam for B.Des & M.Des.',
    eligibility: '12th pass (B.Des) / Graduate (M.Des).',
    syllabus: ['DAT Prelims', 'DAT Mains (Studio Test)'],
    examDates: 'December–January',
    applicationFee: '₹3000 (General/OBC), ₹1500 (SC/ST/PwD)',
    officialWebsite: 'https://admissions.nid.edu',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/nid/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/nid/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/nid/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/nid/doubt-clearing' }
    ]
  },
  {
    id: 'drdo',
    name: 'DRDO',
    icon: '🔬',
    description: 'Defence Research and Development Organisation recruitment exam.',
    eligibility: 'B.E./B.Tech in relevant field.',
    syllabus: ['Technical subjects', 'General Awareness', 'Aptitude'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.drdo.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/drdo/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/drdo/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/drdo/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/drdo/doubt-clearing' }
    ]
  },
  {
    id: 'isro',
    name: 'ISRO',
    icon: '🚀',
    description: 'Indian Space Research Organisation recruitment exam.',
    eligibility: 'Engineering/Science degree.',
    syllabus: ['Technical subjects', 'General Knowledge'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.isro.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/isro/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/isro/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/isro/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/isro/doubt-clearing' }
    ]
  },
  {
    id: 'barc',
    name: 'BARC',
    icon: '⚛️',
    description: 'Bhabha Atomic Research Centre recruitment exam.',
    eligibility: 'Engineering/Science degree.',
    syllabus: ['Technical subjects', 'Aptitude'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.barc.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/barc/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/barc/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/barc/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/barc/doubt-clearing' }
    ]
  },
  {
    id: 'ntpc',
    name: 'NTPC',
    icon: '⚡',
    description: 'National Thermal Power Corporation recruitment exam.',
    eligibility: 'Engineering degree.',
    syllabus: ['Technical subjects', 'Aptitude', 'General Knowledge'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.ntpc.co.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ntpc/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ntpc/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ntpc/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ntpc/doubt-clearing' }
    ]
  },
  {
    id: 'ongc',
    name: 'ONGC',
    icon: '🛢️',
    description: 'Oil and Natural Gas Corporation recruitment exam.',
    eligibility: 'Engineering degree.',
    syllabus: ['Technical subjects', 'Aptitude'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.ongcindia.com',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ongc/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ongc/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ongc/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ongc/doubt-clearing' }
    ]
  },
  {
    id: 'coal-india',
    name: 'Coal India',
    icon: '⛏️',
    description: 'Coal India Limited recruitment exam.',
    eligibility: 'Engineering degree.',
    syllabus: ['Technical subjects', 'Aptitude'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.coalindia.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/coal-india/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/coal-india/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/coal-india/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/coal-india/doubt-clearing' }
    ]
  },
  {
    id: 'sail',
    name: 'SAIL',
    icon: '🏭',
    description: 'Steel Authority of India Limited recruitment exam.',
    eligibility: 'Engineering degree.',
    syllabus: ['Technical subjects', 'Aptitude'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.sail.co.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/sail/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/sail/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/sail/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/sail/doubt-clearing' }
    ]
  },
  {
    id: 'nmdc',
    name: 'NMDC',
    icon: '⛰️',
    description: 'National Mineral Development Corporation recruitment exam.',
    eligibility: 'Engineering degree.',
    syllabus: ['Technical subjects', 'Aptitude'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.nmdc.co.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/nmdc/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/nmdc/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/nmdc/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/nmdc/doubt-clearing' }
    ]
  },
  {
    id: 'gic',
    name: 'GIC',
    icon: '🏢',
    description: 'General Insurance Corporation recruitment exam.',
    eligibility: 'Engineering/Graduate degree.',
    syllabus: ['Aptitude', 'Reasoning', 'General Knowledge'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.gicofindia.com',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/gic/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/gic/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/gic/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/gic/doubt-clearing' }
    ]
  },
  {
    id: 'bsf',
    name: 'BSF',
    icon: '🛡️',
    description: 'Border Security Force recruitment exam.',
    eligibility: 'Class 10/12 pass.',
    syllabus: ['General Intelligence', 'General Knowledge', 'Arithmetic', 'Trade Test'],
    examDates: 'Throughout the year',
    applicationFee: '₹100',
    officialWebsite: 'https://rectt.bsf.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/bsf/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/bsf/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/bsf/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/bsf/doubt-clearing' }
    ]
  },
  {
    id: 'crpf',
    name: 'CRPF',
    icon: '🛡️',
    description: 'Central Reserve Police Force recruitment exam.',
    eligibility: 'Class 10/12 pass.',
    syllabus: ['General Intelligence', 'General Knowledge', 'Arithmetic'],
    examDates: 'Throughout the year',
    applicationFee: '₹100',
    officialWebsite: 'https://crpf.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/crpf/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/crpf/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/crpf/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/crpf/doubt-clearing' }
    ]
  },
  {
    id: 'itbp',
    name: 'ITBP',
    icon: '🛡️',
    description: 'Indo-Tibetan Border Police recruitment exam.',
    eligibility: 'Class 10/12 pass.',
    syllabus: ['General Intelligence', 'General Knowledge', 'Arithmetic'],
    examDates: 'Throughout the year',
    applicationFee: '₹100',
    officialWebsite: 'https://recruitment.itbpolice.nic.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/itbp/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/itbp/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/itbp/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/itbp/doubt-clearing' }
    ]
  },
  {
    id: 'cisf',
    name: 'CISF',
    icon: '🛡️',
    description: 'Central Industrial Security Force recruitment exam.',
    eligibility: 'Class 10/12 pass.',
    syllabus: ['General Intelligence', 'General Knowledge', 'Arithmetic'],
    examDates: 'Throughout the year',
    applicationFee: '₹100',
    officialWebsite: 'https://cisf.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/cisf/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/cisf/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/cisf/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/cisf/doubt-clearing' }
    ]
  },
  {
    id: 'ssb',
    name: 'SSB',
    icon: '🛡️',
    description: 'Sashastra Seema Bal recruitment exam.',
    eligibility: 'Class 10/12 pass.',
    syllabus: ['General Intelligence', 'General Knowledge', 'Arithmetic'],
    examDates: 'Throughout the year',
    applicationFee: '₹100',
    officialWebsite: 'https://ssbrectt.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/ssb/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/ssb/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/ssb/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/ssb/doubt-clearing' }
    ]
  },
  {
    id: 'nsg',
    name: 'NSG',
    icon: '🛡️',
    description: 'National Security Guard recruitment exam.',
    eligibility: 'Class 10/12 pass with special training.',
    syllabus: ['Physical Fitness', 'Written Test', 'Medical Test'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://nsg.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/nsg/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/nsg/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/nsg/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/nsg/doubt-clearing' }
    ]
  },
  {
    id: 'army',
    name: 'Indian Army',
    icon: '🎖️',
    description: 'Indian Army recruitment exam.',
    eligibility: 'Class 10/12 pass.',
    syllabus: ['General Knowledge', 'Mathematics', 'General Science'],
    examDates: 'Throughout the year',
    applicationFee: '₹100',
    officialWebsite: 'https://www.joinindianarmy.nic.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/army/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/army/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/army/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/army/doubt-clearing' }
    ]
  },
  {
    id: 'iaf',
    name: 'IAF',
    icon: '✈️',
    description: 'Indian Air Force recruitment exam.',
    eligibility: 'Class 12 pass with PCM.',
    syllabus: ['English', 'Physics', 'Mathematics'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://indianairforce.nic.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/iaf/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/iaf/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/iaf/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/iaf/doubt-clearing' }
    ]
  },
  {
    id: 'navy',
    name: 'Navy',
    icon: '⚓',
    description: 'Indian Navy recruitment exam.',
    eligibility: 'Class 12 pass.',
    syllabus: ['English', 'Science', 'Mathematics', 'General Knowledge'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://www.joinindiannavy.gov.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/navy/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/navy/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/navy/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/navy/doubt-clearing' }
    ]
  },
  {
    id: 'coast-guard',
    name: 'Coast Guard',
    icon: '🚢',
    description: 'Indian Coast Guard recruitment exam.',
    eligibility: 'Class 12 pass.',
    syllabus: ['Mathematics', 'Physics', 'Chemistry', 'English', 'General Knowledge'],
    examDates: 'Throughout the year',
    applicationFee: 'Varies',
    officialWebsite: 'https://joinindiancoastguard.cdac.in',
    ojasFeatures: [
      { name: 'Video Lectures', link: 'https://www.ojasjeeclasses.com/exams/coast-guard/video-lectures' },
      { name: 'Study Materials', link: 'https://www.ojasjeeclasses.com/exams/coast-guard/study-materials' },
      { name: 'Test Series', link: 'https://www.ojasjeeclasses.com/exams/coast-guard/test-series' },
      { name: 'Doubt Clearing', link: 'https://www.ojasjeeclasses.com/exams/coast-guard/doubt-clearing' }
    ]
  }
];

export default exams;