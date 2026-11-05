/**
 * All site copy, in English (root) and Arabic (/ar).
 * Rule from the company plan: no client logos, testimonials or result numbers
 * until real clients have measured results. The live demo is the proof.
 */

export interface Item { t: string; b: string }
export type SolutionKind = 'live' | 'next' | 'later' | 'custom';

export interface Solution {
  slug: string;
  kind: SolutionKind;
  name: string;
  state: string;
  summary: string;
  title: string;
  lede: string;
  seoTitle: string;
  seoDescription: string;
  doesTitle: string;
  does: Item[];
  measuresTitle?: string;
  measuresIntro?: string;
  measures?: Item[];
  nextTitle?: string;
  next?: Item[];
  ctaTitle: string;
  ctaBody: string;
}

const EN = {
  meta: {
    locale: 'en_US',
    siteTitle: 'TrueNorth: AI agent systems for business',
    siteDescription:
      'TrueNorth designs, builds and operates AI agents that work inside your business: on your channels, with your data, under your rules. Results you can measure.',
  },
  nav: {
    skip: 'Skip to content',
    home: 'TrueNorth home',
    solutions: 'Solutions',
    platform: 'Platform',
    company: 'Company',
    insights: 'Insights',
    contact: 'Talk to us',
    menu: 'Menu',
    close: 'Close',
    switchLabel: 'العربية',
    switchAria: 'اقرأ الموقع بالعربية',
    mainNav: 'Main',
  },
  footer: {
    tagline: 'AI agents that run the work.',
    solutions: 'Solutions',
    company: 'Company',
    rights: 'TrueNorth. AI agent systems.',
    links: 'Site links',
  },
  home: {
    seoTitle: 'TrueNorth: AI agent systems for business',
    heroTitle: 'AI agents that run the work.',
    heroLede:
      'TrueNorth designs, builds and operates AI agents that work inside your business, on your channels and systems, so your team can focus on the decisions that need people.',
    heroPrimary: 'Talk to us',
    heroSecondary: 'See an agent at work',
    heroFigure: 'A field of compass needles that drift, then align on north',
    statement:
      'Most of what slows a team down is repeat work: answering, confirming, following up, updating one system from another. We build agents that take that work on, end to end, and hand people only what needs a person.',
    capTitle: 'What our agents do',
    capIntro: 'An agent is not a chatbot. It understands a request, acts in your systems, and finishes the job, within limits you set.',
    capabilities: [
      { t: 'Talk to your customers', b: 'Answer questions, confirm orders and resolve requests on WhatsApp and other channels, in the customer’s language, in seconds.' },
      { t: 'Run the operational loop', b: 'Update order status, change an address before shipping, chase a reply that never came, and keep every system in step.' },
      { t: 'Follow up on every lead', b: 'Qualify new enquiries, book the meeting, send the reminder. Nothing waits for someone to get to it.' },
      { t: 'Escalate with context', b: 'Complaints, refunds and anything unclear go to your team with a summary, so nobody starts the conversation over.' },
    ] as Item[],
    solTitle: 'Solutions by industry',
    solIntro: 'Every industry builds on the same core. We open a new one only when the one before it has measured results with real clients.',
    solMore: 'Explore',
    demoTitle: 'See an agent at work',
    demoIntro:
      'Our first agent in production confirms new cash-on-delivery orders on WhatsApp. A customer ordered a minute ago and received the confirmation. Choose how they reply.',
    principlesTitle: 'How we build agents',
    principles: [
      { t: 'Grounded in your data', b: 'Agents answer from your catalogue, policies and records. When the answer is not there, they say so and hand over. They never guess.' },
      { t: 'Guardrails before autonomy', b: 'Every action an agent can take is scoped to one business and one customer, with rules: cancel only before shipping, never offer a discount.' },
      { t: 'A person is one step away', b: 'Customers can ask for a human at any point. The agent steps back, and your team sees the whole conversation.' },
      { t: 'Measured in your numbers', b: 'We record the numbers that matter before we start and after the agent goes live. That is how we judge the work, together.' },
    ] as Item[],
    coreTitle: 'One core under every agent',
    coreIntro: 'Each new agent adds its own integrations and logic on top of a shared foundation, so it ships faster and behaves the same way.',
    core: [
      { t: 'Agent engine', b: 'Understanding, model routing and tool use.' },
      { t: 'Channels', b: 'WhatsApp today, more to follow.' },
      { t: 'Human handoff', b: 'Priority, summary and a clean takeover.' },
      { t: 'Team dashboard', b: 'Every conversation, action and status.' },
    ] as Item[],
    coreLink: 'How the platform works',
    processTitle: 'How we work with you',
    process: [
      { t: 'Study your business', b: 'We map how work actually moves, from first message to final delivery, and find where the hours go.' },
      { t: 'Build and connect', b: 'We connect the agent to your channels and systems, and agree its limits: what it does, and when it hands over.' },
      { t: 'Measure and improve', b: 'We compare the numbers before and after, and keep improving the agent on what we learn.' },
    ] as Item[],
    visionTitle: 'Where this is going',
    vision: [
      { t: 'Agents for single jobs', b: 'Today: one agent takes one repetitive job off your team, completely.' },
      { t: 'Departments run by agents', b: 'Next: whole functions, from support to sales operations, run by teams of agents with people in charge.' },
      { t: 'An agent for everyone', b: 'Eventually: a personal agent for each person, working on their behalf in the digital world.' },
    ] as Item[],
    insightsTitle: 'Insights',
    insightsAll: 'All articles',
    faqTitle: 'Questions we hear often',
    faq: [
      { t: 'Is our customer data safe?', b: 'An agent only sees the data of the business it works for, and every tool it uses is scoped to that business and that customer. We use your data only to do the work, and we never sell or share it.' },
      { t: 'Will an agent replace our team?', b: 'It takes on the repeat work. Your team stays responsible for complaints, exceptions and decisions, and gets time back for the work that needs people.' },
      { t: 'What happens when an agent is wrong?', b: 'Agents work inside clear limits: they answer only from your data, cannot give discounts or refunds, and hand over anything they are unsure of. Every conversation is logged in the dashboard, so mistakes are visible and fixable.' },
      { t: 'Do customers know they are talking to an agent?', b: 'Yes. We think that is right, and customers care most about a fast, correct answer. If they ask for a person, the conversation moves to your team immediately.' },
      { t: 'How long does it take to go live?', b: 'It depends on your systems and channels. We start with a working session on how your business runs, then agree a timeline before any build begins.' },
    ] as Item[],
    ctaTitle: 'Tell us about the work that keeps your team busy',
    ctaBody: 'We will show you an agent working on a case close to yours, and tell you honestly whether an agent is the right answer.',
  },
  solutionsPage: {
    seoTitle: 'Solutions',
    seoDescription: 'AI agents for e-commerce today, with sales and real estate next, and custom automation studies for any repetitive work.',
    title: 'Solutions',
    lede: 'One company, one core, a growing set of industries. We go deep in one before we open the next.',
    home: 'Home',
  },
  solution: {
    home: 'Home',
    solutions: 'Solutions',
    primary: 'Talk to us',
    earlyTitle: 'Join the early list',
    earlyBody: 'Tell us about your team and the work you want an agent to take on. We will reach out when this agent is ready for its first clients.',
    demoTitle: 'Try it on a sample order',
  },
  platform: {
    seoTitle: 'Platform',
    seoDescription: 'How TrueNorth agents work: one path from message to action, scoped tools, model routing, human handoff and full logging.',
    title: 'How our agents work',
    lede: 'Every agent runs on the same path: a message comes in, the agent understands it, acts through tools it is allowed to use, and replies or hands over. Here is what happens at each step.',
    flowTitle: 'From message to action',
    flowFigure: 'Diagram of the agent path: channels, understanding, tools, reply or handoff',
    flow: [
      { t: 'Receive', b: 'Messages from every channel are verified, normalised into one format, de-duplicated, and grouped when a customer sends several in a row.' },
      { t: 'Understand', b: 'A fast classifier reads the intent. Routine requests go to a fast model; complaints and complex cases go to a stronger one.' },
      { t: 'Act', b: 'The agent works through tools: search the catalogue, read an order, update its status, change an address, hand over to a person. Nothing else.' },
      { t: 'Reply or hand over', b: 'The customer gets an answer in seconds. If anything is outside the agent’s limits, a person takes over with a summary and a priority.' },
    ] as Item[],
    guardTitle: 'Guardrails, by design',
    guard: [
      { t: 'Scoped tools', b: 'Every tool is bound to one business and one customer. An agent cannot read or change anything else.' },
      { t: 'Customer words are data', b: 'What a customer writes is treated as information, never as instructions to the agent.' },
      { t: 'Rules on every action', b: 'Confirming an order needs the customer’s explicit confirmation. Cancelling and address changes are allowed only before shipping. No tool can grant a discount.' },
      { t: 'Safe failure', b: 'If a model fails, refuses, or a tool loop runs too long, the customer gets a fixed, polite message and the conversation goes to a person at high priority.' },
    ] as Item[],
    opsTitle: 'Run it, see it, improve it',
    ops: [
      { t: 'Team dashboard', b: 'Conversations, filters, replies, “return to agent”, conversation locks, and the 24-hour messaging window.' },
      { t: 'Full run log', b: 'Each agent run records the model, the tools it used, tokens and time, so every decision can be traced.' },
      { t: 'Cost discipline', b: 'Stable prompts are cached and the stronger model runs only when the case needs it.' },
    ] as Item[],
    channelsTitle: 'Channels and systems',
    channels: [
      { t: 'WhatsApp Business', b: 'Live: approved templates, quick-reply buttons, reminders, delivery status.' },
      { t: 'Messenger and Instagram', b: 'Next on the roadmap, on the same path.' },
      { t: 'Your systems', b: 'Store platforms, CRMs and internal tools are connected per client. We list an integration here only once it works.' },
    ] as Item[],
  },
  company: {
    seoTitle: 'Company',
    seoDescription: 'TrueNorth is an AI agent company. Our mission: help any small or mid-sized business work with the efficiency of a large team, without growing the team.',
    title: 'We build the digital team inside your business',
    lede: 'TrueNorth is an AI agent company. We design, build and operate agents that take repetitive work off teams, and we measure every agent by the results it produces.',
    missionLabel: 'Mission',
    mission: 'Help any small or mid-sized business work with the efficiency of a large team, without growing the team.',
    visionLabel: 'Vision',
    vision: 'Every business runs whole departments with AI agents, and one day every person has an agent working on their behalf in the digital world.',
    nameTitle: 'Why “TrueNorth”',
    nameBody:
      'A compass does not do the travelling. It keeps you pointed the right way while everything moves. That is the job we take on for a business entering the age of AI: the right direction, held steady, and agents that do the work along the way.',
    differentTitle: 'What makes us different',
    different: [
      { t: 'We learn the whole cycle', b: 'Chatbot tools see messages. We learn how the business works, from order to stock to delivery, so the agent can act, not just reply.' },
      { t: 'We open industries slowly', b: 'We start a new industry only when the one before it has at least three clients with measured results.' },
      { t: 'We say what is real', b: 'No borrowed logos, no invented numbers. We show working agents, and we publish results once clients have them.' },
    ] as Item[],
    voiceTitle: 'How we talk',
    voice: 'Plainly, and in results: reply in seconds, cut returns, save hours. If a business owner would not use the word, we do not either.',
  },
  contact: {
    seoTitle: 'Talk to us',
    seoDescription: 'Tell us about the repetitive work in your business. We will show you an agent working on a case close to yours.',
    title: 'Talk to us',
    lede: 'A 20-minute call. We will show you an agent working on a case close to yours and tell you honestly whether an agent is the right answer.',
    points: [
      'A live agent on sample data that looks like yours',
      'Where the hours go in your current process',
      'What a first agent would take, and what it would cost',
    ],
    emailLabel: 'Prefer email?',
  },
  form: {
    name: 'Your name',
    nameErr: 'Enter your name.',
    company: 'Company',
    companyErr: 'Enter your company name.',
    email: 'Work email',
    emailErr: 'Enter a valid email address.',
    whatsapp: 'WhatsApp (optional)',
    whatsappErr: 'Include the country code, for example +44 7700 900000.',
    whatsappPlaceholder: '+44 7700 900000',
    industry: 'Industry',
    industryErr: 'Choose the closest industry.',
    industryPlaceholder: 'Choose one',
    industries: ['E-commerce', 'Sales team', 'Real estate', 'Services', 'Other'],
    need: 'What should an agent take off your team?',
    needPlaceholder: 'For example: confirming every new order on WhatsApp',
    honeypot: 'Leave this field empty',
    submit: 'Send',
    sending: 'Sending…',
    hint: 'We reply within one working day.',
    doneTitle: 'Message received',
    doneBody: 'We will reply within one working day to set up a call.',
    error: 'Your message did not send. Check your connection and try again, or email',
  },
  blog: {
    seoTitle: 'Insights',
    seoDescription: 'Practical writing on AI agents in business: what they are, how to deploy them safely, and how to measure the results.',
    title: 'Insights',
    lede: 'Practical writing on putting AI agents to work: what they are, where they fit, and how to measure them.',
    minutes: 'min read',
    empty: 'The first article is on its way.',
    more: 'Keep reading',
    home: 'Home',
    topics: 'Topics',
    by: 'by',
  },
  notFound: {
    seoTitle: 'Page not found',
    title: 'This page does not exist',
    lede: 'The link may have changed or have a typo. Start from the home page or read our insights.',
    home: 'Home page',
    blog: 'Insights',
  },
  demo: {
    store: 'Nawara Store',
    account: 'Business account',
    typing: 'typing…',
    typingAria: 'The agent is typing',
    log: 'Simulated WhatsApp conversation',
    question: 'Choose the customer’s reply:',
    order: 'Order',
    status: 'Status in the store',
    restart: 'Start over',
    waiting: 'Awaiting confirmation',
    sentNote: 'Confirmation sent one minute after the order.',
    disclaimer: 'Simulation on a sample store. The real agent runs the same logic on your business WhatsApp number.',
    orderMsg:
      'Hi Mona 👋 Here is your order #1042 from Nawara Store:\nCrepe abaya, size 54, navy × 1\nTotal: 450 incl. delivery\nAddress: 12 Abbas El Akkad St, Nasr City',
    orderButtons: ['Confirm order', 'Change', 'Cancel'],
    scenarios: [
      { id: 'confirm', tone: 'ok', label: 'Confirm', customer: 'Confirm order', agent: 'Done, Mona. Your order is confirmed ✅ It will arrive in 2 to 4 days, and I will send the tracking number as soon as it ships.', status: 'Confirmed, ready to ship', note: 'Order status updated in the store automatically.' },
      { id: 'address', tone: 'wait', label: 'Change address', customer: 'Can you send it to my office? 5 Makram Ebeid St', agent: 'Of course. The order has not shipped yet, so I updated the address to 5 Makram Ebeid St, Nasr City. Shall I confirm the order with the new address?', buttons: ['Confirm order', 'Change'], status: 'Address updated, awaiting confirmation', note: 'Address changes are allowed only before shipping.' },
      { id: 'question', tone: 'wait', label: 'Ask about size', customer: 'How long is size 54? I am 165 cm', agent: 'Size 54 is 137 cm long and fits heights from about 160 to 167 cm, based on the store’s size chart. Shall I confirm the order?', buttons: ['Confirm order', 'Change size'], status: 'Awaiting confirmation', note: 'Answered from the store’s data only. Nothing invented.' },
      { id: 'cancel', tone: 'stop', label: 'Cancel', customer: 'Actually, I don’t want it anymore', agent: 'No problem, Mona. I have cancelled order #1042. We are here whenever you want to order again.', status: 'Cancelled, stock released', note: 'The order will not ship, so no wasted delivery.' },
      { id: 'complaint', tone: 'human', label: 'Complain', customer: 'Last time my order was a week late and nobody answered me!!', agent: 'I am sorry, Mona, you deserved better. I have passed this to our customer care team with your order details, and they will contact you today.', status: 'Handed to a person, high priority', note: 'The agent stepped back. A team member received a summary.' },
    ],
  },
};

