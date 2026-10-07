export type Language = 'en' | 'hi';

export interface Translations {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    estimator: string;
    howWeWork: string;
    reviews: string;
    about: string;
    architects: string;
    contact: string;
    getQuote: string;
    callNow: string;
    whatsapp: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    getFreeQuote: string;
    chatWhatsapp: string;
    experienceBadge: string;
  };
  trustStrip: {
    yearsExp: string;
    projectsDone: string;
    happyClients: string;
    warranty: string;
  };
  services: {
    title: string;
    subtitle: string;
    viewAll: string;
    exploreService: string;
    startingFrom: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    p4Title: string;
    p4Desc: string;
  };
  howWeWork: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  form: {
    name: string;
    phone: string;
    service: string;
    area: string;
    message: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    freeVisitNotice: string;
  };
  estimator: {
    title: string;
    subtitle: string;
    selectService: string;
    enterArea: string;
    selectQuality: string;
    estimatedCost: string;
    getExactQuote: string;
    disclaimer: string;
  };
  bottomBar: {
    call: string;
    whatsapp: string;
    quote: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Our Work',
      estimator: 'Cost Estimator',
      howWeWork: 'How We Work',
      reviews: 'Reviews',
      about: 'About Us',
      architects: 'For Architects',
      contact: 'Contact',
      getQuote: 'Get Free Quote',
      callNow: 'Call 9967302911',
      whatsapp: 'WhatsApp Us',
    },
    hero: {
      tagline: 'One-Stop Interior & Renovation Solution',
      headline: 'Master Carpentry & Complete Interior Turnkey Contracts Across Mumbai & Thane',
      subheadline: 'One Contractor, One Quotation, One Responsibility. We manage carpentry, modular kitchen, painting, false ceiling, plumbing, electrical, and civil repairs with 25+ years of trusted Vishwakarma craftsmanship.',
      getFreeQuote: 'Book Free Site Inspection',
      chatWhatsapp: 'Chat on WhatsApp',
      experienceBadge: '25+ Years Master Experience',
    },
    trustStrip: {
      yearsExp: 'Years Master Experience',
      projectsDone: 'Interiors Delivered',
      happyClients: 'Satisfied Families',
      warranty: 'Workmanship Warranty',
    },
    services: {
      title: 'Complete Interior & Renovation Trades Under One Roof',
      subtitle: 'No need to deal with 6 different workers blaming each other. We supervise every trade with 100% accountability.',
      viewAll: 'View All Services',
      exploreService: 'View Details & Rates',
      startingFrom: 'Starting from',
    },
    whyChooseUs: {
      title: 'Why 480+ Mumbai Families Trust OneStop Interiors',
      subtitle: 'Direct contractor pricing without corporate design-studio markups or middleman commissions.',
      p1Title: 'One Contractor, One Responsibility',
      p1Desc: 'Carpentry, electrical, plumbing, POP, painting, and tiles managed directly under Shobhnath Vishwakarma. Zero blame games.',
      p2Title: 'Guaranteed On-Time Handover',
      p2Desc: 'Structured milestone schedules. For commercial fit-outs and urgent handovers, our teams work double shifts to hit deadlines.',
      p3Title: '100% Branded Authentic Materials',
      p3Desc: 'Century / Greenply IS:710 Marine ply, Hettich/Hafele fittings, Asian Paints Royale, and Astral CPVC pipes verified in front of you.',
      p4Title: '5-Year Workmanship Warranty',
      p4Desc: 'We stand by our work. Comprehensive 5-year guarantee on carpentry and modular woodwork with responsive after-sales service.',
    },
    howWeWork: {
      title: 'How We Work — Simple 4-Step Process',
      subtitle: 'From initial measurement to sparkling clean handover.',
      step1Title: '1. Free Site Visit & Measurement',
      step1Desc: 'We visit your flat/site in Mumbai, Thane, or Palghar, take laser measurements, and discuss your storage needs & budget.',
      step2Title: '2. Detailed Transparent Quotation',
      step2Desc: 'You receive an itemized BOQ estimate with exact material brands, rates, and clear stage payment milestones.',
      step3Title: '3. Synchronized Trade Execution',
      step3Desc: 'Carpentry framing, concealed electrical chasing, and plumbing happen systematically under our daily supervision.',
      step4Title: '4. Deep Cleaning & Official Handover',
      step4Desc: 'Professional cleaning, snag-list check, 5-year warranty card handover, and your peaceful move-in.',
    },
    form: {
      name: 'Your Full Name',
      phone: '10-Digit Mobile Number',
      service: 'Select Service Required',
      area: 'Area / Location in Mumbai/Thane',
      message: 'Brief details (e.g. 2BHK flat renovation, Modular kitchen)',
      submit: 'Request Free Site Visit & Quotation',
      submitting: 'Submitting Request...',
      successTitle: 'Thank You! Quotation Request Received',
      successDesc: 'Shobhnath Vishwakarma will call or WhatsApp you within 30 minutes to confirm your free site visit.',
      freeVisitNotice: '✓ 100% Free Site Inspection  ✓ Zero Obligation  ✓ Instant WhatsApp Follow-up',
    },
    estimator: {
      title: 'Interior Cost Estimator (Mumbai & Thane)',
      subtitle: 'Calculate accurate, market-tested price estimates for your flat renovation or furniture in 30 seconds.',
      selectService: '1. Select Work Type',
      enterArea: '2. Enter Dimensions / Carpet Area',
      selectQuality: '3. Choose Material Finish',
      estimatedCost: 'Estimated Price Range',
      getExactQuote: 'Get Itemized Quotation on WhatsApp',
      disclaimer: 'Note: Prices include premium materials and skilled master craftsmanship for Mumbai Metropolitan Region.',
    },
    bottomBar: {
      call: 'Call Now',
      whatsapp: 'WhatsApp',
      quote: 'Get Free Quote',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      portfolio: 'हमारा काम',
      estimator: 'खर्च कैलकुलेटर',
      howWeWork: 'काम का तरीका',
      reviews: 'ग्राहकों की राय',
      about: 'हमारे बारे में',
      architects: 'आर्किटेक्ट्स के लिए',
      contact: 'संपर्क',
      getQuote: 'फ्री कोटेशन पाएं',
      callNow: 'कॉल करें: 9967302911',
      whatsapp: 'व्हाट्सएप करें',
    },
    hero: {
      tagline: 'घर का पूरा इंटीरियर और रिपेयर, एक ही जगह, एक ही कॉन्ट्रैक्टर से',
      headline: 'मुंबई और ठाणे में मास्टर बढ़ई और कम्प्लीट इंटीरियर टर्नकी कॉन्ट्रैक्टर',
      subheadline: 'एक ठेकेदार, एक कोटेशन, पूरी जिम्मेदारी। बढ़ई का काम, मॉड्युलर किचन, पेंटिंग, फॉल्स सीलिंग, प्लंबिंग, बिजली और सिविल रिपेयर — 25+ वर्षों के भरोसेमंद विश्वकर्मा अनुभव के साथ।',
      getFreeQuote: 'फ्री साइट विज़िट बुक करें',
      chatWhatsapp: 'व्हाट्सएप पर बात करें',
      experienceBadge: '25+ वर्षों का मास्टर अनुभव',
    },
    trustStrip: {
      yearsExp: 'वर्षों का मास्टर अनुभव',
      projectsDone: 'कम्प्लीट इंटीरियर प्रोजेक्ट्स',
      happyClients: 'संतुष्ट परिवार',
      warranty: 'साल की कारीगरी वारंटी',
    },
    services: {
      title: 'इंटीरियर और रेनोवेशन का हर काम — एक ही छत के नीचे',
      subtitle: 'अलग-अलग लेबर के पीछे भागने और उनके आपसी झगड़ों से मुक्ति। हर काम की जिम्मेदारी सिर्फ हमारी।',
      viewAll: 'सभी सेवाएं देखें',
      exploreService: 'विवरण और रेट्स देखें',
      startingFrom: 'शुरुआती रेट',
    },
    whyChooseUs: {
      title: '480+ मुंबई परिवार वनस्टॉप इंटीरियर्स पर क्यों भरोसा करते हैं',
      subtitle: 'सीधे कॉन्ट्रैक्टर के वाजिब दाम — बिना किसी फैंसी शोरूम या बिचौलिए के एक्स्ट्रा कमीशन के।',
      p1Title: 'एक कॉन्ट्रैक्टर, पूरी जिम्मेदारी',
      p1Desc: 'कारपेंटर, इलेक्ट्रीशियन, प्लंबर, पीओपी, पेंटर और टाइल्स का पूरा काम शोभनाथ विश्वकर्मा की सीधी निगरानी में।',
      p2Title: 'समय पर काम पूरा करने का वादा',
      p2Desc: 'तय समय पर घर या दुकान हैंडओवर। कमर्शियल और अर्जेंट काम के लिए हमारी टीम डबल शिफ्ट में काम करती है।',
      p3Title: '100% ओरिजिनल ब्रांडेड मटेरियल',
      p3Desc: 'सेंचुरी/ग्रीनप्लाई 710 मरीन प्लाई, हेटीच/हाफले फिटिंग्स, एशियन पेंट्स रॉयल और एस्ट्रल पाइप — सब आपके सामने चेक कराकर।',
      p4Title: '5 साल की कारीगरी वारंटी',
      p4Desc: 'हमारे काम पर पूरा भरोसा। सभी बढ़ई और मॉड्युलर फर्नीचर पर 5 साल की वारंटी और तुरंत सर्विस सपोर्ट।',
    },
    howWeWork: {
      title: 'काम का तरीका — 4 आसान स्टेप्स',
      subtitle: 'पहली माप से लेकर साफ-सुथरे फ्लैट हैंडओवर तक।',
      step1Title: '1. फ्री साइट विज़िट व नाप',
      step1Desc: 'मुंबई, ठाणे या पालघर में आपके घर पहुंचकर लेजर से सही नाप लेते हैं और आपकी जरूरत समझते हैं।',
      step2Title: '2. पारदर्शी व पक्का कोटेशन',
      step2Desc: 'मटेरियल ब्रांड, रेट और स्टेज-वाइज पेमेंट की पूरी लिखित लिस्ट (BOQ) आपको दी जाती है।',
      step3Title: '3. तालमेल से काम की शुरुआत',
      step3Desc: 'फर्नीचर, वायरिंग, प्लंबिंग और सीलिंग का काम बिना रुकावट रोजाना सुपरविजन में चलता है।',
      step4Title: '4. डीप क्लीनिंग और चाबी हैंडओवर',
      step4Desc: 'पूरी सफाई, काम की चेकिंग, 5 साल का वारंटी कार्ड और आपके सुखी गृह प्रवेश के साथ हैंडओवर।',
    },
    form: {
      name: 'आपका पूरा नाम',
      phone: '10 अंकों का मोबाइल नंबर',
      service: 'काम का प्रकार चुनें',
      area: 'एरिया / लोकेशन (जैसे मलाड, ठाणे, अंधेरी)',
      message: 'काम की जानकारी (जैसे 2BHK रेनोवेशन, किचन, अलमारी)',
      submit: 'फ्री साइट विज़िट व कोटेशन मांगें',
      submitting: 'रिक्वेस्ट भेजी जा रही है...',
      successTitle: 'धन्यवाद! आपकी रिक्वेस्ट मिल गई है',
      successDesc: 'शोभनाथ विश्वकर्मा जी 30 मिनट में आपको कॉल या व्हाट्सएप करके फ्री विज़िट का समय तय करेंगे।',
      freeVisitNotice: '✓ 100% फ्री साइट इंस्पेक्शन  ✓ कोई जबरदस्ती नहीं  ✓ तुरंत व्हाट्सएप रिप्लाई',
    },
    estimator: {
      title: 'इंटीरियर खर्च कैलकुलेटर (मुंबई व ठाणे)',
      subtitle: 'सिर्फ 30 सेकंड में अपने घर के रेनोवेशन या फर्नीचर का सही अंदाज़न बजट जानें।',
      selectService: '1. काम का प्रकार चुनें',
      enterArea: '2. साइज या कारपेट एरिया डालें',
      selectQuality: '3. मटेरियल क्वालिटी चुनें',
      estimatedCost: 'अनुमानित खर्च',
      getExactQuote: 'व्हाट्सएप पर पूरी कोटेशन पाएं',
      disclaimer: 'नोट: इस रेट में प्रीमियम मटेरियल और कारीगरी दोनों शामिल हैं। पक्का कोटेशन साइट विज़िट के बाद दिया जाएगा।',
    },
    bottomBar: {
      call: 'कॉल करें',
      whatsapp: 'व्हाट्सएप',
      quote: 'फ्री कोटेशन',
    },
  },
};

