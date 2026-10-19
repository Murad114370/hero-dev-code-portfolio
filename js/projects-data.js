/**
 * Projects Data Store
 * Muradul Islam Portfolio
 */

const projectsData = [
  {
    id: "doctoriano",
    title: "Doctoriano",
    subtitle: "Smart Healthcare Management & Telemedicine Platform",
    category: "fullstack",
    duration: "June 2025 - November 2025",
    image: "./assets/images/project-doctoriano.png",
    demoUrl: "https://doctoriano-health.example.com",
    githubUrl: "https://github.com/Murad114370/doctoriano-telemedicine",
    tags: ["React 19", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS", "WebRTC"],
    overview:
      "Doctoriano is a comprehensive digital healthcare and telemedicine platform engineered to bridge the gap between patients, licensed physicians, and medical clinics. It features automated appointment scheduling, real-time encrypted video consultations, electronic health records (EHR) management, and integrated digital prescription workflows.",
    problemStatement:
      "Traditional clinic visits often involve prolonged waiting times, fragmented medical history records, and limited access to healthcare professionals in remote regions. Patients lacked a unified portal to schedule consultations, share diagnostics securely, and receive authentic digital prescriptions.",
    challenges: [
      {
        title: "Low-Latency Video Consultations",
        description:
          "Ensuring stable peer-to-peer WebRTC connections across varying network bandwidths without dropped frames or audio desynchronization.",
        solution:
          "Implemented adaptive bitrate streaming with fallback STUN/TURN relay servers on AWS and real-time network health diagnostics."
      },
      {
        title: "HIPAA-Compliant Patient Data Security",
        description:
          "Protecting sensitive patient electronic health records (EHR) and prescriptions against unauthorized access or transmission interception.",
        solution:
          "Applied AES-256 field-level database encryption in MongoDB, JWT with rotating refresh tokens, and granular Role-Based Access Control (RBAC)."
      },
      {
        title: "Real-Time Doctor Availability & Queue Management",
        description:
          "Preventing double-booking and managing live queue numbers when doctors experience unexpected delays.",
        solution:
          "Engineered an event-driven queue system powered by Socket.io and Redis locks to update consultation availability in real time."
      }
    ],
    features: [
      "HD Video & Audio Telemedicine via WebRTC",
      "Interactive Doctor Schedule & Slot Reservation",
      "Real-time Chat with File & Prescription Sharing",
      "Automated SMS & Email Appointment Reminders",
      "Doctor Analytics Dashboard with Patient Demographics",
      "Stripe & Local Payment Gateway Integration"
    ],
    roadmap: [
      "AI-Powered Symptom Checker & Preliminary Triage Bot",
      "Native Mobile App build using React Native",
      "Wearable Health Monitor API Integration (Apple Health / Google Fit)",
      "Multi-language Localization for Global Outreach"
    ]
  },
  {
    id: "ieltstar",
    title: "IELTSTAR",
    subtitle: "AI-Powered Adaptive IELTS Test Prep & Mock Simulator",
    category: "fullstack",
    duration: "September 2025 - October 2025",
    image: "./assets/images/project-ieltstar.png",
    demoUrl: "https://ieltstar-prep.example.com",
    githubUrl: "https://github.com/Murad114370/ieltstar-ai-mock",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "OpenAI API", "PostgreSQL", "Prisma"],
    overview:
      "IELTSTAR is an intelligent educational simulation platform designed to prepare candidates for the IELTS Academic & General Training examinations. Built on Next.js 15 and powered by AI evaluation engines, it delivers real-time band score estimates, lexical resource diagnostics, and personalized improvement roadmaps.",
    problemStatement:
      "IELTS students commonly struggle with subjective essay grading and expensive human examiner fees. Traditional practice tests offer static answer keys with no qualitative feedback on Writing Task 1/2 or Speaking fluency, leading to inefficient preparation cycles.",
    challenges: [
      {
        title: "Accurate Assessment of Speaking & Pronunciation",
        description:
          "Processing real-time audio from users in browser environments with minimal delay and noise interference.",
        solution:
          "Utilized Web Audio API for audio waveform visualization and Whisper API for speech-to-text transcription paired with custom phonetic analysis heuristics."
      },
      {
        title: "Dynamic IELTS Band Scoring Engine",
        description:
          "Aligning AI essay scoring criteria strictly with official British Council/IDP grading rubrics (Task Achievement, Cohesion, Lexical Resource, Grammar).",
        solution:
          "Developed specialized prompt chains and few-shot calibration models that evaluate writing essays against 5,000+ benchmarked human examiner samples."
      },
      {
        title: "High Performance Server-Side Rendering",
        description:
          "Rendering complex timed mock test sections with dozens of audio passages and reading texts under high concurrent loads.",
        solution:
          "Leveraged Next.js 15 App Router with granular streaming server components and PostgreSQL query caching via Prisma."
      }
    ],
    features: [
      "Full-Length Timed IELTS Mock Exam Simulator (L/R/W/S)",
      "Instant AI Writing Evaluation with Line-by-Line Feedback",
      "Interactive Audio Player with Real-Time Transcript Highlighting",
      "Band Score Predictor & Comprehensive Weakness Breakdown",
      "Gamified Vocabulary & Grammar Practice Drills",
      "Dark / Light Exam Mode replicating official computer-delivered interface"
    ],
    roadmap: [
      "Real-Time Virtual Examiner Avatar using WebGL & Speech Synthesis",
      "Peer-to-Peer Speaking Practice Rooms with Community Ratings",
      "Integration with Cambridge IELTS Official Question Bank",
      "Offline Mode for Remote Area Accessibility"
    ]
  },
  {
    id: "mewopay",
    title: "MewoPay",
    subtitle: "Next-Gen Cross-Border Digital Wallet & Payment Gateway",
    category: "frontend",
    duration: "January 2025 - June 2025",
    image: "./assets/images/project-mewopay.png",
    demoUrl: "https://mewopay-dashboard.example.com",
    githubUrl: "https://github.com/Murad114370/mewopay-fintech-wallet",
    tags: ["React 19", "Redux Toolkit", "Node.js", "Express", "MongoDB", "WebSockets", "Chart.js"],
    overview:
      "MewoPay is a high-speed, secure financial technology dashboard and digital wallet built for international freelancers, digital nomads, and modern eCommerce businesses. It simplifies multi-currency balances, instant cross-border remittances, QR-code peer-to-peer transfers, and automated invoice reconciliation.",
    problemStatement:
      "Global digital workers face exorbitant exchange fees, delayed international clearance times, and convoluted dashboard experiences when receiving cross-border earnings or managing multi-currency cash flows.",
    challenges: [
      {
        title: "Real-Time Exchange Rate Updates Without UI Stutter",
        description:
          "Managing live currency exchange tickers across 45+ currency pairs updating every 800 milliseconds.",
        solution:
          "Implemented WebSocket multiplexing with Redux Toolkit normalized state and requestAnimationFrame throttling to maintain 60fps UI fluidity."
      },
      {
        title: "Robust Transaction Concurrency & Double-Spend Prevention",
        description:
          "Ensuring absolute transactional integrity when multiple concurrent wallet withdrawals or P2P transfers are triggered.",
        solution:
          "Constructed idempotent REST API endpoints backed by MongoDB two-phase commits, optimistic UI locking, and audit logs."
      },
      {
        title: "Financial Charting Performance on Mobile",
        description:
          "Rendering multi-year historical cashflow charts and monthly expense heatmaps smoothly on lower-end mobile devices.",
        solution:
          "Optimized Chart.js canvas rendering with data decimation algorithms and offscreen canvas preprocessing."
      }
    ],
    features: [
      "Multi-Currency Digital Wallet (USD, EUR, GBP, BDT, JPY)",
      "Instant P2P Money Transfers via Email / Mobile / QR Code",
      "Interactive Financial Analytics & Cashflow Visualization",
      "Biometric & Two-Factor Authentication (2FA) Security Flow",
      "Automated Virtual Visa / Mastercard Generation",
      "Instant PDF & CSV Invoice & Statement Export"
    ],
    roadmap: [
      "Crypto-to-Fiat Instant Swap Integration (USDT/USDC)",
      "Automated Tax Estimation & Withholding Tool",
      "Micro-Savings & High-Yield Staking Vaults",
      "Physical Metal Debit Card Ordering Portal"
    ]
  }
];

// Helper to get project by ID
function getProjectById(id) {
  return projectsData.find((p) => p.id === id);
}