export type Copy = typeof EN;

const AR: Copy = {
  meta: {
    locale: 'ar_AR',
    siteTitle: 'TrueNorth: أنظمة AI agents للشركات',
    siteDescription:
      'TrueNorth بتصمم وتبني وتشغّل AI agents بتشتغل جوه شركتك: على قنواتك، ومن بياناتك، وبقواعدك. بنتايج تتقاس بالأرقام.',
  },
  nav: {
    skip: 'انتقل للمحتوى',
    home: 'TrueNorth، الصفحة الرئيسية',
    solutions: 'الحلول',
    platform: 'المنصة',
    company: 'الشركة',
    insights: 'المدونة',
    contact: 'كلّمنا',
    menu: 'القائمة',
    close: 'إغلاق',
    switchLabel: 'English',
    switchAria: 'Read this site in English',
    mainNav: 'الرئيسية',
  },
  footer: {
    tagline: 'فريق رقمي بيشتغل جوه بزنسك 24 ساعة.',
    solutions: 'الحلول',
    company: 'الشركة',
    rights: 'TrueNorth. أنظمة AI agents.',
    links: 'روابط الموقع',
  },
  home: {
    seoTitle: 'TrueNorth: أنظمة AI agents للشركات',
    heroTitle: 'فريق رقمي بيشتغل جوه بزنسك 24 ساعة.',
    heroLede:
      'TrueNorth بتصمم وتبني وتشغّل AI agents بتشتغل جوه شركتك، على قنواتك وأنظمتك الحالية، علشان فريقك يركز في القرارات اللي محتاجة بشر.',
    heroPrimary: 'كلّمنا',
    heroSecondary: 'شوف agent شغال',
    heroFigure: 'إبر بوصلة كتير بتتهز وبعدين بتتجه كلها للشمال',
    statement:
      'أغلب اللي بيبطّأ أي فريق شغل متكرر: رد، وتأكيد، ومتابعة، ونقل بيانات من نظام لنظام. إحنا بنبني agents بتشيل الشغل ده من أوله لآخره، وبتسيب للناس بس اللي محتاج إنسان.',
    capTitle: 'الـ agents بتاعتنا بتعمل إيه',
    capIntro: 'الـ agent مش شات بوت. بيفهم الطلب، ويتصرف في أنظمتك، ويخلّص المهمة، في حدود إنت اللي بتحطها.',
    capabilities: [
      { t: 'بيكلم عملاءك', b: 'بيرد على الأسئلة، ويأكد الأوردرات، ويحل الطلبات على واتساب وغيره، بلغة العميل، وفي ثواني.' },
      { t: 'بيمشّي الشغل اليومي', b: 'بيحدّث حالة الأوردر، ويعدّل العنوان قبل الشحن، ويتابع الرد اللي مجاش، ويخلي كل الأنظمة متزامنة.' },
      { t: 'بيتابع كل عميل محتمل', b: 'بيأهّل الاستفسارات الجديدة، ويحجز الميعاد، ويبعت التذكير. مفيش حاجة بتستنى حد يفضى لها.' },
      { t: 'بيحوّل ومعاه الصورة كاملة', b: 'الشكاوى والاسترجاع وأي حاجة مش واضحة بتروح لفريقك ومعاها ملخص، فمحدش بيبدأ المحادثة من الأول.' },
    ],
    solTitle: 'حلول حسب المجال',
    solIntro: 'كل المجالات مبنية على نفس الأساس. ومش بنفتح مجال جديد إلا لما اللي قبله يبقى عنده نتايج مقاسة مع عملاء حقيقيين.',
    solMore: 'التفاصيل',
    demoTitle: 'شوف agent شغال',
    demoIntro:
      'أول agent عندنا في التشغيل بيأكد أوردرات الدفع عند الاستلام على واتساب. العميلة طلبت من دقيقة ووصلها التأكيد. اختار هترد بإيه.',
    principlesTitle: 'إزاي بنبني الـ agents',
    principles: [
      { t: 'من بياناتك بس', b: 'الـ agent بيرد من الكتالوج والسياسات والسجلات بتاعتك. ولو الإجابة مش موجودة، بيقول كده ويحوّل. عمره ما بيخمّن.' },
      { t: 'الحدود قبل الصلاحيات', b: 'كل حاجة الـ agent يقدر يعملها متقيدة بشركة واحدة وعميل واحد، وليها قواعد: الإلغاء قبل الشحن بس، ومفيش خصم أبدًا.' },
      { t: 'الإنسان على بعد خطوة', b: 'العميل يقدر يطلب يكلم إنسان في أي وقت. الـ agent بيسكت، وفريقك بيشوف المحادثة كلها.' },
      { t: 'بيتقاس بأرقامك', b: 'بنسجل الأرقام المهمة قبل ما نبدأ وبعد ما الـ agent يشتغل. وده اللي بنحكم بيه على الشغل، مع بعض.' },
    ],
    coreTitle: 'أساس واحد تحت كل agent',
    coreIntro: 'كل agent جديد بيضيف تكاملاته ومنطقه فوق أساس مشترك، فبينزل أسرع وبيتصرف بنفس الطريقة.',
    core: [
      { t: 'محرك الـ agent', b: 'الفهم، واختيار النموذج، واستخدام الأدوات.' },
      { t: 'القنوات', b: 'واتساب دلوقتي، والباقي جاي.' },
      { t: 'التحويل لإنسان', b: 'أولوية، وملخص، واستلام نضيف.' },
      { t: 'لوحة الفريق', b: 'كل محادثة وكل إجراء وكل حالة.' },
    ],
    coreLink: 'المنصة بتشتغل إزاي',
    processTitle: 'إزاي بنشتغل معاك',
    process: [
      { t: 'ندرس بزنسك', b: 'نرسم الشغل بيمشي إزاي فعلًا، من أول رسالة لحد التسليم، ونعرف الساعات بتروح فين.' },
      { t: 'نبني ونربط', b: 'نوصّل الـ agent بقنواتك وأنظمتك، ونتفق على حدوده: يعمل إيه، ويحوّل إمتى.' },
      { t: 'نقيس ونطوّر', b: 'نقارن الأرقام قبل وبعد، ونفضل نطوّر الـ agent على اللي بنتعلمه.' },
    ],
    visionTitle: 'رايحين على فين',
    vision: [
      { t: 'agent لكل مهمة', b: 'النهارده: agent واحد بيشيل مهمة متكررة واحدة عن فريقك بالكامل.' },
      { t: 'أقسام شغالة بالـ agents', b: 'بعد كده: أقسام كاملة، من خدمة العملاء لعمليات المبيعات، بيشغّلها فريق agents والناس هي اللي بتدير.' },
      { t: 'agent لكل شخص', b: 'وفي الآخر: agent شخصي لكل فرد، بيشتغل بداله في العالم الرقمي.' },
    ],
    insightsTitle: 'من المدونة',
    insightsAll: 'كل المقالات',
    faqTitle: 'أسئلة بتتسأل كتير',
    faq: [
      { t: 'بيانات عملائي آمنة؟', b: 'الـ agent بيشوف بيانات الشركة اللي شغال لها بس، وكل أداة عنده متقيدة بالشركة والعميل اللي بيكلمه. بنستخدم بياناتك علشان الشغل بس، ومش بنبيعها ولا بنشاركها.' },
      { t: 'الـ agent هيستغنى عن فريقي؟', b: 'هيشيل الشغل المتكرر. فريقك بيفضل مسؤول عن الشكاوى والاستثناءات والقرارات، وبيرجعله وقت للشغل اللي محتاج بشر.' },
      { t: 'لو الـ agent غلط؟', b: 'الـ agent شغال في حدود واضحة: بيرد من بياناتك بس، ومعندوش صلاحية خصم أو استرجاع فلوس، وبيحوّل أي حاجة مش متأكد منها. وكل محادثة متسجلة في اللوحة، فالغلط بيبان وبيتصلح.' },
      { t: 'العميل هيعرف إنه بيكلم agent؟', b: 'أيوه. إحنا شايفين إن ده الصح، والعميل بيهمه ياخد رد صح وبسرعة. ولو طلب إنسان، المحادثة بتتحول لفريقك على طول.' },
      { t: 'التشغيل بياخد قد إيه؟', b: 'بيفرق حسب أنظمتك وقنواتك. بنبدأ بجلسة نفهم فيها شغلك بيمشي إزاي، وبعدها نتفق على المدة قبل ما نبدأ نبني.' },
    ],
    ctaTitle: 'احكيلنا عن الشغل اللي واخد وقت فريقك',
    ctaBody: 'هنوريك agent شغال على حالة قريبة من حالتك، ونقولك بصراحة لو الـ agent هو الحل الصح ولا لأ.',
  },
  solutionsPage: {
    seoTitle: 'الحلول',
    seoDescription: 'AI agents للمتاجر الإلكترونية دلوقتي، والمبيعات والعقارات بعدها، ودراسات أتمتة مخصصة لأي شغل متكرر.',
    title: 'الحلول',
    lede: 'شركة واحدة، وأساس واحد، ومجالات بتزيد. بنتعمق في مجال قبل ما نفتح اللي بعده.',
    home: 'الرئيسية',
  },
  solution: {
    home: 'الرئيسية',
    solutions: 'الحلول',
    primary: 'كلّمنا',
    earlyTitle: 'سجّل في القائمة الأولى',
    earlyBody: 'احكيلنا عن فريقك والشغل اللي عايز agent يشيله. هنكلمك أول ما الـ agent ده يبقى جاهز لأول عملاء.',
    demoTitle: 'جرّبه على أوردر تجريبي',
  },
  platform: {
    seoTitle: 'المنصة',
    seoDescription: 'إزاي الـ agents بتاعة TrueNorth بتشتغل: مسار واحد من الرسالة للإجراء، وأدوات متقيدة، واختيار النموذج، والتحويل لإنسان، وتسجيل كامل.',
    title: 'الـ agents بتاعتنا بتشتغل إزاي',
    lede: 'كل agent بيمشي على نفس المسار: رسالة بتوصل، والـ agent بيفهمها، ويتصرف بأدوات مسموح له بيها، ويرد أو يحوّل. ده اللي بيحصل في كل خطوة.',
    flowTitle: 'من الرسالة للإجراء',
    flowFigure: 'رسم لمسار الـ agent: القنوات، والفهم، والأدوات، والرد أو التحويل',
    flow: [
      { t: 'الاستقبال', b: 'الرسايل من كل القنوات بيتأكد من مصدرها، وبتتحول لصيغة واحدة، ومن غير تكرار، وبتتجمع لو العميل بعت كذا رسالة ورا بعض.' },
      { t: 'الفهم', b: 'مصنّف سريع بيقرا المقصود. الطلبات العادية بتروح لنموذج سريع، والشكاوى والحالات المعقدة لنموذج أقوى.' },
      { t: 'التنفيذ', b: 'الـ agent بيشتغل بأدوات: يدوّر في الكتالوج، ويقرا الأوردر، ويحدّث حالته، ويعدّل العنوان، ويحوّل لإنسان. ومفيش غير كده.' },
      { t: 'الرد أو التحويل', b: 'العميل بياخد إجابة في ثواني. ولو حاجة برا حدود الـ agent، موظف بيستلم ومعاه ملخص وأولوية.' },
    ],
    guardTitle: 'الأمان جزء من التصميم',
    guard: [
      { t: 'أدوات متقيدة', b: 'كل أداة مربوطة بشركة واحدة وعميل واحد. الـ agent ميقدرش يقرا أو يغيّر أي حاجة تانية.' },
      { t: 'كلام العميل بيانات', b: 'اللي العميل بيكتبه بيتعامل كمعلومة، مش كتعليمات للـ agent.' },
      { t: 'قواعد على كل إجراء', b: 'تأكيد الأوردر محتاج العميل يأكد بنفسه. الإلغاء وتعديل العنوان قبل الشحن بس. ومفيش أداة تقدر تدي خصم.' },
      { t: 'فشل آمن', b: 'لو النموذج وقع أو رفض أو الأدوات طولت، العميل بتوصله رسالة ثابتة ومهذبة، والمحادثة بتتحول لموظف بأولوية عالية.' },
    ],
    opsTitle: 'شغّله، وشوفه، وطوّره',
    ops: [
      { t: 'لوحة الفريق', b: 'المحادثات، والفلاتر، والرد، و"رجّع للـ agent"، وقفل المحادثة، وعدّاد نافذة الـ 24 ساعة.' },
      { t: 'سجل كامل', b: 'كل تشغيل للـ agent بيسجل النموذج والأدوات والتوكنز والوقت، فكل قرار يتعرف اتاخد ليه.' },
      { t: 'تكلفة محسوبة', b: 'التعليمات الثابتة بتتخزن مؤقتًا، والنموذج الأقوى بيشتغل بس لما الحالة محتاجاه.' },
    ],
    channelsTitle: 'القنوات والأنظمة',
    channels: [
      { t: 'واتساب للأعمال', b: 'شغال: قوالب معتمدة، وأزرار رد سريع، وتذكير، وحالات التسليم.' },
      { t: 'ماسنجر وإنستجرام', b: 'الجايين في الخطة، على نفس المسار.' },
      { t: 'أنظمتك', b: 'منصات المتاجر وأنظمة الـ CRM والأدوات الداخلية بتتربط لكل عميل. ومش بنكتب تكامل هنا إلا لما يبقى شغال.' },
    ],
  },
  company: {
    seoTitle: 'الشركة',
    seoDescription: 'TrueNorth شركة AI agents. رسالتنا: نخلي أي شركة صغيرة أو متوسطة تشتغل بكفاءة فريق كبير، من غير ما تكبّر فريقها.',
    title: 'بنبني الفريق الرقمي جوه شركتك',
    lede: 'TrueNorth شركة AI agents. بنصمم ونبني ونشغّل agents بتشيل الشغل المتكرر عن الفرق، وبنقيس كل agent بالنتيجة اللي بيجيبها.',
    missionLabel: 'الرسالة',
    mission: 'نخلي أي شركة صغيرة أو متوسطة تشتغل بكفاءة فريق كبير، من غير ما تكبّر فريقها.',
    visionLabel: 'الرؤية',
    vision: 'كل شركة يبقى عندها أقسام كاملة شغالة بالـ AI agents، ومستقبلًا agent شخصي لكل فرد يشتغل بداله في العالم الرقمي.',
    nameTitle: 'ليه "TrueNorth"',
    nameBody:
      'البوصلة مش هي اللي بتمشي. هي اللي بتخليك في الاتجاه الصح وكل حاجة حواليك بتتحرك. وده دورنا مع أي بزنس داخل عصر الـ AI: اتجاه صح وثابت، وagents بتعمل الشغل على الطريق.',
    differentTitle: 'إيه اللي بيفرقنا',
    different: [
      { t: 'بنفهم الدورة كلها', b: 'أدوات الشات بوت بتشوف الرسايل بس. إحنا بنفهم البزنس بيشتغل إزاي، من الأوردر للمخزون للشحن، علشان الـ agent يتصرف مش بس يرد.' },
      { t: 'بنفتح المجالات بالراحة', b: 'مش بنبدأ مجال جديد إلا لما اللي قبله يبقى عنده 3 عملاء على الأقل بنتايج مقاسة.' },
      { t: 'بنقول اللي حقيقي بس', b: 'مفيش لوجوهات مستلفة ولا أرقام متألفة. بنوري agents شغالة، وبننشر النتايج لما العملاء يبقى عندهم نتايج.' },
    ],
    voiceTitle: 'بنتكلم إزاي',
    voice: 'ببساطة وبالنتايج: رد في ثواني، مرتجعات أقل، ساعات بتتوفر. الكلمة اللي صاحب البزنس مش هيستخدمها، إحنا كمان مش بنستخدمها.',
  },
  contact: {
    seoTitle: 'كلّمنا',
    seoDescription: 'احكيلنا عن الشغل المتكرر في شركتك، وهنوريك agent شغال على حالة قريبة من حالتك.',
    title: 'كلّمنا',
    lede: 'مكالمة 20 دقيقة. هنوريك agent شغال على حالة قريبة من حالتك، ونقولك بصراحة لو الـ agent هو الحل الصح ولا لأ.',
    points: [
      'agent شغال على بيانات تجريبية شبه بياناتك',
      'الساعات بتروح فين في شغلك دلوقتي',
      'أول agent هياخد قد إيه وهيتكلف كام',
    ],
    emailLabel: 'تفضّل الإيميل؟',
  },
  form: {
    name: 'اسمك',
    nameErr: 'اكتب اسمك.',
    company: 'الشركة',
    companyErr: 'اكتب اسم شركتك.',
    email: 'إيميل الشغل',
    emailErr: 'اكتب إيميل صحيح.',
    whatsapp: 'واتساب (اختياري)',
    whatsappErr: 'اكتب الرقم بكود الدولة، مثلًا ‎+966 5x xxx xxxx‎.',
    whatsappPlaceholder: '+966 5x xxx xxxx',
    industry: 'المجال',
    industryErr: 'اختار أقرب مجال.',
    industryPlaceholder: 'اختار',
    industries: ['تجارة إلكترونية', 'فريق مبيعات', 'عقارات', 'خدمات', 'مجال تاني'],
    need: 'عايز الـ agent يشيل إيه عن فريقك؟',
    needPlaceholder: 'مثلًا: تأكيد كل أوردر جديد على واتساب',
    honeypot: 'سيب الخانة دي فاضية',
    submit: 'ابعت',
    sending: 'بنبعت…',
    hint: 'بنرد خلال يوم عمل.',
    doneTitle: 'وصلتنا رسالتك',
    doneBody: 'هنرد عليك خلال يوم عمل علشان نحدد ميعاد المكالمة.',
    error: 'الرسالة موصلتش. اتأكد من الإنترنت وجرب تاني، أو ابعتلنا على',
  },
  blog: {
    seoTitle: 'المدونة',
    seoDescription: 'كلام عملي عن الـ AI agents في الشركات: هي إيه، وإزاي تشغّلها بأمان، وإزاي تقيس نتايجها.',
    title: 'المدونة',
    lede: 'كلام عملي عن تشغيل الـ AI agents: هي إيه، وتنفع فين، وإزاي تقيسها.',
    minutes: 'دقايق قراية',
    empty: 'أول مقالة جاية قريب.',
    more: 'اقرا كمان',
    home: 'الرئيسية',
    topics: 'المواضيع',
    by: '',
  },
  notFound: {
    seoTitle: 'الصفحة مش موجودة',
    title: 'الصفحة دي مش موجودة',
    lede: 'ممكن الرابط اتغير أو فيه حرف غلط. ابدأ من الرئيسية أو شوف المدونة.',
    home: 'الصفحة الرئيسية',
    blog: 'المدونة',
  },
  demo: {
    store: 'متجر نوارة',
    account: 'حساب أعمال',
    typing: 'بيكتب…',
    typingAria: 'الـ agent بيكتب',
    log: 'محاكاة محادثة واتساب',
    question: 'اختار رد العميلة:',
    order: 'أوردر',
    status: 'الحالة في المتجر',
    restart: 'ابدأ من الأول',
    waiting: 'مستني تأكيد',
    sentNote: 'التأكيد اتبعت بعد دقيقة من الطلب.',
    disclaimer: 'محاكاة على متجر تجريبي. الـ agent الحقيقي بيشتغل بنفس المنطق على رقم واتساب شركتك.',
    orderMsg:
      'أهلًا منى 👋 ده تأكيد أوردرك رقم 1042 من متجر نوارة:\nعباية كريب، مقاس 54، كحلي × 1\nالإجمالي: 450 شامل الشحن\nالعنوان: مدينة نصر، شارع عباس العقاد، عمارة 12',
    orderButtons: ['تأكيد الأوردر', 'تعديل', 'إلغاء'],
    scenarios: [
      { id: 'confirm', tone: 'ok', label: 'تأكيد', customer: 'تأكيد الأوردر', agent: 'تمام يا منى، أوردرك اتأكد ✅ هيوصلك خلال 2 لـ 4 أيام، وهبعتلك رقم الشحنة أول ما تخرج.', status: 'مؤكد، جاهز للشحن', note: 'الحالة اتحدثت في المتجر تلقائيًا.' },
      { id: 'address', tone: 'wait', label: 'تغيير العنوان', customer: 'ممكن تبعتوه على شغلي؟ شارع مكرم عبيد عمارة 5', agent: 'أكيد. الأوردر لسه متشحنش، فعدّلت العنوان لـ: مدينة نصر، شارع مكرم عبيد، عمارة 5. أأكد الأوردر بالعنوان الجديد؟', buttons: ['تأكيد الأوردر', 'تعديل'], status: 'العنوان اتعدّل، مستني تأكيد', note: 'التعديل بيتسمح بس قبل الشحن.' },
      { id: 'question', tone: 'wait', label: 'سؤال عن المقاس', customer: 'مقاس 54 طوله قد إيه؟ أنا طولي 165', agent: 'مقاس 54 طوله 137 سم، ومناسب للطول من 160 لـ 167 سم حسب جدول مقاسات المتجر. تحبي أأكد الأوردر؟', buttons: ['تأكيد الأوردر', 'تغيير المقاس'], status: 'مستني تأكيد', note: 'الإجابة من بيانات المتجر بس، مش تأليف.' },
      { id: 'cancel', tone: 'stop', label: 'إلغاء', customer: 'لا خلاص مش عايزاه', agent: 'ولا يهمك يا منى، ألغيت الأوردر 1042. لو حبيتي تطلبي تاني إحنا موجودين.', status: 'ملغي، المخزون رجع', note: 'الأوردر مش هيتشحن، ومفيش شحن ضايع.' },
      { id: 'complaint', tone: 'human', label: 'شكوى', customer: 'آخر مرة الأوردر اتأخر أسبوع ومحدش رد عليا!!', agent: 'حقك علينا يا منى. حوّلت كلامك لفريق خدمة العملاء ومعاهم تفاصيل أوردراتك، وهيتواصلوا معاكي النهارده.', status: 'محوّل لموظف، أولوية عالية', note: 'الـ agent سكت، والموظف استلم ملخص المحادثة.' },
    ],
  },
};

export const COPY: Record<'en' | 'ar', Copy> = { en: EN, ar: AR };
