//mockdata.js
export const salespersons = [
  {
    "salespersonId": "SP-001",
    "name": "Rahul Dev",
    "email": "rahul.d@nlfsolutions.com",
    "mobile": "+91 9876543210",
    "department": "Sales",
    "region": "South India"
  },
  {
    "salespersonId": "SP-002",
    "name": "Priya Nair",
    "email": "priya.n@nlfsolutions.com",
    "mobile": "+91 9876543211",
    "department": "Sales",
    "region": "West India"
  },
  {
    "salespersonId": "SP-003",
    "name": "Amit Patel",
    "email": "amit.p@nlfsolutions.com",
    "mobile": "+91 9876543212",
    "department": "Sales",
    "region": "North India"
  },
  {
    "salespersonId": "SP-004",
    "name": "Sneha Reddy",
    "email": "sneha.r@nlfsolutions.com",
    "mobile": "+91 9876543213",
    "department": "Sales",
    "region": "East India"
  },
  {
  "salespersonId": "SP-005",
  "name": "Vikas Mehta",
  "email": "vikas.m@nlfsolutions.com",
  "mobile": "+91 9876543214",
  "department": "Sales",
  "region": "North India"
},
{
  "salespersonId": "SP-006",
  "name": "Anjali Bose",
  "email": "anjali.b@nlfsolutions.com",
  "mobile": "+91 9876543215",
  "department": "Sales",
  "region": "East India"
}
];

export const customerInteractions = [
  // ===== LEAD: LEAD-001 (Arjun Mehta) =====
  {
    "clientName": "Arjun Mehta",
    // ... (omitted for brevity)
    "interactions": [
      {
        "id": 6,
        "date": "2025-09-27",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "Accepted", // Old: Quotation Accepted -> Keep (Accept)
        "moms": "Final R2 quotation accepted at ₹8,75,000. Client confirmed order via email. Very satisfied with the final chair model specifications. Agreed to proceed with 95% advance payment. Next step: Process PO and order confirmation. Expected delivery timeline: Mid-October."
      },
      {
        "id": 5,
        "date": "2025-09-26",
        "mode": "Phone Call",
        "location": "Remote",
        "status": "Revised", // CHANGED: Was "Negotiation" -> Now (Revise)
        "moms": "Client happy with the 7% discount offered in R1. Wants final confirmation on chair model specifications before accepting. Discussed ergonomic features and warranty terms. Client requested detailed spec sheet for the final chair model. Committed to sending chair specifications by EOD. Follow-up scheduled for tomorrow."
      },
      {
        "id": 4,
        "date": "2025-09-25",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "Quotation Sent", // Keep
        "moms": "Sent R1 quotation with 7% discount (₹8,80,000) and revised chair model as discussed"
      },
      {
        "id": 3,
        "date": "2025-09-22",
        "mode": "Phone Call",
        "location": "Remote",
        "status": "Revised", // CHANGED: Was "Follow-up" (Resulted in a quote revision) -> Now (Revise)
        "moms": "Follow-up call on initial quotation. Client finds price too high for their startup budget. Requested 7% discount to match their budget constraints. Also interested in exploring alternative chair models with similar ergonomic features but at a lower price point. Agreed to prepare revised quotation with discount and new chair options. Will send R1 by 25th September."
      },
      {
        "id": 2,
        "date": "2025-09-20",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "Quotation Sent", // Keep
        "moms": "Initial quotation Q-N25-001 sent for ₹9,50,000. Quote includes 5 executive desks, 50 ergonomic chairs, and 2 lounge seating sets. Highlighted the quality of materials and warranty coverage."
      },
      {
        "id": 1,
        "date": "2025-09-15",
        "mode": "Initial Meeting",
        "location": "NLF Solutions Demo Center",
        "status": "", // Keep
        "moms": "Successful first meeting with Arjun Mehta (CEO, StartupHub Pvt Ltd). Client is setting up a new 50-person startup office. Requirement: 5 executive desks for leadership team, 50 ergonomic workstations for employees, and a lounge area for informal meetings. Client is budget-conscious but values quality and employee comfort. Estimated budget: ₹10,00,000. Showed various furniture samples and discussed material options. Client prefers modern, minimalist design. Follow-up action: Schedule technical site visit and prepare initial quotation. Site visit scheduled for 18th September."
      }
    ]
  },
  
  // ===== LEAD: LEAD-002 (Rohan Kumar) =====
  {
    "leadId": "LEAD-002",
    // ... (omitted for brevity)
    "interactions": [
      {
        "id": 5,
        "date": "2025-09-22",
        "mode": "Phone Call",
        "location": "Remote",
        "status": "Revised", // CHANGED: Was "Negotiation" -> Now (Revise)
        "moms": "Client reviewed the initial quotation and certifications provided. Very impressed with sustainability credentials. Requested revised pricing to fit within their CSR budget allocation. Asked about adding bio-degradable waste disposal service as part of the package. Discussed pricing for R1 with additional services. Client wants to reduce overall cost by 7-8%. Agreed to prepare R1 with revised rates and additional bio-degradable waste disposal service. Will send revised quotation by 25th September."
      },
      {
        "id": 4,
        "date": "2025-09-18",
        "mode": "Phone Call",
        "location": "Remote",
        "status": "Revised", // CHANGED: Was "Follow-up" (Resulted in request for revisions/more info) -> Now (Revise)
        "moms": "Follow-up call on quotation Q-N25-002. Client reviewing quotation with their sustainability committee. Asked detailed questions about certifications for recycled materials. Specifically interested in FSC certification for bamboo and recycled content percentage in chairs. Requested copies of material certifications and eco-labels. Committed to sending all certification documents via email by EOD. Client will respond within 4-5 days after committee review."
      },
      {
        "id": 3,
        "date": "2025-10-16",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "Quotation Sent", // Keep
        "moms": "Sent initial quotation Q-N25-002 for ₹5,50,000. Quote based on site measurements taken during visit. Includes 10 bamboo desks and 20 recycled plastic chairs. Emphasized sustainability features and eco-friendly manufacturing process. Highlighted certifications: FSC-certified bamboo and 80% recycled content in chairs."
      },
      // ... (Interactions 1 and 2 are unchanged)
    ]
  },

  // ===== LEAD: LEAD-003 (Priya Sharma) - REJECTION SCENARIO =====
  {
    "leadId": "LEAD-003",
    // ... (omitted for brevity)
    "interactions": [
      {
        "id": 6,
        "date": "2025-10-23",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "Rejected", // CHANGED: Was "Lost/Client Unresponsive" (Explicit rejection) -> Now (Reject)
        "moms": "Received official rejection email from client. Client decided to go with a competitor who offered 25% lower pricing (approximately ₹1,50,000 vs our ₹2,00,000). Competitor also promised faster delivery timeline of 2 weeks vs our 4 weeks. Client mentioned budget constraints as primary concern - they had reallocated funds to other urgent IT infrastructure. Client appreciated our professionalism and design quality but couldn't justify the higher cost to management. Thanked us for our time and said they'd consider us for future projects. Lesson learned: Need to be more competitive on pricing for small-ticket reception area projects. Marked lead as 'Lost' but maintaining relationship for future opportunities."
      },
      {
        "id": 5,
        "date": "2025-10-20",
        "mode": "Phone Call",
        "location": "Remote",
        "status": "Revised", // CHANGED: Was "Negotiation" -> Now (Revise)
        "moms": "Client called back after our follow-up email. Informed that they received a competing quote 25% lower than ours. Asked if we could match competitor pricing. Client shared competitor quote details - similar products but with lower-grade materials. Explained our pricing includes premium materials, longer warranty, and better after-sales service. Client understands quality difference but budget is extremely tight. Attempted to negotiate - offered 10% discount (₹1,80,000) as best possible price. Client said they need to discuss with management and will revert within 2-3 days. Sensing client is leaning toward competitor due to price. Follow-up scheduled."
      },
      {
        "id": 4,
        "date": "2025-10-15",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "", // Keep as general Follow-up
        "moms": "Sent follow-up email checking on quotation status. No response received to previous calls and messages. Email highlighted key benefits: premium quality lobby desk with 5-year warranty, ergonomic lounge seating with stain-resistant fabric. Offered to discuss any concerns or provide alternative options within their budget. Also offered flexibility on delivery timeline. Mentioned willingness to schedule a site visit to better understand requirements. Requested response within 3 days. Marked as important follow-up."
      },
      {
        "id": 3,
        "date": "2025-09-11",
        "mode": "Phone Call",
        "location": "Remote",
        "status": "", // Keep as general Follow-up
        "moms": "Follow-up call on quotation sent 3 days ago. No answer - went to voicemail. Left detailed message requesting feedback on quotation Q-N25-003. Mentioned that we're open to discussing budget constraints and can explore alternative material options if needed. Requested callback to discuss any questions or concerns. Also sent follow-up SMS with callback number. No response received yet. Will attempt email follow-up in 3-4 days if no response."
      },
      {
        "id": 2,
        "date": "2025-09-08",
        "mode": "Email/Text",
        "location": "Email Communication",
        "status": "Quotation Sent", // Keep
        "moms": "Sent initial quotation Q-N25-003 for ₹2,00,000 for reception area furniture. Quote includes 1 premium lobby desk and 2 waiting lounge seating sets. Kept pricing competitive given client's tight budget mentioned during meeting. Highlighted cost-effective options while maintaining quality standards."
      },
      // LEAD-014: Rejected
{
  "leadId": "LEAD-014",
  "salespersonId": "SP-005",
  "salespersonName": "Vikas Mehta",
  "leadType": "client",
  "status": "converted",
  "customer": {
    "name": "Karan Malhotra",
    "email": "karan.m@innovatelabs.com",
    "mobile": "+91 9876543220",
    "companyName": "Innovate Labs",
    "address": "22, Connaught Place, New Delhi, Delhi"
  },
  "requirement": "Executive cabin furniture for CEO and CFO",
  "interactions": [
    {
      "id": 3,
      "date": "2025-09-25",
      "mode": "Email/Text",
      "location": "Email Communication",
      "status": "Rejected",
      "moms": "Client formally rejected our quotation, citing a competitor’s 20% lower price and faster 2-week delivery. Appreciated design but budget was fixed. Will keep engaged for future projects."
    },
    {
      "id": 2,
      "date": "2025-09-15",
      "mode": "Email/Text",
      "location": "Email Communication",
      "status": "Quotation Sent",
      "moms": "Sent initial quotation Q-N25-005 for ₹3,00,000 covering 2 executive desks and 4 chairs. Highlighted premium solid wood and 5-year warranty. Awaiting feedback."
    },
    {
      "id": 1,
      "date": "2025-09-12",
      "mode": "Initial Meeting",
      "location": "Client Office - Connaught Place",
      "status": "",
      "moms": "Met Karan Malhotra to discuss executive cabin setup. Budget: ₹3L. Prefers luxury minimalist style. Discussed wood types and chair ergonomics. Will send quote by 15th."
    }
  ]
},
// LEAD-015: Revised
{
  "leadId": "LEAD-015",
  "salespersonId": "SP-006",
  "salespersonName": "Anjali Bose",
  "leadType": "client",
  "status": "converted",
  "customer": {
    "name": "Meera Joshi",
    "email": "meera.j@greenworks.co",
    "mobile": "+91 9876543221",
    "companyName": "GreenWorks Co",
    "address": "8, Salt Lake City, Kolkata, West Bengal"
  },
  "requirement": "Sustainable workstations for 15 employees",
  "interactions": [
    {
      "id": 3,
      "date": "2025-10-05",
      "mode": "Email/Text",
      "location": "Email Communication",
      "status": "Revised",
      "moms": "Sent R1 revised quotation at ₹4,65,000 with recyclable steel frames and organic fabric chairs. Included eco-certification docs. Awaiting client approval."
    },
    {
      "id": 2,
      "date": "2025-09-22",
      "mode": "Phone Call",
      "location": "Remote",
      "status": "Revised",
      "moms": "Client requested more sustainable materials—specifically recyclable chair frames and non-toxic finishes. Agreed to revise quote with enhanced eco-specs. Will send R1 by 5th Oct."
    },
    {
      "id": 1,
      "date": "2025-09-18",
      "mode": "Initial Meeting",
      "location": "Virtual Demo",
      "status": "",
      "moms": "First virtual meeting with Meera Joshi. Company mandates 100% sustainable office setup. Budget ₹4.5L. Showed bamboo desks and recycled chairs. Will prepare initial quote."
    }
  ]
}
      // ... (Interaction 1 is unchanged)
    ]
  },
  
  // ===== LEAD: LEAD-004 (Suresh Iyer) - Not Interested =====
  // ... (Data is unchanged as the loss occurred immediately after initial contact and before a formal quote process started)
];

export const officeBranches = [
  "Select Office Branch",
  "Kolkata",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Nagpur",
  "Chennai",
  "Indore",
  "Bangalore",
  "Pune",
  "Ahmedabad"
];

export const Productchecklist = [
  "ceiling/facade",
  "roofing",
  "furnishing",
  "acoustics",
  "Modular furniture",
];


export const leads = [
  {
    "leadId": "LEAD-001",
    "projectName": "StartupHub Office Setup",
    "clientName": "Arjun Mehta",
    "contractor": "BuildRight Contractors",
    "department": "Commercial",
    "stage": "finalised",
    "architectName" :"Mehta Arjun",
    "Officebranch": "Kolkata",
    "producttype":"furnishing",
    "product": "Office Furniture Package",
    "checklist": {
      "ceiling": true,
      "roofing": false,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": true
    },
    "visitDate": "2025-10-15",
    "nextVisitDate": "2025-10-20",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Arjun Mehta",
      "email": "arjun.m@example.com",
      "mobile": "+91 9876543210",
      "address": "12A, Brigade Road",
      "city": "Bengaluru, Karnataka",
      "companyName": "StartupHub Pvt Ltd",
      "customerId": "NLF-CUST-001"
    },
    "requirement": "Office furniture for a new 50-person startup",
    "estimatedBudget": 1000000,
    "quotationId": "Q-N25-001",
    "notes": "Client is price-sensitive but values quality"
  },
  {
    "leadId": "LEAD-002",
    "projectName": "EcoSpace Sustainable Office",
    "clientName": "Rohan Kumar",
    "contractor": "GreenBuild Construction",
    "architectName" :"Kumar Rohan",
    "department": "Corporate",
    "stage": "submit",
    "Officebranch": "Delhi",
    "producttype":"furnishing",
    "product": "Eco-Friendly Furniture",
    "checklist": {
      "ceiling": false,
      "roofing": false,
      "furnishing": true,
      "acoustics": false,
      "modularFurniture": true
    },
    "visitDate": "2025-10-10",
    "nextVisitDate": "2025-10-15",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Rohan Kumar",
      "email": "rohan.kumar@example.com",
      "mobile": "+91 9871122334",
      "address": "10, HSR Layout",
      "city": "Bengaluru, Karnataka",
      "companyName": "EcoSpace Solutions",
      "customerId": "NLF-CUST-002"
    },
    "requirement": "Eco-friendly office setup with sustainable materials",
    "estimatedBudget": 600000,
    "quotationId": "Q-N25-002",
    "notes": "Very interested in bamboo and recycled materials"
  },
  {
    "leadId": "LEAD-003",
    "projectName": "TechVista Reception Upgrade",
    "clientName": "Priya Sharma",
    "contractor": "Premier Interiors",
    "architectName" :"Sharma Priya",
    "department": "Hospitality",
    "stage": "submit",
    "Officebranch": "Nagpur",
    "producttype":"furnishing",
    "product": "Reception Furniture",
    "checklist": {
      "ceiling": true,
      "roofing": false,
      "furnishing": true,
      "acoustics": false,
      "modularFurniture": false
    },
    "visitDate": "2025-10-05",
    "nextVisitDate": null,
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Priya Sharma",
      "email": "priya.sharma@example.com",
      "mobile": "+91 9823456780",
      "address": "14, Residency Road",
      "city": "Bengaluru, Karnataka",
      "companyName": "TechVista Innovations",
      "customerId": "NLF-CUST-007"
    },
    "requirement": "Reception area and waiting lounge furniture",
    "estimatedBudget": 200000,
    "quotationId": "Q-N25-003",
    "notes": "Tight budget - price sensitive. Lost to competitor."
  },
  {
    "leadId": "LEAD-004",
    "projectName": "BrightMind Conference Room",
    "clientName": "Suresh Iyer",
    "contractor": "Self-Managed",
    "department": "Corporate",
    "architectName" :"Iyer Suresh",
    "Officebranch": "Indore",
    "producttype":"furnishing",
    "stage": "submit",
    "product": "Conference Furniture",
    "checklist": {
      "ceiling": false,
      "roofing": false,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": false
    },
    "visitDate": "2025-11-01",
    "nextVisitDate": null,
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Suresh Iyer",
      "email": "suresh.i@example.com",
      "mobile": "+91 9876000001",
      "address": "20, Indiranagar",
      "city": "Bengaluru, Karnataka",
      "companyName": "BrightMind Consulting"
    },
    "requirement": "Conference room furniture",
    "estimatedBudget": 150000,
    "quotationId": null,
    "notes": "Client went with competitor due to faster delivery promise"
  },
  {
    "leadId": "LEAD-005",
    "projectName": "BuildTech Corporate Office",
    "clientName": "Kavita Reddy",
    "contractor": "BuildTech Constructions",
    "department": "Corporate",
    "architectName" :"Reddy Kavita",
    "stage": "civil",
    "product": "Complete Office Setup",
    "checklist": {
      "ceiling": true,
      "roofing": true,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": true
    },
    "visitDate": "2025-12-25",
    "nextVisitDate": "2025-10-30",
    "salespersonId": "SP-002",
    "salespersonName": "Priya Nair",
    "customer": {
      "name": "Kavita Reddy",
      "email": "kavita.r@buildtech.com",
      "mobile": "+91 9876000002",
      "address": "15, Whitefield",
      "city": "Bengaluru, Karnataka",
      "companyName": "BuildTech Constructions"
    },
    "requirement": "Furniture for corporate office - 3 floors",
    "estimatedBudget": 5000000,
    "quotationId": null,
    "notes": "Tender submission deadline: 2025-10-30. Requires detailed technical specs"
  },
  {
    "leadId": "LEAD-006",
    "projectName": "Creative Studios Workspace",
    "clientName": "Deepa Menon",
    "contractor": "Design & Build Co",
    "architectName" :"Menon Deepa",
    "department": "Creative",
    "stage": "civil",
    "product": "Creative Workspace Furniture",
    "checklist": {
      "ceiling": true,
      "roofing": false,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": true
    },
    "visitDate": "2025-08-20",
    "nextVisitDate": "2025-11-05",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Deepa Menon",
      "email": "deepa.m@example.com",
      "mobile": "+91 9876000004",
      "address": "12, Jayanagar",
      "city": "Bengaluru, Karnataka",
      "companyName": "Creative Studios"
    },
    "requirement": "Creative workspace furniture",
    "estimatedBudget": 300000,
    "quotationId": null,
    "notes": "Not responding to follow-ups since 3 weeks"
  },
  {
    "leadId": "LEAD-007",
    "projectName": "Government Office Tender",
    "clientName": "Rajesh Kumar",
    "contractor": "Government PWD",
    "department": "Government",
    "architectName" :"Kumar Rajesh",
    "stage": "submit",
    "product": "Government Office Furniture",
    "checklist": {
      "ceiling": false,
      "roofing": false,
      "furnishing": true,
      "acoustics": false,
      "modularFurniture": true
    },
    "visitDate": "2025-08-15",
    "nextVisitDate": null,
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Rajesh Kumar",
      "email": "rajesh.k@govproject.in",
      "mobile": "+91 9876000005",
      "address": "Government Complex",
      "city": "Bengaluru, Karnataka",
      "companyName": "Government Office"
    },
    "requirement": "Government office furniture tender",
    "estimatedBudget": 2000000,
    "quotationId": null,
    "notes": "Lost to L1 bidder - price difference was significant"
  },
  {
    "leadId": "LEAD-008",
    "projectName": "Hotel Lobby Renovation",
    "clientName": "Vikram Patel",
    "contractor": "Luxury Interiors",
    "department": "Hospitality",
    "architectName" :"Patel Vikram",
    "stage": "submit",
    "product": "Hotel Furniture",
    "checklist": {
      "ceiling": true,
      "roofing": false,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": false
    },
    "visitDate": "2025-08-05",
    "nextVisitDate": null,
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Vikram Patel",
      "email": "vikram.p@example.com",
      "mobile": "+91 9876000007",
      "address": "30, Brigade Road",
      "city": "Bengaluru, Karnataka",
      "companyName": "Hospitality Services"
    },
    "requirement": "Hotel lobby furniture",
    "estimatedBudget": 700000,
    "quotationId": null,
    "notes": "Budget constraints - project on hold indefinitely"
  },
  {
    "leadId": "LEAD-009",
    "projectName": "IT Solutions Office Setup",
    "clientName": "Sanjay Verma",
    "contractor": "Smart Build",
    "architectName" :"Verma Samay",
    "department": "IT",
    "stage": "submit",
    "product": "IT Office Furniture",
    "checklist": {
      "ceiling": false,
      "roofing": false,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": true
    },
    "visitDate": "2025-07-30",
    "nextVisitDate": "2025-10-25",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "customer": {
      "name": "Sanjay Verma",
      "email": "sanjay.v@example.com",
      "mobile": "+91 9876000008",
      "address": "18, Electronic City",
      "city": "Bengaluru, Karnataka",
      "companyName": "IT Solutions Ltd"
    },
    "requirement": "IT office setup - 40 workstations",
    "estimatedBudget": 1200000,
    "quotationId": null,
    "notes": "Waiting for final approval from management"
  },
  {
    "leadId": "LEAD-010",
    "projectName": "TechCorp Mumbai Office",
    "clientName": "TechCorp Solutions",
    "contractor": "Metro Builders",
    "department": "Corporate",
    "stage": "civil",
    "architectName" :"Mehta Arjun",
    "product": "Office Furniture Package",
    "checklist": {
      "ceiling": true,
      "roofing": true,
      "furnishing": true,
      "acoustics": false,
      "modularFurniture": true
    },
    "visitDate": "2025-09-01",
    "nextVisitDate": "2025-10-15",
    "salespersonId": "SP-002",
    "salespersonName": "Priya Nair",
    "customer": {
      "name": "TechCorp Solutions",
      "email": "info@techcorp.com",
      "mobile": "+91 9876543211",
      "address": "50, ITPL Main Road",
      "city": "Mumbai, Maharashtra",
      "companyName": "TechCorp Solutions"
    },
    "requirement": "Office furniture for 1000 sq ft space",
    "estimatedBudget": 1200000,
    "quotationId": null,
    "notes": "Tender deadline: 2025-10-15"
  },
  {
    "leadId": "LEAD-014",
    "projectName": "Innovate Labs Executive Setup",
    "clientName": "Karan Malhotra",
    "contractor": "Elite Interiors",
    "department": "Corporate",
    "stage": "submit",
    "product": "Executive Furniture",
    "checklist": {
      "ceiling": false,
      "roofing": false,
      "furnishing": true,
      "acoustics": false,
      "modularFurniture": false
    },
    "visitDate": "2025-09-12",
    "nextVisitDate": null,
    "salespersonId": "SP-005",
    "salespersonName": "Vikas Mehta",
    "customer": {
      "name": "Karan Malhotra",
      "email": "karan.m@innovatelabs.com",
      "mobile": "+91 9876543220",
      "address": "22, Connaught Place",
      "city": "New Delhi, Delhi",
      "companyName": "Innovate Labs",
      "customerId": "NLF-CUST-008"
    },
    "requirement": "Executive cabin furniture for CEO and CFO",
    "estimatedBudget": 300000,
    "quotationId": "Q-N25-005",
    "notes": "Client found competitor with 20% lower price and faster delivery"
  },
  {
    "leadId": "LEAD-015",
    "projectName": "GreenWorks Sustainable Setup",
    "clientName": "Meera Joshi",
    "contractor": "EcoBuild Solutions",
    "department": "Corporate",
    "stage": "submit",
    "product": "Sustainable Workstations",
    "checklist": {
      "ceiling": false,
      "roofing": false,
      "furnishing": true,
      "acoustics": true,
      "modularFurniture": true
    },
    "visitDate": "2025-09-18",
    "nextVisitDate": "2025-10-12",
    "salespersonId": "SP-006",
    "salespersonName": "Anjali Bose",
    "customer": {
      "name": "Meera Joshi",
      "email": "meera.j@greenworks.co",
      "mobile": "+91 9876543221",
      "address": "8, Salt Lake City",
      "city": "Kolkata, West Bengal",
      "companyName": "GreenWorks Co",
      "customerId": "NLF-CUST-009"
    },
    "requirement": "Sustainable workstations for 15 employees",
    "estimatedBudget": 465000,
    "quotationId": "Q-N25-006",
    "notes": "Requested more recyclable materials and eco-certifications"
  }
];

export const quotations = [
  {
    "quotationId": "Q-N25-001",
    "leadId": "LEAD-001",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul dev",
    "rateApprovalStatus": "approved",
    "rateApprovedBy": "admin",
    "officeBranch" :"Kolkata", 
    "rateApprovedDate": "2025-09-18",
    "customer": {
      "name": "Arjun Mehta",
      "email": "arjun.m@example.com",
      "mobile": "+91 9876543210",
      "address": "12A, Brigade Road",
      "city": "Bengaluru, Karnataka",
      "id": "NLF-CUST-001"
    },
    "rounds": [
      {
        "round": "",
        "status": "revise",
        "reason": "Price was too high for their budget.",
        "amount": 950000,
        "date": "2025-09-20",
        "details": "Office furniture for a new 50-person startup.",
        "items": [
          {
            "material": "Ply",
            "description": "Executive Desk",
            "unit": "nos",
            "quantity": 5,
            "rate": 20000
          },
          {
            "material": "Laminates",
            "description": "Ergonomic Chair",
            "unit": "nos",
            "quantity": 50,
            "rate": 5000
          },
          {
            "material": "Ply",
            "description": "Lounge Seating",
            "unit": "set",
            "quantity": 2,
            "rate": 25000
          }
        ],
        "additionalDetails": [
          {
            "description": "Delivery Charges",
            "unit": "job",
            "quantity": 1,
            "rate": 10000
          }
        ],
       
      },
      {
        "round": "R1",
        "status": "revise",
        "reason": "Agreed on revised amount with discount, minor chair model change requested",
        "amount": 880000,
        "date": "2025-09-25",
        "details": "Revised quotation with 7% discount",
        "items": [
          {
            "material": "Ply",
            "description": "Executive Desk",
            "unit": "nos",
            "quantity": 5,
            "rate": 19000
          },
          {
            "material": "Laminates",
            "description": "Ergonomic Chair (Revised Model)",
            "unit": "nos",
            "quantity": 50,
            "rate": 4800
          },
          {
            "material": "Laminates",
            "description": "Lounge Seating",
            "unit": "set",
            "quantity": 2,
            "rate": 24000
          }
        ],
        "additionalDetails": [
          {
            "material": "Ply",
            "description": "Delivery Charges",
            "unit": "job",
            "quantity": 1,
            "rate": 9500
          }
        ],
      
      },
      {
        "round": "R2",
        "status": "accepted",
        "reason": "Final agreement after chair model confirmed",
        "amount": 875000,
        "date": "2025-09-27",
        "details": "Final accepted quotation after three rounds",
        "approval": "admin-approved",
        "items": [
          {
            "material": "Ply",
            "description": "Executive Desk",
            "unit": "nos",
            "quantity": 5,
            "rate": 19000
          },
          {
            "material": "Laminates",
            "description": "Ergonomic Chair (Final Model)",
            "unit": "nos",
            "quantity": 50,
            "rate": 4750
          },
          {
            "material": "Ply",
            "description": "Lounge Seating",
            "unit": "set",
            "quantity": 2,
            "rate": 24000
          }
        ],
        "additionalDetails": [
          {
            "material": "Ply",
            "description": "Delivery Charges",
            "unit": "job",
            "quantity": 1,
            "rate": 9500
          }
        ],
      }
    ]
  },
  {
    "quotationId": "Q-N25-002",
    "leadId": "LEAD-002",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul dev",
    "officeBranch" :"Delhi", 
    "rateApprovalStatus": "approved",
    "rateApprovedBy": null,
    "rateApprovedDate": null,
    "customer": {
      "name": "Rohan Kumar",
      "email": "rohan.kumar@example.com",
      "mobile": "+91 9871122334",
      "address": "10, HSR Layout",
      "city": "Bengaluru, Karnataka",
      "id": "NLF-CUST-002"
    },
    "rounds": [
      {
        "round": "",
        "status": "revise",
        "reason": "Waiting for admin rate approval",
        "amount": 550000,
        "date": "2025-09-01",
        "details": "Eco-office setup, initial proposal",
        "items": [
          {
            "material": "Ply",
            "description": "Bamboo Desks",
            "unit": "nos",
            "quantity": 10,
            "rate": 30000
          },
          {
            "material": "Laminates",
            "description": "Recycled Plastic Chairs",
            "unit": "nos",
            "quantity": 20,
            "rate": 12500
          }
        ],
       
      },
      {
        "round": "R1",
        "status": "revise",
        "reason": "Revised with sustainable materials and better pricing",
        "amount": 510000,
        "date": "2025-09-25",
        "details": "Added bio-degradable waste disposal service",
        "items": [
          {
            "material": "Ply",
            "description": "Bamboo Desks (Revised)",
            "unit": "nos",
            "quantity": 10,
            "rate": 28000
          },
          {
            "material": "Ply",
            "description": "Eco-Chairs",
            "unit": "nos",
            "quantity": 20,
            "rate": 11500
          }
        ],
        "additionalDetails": [
          {
            "material": "Laminates",
            "description": "Bio-degradable waste disposal",
            "unit": "job",
            "quantity": 1,
            "rate": 20000
          }
        ],
      
      }
    ]
  },
  // {
  //   "quotationId": "Q-N25-003",
  //   "leadId": "LEAD-003",
  //   "salespersonId": "SP-001",
  //   "salespersonName": "Rahul dev",
  //   "rateApprovalStatus": "approved",
  //   "rateApprovedBy": "admin",
  //   "rateApprovedDate": "2025-09-07",
  //   "customer": {
  //     "name": "Priya Sharma",
  //     "email": "priya.sharma@example.com",
  //     "mobile": "+91 9823456780",
  //     "address": "14, Residency Road",
  //     "city": "Bengaluru, Karnataka",
  //     "id": "NLF-CUST-007"
  //   },
  //   "rounds": [
  //     {
  //       "round": "",
  //       "status": "rejected",
  //       "reason": "Client found competitor offering 25% lower price. Budget was primary concern and delivery timeline was faster with competitor.",
  //       "amount": 200000,
  //       "date": "2025-09-08",
  //       "details": "Reception area and waiting lounge furniture",
  //       "rejectedDate": "2025-09-23",
  //       "items": [
  //         {
  //           "material": "Ply",
  //           "description": "Lobby Desk",
  //           "unit": "nos",
  //           "quantity": 1,
  //           "rate": 80000
  //         },
  //         {
  //           "material": "Laminates",
  //           "description": "Waiting Lounge Seating",
  //           "unit": "set",
  //           "quantity": 2,
  //           "rate": 50000
  //         }
  //       ],
  //       "additionalDetails": [
  //         {
  //           "description": "Delivery & Installation",
  //           "unit": "job",
  //           "quantity": 1,
  //           "rate": 10000
  //         }
  //       ],
     
  //     }
  //   ]
  // },
   {
    "quotationId": "Q-N25-004",
    "leadId": "LEAD-002",
    "customerName": "Rohan Kumar",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul dev",
    "officeBranch" :"Nagpur", 
    "quotationDate": "2025-10-09",
    "quoteDetails": "Final revised quote incorporating bio-degradable waste disposal service and 7% discount.",
    "quoteAmount": 511500,
    "commercialTerms": "50% advance, 50% on delivery",
    "rateApprovalStatus": "pending",
    "items": [
      { "item": "Bamboo Desk (Sustainable)", "quantity": 10, "rate": 35000, "total": 350000 },
      { "item": "Recycled Plastic Chair", "quantity": 20, "rate": 7500, "total": 150000 },
      { "item": "Bio-degradable Waste Disposal Service (Annual)", "quantity": 1, "rate": 11500, "total": 11500 }
    ]
  },
//   {
//   "quotationId": "Q-N25-005",
//   "leadId": "LEAD-014",
//   "salespersonId": "SP-005",
//   "salespersonName": "Vikas Mehta",
//   "rateApprovalStatus": "approved",
//   "rateApprovedBy": "admin",
//   "rateApprovedDate": "2025-09-14",
//   "customer": {
//     "name": "Karan Malhotra",
//     "email": "karan.m@innovatelabs.com",
//     "mobile": "+91 9876543220",
//     "address": "22, Connaught Place",
//     "city": "New Delhi, Delhi",
//     "id": "NLF-CUST-008"
//   },
//   "rounds": [
//     {
//       "round": "",
//       "status": "rejected",
//       "reason": "Client found a local vendor offering same quality at 20% lower cost with 2-week delivery.",
//       "amount": 300000,
//       "date": "2025-09-15",
//       "details": "Executive cabin furniture: 2 premium desks, 4 ergonomic chairs",
//       "rejectedDate": "2025-09-25",
//       "items": [
//         { "material": "Solid Wood", "description": "CEO Desk", "unit": "nos", "quantity": 1, "rate": 120000 },
//         { "material": "Solid Wood", "description": "CFO Desk", "unit": "nos", "quantity": 1, "rate": 100000 },
//         { "material": "Laminates", "description": "Ergonomic Chair", "unit": "nos", "quantity": 4, "rate": 20000 }
//       ],
//       "additionalDetails": [
//         { "description": "Installation & Delivery", "unit": "job", "quantity": 1, "rate": 20000 }
//       ],
    
//     }
//   ]
// },
{
  "quotationId": "Q-N25-006",
  "leadId": "LEAD-015",
  "salespersonId": "SP-006",
  "salespersonName": "Anjali Bose",
  "officeBranch": "Indore", 
  "rateApprovalStatus": "approved",
  "rateApprovedBy": "admin",
  "rateApprovedDate": "2025-09-20",
  "customer": {
    "name": "Meera Joshi",
    "email": "meera.j@greenworks.co",
    "mobile": "+91 9876543221",
    "address": "8, Salt Lake City",
    "city": "Kolkata, West Bengal",
    "id": "NLF-CUST-009"
  },
  "rounds": [
    {
      "round": "",
      "status": "revise",
      "reason": "Client requested switch to fully recyclable chair frames and lower VOC finishes.",
      "amount": 450000,
      "date": "2025-09-22",
      "details": "Initial eco-workstation proposal",
      "items": [
        { "material": "Bamboo", "description": "Workstation Desk", "unit": "nos", "quantity": 15, "rate": 22000 },
        { "material": "Recycled Plastic", "description": "Office Chair", "unit": "nos", "quantity": 15, "rate": 8000 }
      ],
   
    },
    {
      "round": "R1",
      "status": "revise",
      "reason": "Incorporated recyclable metal frames and low-VOC coating; awaiting client confirmation",
      "amount": 465000,
      "date": "2025-10-05",
      "details": "Revised with enhanced sustainability specs",
      "items": [
        { "material": "Bamboo + Recycled Steel", "description": "Eco Workstation", "unit": "nos", "quantity": 15, "rate": 24000 },
        { "material": "Recycled Steel + Organic Fabric", "description": "Green Chair", "unit": "nos", "quantity": 15, "rate": 9000 }
      ],
      "additionalDetails": [
        { "description": "Eco-certification Documentation", "unit": "job", "quantity": 1, "rate": 15000 }
      ],
    }
  ]
}
  
];


export const clients = [
  {
    "id": "NLF-CUST-001",
    "name": "Arjun Mehta",
    "email": "arjun.m@example.com",
    "mobile": "+91 9876543210",
    "address": "12A, Brigade Road",
    "city": "Bengaluru, Karnataka",
    "companyName": "StartupHub Pvt Ltd",
    "leadId": "LEAD-001",
    "salespersonId": "SP-001",
    "dateAdded": "2025-09-15",
    "rateApprovalStatus": "approved"
  },
  {
    "id": "NLF-CUST-002",
    "name": "Rohan Kumar",
    "email": "rohan.kumar@example.com",
    "mobile": "+91 9871122334",
    "address": "10, HSR Layout",
    "city": "Bengaluru, Karnataka",
    "companyName": "EcoSpace Solutions",
    "leadId": "LEAD-002",
    "salespersonId": "SP-001",
    "dateAdded": "2025-09-10",
    "rateApprovalStatus": "pending"
  },
  {
    "id": "NLF-CUST-007",
    "name": "Priya Sharma",
    "email": "priya.sharma@example.com",
    "mobile": "+91 9823456780",
    "address": "14, Residency Road",
    "city": "Bengaluru, Karnataka",
    "companyName": "TechVista Innovations",
    "leadId": "LEAD-003",
    "salespersonId": "SP-001",
    "dateAdded": "2025-09-05",
    "rateApprovalStatus": "approved"
  },
  {
  "id": "NLF-CUST-008",
  "name": "Karan Malhotra",
  "email": "karan.m@innovatelabs.com",
  "mobile": "+91 9876543220",
  "address": "22, Connaught Place",
  "city": "New Delhi, Delhi",
  "companyName": "Innovate Labs",
  "leadId": "LEAD-014",
  "salespersonId": "SP-005",
  "dateAdded": "2025-09-12",
  "rateApprovalStatus": "approved"
},
{
  "id": "NLF-CUST-009",
  "name": "Meera Joshi",
  "email": "meera.j@greenworks.co",
  "mobile": "+91 9876543221",
  "address": "8, Salt Lake City",
  "city": "Kolkata, West Bengal",
  "companyName": "GreenWorks Co",
  "leadId": "LEAD-015",
  "salespersonId": "SP-006",
  "dateAdded": "2025-09-18",
  "rateApprovalStatus": "approved"
}
];


export const tenders = [
  {
    "tenderId": "TND-2025-001",
    "companyName": "TechCorp Solutions",
    "contactPerson": "Ravi Shastri",
    "email": "ravi.s@techcorpsolutions.com",
    "mobile": "+91 9876543211",
    "address": "50, ITPL Main Road, Whitefield",
    "city": "Bengaluru, Karnataka",
    "details": "Procurement of office furniture for new 1000 sq ft office",
    "submissionDeadline": "2025-10-15",
    "status": "open",
    "budget": 1200000,
    "tenderFee": 1500,
    "emd": 25000
  }
];

export const po = [
  {
    "poId": "PO-CLI-N25-001",
    "quotationId": "Q-N25-001",
    "quotationRound": "R2",
    "leadId": "LEAD-001",
    "leadType": "client",
    
    // ===== CLIENT DETAILS =====
    "clientName": "Arjun Mehta",
    "contactPerson": "Arjun Mehta",
    "contactPersonMobile": "+91 9876543210",
    "contactPersonEmail": "arjun.m@example.com",
    "companyName": "StartupHub Pvt Ltd",
    "siteAddress": "12A, Brigade Road, Bengaluru, Karnataka 560001",
    "billingAddress": "12A, Brigade Road, Bengaluru, Karnataka 560001",
    "gstNumber": "29AABCU9603R1ZX",
    "panNumber": "AABCU9603R",
    "customerId": "NLF-CUST-001",
    
    // ===== PO DETAILS =====
    "poNumber": "PO-N25-001",
    "poDate": "2025-09-28",
    "projectName": "StartupHub Office Setup",
    "department": "Commercial",
    
    // ===== TIMELINE =====
    "expectedDeliveryDate": "2025-10-15",
    "actualDeliveryDate": null,
    "completionDate": null, // Date when entire order is completed including installation
    
    // ===== FINANCIAL DETAILS =====
    "quotedAmount": 875000,
    "totalAmount": 875000,
    "advancePaymentPercentage": 95,
    "advancePaymentAmount": 831250,
    "balancePaymentPercentage": 5,
    "balancePaymentAmount": 43750,
    "advancePaymentReceived": true,
    "advancePaymentReceivedDate": "2025-09-29",
    "advancePaymentMode": "Bank Transfer",
    "advanceTransactionRef": "TXN-2025-09-29-001",
    "balancePaymentReceived": false,
    "balancePaymentDate": null,
    "balancePaymentMode": null,
    "gstApplicable": true,
    "gstPercentage": 18,
    "gstAmount": 157500,
    "tdsApplicable": false,
    "tdsAmount": 0,
    "totalInvoiceAmount": 875000,
    "currency": "INR",
    
    // ===== ITEMS =====
    "items": [
      {
        "itemId": "ITEM-001",
        "material": "Ply",
        "description": "Executive Desk",
        "unit": "nos",
        "quantity": 5,
        "rate": 19000,
        "total": 95000,
        "specifications": {
          "dimensions": "1800mm x 900mm x 750mm",
          "material": "18mm commercial ply with laminate",
          "finish": "Matte walnut laminate",
          "features": "Cable management, modesty panel, lockable drawer"
        },
        "deliveryStatus": "pending" // pending/partial/delivered
      },
      {
        "itemId": "ITEM-002",
        "material": "Laminates",
        "description": "Ergonomic Chair (Final Model)",
        "unit": "nos",
        "quantity": 50,
        "rate": 4750,
        "total": 237500,
        "specifications": {
          "model": "EC-PRO-2024",
          "material": "Mesh back, foam cushion seat",
          "adjustments": "Height, armrest, lumbar support",
          "loadCapacity": "120 kg",
          "warranty": "3 years"
        },
        "deliveryStatus": "pending"
      },
      {
        "itemId": "ITEM-003",
        "material": "Ply",
        "description": "Lounge Seating",
        "unit": "set",
        "quantity": 2,
        "rate": 24000,
        "total": 48000,
        "specifications": {
          "configuration": "3-seater sofa set",
          "material": "Hardwood frame, high-density foam",
          "upholstery": "Premium navy fabric, stain-resistant",
          "dimensions": "2100mm x 850mm x 800mm"
        },
        "deliveryStatus": "pending"
      },
      {
        "itemId": "ITEM-004",
        "material": "Service",
        "description": "Delivery Charges",
        "unit": "job",
        "quantity": 1,
        "rate": 9500,
        "total": 9500,
        "specifications": {
          "deliveryScope": "Transportation and unloading at site"
        },
        "deliveryStatus": "pending"
      }
    ],
    
    // ===== TERMS AND CONDITIONS =====
    "termsAndConditions": {
      
      // Payment Terms
      "paymentTerms": {
        "description": "95% advance, 5% on delivery",
        "advancePercentage": 95,
        "balancePercentage": 5,
        "paymentDueDate": "2025-09-29",
        "balanceDueDate": "Within 7 days of completion and acceptance",
        "paymentMethods": ["Bank Transfer", "Cheque", "Online Transfer"],
        "bankDetails": {
          "bankName": "HDFC Bank",
          "accountNumber": "XXXXXXXXX",
          "ifscCode": "HDFC0001234",
          "accountHolderName": "NLF Solutions Pvt Ltd"
        },
        "delayPenalty": "Interest @ 1.5% per month on delayed payments"
      },
      
      // Delivery Schedule
      "deliverySchedule": {
        "expectedDeliveryDate": "2025-10-15",
        "deliveryLocation": "12A, Brigade Road, Bengaluru, Karnataka 560001",
        "deliveryTimeSlot": "09:00 AM - 05:00 PM (Weekdays)",
        "deliveryTerms": "FOB (Free On Board) - Seller arranges transportation",
        "freightCharges": "Included in quoted amount",
        "packingCharges": "Included in quoted amount",
        "deliveryNotes": "Goods to be delivered in good condition within the specified dates. Any delay will attract liquidated damages as per terms below.",
        "advanceNotification": "Client must be notified 48 hours before delivery",
        "receivingInstructions": "Goods must be received and inspected immediately upon delivery. Any damage must be reported within 24 hours."
      },
      
      // Liquidated Damages
      "liquidatedDamages": {
        "applicable": true,
        "description": "Penalty for delayed delivery",
        "ratePerWeek": 0.5, // 0.5% per week
        "calculationBasis": "Weekly delay from agreed delivery date (2025-10-15)",
        "maxCapPercentage": 10, // Maximum 10% of contract value
        "maxCapAmount": 87500, // 10% of ₹875,000
        "example": "If delivery delayed by 2 weeks: 0.5% × 2 = 1% of ₹875,000 = ₹8,750",
        "applicableFrom": "2025-10-16", // Next day after agreed delivery date
        "claimProcess": "Written claim to be submitted within 7 days of completion of delivery period",
        "deductionMethod": "Deducted from final invoice or recovery from security deposit if applicable",
        "exemptions": [
          "Force majeure events (natural disasters, government action, war, pandemic)",
          "Delays caused by client (e.g., site not ready, access issues)",
          "Delays due to third-party suppliers",
          "Government-mandated lockdowns or restrictions"
        ]
      },
      
      // Defect Liability Period
      "defectLiabilityPeriod": {
        "duration": "12 months",
        "startDate": "2025-10-15", // From delivery date
        "endDate": "2026-10-15",
        "description": "Period during which seller is liable for manufacturing and workmanship defects",
        "coverageScope": [
          "Manufacturing defects",
          "Material quality issues",
          "Workmanship defects",
          "Structural defects",
          "Joint failures",
          "Finish issues (scratches, peeling, discoloration)"
        ],
        "claimProcess": {
          "notificationPeriod": "Within 7 days of defect discovery",
          "notificationMethod": "Written notice (email/letter) with photographic evidence",
          "inspectionPeriod": "Inspection to be conducted within 14 days of claim submission",
          "approvalPeriod": "Decision on claim within 7 days of inspection",
          "totalResolutionTime": "Within 30 days of claim submission"
        },
        "remedyType": [
          "Repair at seller's cost",
          "Replacement at seller's cost",
          "Refund (in case of irreparable defect)"
        ],
        "exclusions": [
          "Defects due to mishandling or improper usage",
          "Defects due to improper maintenance or cleaning",
          "Defects due to unauthorized modifications or repairs",
          "Normal wear and tear",
          "Damage from external factors (moisture, extreme temperature, chemicals)",
          "Defects due to third-party interference",
          "Defects discovered after 12-month period"
        ],
        "maintenanceObligation": "Client must maintain the items as per provided care instructions",
        "warrantyItems": {
          "chairs": {
            "structural": "12 months",
            "upholstery": "6 months",
            "mechanisms": "12 months"
          },
          "desks": {
            "structural": "12 months",
            "finish": "6 months",
            "joints": "12 months"
          },
          "lounge": {
            "frame": "12 months",
            "upholstery": "6 months",
            "springs": "12 months"
          }
        }
      },
      
      // Warranty (separate from Defect Liability Period)
      "warranty": {
        "period": "3 years from delivery date for structural defects",
        "coverageScope": "Manufacturing defects and material quality issues",
        "limitations": "Excludes normal wear and tear, improper use, and unauthorized modifications"
      },
      
      // Quality & Inspection
      "qualityAndInspection": {
        "factoryInspection": "All items subject to 100% quality inspection at factory before dispatch",
        "onSiteInspection": "Final inspection at client location after delivery and installation",
        "inspectionAuthority": "Authorized representative from NLF Solutions or third-party inspector",
        "acceptanceCriteria": "Items must comply with specifications and drawings provided",
        "rejectionRights": "Client has right to reject items not meeting quality standards within 48 hours of delivery",
        "defectiveItemReplacement": "Defective items to be replaced free of cost within 7 days of rejection"
      },
      
      // Installation & Commissioning
      "installationAndCommissioning": {
        "installationIncluded": true,
        "installationScope": "Delivery, assembly, and installation of all items",
        "installationSchedule": "As per mutually agreed schedule after advance payment receipt",
        "installationDuration": "2 days (approximately)",
        "clientResponsibilities": "Provide clear workspace, ensure site safety, arrange power points as specified",
        "postInstallationSupport": "7 days on-site support for any assembly-related issues"
      },
      
      // General Terms
      "generalTerms": {
        "orderAcceptance": "This PO constitutes a binding contract between NLF Solutions and Client",
        "modifications": "Any modifications to items or specifications require written approval from both parties",
        "cancellation": "Order can be cancelled only with written consent and penalty as per agreement",
        "forceMajeure": "Neither party liable for non-performance due to unforeseen circumstances",
        "disputes": "Disputes to be resolved through mutual negotiation or arbitration under Indian Arbitration Act",
        "jurisdiction": "Jurisdiction: Bengaluru, Karnataka",
        "governingLaw": "This agreement is governed by laws of India",
        "paymentOnCompletion": "Final 5% balance due within 7 days of completion and client acceptance",
        "escalationClause": "Material costs subject to ±5% variation based on market rates if delivery extends beyond 6 months"
      }
    },
    
    // ===== SPECIFICATIONS =====
    "specifications": {
      "general": "Modern minimalist design with ergonomic features",
      "deskFinish": "Matte laminate finish with cable management",
      "chairSpecs": "Lumbar support, adjustable height, breathable mesh back",
      "loungeSpecs": "Premium fabric upholstery, modular configuration",
      "colorScheme": "Walnut brown desks, charcoal grey chairs, navy blue lounge",
      "customRequirements": "Logo engraving on executive desks",
      "drawingsReference": "As per approved drawings attached with quotation Q-N25-001 R2"
    },
    
    // ===== SITE CONDITIONS =====
    "siteConditions": {
      "siteReadiness": "Site ready for delivery",
      "accessConditions": "Ground floor access, freight elevator available",
      "installationSpace": "Adequate space for assembly (minimum 500 sq ft clear area required)",
      "specialRequirements": "Installation during non-working hours preferred",
      "clientPreparation": "Client to provide power points and lighting before installation",
      "safetyRequirements": "Client to ensure site safety and arrange for safety equipment as per OSHA standards"
    },
    
    // ===== SALESPERSON & APPROVAL DETAILS =====
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",
    "salespersonEmail": "rahul.d@nlfsolutions.com",
    "salespersonMobile": "+91 9876543210",
    "approvalStatus": "approved",
    "approvedBy": "admin",
    "approvedDate": "2025-09-28",
    "approvalRemarks": "Quotation accepted by client, PO generated for execution",
    
    // ===== STATUS TRACKING =====
    "poStatus": "initiated", // initiated/approved/in-production/ready-for-delivery/delivered/completed
    "priority": "high",
    "notes": "Client confirmed 95% advance payment. Expecting delivery by mid-October.",
    
    // ===== METADATA =====
    "createdBy": "admin",
    "createdDate": "2025-09-28",
    "createdTime": "2025-09-28T10:30:00Z",
    "lastUpdated": "2025-09-28",
    "lastUpdatedBy": "admin",
    "attachments": [
      {
        "documentName": "Technical Drawings - Q-N25-001-R2.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-27"
      },
      {
        "documentName": "Specifications - Office Furniture.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-27"
      },
      {
        "documentName": "GST Invoice - Q-N25-001-R2.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-28"
      }
    ]
  }
  
];


export const workOrders = [
  {
    "workOrderId": "WO-N25-001",
    "quotationId": "Q-N25-001",
    "leadId": "LEAD-001",
    "poNumber": "PO-N25-001",
    "customerId": "NLF-CUST-001",
    "customerName": "Arjun Mehta",
    "architect": "pushkar paunikar",
    "companyName": "StartupHub Pvt Ltd",
    "projectName": "StartupHub Office Setup",
    "salespersonId": "SP-001",
    "salespersonName": "Rahul Dev",

    // NEW FIELDS - Contact & Site Details
    "contactPerson": "Arjun Mehta",
    "siteAddress": "12A, Brigade Road, Bengaluru, Karnataka 560001",

    // Work Order Details
    "woDate": "2025-09-28",
    "totalAmount": 875000,
    "advancePayment": 831250,
    "advanceReceived": true,
    "advanceReceivedDate": "2025-09-29",
    "balanceAmount": 43750,

    // NEW FIELDS - Timeline
    "expectedDeliveryDate": "2025-10-15",
    "actualDeliveryDate": null,
    "completionDate": null, // NEW FIELD

    "specification": {
      "general": "Modern minimalist design with ergonomic features",
      "deskFinish": "Matte laminate finish with cable management",
      "chairSpecs": "Lumbar support, adjustable height, breathable mesh back",
      "loungeSpecs": "Premium fabric upholstery, modular configuration",
      "colorScheme": "Walnut brown desks, charcoal grey chairs, navy blue lounge",
      "customRequirements": "Logo engraving on executive desks"
    },

    "condition": {
      "siteReadiness": "Site ready for delivery",
      "accessConditions": "Ground floor access, freight elevator available",
      "installationSpace": "Adequate space for assembly",
      "specialRequirements": "Installation during non-working hours preferred",
      "clientPreparation": "Client to provide power points and lighting before installation"
    },

    "payment": {
      "terms": "95% advance, 5% on delivery",
      "advanceAmount": 831250,
      "advancePaid": true,
      "advancePaymentDate": "2025-09-29",
      "advancePaymentMode": "Bank Transfer",
      "advanceTransactionRef": "TXN-2025-09-29-001",
      "balanceAmount": 43750,
      "balancePaid": false,
      "balancePaymentDate": null,
      "balancePaymentMode": null,
      "gstApplicable": true,
      "gstAmount": 157500,
      "tdsDeducted": false,
      "tdsAmount": 0,
      "totalInvoiceAmount": 875000
    },

    // UPDATED & NEW FIELDS - Terms & Conditions
    "termsAndConditions": {
      "paymentTerms": "95% advance, 5% on delivery",
      "deliverySchedule": {
        "expectedDeliveryDate": "2025-10-15",
        "deliveryLocation": "12A, Brigade Road, Bengaluru, Karnataka 560001",
        "deliveryTimeSlot": "09:00 AM - 05:00 PM",
        "deliveryNotes": "Goods to be delivered in good condition within the specified dates. Any delay will attract liquidated damages."
      },
      "liquidatedDamages": {
        "applicable": true,
        "percentage": 0.5, // 0.5% per week of delay
        "maxCap": 10, // Max 10% of contract value
        "calculationBasis": "Weekly delay from agreed delivery date",
        "example": "0.5% per week on contract value of ₹875,000 capped at 10%"
      },
      "defectLiabilityPeriod": {
        "duration": "12 months", // NEW FIELD
        "startDate": "2025-10-15", // From delivery date
        "endDate": "2026-10-15",
        "coverageScope": "Manufacturing defects, material quality issues, workmanship defects",
        "claimProcess": "Written notice to be submitted within 7 days of defect discovery",
        "remedyType": "Repair or replacement at vendor's cost",
        "conditions": "Defects due to mishandling, improper maintenance or unauthorized modifications are excluded"
      },
      "warranty": "3 years from delivery date for structural defects",
      "inspectionClause": "All materials subject to inspection at factory before dispatch and on-site after delivery",
      "paymentOnCompletion": "Final 5% balance due within 7 days of completion and acceptance"
    },

    "scrapHolding": {
      "applicable": true,
      "estimatedScrapQuantity": "50 kg",
      "scrapType": "Wood offcuts, laminate trimmings",
      "scrapValue": 2500,
      "scrapDisposalMethod": "Recycle",
      "scrapCollectionDate": null,
      "scrapNotes": "Wood offcuts to be segregated for recycling partner"
    },

    "machine": {
      "required": true,
      "cncRequired": true,
      "cncHours": 40,
      "edgeBandingRequired": true,
      "edgeBandingHours": 15,
      "drillingRequired": true,
      "drillingHours": 10,
      "polishingRequired": true,
      "polishingHours": 20,
      "otherMachinery": ["Panel Saw", "Lamination Press"],
      "totalMachineHours": 85,
      "machineScheduled": false,
      "machineScheduleDate": null,
      "machineNotes": "CNC priority needed for executive desk carvings"
    },

    "light": {
      "workshopLightingRequired": true,
      "installationLightingRequired": false,
      "qualityCheckLighting": "Daylight simulation required for finish inspection",
      "siteHasAdequateLighting": true,
      "lightingNotes": "Client site has LED lighting, no additional requirement"
    },

    "power": {
      "workshopPowerRequired": true,
      "estimatedPowerConsumption": "350 kWh",
      "heavyMachineryPower": true,
      "sitePowerAvailable": true,
      "sitePowerType": "Single Phase",
      "powerPointsRequired": 8,
      "generatorBackup": false,
      "powerNotes": "Client has adequate power supply for installation tools"
    },

    "client": {
      "primaryContact": "Arjun Mehta",
      "primaryContactMobile": "+91 9876543210",
      "primaryContactEmail": "arjun.m@example.com",
      "siteContactPerson": "Arjun Mehta",
      "siteContactMobile": "+91 9876543210",
      "siteAddress": "12A, Brigade Road, Bengaluru, Karnataka 560001",
      "billingAddress": "12A, Brigade Road, Bengaluru, Karnataka 560001",
      "gstNumber": "29AABCU9603R1ZX",
      "panNumber": "AABCU9603R",
      "preferredCommunicationMode": "Email",
      "preferredVisitTime": "10 AM - 5 PM on weekdays",
      "accessInstructions": "Security clearance required, contact 30 mins before arrival",
      "clientExpectations": "High quality finish, timely delivery, professional installation",
      "specialClientRequirements": "Minimal disruption during installation, complete in 2 days"
    },

    "departmentStatus": {
      "design": {
        "status": "pending",
        "assignedDate": "2025-09-28",
        "startedDate": null,
        "completedDate": null,
        "assignedTo": null,
        "remarks": ""
      },
      "store": {
        "status": "pending",
        "assignedDate": "2025-09-28",
        "startedDate": null,
        "completedDate": null,
        "assignedTo": null,
        "remarks": ""
      },
      "planning": {
        "status": "pending",
        "assignedDate": "2025-09-28",
        "startedDate": null,
        "completedDate": null,
        "assignedTo": null,
        "remarks": ""
      },
      "accounts": {
        "status": "pending",
        "assignedDate": "2025-09-28",
        "startedDate": null,
        "completedDate": null,
        "assignedTo": null,
        "remarks": ""
      }
    },

    "items": [
      {
        "material": "Ply",
        "description": "Executive Desk",
        "unit": "nos",
        "quantity": 5,
        "rate": 19000,
        "total": 95000,
        "productionStatus": "pending",
        "specifications": {
          "dimensions": "1800mm x 900mm x 750mm",
          "material": "18mm commercial ply with laminate",
          "finish": "Matte walnut laminate",
          "features": "Cable management, modesty panel, lockable drawer"
        }
      },
      {
        "material": "Laminates",
        "description": "Ergonomic Chair (Final Model)",
        "unit": "nos",
        "quantity": 50,
        "rate": 4750,
        "total": 237500,
        "productionStatus": "pending",
        "specifications": {
          "model": "EC-PRO-2024",
          "material": "Mesh back, foam cushion seat",
          "adjustments": "Height, armrest, lumbar support",
          "loadCapacity": "120 kg",
          "warranty": "3 years"
        }
      },
      {
        "material": "Ply",
        "description": "Lounge Seating",
        "unit": "set",
        "quantity": 2,
        "rate": 24000,
        "total": 48000,
        "productionStatus": "pending",
        "specifications": {
          "configuration": "3-seater sofa set",
          "material": "Hardwood frame, high-density foam",
          "upholstery": "Premium navy fabric, stain-resistant",
          "dimensions": "2100mm x 850mm x 800mm"
        }
      }
    ],

    "additionalDetails": [
      {
        "material": "Ply",
        "description": "Delivery Charges",
        "unit": "job",
        "quantity": 1,
        "rate": 9500,
        "total": 9500
      }
    ],

    "installationRequired": true,
    "installationDate": null,
    "overallStatus": "initiated",
    "priority": "high",
    "notes": "Client confirmed 95% advance payment. Expecting delivery by mid-October.",

    "createdBy": "admin",
    "createdDate": "2025-09-28",
    "lastUpdated": "2025-09-28"
  }
];

// Godown Inventory Stock
export const godownInventory = [
  {
    "stockId": "S-PLY-001",
    "description": "Standard 18mm Commercial Ply Sheets",
    "unit": "sheets",
    "currentStock": 150,
    "minStockLevel": 50,
    "usedByWO": []
  },
  {
    "stockId": "S-CHR-001",
    "description": "Ergonomic Chair (Final Model) - Ready Units",
    "unit": "nos",
    "currentStock": 10, // We have 10 finished chairs ready to be used
    "minStockLevel": 5,
    "usedByWO": []
  },
  {
    "stockId": "S-SOFA-001",
    "description": "Standard 3-Seater Sofa Frame (Assembly Required)",
    "unit": "frames",
    "currentStock": 0,
    "minStockLevel": 0,
    "usedByWO": []
  }
];



export const dispatch = [
  {
    "dispatchId": "DISP-2025-001",
    "deliveryNumber": "DN-2025-001",
    "dispatchDate": "2025-10-02",
    "deliveryMethod": "Road",
    "poId": "PO-N25-847",
    "vendorName": "Premium Ply Industries",
    "vendorGST": "29AABCU9603R1ZX",
    "vendorAddress": "Plot 45, Industrial Estate, Yeshwanthpur, Bengaluru, Karnataka 560022",
    "estimatedDeliveryDate": "2025-10-09",
    "driverId": "DRV-2025-042",
    "driverName": "Rajesh Kumar",
    "driverMobile": "+91 9876543298",
    "vehicleNumber": "KA-01-AB-1234",
    "items": [
      {
        "srNo": 1,
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "poQty": 150,
        "dispatchedQty": 150,
        "rate": 650,
        "amount": 97500,
        "status": "Dispatched"
      },
      {
        "srNo": 2,
        "material": "Laminates",
        "description": "Walnut Matte Laminate Roll",
        "unit": "roll",
        "poQty": 25,
        "dispatchedQty": 25,
        "rate": 4200,
        "amount": 105000,
        "status": "Dispatched"
      }
    ],
    "totalItems": 2,
    "totalQuantity": 175,
    "totalAmount": 202500,
    "gst": 36450,
    "grandTotal": 238950,
    "dispatchNotes": "Payment: 50% advance, 50% on delivery. Delivery within 7 days. Quality inspection mandatory.",
    "trackingUrl": "https://tracking.nlfsolutions.com/DN-2025-001",
    "dispatchStatus": "dispatched", // dispatched/in-transit/delivered/cancelled
    "actualDeliveryDate": null,
    "createdBy": "admin",
    "createdDate": "2025-10-02",
    "lastUpdated": "2025-10-02"
  },
  {
    "dispatchId": "DISP-2025-002",
    "deliveryNumber": "DN-2025-002",
    "dispatchDate": "2025-09-30",
    "deliveryMethod": "Road",
    "poId": "PO-N25-512",
    "vendorName": "Ergonomic Solutions Ltd",
    "vendorGST": "29AABDE1234R1ZA",
    "vendorAddress": "Unit 12, Tech Park, Whitefield, Bengaluru, Karnataka 560066",
    "estimatedDeliveryDate": "2025-10-07",
    "driverId": "DRV-2025-038",
    "driverName": "Vikram Singh",
    "driverMobile": "+91 9876543299",
    "vehicleNumber": "KA-01-CD-5678",
    "items": [
      {
        "srNo": 1,
        "material": "Hardware",
        "description": "Ergonomic Chair Frame (EC-PRO-2024)",
        "unit": "nos",
        "poQty": 50,
        "dispatchedQty": 50,
        "rate": 3200,
        "amount": 160000,
        "status": "Dispatched"
      },
      {
        "srNo": 2,
        "material": "Adhesives",
        "description": "High-Grade Mesh Fabric (Charcoal Grey)",
        "unit": "meters",
        "poQty": 120,
        "dispatchedQty": 120,
        "rate": 850,
        "amount": 102000,
        "status": "Dispatched"
      }
    ],
    "totalItems": 2,
    "totalQuantity": 170,
    "totalAmount": 262000,
    "gst": 47160,
    "grandTotal": 309160,
    "dispatchNotes": "Payment: Net 15 days from invoice. Delivery in 2 batches. Free replacement for defective units within 30 days.",
    "trackingUrl": "https://tracking.nlfsolutions.com/DN-2025-002",
    "dispatchStatus": "in-transit",
    "actualDeliveryDate": null,
    "createdBy": "admin",
    "createdDate": "2025-09-30",
    "lastUpdated": "2025-10-01"
  },
  {
    "dispatchId": "DISP-2025-003",
    "deliveryNumber": "DN-2025-003",
    "dispatchDate": "2025-10-05",
    "deliveryMethod": "Rail",
    "poId": "PO-N25-634",
    "vendorName": "Eco Materials & Trading Co",
    "vendorGST": "29AABFG5678R1ZB",
    "vendorAddress": "16-A, Green Avenue, Bangalore Industrial Park, Bengaluru, Karnataka 560029",
    "estimatedDeliveryDate": "2025-10-12",
    "driverId": null,
    "driverName": null,
    "driverMobile": null,
    "vehicleNumber": "RAIL-TRAIN-2025-KA",
    "items": [
      {
        "srNo": 1,
        "material": "Glass",
        "description": "Recycled Plastic Pellets (Food Grade)",
        "unit": "kg",
        "poQty": 500,
        "dispatchedQty": 500,
        "rate": 120,
        "amount": 60000,
        "status": "Dispatched"
      },
      {
        "srNo": 2,
        "material": "Hardware",
        "description": "FSC Certified Bamboo Strips",
        "unit": "bundles",
        "poQty": 30,
        "dispatchedQty": 30,
        "rate": 1800,
        "amount": 54000,
        "status": "Dispatched"
      },
      {
        "srNo": 3,
        "material": "Adhesives",
        "description": "Eco-Friendly Wood Finishing Solution",
        "unit": "liters",
        "poQty": 20,
        "dispatchedQty": 20,
        "rate": 2500,
        "amount": 50000,
        "status": "Dispatched"
      }
    ],
    "totalItems": 3,
    "totalQuantity": 550,
    "totalAmount": 164000,
    "gst": 29520,
    "grandTotal": 193520,
    "dispatchNotes": "Payment: 100% advance by bank transfer. Rail freight FOB. Certificates of sustainability required with shipment.",
    "trackingUrl": "https://tracking.nlfsolutions.com/DN-2025-003",
    "dispatchStatus": "dispatched",
    "actualDeliveryDate": null,
    "createdBy": "admin",
    "createdDate": "2025-10-05",
    "lastUpdated": "2025-10-05"
  },
  {
    "dispatchId": "DISP-2025-004",
    "deliveryNumber": "DN-2025-004",
    "dispatchDate": "2025-10-01",
    "deliveryMethod": "Courier",
    "poId": "PO-N25-901",
    "vendorName": "Fabric & Upholstery Supplies",
    "vendorGST": "29AABGH9012R1ZC",
    "vendorAddress": "223, Textile Market, Jayanagar, Bengaluru, Karnataka 560011",
    "estimatedDeliveryDate": "2025-10-05",
    "driverId": null,
    "driverName": null,
    "driverMobile": null,
    "vehicleNumber": "COURIER-DELHIVERY-001",
    "items": [
      {
        "srNo": 1,
        "material": "Glass",
        "description": "Premium Navy Fabric (Stain-Resistant)",
        "unit": "meters",
        "poQty": 200,
        "dispatchedQty": 200,
        "rate": 650,
        "amount": 130000,
        "status": "Dispatched"
      },
      {
        "srNo": 2,
        "material": "Hardware",
        "description": "High-Density Foam Sheets (50mm)",
        "unit": "sheets",
        "poQty": 40,
        "dispatchedQty": 40,
        "rate": 800,
        "amount": 32000,
        "status": "Dispatched"
      }
    ],
    "totalItems": 2,
    "totalQuantity": 240,
    "totalAmount": 162000,
    "gst": 29160,
    "grandTotal": 191160,
    "dispatchNotes": "Payment: 30% advance, 70% on delivery. Delivery by 5th Oct. Quality checks at our facility before dispatch.",
    "trackingUrl": "https://tracking.nlfsolutions.com/DN-2025-004",
    "dispatchStatus": "delivered",
    "actualDeliveryDate": "2025-10-04",
    "createdBy": "admin",
    "createdDate": "2025-10-01",
    "lastUpdated": "2025-10-04"
  },
  {
    "dispatchId": "DISP-2025-005",
    "deliveryNumber": "DN-2025-005",
    "dispatchDate": "2025-10-08",
    "deliveryMethod": "Self Pickup",
    "poId": "PO-N25-756",
    "vendorName": "Hardware & Fasteners Hub",
    "vendorGST": "29AABIJ3456R1ZD",
    "vendorAddress": "Block C, Manufacturing Zone, Peenya, Bengaluru, Karnataka 560058",
    "estimatedDeliveryDate": "2025-10-08",
    "driverId": null,
    "driverName": "Self Managed",
    "driverMobile": null,
    "vehicleNumber": "CLIENT-PICKUP",
    "items": [
      {
        "srNo": 1,
        "material": "Hardware",
        "description": "Stainless Steel Hinges (3-inch)",
        "unit": "nos",
        "poQty": 200,
        "dispatchedQty": 200,
        "rate": 85,
        "amount": 17000,
        "status": "Ready for Pickup"
      },
      {
        "srNo": 2,
        "material": "Hardware",
        "description": "Steel Locks (Mortise Type)",
        "unit": "nos",
        "poQty": 50,
        "dispatchedQty": 50,
        "rate": 350,
        "amount": 17500,
        "status": "Ready for Pickup"
      },
      {
        "srNo": 3,
        "material": "Adhesives",
        "description": "Industrial Wood Screws (1.5 inch)",
        "unit": "boxes",
        "poQty": 100,
        "dispatchedQty": 100,
        "rate": 280,
        "amount": 28000,
        "status": "Ready for Pickup"
      }
    ],
    "totalItems": 3,
    "totalQuantity": 350,
    "totalAmount": 62500,
    "gst": 11250,
    "grandTotal": 73750,
    "dispatchNotes": "Payment: Cash on pickup. No returns accepted after inspection. Quantity verification at warehouse.",
    "trackingUrl": null,
    "dispatchStatus": "ready-for-pickup",
    "actualDeliveryDate": null,
    "createdBy": "admin",
    "createdDate": "2025-10-08",
    "lastUpdated": "2025-10-08"
  }
];


export const annextures = [
  {
    // ===== ANNEXTURE IDENTIFICATION =====
    "annextureId": "ANN-WO-N25-001",
    "workOrderId": "WO-N25-001",
    "clientPoId": "PO-N25-001",
    "quotationId": "Q-N25-001",
    "clientName": "Arjun Mehta",
    "projectName": "StartupHub Office Setup",
    
    // ===== REFERENCE INFO =====
    "createdDate": "2025-09-28",
    "lastUpdated": "2025-09-28",
    "preparedBy": "Rahul Dev",
    "approvedBy": "admin",
    "approvalStatus": "approved", // draft/approved/rejected
    
    // ===== PRIMARY ITEMS (Main furniture pieces) =====
    "items": [
      {
        "itemId": "ITEM-001",
        "itemType": "Primary",
        "category": "Executive Furniture",
        "material": "Ply",
        "description": "Executive Desk",
        "unit": "nos",
        "quantity": 5,
        "rate": 19000,
        "total": 95000,
        "specifications": {
          "dimensions": "1800mm x 900mm x 750mm",
          "material": "18mm commercial ply with laminate",
          "finish": "Matte walnut laminate",
          "features": "Cable management, modesty panel, lockable drawer",
          "woodType": "Plywood",
          "laminateType": "Walnut Matte",
          "drawerMechanism": "Soft-close",
          "cableManagementSlots": 4
        },
        "vendorPoReference": "VPO-WO-N25-001-001", // Links to vendor PO
        "productionStatus": "pending",
        "deliveryStatus": "pending"
      },
      {
        "itemId": "ITEM-002",
        "itemType": "Primary",
        "category": "Seating",
        "material": "Laminates",
        "description": "Ergonomic Chair (Final Model)",
        "unit": "nos",
        "quantity": 50,
        "rate": 4750,
        "total": 237500,
        "specifications": {
          "model": "EC-PRO-2024",
          "material": "Mesh back, foam cushion seat",
          "adjustments": "Height, armrest, lumbar support",
          "loadCapacity": "120 kg",
          "warranty": "3 years",
          "meshMaterial": "High-Grade Breathable Mesh",
          "cushionType": "High-Density Foam (100mm)",
          "baseType": "5-point star base with 360° swivel",
          "wheelType": "Smooth-rolling casters"
        },
        "vendorPoReference": "VPO-WO-N25-001-002",
        "productionStatus": "pending",
        "deliveryStatus": "pending"
      },
      {
        "itemId": "ITEM-003",
        "itemType": "Primary",
        "category": "Lounge Furniture",
        "material": "Ply",
        "description": "Lounge Seating (3-Seater Sofa Set)",
        "unit": "set",
        "quantity": 2,
        "rate": 24000,
        "total": 48000,
        "specifications": {
          "configuration": "3-seater sofa set",
          "material": "Hardwood frame, high-density foam",
          "upholstery": "Premium navy fabric, stain-resistant",
          "dimensions": "2100mm x 850mm x 800mm",
          "frameType": "Solid hardwood with corner blocks",
          "foamDensity": "High-density (45kg/m³)",
          "fabricType": "Stain-resistant polyester blend",
          "fabricColor": "Navy Blue",
          "legType": "Wooden splayed legs with felt pads",
          "armHeight": "700mm"
        },
        "vendorPoReference": "VPO-WO-N25-001-001",
        "productionStatus": "pending",
        "deliveryStatus": "pending"
      }
    ],
    
    // ===== ACCESSORIES (Supporting items for installation and finishing) =====
    "accessories": [
      // ===== DESK ACCESSORIES =====
      {
        "accessoryId": "ACC-DSK-001",
        "accessoryType": "Hardware",
        "category": "Desk Hardware",
        "name": "Stainless Steel Hinges (3-inch)",
        "description": "Heavy-duty hinges for desk storage compartments",
        "unit": "nos",
        "quantity": 15, // 3 hinges per desk × 5 desks
        "rate": 85,
        "total": 1275,
        "specifications": {
          "material": "Stainless Steel 304",
          "size": "3-inch (75mm)",
          "loadCapacity": "15kg per hinge",
          "type": "Butt hinge",
          "finish": "Polished"
        },
        "supplier": "Hardware & Fasteners Hub",
        "vendorPoReference": "VPO-WO-N25-001-03" // (hypothetical)
      },
      {
        "accessoryId": "ACC-DSK-002",
        "accessoryType": "Hardware",
        "category": "Desk Hardware",
        "name": "Steel Mortise Locks",
        "description": "Mortise locks for desk drawer security",
        "unit": "nos",
        "quantity": 5, // 1 lock per desk
        "rate": 350,
        "total": 1750,
        "specifications": {
          "material": "Steel",
          "type": "Mortise lock",
          "keyType": "Brass key",
          "finish": "Nickel-plated",
          "securityLevel": "Medium"
        },
        "supplier": "Hardware & Fasteners Hub",
        "vendorPoReference": "VPO-WO-N25-001-03"
      },
      {
        "accessoryId": "ACC-DSK-003",
        "accessoryType": "Hardware",
        "category": "Desk Hardware",
        "name": "Industrial Wood Screws (1.5 inch)",
        "description": "Screws for desk frame assembly and installation",
        "unit": "boxes",
        "quantity": 10, // 2 boxes per desk assembly
        "rate": 280,
        "total": 2800,
        "specifications": {
          "material": "Stainless Steel",
          "length": "1.5 inch (38mm)",
          "type": "Wood screw",
          "gauge": "8 gauge",
          "quantity per box": "200 pieces"
        },
        "supplier": "Hardware & Fasteners Hub",
        "vendorPoReference": "VPO-WO-N25-001-03"
      },
      {
        "accessoryId": "ACC-DSK-004",
        "accessoryType": "Finishing",
        "category": "Desk Finishes",
        "name": "Wood Polish & Protective Coating",
        "description": "Protective coating for wooden desk surfaces",
        "unit": "liters",
        "quantity": 5,
        "rate": 450,
        "total": 2250,
        "specifications": {
          "type": "Polyurethane-based protective coating",
          "coverage": "25 sq.m per liter",
          "sheen": "Matte finish",
          "dryingTime": "2-3 hours",
          "waterResistant": true,
          "scratchResistant": true
        },
        "supplier": "Eco Materials & Trading Co",
        "vendorPoReference": "VPO-WO-N25-001-01"
      },
      {
        "accessoryId": "ACC-DSK-005",
        "accessoryType": "Cable Management",
        "category": "Desk Accessories",
        "name": "Plastic Cable Clips & Sleeves",
        "description": "Cable management system for desk wire organization",
        "unit": "set",
        "quantity": 5, // 1 set per desk
        "rate": 320,
        "total": 1600,
        "specifications": {
          "material": "ABS Plastic",
          "type": "Cable clips and adhesive sleeves",
          "colors": "Black",
          "itemsPerSet": "20 clips + 2m sleeve",
          "capacity": "Holds up to 10 cables"
        },
        "supplier": "Local Hardware",
        "vendorPoReference": "VPO-WO-N25-001-03"
      },
      
      // ===== CHAIR ACCESSORIES =====
      {
        "accessoryId": "ACC-CHR-001",
        "accessoryType": "Hardware",
        "category": "Chair Hardware",
        "name": "Chair Wheel Casters (5-piece set)",
        "description": "Replacement/additional wheel casters for ergonomic chairs",
        "unit": "sets",
        "quantity": 10, // Extra casters for 10 chairs as backup
        "rate": 1200,
        "total": 12000,
        "specifications": {
          "material": "Polyurethane wheel with metal bracket",
          "wheelDiameter": "50mm",
          "loadCapacity": "25kg per wheel",
          "type": "Smooth-rolling office chair caster",
          "wheelType": "Soft rubber (floor-friendly)"
        },
        "supplier": "Ergonomic Solutions Ltd",
        "vendorPoReference": "VPO-WO-N25-001-02"
      },
      {
        "accessoryId": "ACC-CHR-002",
        "accessoryType": "Hardware",
        "category": "Chair Hardware",
        "name": "Gas Lift Cylinder",
        "description": "Gas cylinder for chair height adjustment mechanism",
        "unit": "nos",
        "quantity": 10, // Extra replacements
        "rate": 850,
        "total": 8500,
        "specifications": {
          "type": "Class 4 gas lift",
          "strokLength": "100mm",
          "diameter": "50mm",
          "material": "Steel tube with seal",
          "maxLoad": "150kg"
        },
        "supplier": "Ergonomic Solutions Ltd",
        "vendorPoReference": "VPO-WO-N25-001-02"
      },
      {
        "accessoryId": "ACC-CHR-003",
        "accessoryType": "Maintenance",
        "category": "Chair Maintenance",
        "name": "Mesh Fabric Cleaner & Protectant",
        "description": "Cleaning solution and protective spray for mesh chairs",
        "unit": "liters",
        "quantity": 3,
        "rate": 320,
        "total": 960,
        "specifications": {
          "type": "Eco-friendly fabric cleaner",
          "coverage": "50 sq.m per liter",
          "formulae": "pH-neutral, non-toxic",
          "protectionLevel": "Water and stain resistant for 6 months"
        },
        "supplier": "Local Supplier",
        "vendorPoReference": null
      },
      
      // ===== LOUNGE ACCESSORIES =====
      {
        "accessoryId": "ACC-LNG-001",
        "accessoryType": "Hardware",
        "category": "Lounge Hardware",
        "name": "Wooden Sofa Feet Pads",
        "description": "Protective felt pads for sofa legs to prevent floor damage",
        "unit": "sets",
        "quantity": 6, // 3 pads per sofa leg, 12 legs per set × 2 sets
        "rate": 280,
        "total": 1680,
        "specifications": {
          "material": "Self-adhesive felt",
          "size": "25mm circular",
          "color": "Beige",
          "durability": "12-18 months typical use",
          "floorProtection": "Scratch-resistant"
        },
        "supplier": "Local Accessories Store",
        "vendorPoReference": null
      },
      {
        "accessoryId": "ACC-LNG-002",
        "accessoryType": "Fabric Treatment",
        "category": "Lounge Maintenance",
        "name": "Stain-Resistant Fabric Protector",
        "description": "Professional-grade fabric protector for sofa upholstery",
        "unit": "liters",
        "quantity": 2,
        "rate": 650,
        "total": 1300,
        "specifications": {
          "type": "Fluorocarbon-based fabric protector",
          "coverage": "40 sq.m per liter",
          "protection": "Stain and water resistant for 24 months",
          "dryTime": "4 hours",
          "reapplicationFrequency": "Every 2 years"
        },
        "supplier": "Fabric & Upholstery Supplies",
        "vendorPoReference": "VPO-WO-N25-001-04"
      },
      {
        "accessoryId": "ACC-LNG-003",
        "accessoryType": "Decoration",
        "category": "Lounge Accessories",
        "name": "Throw Pillows (Decorative)",
        "description": "Decorative throw pillows in matching navy color for lounge seating",
        "unit": "nos",
        "quantity": 8, // 4 pillows per sofa
        "rate": 650,
        "total": 5200,
        "specifications": {
          "material": "Premium polyester with fiber filling",
          "size": "45cm x 45cm",
          "color": "Navy blue (matching upholstery)",
          "coverType": "Removable, washable",
          "fillWeight": "500g"
        },
        "supplier": "Fabric & Upholstery Supplies",
        "vendorPoReference": "VPO-WO-N25-001-04"
      },
      
      // ===== GENERAL INSTALLATION ACCESSORIES =====
      {
        "accessoryId": "ACC-GEN-001",
        "accessoryType": "Installation",
        "category": "Installation Materials",
        "name": "Installation Screws & Fasteners Kit",
        "description": "Comprehensive kit of various screws and fasteners for complete installation",
        "unit": "kits",
        "quantity": 2,
        "rate": 1500,
        "total": 3000,
        "specifications": {
          "contents": "Assorted wood screws, washers, plugs, and dowels",
          "types": "Multiple sizes from 16mm to 50mm",
          "material": "Stainless steel",
          "quantity": "500+ pieces per kit"
        },
        "supplier": "Hardware & Fasteners Hub",
        "vendorPoReference": "VPO-WO-N25-001-03"
      },
      {
        "accessoryId": "ACC-GEN-002",
        "accessoryType": "Installation",
        "category": "Installation Materials",
        "name": "Wooden Shims & Spacers",
        "description": "Shims and spacers for level installation and adjustment",
        "unit": "packs",
        "quantity": 3,
        "rate": 220,
        "total": 660,
        "specifications": {
          "material": "Pinewood",
          "sizes": "6mm, 12mm, 18mm thickness",
          "length": "600mm",
          "quantity": "50 pieces per pack"
        },
        "supplier": "Local Hardware",
        "vendorPoReference": null
      },
      {
        "accessoryId": "ACC-GEN-003",
        "accessoryType": "Installation",
        "category": "Installation Materials",
        "name": "Wood Filler & Putty",
        "description": "Wood filler for covering screw holes and minor imperfections",
        "unit": "kg",
        "quantity": 2,
        "rate": 380,
        "total": 760,
        "specifications": {
          "type": "Water-based wood filler",
          "color": "Walnut (matching laminate)",
          "coverage": "1kg covers approximately 20 holes",
          "dryingTime": "2 hours",
          "sandable": true
        },
        "supplier": "Local Supplier",
        "vendorPoReference": null
      },
      {
        "accessoryId": "ACC-GEN-004",
        "accessoryType": "Packaging",
        "category": "Protective Materials",
        "name": "Protective Bubble Wrap & Foam",
        "description": "Packaging materials for furniture protection during transit and installation",
        "unit": "rolls",
        "quantity": 10,
        "rate": 450,
        "total": 4500,
        "specifications": {
          "type": "Bubble wrap and foam sheets",
          "width": "1000mm",
          "thickness": "5mm",
          "length": "100 meters per roll",
          "eco-friendly": "Recyclable"
        },
        "supplier": "Packaging Supplies",
        "vendorPoReference": null
      },
      {
        "accessoryId": "ACC-GEN-005",
        "accessoryType": "Safety",
        "category": "Safety Equipment",
        "name": "Furniture Moving & Lifting Equipment",
        "description": "Dollies, straps, and lifting aids for safe furniture movement",
        "unit": "sets",
        "quantity": 2,
        "rate": 3500,
        "total": 7000,
        "specifications": {
          "contents": "2x furniture dollies, 4x nylon straps, 2x furniture sliders",
          "capacity": "500kg per dolly",
          "material": "Steel frame with rubber wheels",
          "reusable": true
        },
        "supplier": "Installation Equipment Rental",
        "vendorPoReference": null
      }
    ],
    
    // ===== SUMMARY & TOTALS =====
    "summary": {
      "totalPrimaryItems": 3,
      "totalAccessories": 14,
      "totalLineItems": 17,
      "itemsTotal": 380500,
      "accessoriesTotal": 44335,
      "grandTotal": 424835, // Can include delivery charges
      "gst": 76470,
      "grandTotalWithGST": 501305
    },
    
    // ===== ADDITIONAL INFORMATION =====
    "notes": "Comprehensive annexture for StartupHub Office Setup project. Includes all primary furniture items and necessary accessories for complete installation and maintenance.",
    "attachments": [
      {
        "documentName": "Technical_Specifications_All_Items.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-28"
      },
      {
        "documentName": "Accessory_Supplier_List.xlsx",
        "documentType": "Excel",
        "uploadedDate": "2025-09-28"
      }
    ],
    "status": "approved" 
  }
];



// export const poVendor = [
//   {
//     // ===== VENDOR PO IDENTIFICATION =====
//     "vendorPoId": "VPO-WO-N25-001-001", // Generated: VPO-WO-{workOrderId}-{sequenceNumber}
//     "workOrderId": "WO-N25-001", // FK to Work Order
//     "workOrderDate": "2025-09-28",
    
//     // ===== REFERENCE INFO =====
//     "quotationId": "Q-N25-001",
//     "quotationRound": "R2",
//     "clientPoId": "PO-N25-001",
//     "clientName": "Arjun Mehta",
    
//     // ===== VENDOR DETAILS =====
//     "vendorName": "Premium Ply Industries",
//     "vendorAddress": "Plot 45, Industrial Estate, Yeshwanthpur, Bengaluru, Karnataka 560022",
//     "vendorGST": "29AABCU9603R1ZX",
//     "vendorContactPerson": "Ramesh Kumar",
//     "vendorContactMobile": "+91 9876543298",
//     "vendorEmail": "orders@premiumply.com",
    
//     // ===== PO DETAILS =====
//     "poDate": "2025-09-28",
//     "deliveryNumber": "DN-WO-N25-001-001",
//     "dispatchDate": "2025-10-02",
//     "expectedDeliveryDate": "2025-10-09",
//     "deliveryMethod": "Road",
//     "deliveryAddress": "NLF Solutions Warehouse, Peenya, Bengaluru", 
//     "billingAddress" : "NLF Solutions Pvt Ltd, Corporate Tower, 5th Floor, Ring Road, Marathahalli, Bengaluru, Karnataka 560037",
    
//     // ===== ITEMS (What materials we need from this vendor for this WO) =====
//     "items": [
//       {
//         "id": "item-1",
//         "woItemId": "ITEM-001", // Links to Work Order item (Executive Desk)
//         "material": "Plywood",
//         "description": "18mm Commercial Ply Sheets (Birch)",
//         "unit": "sheets",
//         "woRequiredQty": 150, // What WO needs
//         "poOrderQty": "150", // What we're ordering (may be more for buffer)
//         "rate": "650",
//         "amount": "97500",
//         "bufferStock": 0 // Extra stock ordered for inventory
//       },
//       {
//         "id": "item-2",
//         "woItemId": "ITEM-001",
//         "material": "Laminates",
//         "description": "Walnut Matte Laminate Roll",
//         "unit": "roll",
//         "woRequiredQty": 25,
//         "poOrderQty": "25",
//         "rate": "4200",
//         "amount": "105000",
//         "bufferStock": 0
//       }
//     ],
    
//     // ===== FINANCIAL DETAILS =====
//     "basicAmount": 202500,
//     "gst": 36450,
//     "gstPercentage": 18,
//     "tds": 0,
//     "grandTotal": 238950,
//     "paymentTerms": "50% advance, 50% on delivery",
//     "advancePaymentAmount": 101250,
//     "advancePaid": false,
//     "advancePaymentDate": null,
//     "balancePaymentAmount": 137700,
//     "balancePaid": false,
//     "balancePaymentDate": null,
    
//     // ===== TERMS & CONDITIONS =====
//     "terms": "Payment: 50% advance, 50% on delivery. Delivery within 7 days. Quality inspection mandatory. Defects to be reported within 48 hours of delivery.",
//     "qualityStandard": "ISO 9001:2015",
//     "inspectionRequired": true,
//     "deliveryInspectionLocation": "NLF Warehouse",
    
//     // ===== STATUS TRACKING =====
//     "poStatus": "initiated", // initiated/approved/dispatched/delivered/completed/rejected
//     "dispatchStatus": null,
//     "actualDeliveryDate": null,
//     "invoiceReceived": false,
//     "invoiceNumber": null,
//     "invoiceDate": null,
//     "paymentProcessed": false,
    
//     // ===== METADATA =====
//     "createdBy": "admin",
//     "createdDate": "2025-09-28",
//     "createdTime": "2025-09-28T10:30:00Z",
//     "lastUpdated": "2025-09-28",
//     "lastUpdatedBy": "admin",
//     "notes": "Material requirement for WO-N25-001 (Arjun Mehta project). Priority delivery needed.",
//     "attachments": [
//       {
//         "documentName": "Material_Specifications.pdf",
//         "documentType": "PDF",
//         "uploadedDate": "2025-09-28"
//       }
//     ]
//   },
  
//   {
//     "vendorPoId": "VPO-WO-N25-001-002",
//     "workOrderId": "WO-N25-001",
//     "workOrderDate": "2025-09-28",
//     "quotationId": "Q-N25-001",
//     "quotationRound": "R2",
//     "clientPoId": "PO-N25-001",
//     "clientName": "Arjun Mehta",
    
//     "vendorName": "Ergonomic Solutions Ltd",
//     "vendorAddress": "Unit 12, Tech Park, Whitefield, Bengaluru, Karnataka 560066",
//     "vendorGST": "29AABDE1234R1ZA",
//     "vendorContactPerson": "Priya Desai",
//     "vendorContactMobile": "+91 9876543299",
//     "vendorEmail": "procurement@ergosol.com",
    
//     "poDate": "2025-09-28",
//     "deliveryNumber": "DN-WO-N25-001-002",
//     "dispatchDate": "2025-09-30",
//     "expectedDeliveryDate": "2025-10-07",
//     "deliveryMethod": "Road",
//     "deliveryAddress": "NLF Solutions Warehouse, Peenya, Bengaluru",
    
//     "items": [
//       {
//         "id": "item-1",
//         "woItemId": "ITEM-002",
//         "material": "Hardware",
//         "description": "Ergonomic Chair Frame (EC-PRO-2024)",
//         "unit": "nos",
//         "woRequiredQty": 50,
//         "poOrderQty": "50",
//         "rate": "3200",
//         "amount": "160000",
//         "bufferStock": 0
//       },
//       {
//         "id": "item-2",
//         "woItemId": "ITEM-002",
//         "material": "Fabric",
//         "description": "High-Grade Mesh Fabric (Charcoal Grey)",
//         "unit": "meters",
//         "woRequiredQty": 120,
//         "poOrderQty": "120",
//         "rate": "850",
//         "amount": "102000",
//         "bufferStock": 0
//       }
//     ],
    
//     "basicAmount": 262000,
//     "gst": 47160,
//     "gstPercentage": 18,
//     "tds": 0,
//     "grandTotal": 309160,
//     "paymentTerms": "Net 15 days from invoice",
//     "advancePaymentAmount": 0,
//     "advancePaid": false,
//     "balancePaymentAmount": 309160,
//     "balancePaid": false,
    
//     "terms": "Payment: Net 15 days from invoice. Delivery in 2 batches. Free replacement for defective units within 30 days.",
//     "qualityStandard": "ISO 9001:2015",
//     "inspectionRequired": true,
//     "deliveryInspectionLocation": "NLF Warehouse",
    
//     "poStatus": "initiated",
//     "dispatchStatus": null,
//     "actualDeliveryDate": null,
//     "invoiceReceived": false,
//     "invoiceNumber": null,
//     "invoiceDate": null,
//     "paymentProcessed": false,
    
//     "createdBy": "admin",
//     "createdDate": "2025-09-28",
//     "createdTime": "2025-09-28T10:35:00Z",
//     "lastUpdated": "2025-09-28",
//     "lastUpdatedBy": "admin",
//     "notes": "Chair components for WO-N25-001. Batch delivery acceptable.",
//     "attachments": []
//   }
// ];

// Enhanced poVendor array with an example of unassigned vendor PO
export const poVendor = [
  {
    // ===== VENDOR PO IDENTIFICATION =====
    "vendorPoId": "VPO-WO-N25-001-001",
    "workOrderId": "WO-N25-001",
    "workOrderDate": "2025-09-28",
    
    // ===== REFERENCE INFO =====
    "quotationId": "Q-N25-001",
    "quotationRound": "R2",
    "clientPoId": "PO-N25-001",
    "clientName": "Arjun Mehta",
    
    // ===== VENDOR DETAILS =====
    "vendorName": "Premium Ply Industries",
    "vendorAddress": "Plot 45, Industrial Estate, Yeshwanthpur, Bengaluru, Karnataka 560022",
    "vendorGST": "29AABCU9603R1ZX",
    "vendorContactPerson": "Ramesh Kumar",
    "vendorContactMobile": "+91 9876543298",
    "vendorEmail": "orders@premiumply.com",
    
    // ===== PO DETAILS =====
    "poDate": "2025-09-28",
    "deliveryNumber": "DN-WO-N25-001-001",
    "dispatchDate": "2025-10-02",
    "expectedDeliveryDate": "2025-10-09",
    "deliveryMethod": "Road",
    "deliveryAddress": "NLF Solutions Warehouse, Peenya, Bengaluru", 
    "billingAddress": "NLF Solutions Pvt Ltd, Corporate Tower, 5th Floor, Ring Road, Marathahalli, Bengaluru, Karnataka 560037",
    
    // ===== ITEMS =====
    "items": [
      {
        "id": "item-1",
        "woItemId": "ITEM-001",
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "woRequiredQty": 150,
        "poOrderQty": "150",
        "rate": "650",
        "amount": "97500",
        "bufferStock": 0
      },
      {
        "id": "item-2",
        "woItemId": "ITEM-001",
        "material": "Laminates",
        "description": "Walnut Matte Laminate Roll",
        "unit": "roll",
        "woRequiredQty": 25,
        "poOrderQty": "25",
        "rate": "4200",
        "amount": "105000",
        "bufferStock": 0
      }
    ],
    
    // ===== FINANCIAL DETAILS =====
    "basicAmount": 202500,
    "gst": 36450,
    "gstPercentage": 18,
    "tds": 0,
    "grandTotal": 238950,
    "paymentTerms": "50% advance, 50% on delivery",
    "advancePaymentAmount": 101250,
    "advancePaid": false,
    "advancePaymentDate": null,
    "balancePaymentAmount": 137700,
    "balancePaid": false,
    "balancePaymentDate": null,
    
    // ===== TERMS & CONDITIONS =====
    "terms": "Payment: 50% advance, 50% on delivery. Delivery within 7 days. Quality inspection mandatory. Defects to be reported within 48 hours of delivery.",
    "qualityStandard": "ISO 9001:2015",
    "inspectionRequired": true,
    "deliveryInspectionLocation": "NLF Warehouse",
    
    // ===== STATUS TRACKING =====
    "poStatus": "initiated",
    "dispatchStatus": null,
    "actualDeliveryDate": null,
    "invoiceReceived": false,
    "invoiceNumber": null,
    "invoiceDate": null,
    "paymentProcessed": false,
    
    // ===== METADATA =====
    "createdBy": "admin",
    "createdDate": "2025-09-28",
    "createdTime": "2025-09-28T10:30:00Z",
    "lastUpdated": "2025-09-28",
    "lastUpdatedBy": "admin",
    "notes": "Material requirement for WO-N25-001 (Arjun Mehta project). Priority delivery needed.",
    "attachments": [
      {
        "documentName": "Material_Specifications.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-28"
      }
    ]
  },
  
  {
    "vendorPoId": "VPO-WO-N25-001-002",
    "workOrderId": "WO-N25-001",
    "workOrderDate": "2025-09-28",
    "quotationId": "Q-N25-001",
    "quotationRound": "R2",
    "clientPoId": "PO-N25-001",
    "clientName": "Arjun Mehta",
    
    "vendorName": "Ergonomic Solutions Ltd",
    "vendorAddress": "Unit 12, Tech Park, Whitefield, Bengaluru, Karnataka 560066",
    "vendorGST": "29AABDE1234R1ZA",
    "vendorContactPerson": "Priya Desai",
    "vendorContactMobile": "+91 9876543299",
    "vendorEmail": "procurement@ergosol.com",
    
    "poDate": "2025-09-28",
    "deliveryNumber": "DN-WO-N25-001-002",
    "dispatchDate": "2025-09-30",
    "expectedDeliveryDate": "2025-10-07",
    "deliveryMethod": "Road",
    "deliveryAddress": "NLF Solutions Warehouse, Peenya, Bengaluru",
    "billingAddress": "NLF Solutions Pvt Ltd, Corporate Tower, 5th Floor, Ring Road, Marathahalli, Bengaluru, Karnataka 560037",
    
    "items": [
      {
        "id": "item-1",
        "woItemId": "ITEM-002",
        "material": "Hardware",
        "description": "Ergonomic Chair Frame (EC-PRO-2024)",
        "unit": "nos",
        "woRequiredQty": 50,
        "poOrderQty": "50",
        "rate": "3200",
        "amount": "160000",
        "bufferStock": 0
      },
      {
        "id": "item-2",
        "woItemId": "ITEM-002",
        "material": "Fabric",
        "description": "High-Grade Mesh Fabric (Charcoal Grey)",
        "unit": "meters",
        "woRequiredQty": 120,
        "poOrderQty": "120",
        "rate": "850",
        "amount": "102000",
        "bufferStock": 0
      }
    ],
    
    "basicAmount": 262000,
    "gst": 47160,
    "gstPercentage": 18,
    "tds": 0,
    "grandTotal": 309160,
    "paymentTerms": "Net 15 days from invoice",
    "advancePaymentAmount": 0,
    "advancePaid": false,
    "balancePaymentAmount": 309160,
    "balancePaid": false,
    
    "terms": "Payment: Net 15 days from invoice. Delivery in 2 batches. Free replacement for defective units within 30 days.",
    "qualityStandard": "ISO 9001:2015",
    "inspectionRequired": true,
    "deliveryInspectionLocation": "NLF Warehouse",
    
    "poStatus": "initiated",
    "dispatchStatus": null,
    "actualDeliveryDate": null,
    "invoiceReceived": false,
    "invoiceNumber": null,
    "invoiceDate": null,
    "paymentProcessed": false,
    
    "createdBy": "admin",
    "createdDate": "2025-09-28",
    "createdTime": "2025-09-28T10:35:00Z",
    "lastUpdated": "2025-09-28",
    "lastUpdatedBy": "admin",
    "notes": "Chair components for WO-N25-001. Batch delivery acceptable.",
    "attachments": []
  },

  // ===== UNASSIGNED VENDOR PO SCENARIO =====
  {
    "vendorPoId": null,
    "workOrderId": "WO-N25-001", // NOT YET ASSIGNED TO ANY WORK ORDER
    "workOrderDate": null,
    
    // ===== REFERENCE INFO =====
    "quotationId": "Q-N25-006",
    "quotationRound": "R1",
    "clientPoId": null, // Not linked to client PO yet
    "clientName": "GreenWorks Co", // For reference only
    
    // ===== VENDOR DETAILS =====
    "vendorName": "Eco Materials & Trading Co",
    "vendorAddress": "16-A, Green Avenue, Bangalore Industrial Park, Bengaluru, Karnataka 560029",
    "vendorGST": "29AABFG5678R1ZB",
    "vendorContactPerson": "Vikram Shankar",
    "vendorContactMobile": "+91 9876543305",
    "vendorEmail": "sourcing@ecomatco.com",
    
    // ===== PO DETAILS =====
    "poDate": null, // Not finalized yet
    "deliveryNumber": null, // Will be generated upon assignment
    "dispatchDate": null,
    "expectedDeliveryDate": null,
    "deliveryMethod": null,
    "deliveryAddress": null, // TBD - depends on work order
    "billingAddress": null,
    
    // ===== ITEMS (DRAFT - Materials identified but not finalized) =====
    "items": [
      {
        "id": "item-1",
        "woItemId": null, // Not yet linked to WO item
        "material": "Bamboo",
        "description": "FSC Certified Bamboo Strips",
        "unit": "bundles",
        "woRequiredQty": null,
        "poOrderQty": "30",
        "rate": "1800",
        "amount": "54000",
        "bufferStock": 5 // Extra buffer stock identified
      },
      {
        "id": "item-2",
        "woItemId": null,
        "material": "Recycled Materials",
        "description": "Recycled Plastic Pellets (Food Grade)",
        "unit": "kg",
        "woRequiredQty": null,
        "poOrderQty": "500",
        "rate": "120",
        "amount": "60000",
        "bufferStock": 50
      },
      {
        "id": "item-3",
        "woItemId": null,
        "material": "Finishing",
        "description": "Eco-Friendly Wood Finishing Solution",
        "unit": "liters",
        "woRequiredQty": null,
        "poOrderQty": "20",
        "rate": "2500",
        "amount": "50000",
        "bufferStock": 0
      }
    ],
    
    // ===== FINANCIAL DETAILS (DRAFT - Not yet approved) =====
    "basicAmount": 164000,
    "gst": 29520,
    "gstPercentage": 18,
    "tds": 0,
    "grandTotal": 193520,
    "paymentTerms": null, // TBD - to be negotiated
    "advancePaymentAmount": null,
    "advancePaid": false,
    "advancePaymentDate": null,
    "balancePaymentAmount": null,
    "balancePaid": false,
    "balancePaymentDate": null,
    
    // ===== TERMS & CONDITIONS =====
    "terms": null, // Not finalized yet
    "qualityStandard": "ISO 9001:2015 / FSC Certification",
    "inspectionRequired": true,
    "deliveryInspectionLocation": null,
    
    // ===== STATUS TRACKING (DRAFT STATE) =====
    "poStatus": "draft", // NOT YET INITIATED - still in planning phase
    "dispatchStatus": null,
    "actualDeliveryDate": null,
    "invoiceReceived": false,
    "invoiceNumber": null,
    "invoiceDate": null,
    "paymentProcessed": false,
    
    // ===== METADATA =====
    "createdBy": "admin",
    "createdDate": "2025-09-25", // Created earlier, awaiting finalization
    "createdTime": "2025-09-25T14:20:00Z",
    "lastUpdated": "2025-09-25",
    "lastUpdatedBy": "admin",
    
    // ===== ASSIGNMENT STATUS =====
    "assignmentStatus": "pending", // pending/assigned/completed
    "assignmentNotes": "Materials identified for GreenWorks project (Q-N25-006 R1). Awaiting work order creation and rate approval from management before issuing formal PO to vendor. Client quotation under negotiation.",
    "pendingApprovals": [
      "Rate approval from finance",
      "Work order creation",
      "Final delivery schedule confirmation"
    ],
    
    "notes": "Draft PO - NOT YET ISSUED TO VENDOR. This is in the planning/material sourcing phase. Vendor has been identified based on eco-certifications and pricing. Awaiting internal approvals and WO assignment before formal PO can be generated.",
    "attachments": [
      {
        "documentName": "Vendor_Quotation_EcoMat.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-25"
      },
      {
        "documentName": "FSC_Certification_Bamboo.pdf",
        "documentType": "PDF",
        "uploadedDate": "2025-09-25"
      }
    ]
  }
];

// Shipment Management - Materials dispatch from vendors/godown to site
export const shipments = [
  {
    // ===== SHIPMENT IDENTIFICATION =====
    "shipmentId": "SHIP-WO-N25-001-001",
    "workOrderId": "WO-N25-001",
    "vendorPoId": "VPO-WO-N25-001-001",
    "vendorName": "Premium Ply Industries", // Links to vendor PO
    "shipmentType": "vendor-to-godown", // vendor-to-godown / godown-to-site
    "shipmentSequence": 1, // Multiple shipments per WO possible
    
    // ===== REFERENCE INFORMATION =====
    "quotationId": "Q-N25-001",
    "clientPoId": "PO-N25-001",
    "clientName": "Arjun Mehta",
    "projectName": "StartupHub Office Setup",
    
    // ===== SOURCE (Where materials come FROM) =====
    "sourceType": "vendor", // vendor / godown / supplier
    "sourceDetails": {
      "name": "Premium Ply Industries",
      "address": "Plot 45, Industrial Estate, Yeshwanthpur, Bengaluru, Karnataka 560022",
      "gst": "29AABCU9603R1ZX",
      "contactPerson": "Ramesh Kumar",
      "contactMobile": "+91 9876543298",
      "email": "orders@premiumply.com"
    },
    
    // ===== DESTINATION (Where materials go TO) =====
    "destinationType": "godown", // godown / site / nlfWarehouse
    "destinationDetails": {
      "name": "NLF Solutions Warehouse, indore",
      "address": "Peenya, Bengaluru, Karnataka 560058",
      "type": "Central Godown",
      "inChargePersonName": "Suresh Warehouse Manager",
      "inChargePersonMobile": "+91 9876543350",
      "storageCapacity": "5000 sq.ft"
    },
    
    // ===== SHIPMENT DATES & TIMELINE =====
    "orderedDate": "2025-09-28",
    "dispatchedDate": "2025-10-02",
    "expectedDeliveryDate": "2025-10-09",
    "actualDeliveryDate": null,
    "receivedDate": null, // Date when godown received the shipment
    "deliveryReceivedTime": null, // Time of actual receipt
    
    // ===== TRANSPORTATION DETAILS =====
    "deliveryMethod": "Road", // Road / Rail / Air / Courier
    "transportationMode": "LCV", // LCV / Truck / Container / Parcel
    "driverId": "DRV-2025-042",
    "driverName": "Rajesh Kumar",
    "driverMobile": "+91 9876543298",
    "driverLicense": "KA-05-DL-2020-000123",
    "vehicleNumber": "KA-01-AB-1234",
    "vehicleType": "LCV (Light Commercial Vehicle)",
    "vehicleCapacity": "2.5 Tons",
    "insuranceProvider": "Oriental Insurance",
    "insurancePolicyNumber": "OI-FLEET-2025-12345",
    "routeDetails": {
      "origin": "Yeshwanthpur, Bengaluru",
      "destination": "Peenya, Bengaluru",
      "distance": "25 km",
      "estimatedTravelTime": "1.5 hours",
      "routeCode": "RT-YESHW-PEENYA-25KM"
    },
    
    // ===== ITEMS IN SHIPMENT =====
    "items": [
      {
        "shipmentItemId": "SI-001",
        "vendorPoItemId": "item-1", // Links to vendor PO item
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "orderedQuantity": 150,
        "dispatchedQuantity": 150,
        "receivedQuantity": 0, // Updated upon actual receipt
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "verifiedQuantity": 0, // After inspection
        "rate": 650,
        "amount": 97500,
        "dimensions": {
          "length": "2440 mm",
          "width": "1220 mm",
          "thickness": "18 mm"
        },
        "stackingMethod": "Flat stacking in plastic pallets",
        "palletCount": 5,
        "packingMaterial": "Plastic wrap, plywood sheets between layers",
        "qualityChecklist": {
          "surfaceQuality": "pending", // pending / pass / fail
          "thicknessAccuracy": "pending",
          "edgeCondition": "pending",
          "moistureContent": "pending"
        }
      },
      {
        "shipmentItemId": "SI-002",
        "vendorPoItemId": "item-2",
        "material": "Laminates",
        "description": "Walnut Matte Laminate Roll",
        "unit": "roll",
        "orderedQuantity": 25,
        "dispatchedQuantity": 25,
        "receivedQuantity": 0,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "verifiedQuantity": 0,
        "rate": 4200,
        "amount": 105000,
        "dimensions": {
          "length": "3050 mm",
          "width": "1300 mm",
          "thickness": "0.8 mm"
        },
        "stackingMethod": "Vertical standing with protective cardboard",
        "rollCount": 25,
        "packingMaterial": "Kraft paper, foam protective sheets",
        "qualityChecklist": {
          "colorConsistency": "pending",
          "finishQuality": "pending",
          "edgeDamage": "pending",
          "curling": "pending"
        }
      }
    ],
    
    // ===== FINANCIAL & DOCUMENTATION =====
    "invoiceNumber": null, // Vendor invoice number
    "invoiceDate": null,
    "invoiceAmount": null,
    "documentsAttached": [
      {
        "documentType": "Packing List",
        "documentNumber": "PL-VPO-N25-001-001",
        "uploadedDate": "2025-10-02",
        "status": "received"
      },
      {
        "documentType": "Invoice",
        "documentNumber": "INV-PPLY-2025-001234",
        "uploadedDate": null,
        "status": "pending"
      },
      {
        "documentType": "Quality Certificate",
        "documentNumber": "QC-PPLY-2025-001234",
        "uploadedDate": null,
        "status": "pending"
      }
    ],
    
    // ===== TRACKING & LOGISTICS =====
    "trackingNumber": "PPLY-TRACK-2025-001",
    "trackingUrl": "https://tracking.nlfsolutions.com/PPLY-TRACK-2025-001",
    "gpsTracking": {
      "enabled": true,
      "lastKnownLocation": {
        "latitude": 13.1939,
        "longitude": 77.5941,
        "address": "Old Madras Road, Bengaluru",
        "timestamp": "2025-10-02T14:30:00Z"
      },
      "trackingHistory": [
        {
          "latitude": 13.2298,
          "longitude": 77.6355,
          "address": "Yeshwanthpur, Bengaluru",
          "timestamp": "2025-10-02T08:00:00Z",
          "event": "Departed from vendor"
        },
        {
          "latitude": 13.2050,
          "longitude": 77.5938,
          "address": "KR Puram Bypass, Bengaluru",
          "timestamp": "2025-10-02T10:15:00Z",
          "event": "En route checkpoint"
        }
      ]
    },
    
    // ===== SHIPMENT STATUS & CONDITION =====
    "shipmentStatus": "on-route", // ordered / dispatched / in-transit / delivered / received / verified / completed / damaged / delayed
    "deliveryStatus": "pending",
    "conditionOnDispatch": "Good", // Good / Minor Damage / Major Damage
    "conditionNotes": "All items properly packed and secured",
    
    // ===== INSPECTION & VERIFICATION =====
    "inspectionRequired": true,
    "inspectionLevel": "detailed", // basic / standard / detailed
    "inspectionCheckpoints": [
      "Quantity verification",
      "Quality assessment",
      "Damage inspection",
      "Documentation review",
      "Sample testing"
    ],
    "inspectionStatus": "pending", // pending / in-progress / completed / passed / failed
    "inspectorName": null,
    "inspectionDate": null,
    "inspectionRemarks": null,
    "inspectionPhotos": [],
    
    // ===== RISK & CONTINGENCY =====
    "riskFactors": [
      "Weather delay potential",
      "Traffic congestion on delivery day"
    ],
    "contingencyPlan": "Alternative route via Outer Ring Road if main route congested. Vendor has buffer stock available.",
    "insuranceClaimed": false,
    "insuranceClaimNumber": null,
    "damageReportFiled": false,
    "damageReportNumber": null,
    
    // ===== COMMUNICATION & ALERTS =====
    "lastUpdateTime": "2025-10-02T14:30:00Z",
    "estimatedDeliveryTime": "2025-10-09 14:00:00",
    "delayAlertTriggered": false,
    "delayAlertDate": null,
    "delayReason": null,
    "smsNotificationSent": true,
    "emailNotificationSent": true,
    "notificationRecipients": [
      {
        "recipientType": "Vendor",
        "name": "Ramesh Kumar",
        "email": "orders@premiumply.com",
        "mobile": "+91 9876543298"
      },
      {
        "recipientType": "Godown Incharge",
        "name": "Suresh Warehouse Manager",
        "email": "suresh.warehouse@nlfsolutions.com",
        "mobile": "+91 9876543350"
      },
      {
        "recipientType": "Project Manager",
        "name": "Rahul Dev",
        "email": "rahul.d@nlfsolutions.com",
        "mobile": "+91 9876543210"
      }
    ],
    
    // ===== METADATA =====
    "createdBy": "admin",
    "createdDate": "2025-10-02",
    "createdTime": "2025-10-02T08:00:00Z",
    "lastUpdatedBy": "system",
    "lastUpdatedDate": "2025-10-02",
    "attachments": [
      {
        "attachmentName": "Packing_List_VPO_N25_001_001.pdf",
        "attachmentType": "PDF",
        "uploadedDate": "2025-10-02",
        "uploadedBy": "admin"
      }
    ],
    
    "notes": "First material shipment for StartupHub project. Priority delivery before 2025-10-09 for production schedule."
  },

  // ===== SECOND SHIPMENT: From Vendor to Godown =====
  {
    "shipmentId": "SHIP-WO-N25-001-002",
    "workOrderId": "WO-N25-001",
    "vendorPoId": "VPO-WO-N25-001-002",
    "vendorName": "Premium Ply Industries", // Links to vendor PO

    "shipmentType": "vendor-to-godown",
    "shipmentSequence": 2,
    
    "quotationId": "Q-N25-001",
    "clientPoId": "PO-N25-001",
    "clientName": "Arjun Mehta",
    "projectName": "StartupHub Office Setup",
    
    "sourceType": "vendor",
    "sourceDetails": {
      "name": "Ergonomic Solutions Ltd",
      "address": "Unit 12, Tech Park, Whitefield, Bengaluru, Karnataka 560066",
      "gst": "29AABDE1234R1ZA",
      "contactPerson": "Priya Desai",
      "contactMobile": "+91 9876543299",
      "email": "procurement@ergosol.com"
    },
    
    "destinationType": "godown",
    "destinationDetails": {
      "name": "NLF Solutions Warehouse, nagpur",
      "address": "Peenya, Bengaluru, Karnataka 560058",
      "type": "Central Godown",
      "inChargePersonName": "Suresh Warehouse Manager",
      "inChargePersonMobile": "+91 9876543350"
    },
    
    "orderedDate": "2025-09-28",
    "dispatchedDate": "2025-09-30",
    "expectedDeliveryDate": "2025-10-07",
    "actualDeliveryDate": "2025-10-06",
    "receivedDate": "2025-10-06",
    "deliveryReceivedTime": "14:45:00",
    
    "deliveryMethod": "Road",
    "transportationMode": "Truck",
    "driverId": "DRV-2025-038",
    "driverName": "Vikram Singh",
    "driverMobile": "+91 9876543299",
    "vehicleNumber": "KA-01-CD-5678",
    "vehicleType": "Truck",
    "vehicleCapacity": "5 Tons",
    "routeDetails": {
      "origin": "Whitefield, Bengaluru",
      "destination": "Peenya, Bengaluru",
      "distance": "35 km",
      "estimatedTravelTime": "2 hours"
    },
    
    "items": [
      {
        "shipmentItemId": "SI-003",
        "vendorPoItemId": "item-1",
        "material": "Hardware",
        "description": "Ergonomic Chair Frame (EC-PRO-2024)",
        "unit": "nos",
        "orderedQuantity": 50,
        "dispatchedQuantity": 50,
        "receivedQuantity": 50,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "verifiedQuantity": 50,
        "rate": 3200,
        "amount": 160000,
        "stackingMethod": "Individual carton boxes on pallets",
        "boxCount": 10,
        "packingMaterial": "Foam corner protection, cardboard boxes",
        "qualityChecklist": {
          "structuralIntegrity": "pass",
          "mechanismFunction": "pass",
          "surfaceFinish": "pass",
          "assemblyCompleteness": "pass"
        }
      },
      {
        "shipmentItemId": "SI-004",
        "vendorPoItemId": "item-2",
        "material": "Fabric",
        "description": "High-Grade Mesh Fabric (Charcoal Grey)",
        "unit": "meters",
        "orderedQuantity": 120,
        "dispatchedQuantity": 120,
        "receivedQuantity": 120,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "verifiedQuantity": 120,
        "rate": 850,
        "amount": 102000,
        "stackingMethod": "Rolls on horizontal racks",
        "rollCount": 3,
        "packingMaterial": "Kraft paper wrapping",
        "qualityChecklist": {
          "colorMatch": "pass",
          "tensileStrength": "pass",
          "stitchingQuality": "pass",
          "defects": "pass"
        }
      }
    ],
    
    "invoiceNumber": "INV-ERGOSOL-2025-00987",
    "invoiceDate": "2025-09-30",
    "invoiceAmount": 309160,
    "documentsAttached": [
      {
        "documentType": "Invoice",
        "documentNumber": "INV-ERGOSOL-2025-00987",
        "uploadedDate": "2025-10-06",
        "status": "received"
      },
      {
        "documentType": "Quality Certificate",
        "documentNumber": "QC-ERGOSOL-2025-00987",
        "uploadedDate": "2025-10-06",
        "status": "received"
      }
    ],
    
    "trackingNumber": "ERGO-TRACK-2025-001",
    "trackingUrl": "https://tracking.nlfsolutions.com/ERGO-TRACK-2025-001",
    "gpsTracking": {
      "enabled": true,
      "lastKnownLocation": {
        "latitude": 13.1939,
        "longitude": 77.5941,
        "address": "Peenya, Bengaluru",
        "timestamp": "2025-10-06T14:45:00Z"
      }
    },
    
    "shipmentStatus": "received",
    "deliveryStatus": "completed",
    "conditionOnDispatch": "Good",
    "conditionNotes": "All items received in perfect condition",
    
    "inspectionRequired": true,
    "inspectionLevel": "standard",
    "inspectionStatus": "completed",
    "inspectorName": "Suresh Warehouse Manager",
    "inspectionDate": "2025-10-06",
    "inspectionRemarks": "All items verified and accepted. 50 chair frames and 120m mesh fabric received as per order.",
    "inspectionPhotos": [
      "INS-PHOTO-001.jpg",
      "INS-PHOTO-002.jpg"
    ],
    
    "damageReportFiled": false,
    "lastUpdateTime": "2025-10-06T15:30:00Z",
    "smsNotificationSent": true,
    "emailNotificationSent": true,
    "notificationRecipients": [
      {
        "recipientType": "Vendor",
        "name": "Priya Desai",
        "email": "procurement@ergosol.com",
        "mobile": "+91 9876543299"
      },
      {
        "recipientType": "Project Manager",
        "name": "Rahul Dev",
        "email": "rahul.d@nlfsolutions.com",
        "mobile": "+91 9876543210"
      }
    ],
    
    "createdBy": "admin",
    "createdDate": "2025-09-30",
    "lastUpdatedDate": "2025-10-06",
    "notes": "Successfully delivered one day ahead of schedule."
  },

  // ===== THIRD SHIPMENT: From Godown to Site =====
  {
    "shipmentId": "SHIP-WO-N25-001-SITE-001",
    "workOrderId": "WO-N25-001",
    "vendorPoId": "VPO-WO-N25-001-003",
    "vendorName": "Premium Ply Industries", // Links to vendor PO
    "shipmentType": "godown-to-site",
    "shipmentSequence": 1, // First shipment to site
    
    "quotationId": "Q-N25-001",
    "clientPoId": "PO-N25-001",
    "clientName": "Arjun Mehta",
    "projectName": "StartupHub Office Setup",
    
    "sourceType": "godown",
    "sourceDetails": {
      "name": "NLF Solutions Warehouse",
      "address": "Peenya, Bengaluru, Karnataka 560058",
      "type": "Central Godown",
      "inChargePersonName": "Suresh Warehouse Manager",
      "inChargePersonMobile": "+91 9876543350"
    },
    
    "destinationType": "site",
    "destinationDetails": {
      "name": "StartupHub Office Site",
      "address": "12A, Brigade Road, Bengaluru, Karnataka 560001",
      "siteContactPerson": "Arjun Mehta",
      "siteContactMobile": "+91 9876543210",
      "siteContactEmail": "arjun.m@example.com",
      "accessInstructions": "Security clearance required, contact 30 mins before arrival",
      "unloadingSpace": "Ground floor - 500 sq.ft clear area available",
      "parkingAvailable": "Yes - basement parking"
    },
    
    "orderedDate": "2025-10-08",
    "dispatchedDate": "2025-10-09",
    "expectedDeliveryDate": "2025-10-10",
    "actualDeliveryDate": null,
    "receivedDate": null,
    
    "deliveryMethod": "Road",
    "transportationMode": "Truck",
    "driverId": "DRV-2025-045",
    "driverName": "Arjun Patel",
    "driverMobile": "+91 9876543345",
    "vehicleNumber": "KA-01-EF-9012",
    "vehicleType": "Truck (Closed Van)",
    "vehicleCapacity": "3 Tons",
    "routeDetails": {
      "origin": "Peenya, Bengaluru",
      "destination": "Brigade Road, Bengaluru",
      "distance": "12 km",
      "estimatedTravelTime": "45 minutes"
    },
    
    "items": [
      {
        "shipmentItemId": "SI-005",
        "sourceStockId": "S-PLY-001",
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "orderedQuantity": 80,
        "dispatchedQuantity": 80,
        "receivedQuantity": 0,
        "verifiedQuantity": 0,
        "rate": 650,
        "amount": 52000,
        "dimensions": {
          "length": "2440 mm",
          "width": "1220 mm",
          "thickness": "18 mm"
        },
        "palletCount": 3,
        "packingMaterial": "Plastic wrap on pallets"
      },
      {
        "shipmentItemId": "SI-006",
        "sourceStockId": "S-CHR-001",
        "material": "Hardware",
        "description": "Ergonomic Chair (Final Model) - Ready Units",
        "unit": "nos",
        "orderedQuantity": 10,
        "dispatchedQuantity": 10,
        "receivedQuantity": 0,
        "verifiedQuantity": 0,
        "rate": 4750,
        "amount": 47500,
        "stackingMethod": "Individual carton boxes with protective foam",
        "boxCount": 2,
        "packingMaterial": "Foam cushion protection"
      }
    ],
    
    "trackingNumber": "SITE-TRACK-2025-001",
    "trackingUrl": "https://tracking.nlfsolutions.com/SITE-TRACK-2025-001",
    "gpsTracking": {
      "enabled": true,
      "lastKnownLocation": {
        "latitude": 13.0000,
        "longitude": 77.6000,
        "address": "Peenya, Bengaluru",
        "timestamp": "2025-10-09T08:00:00Z"
      }
    },
    
    "shipmentStatus": "dispatched",
    "deliveryStatus": "in-transit",
    "conditionOnDispatch": "Good",
    "conditionNotes": "Items secured with straps, ready for installation",
    
    "inspectionRequired": true,
    "inspectionLevel": "standard",
    "inspectionStatus": "pending",
    "inspectorName": null,
    "inspectionDate": null,
    
    "installationPlanned": true,
    "installationScheduledDate": "2025-10-10",
    "installationScheduledTime": "10:00 AM - 05:00 PM",
    "installationTeamLeader": null,
    "installationTeamSize": null,
    
    "smsNotificationSent": true,
    "emailNotificationSent": true,
    "notificationRecipients": [
      {
        "recipientType": "Client",
        "name": "Arjun Mehta",
        "email": "arjun.m@example.com",
        "mobile": "+91 9876543210"
      },
      {
        "recipientType": "Driver",
        "name": "Arjun Patel",
        "email": "driver.arjun@nlfsolutions.com",
        "mobile": "+91 9876543345"
      },
      {
        "recipientType": "Installation Team",
        "name": "Installation Manager",
        "email": "install@nlfsolutions.com",
        "mobile": "+91 9876543400"
      }
    ],
    
    "createdBy": "admin",
    "createdDate": "2025-10-09",
    "lastUpdatedDate": "2025-10-09",
    "notes": "First batch of materials ready for site delivery. Installation scheduled for next day."
  }
];

export const shipmentUpdates = [
  {
    "updateId": "UPDATE-SHIP-001",
    "shipmentId": "SHIP-WO-N25-001-002",
    "updateType": "status-change", // status-change / location-update / damage-report / inspection / delay
    "updateTime": "2025-10-06T14:45:00Z",
    "previousStatus": "in-transit",
    "newStatus": "delivered",
    "updatedBy": "system",
    "description": "Shipment delivered and received at NLF Warehouse",
    "remarks": "All items received in perfect condition. Inspection completed successfully."
  },
  {
    "updateId": "UPDATE-SHIP-002",
    "shipmentId": "SHIP-WO-N25-001-001",
    "updateType": "location-update",
    "updateTime": "2025-10-02T14:30:00Z",
    "currentLocation": "Old Madras Road, Bengaluru",
    "latitude": 13.1939,
    "longitude": 77.5941,
    "estimatedTimeToDestination": "2 hours",
    "updatedBy": "system-gps",
    "remarks": "Vehicle is on schedule. No delays reported."
  }
];

export const dispatchCheckpoints = [
  {
    "checkpointId": "CHK-001",
    "shipmentId": "SHIP-WO-N25-001-001",
    "checkpointName": "Warehouse Dispatch",
    "checkpointLocation": "Yeshwanthpur, Bengaluru",
    "checkpointType": "Origin", // Origin / Transit / Destination
    "scheduledTime": "2025-10-02T08:00:00Z",
    "actualTime": "2025-10-02T08:15:00Z",
    "status": "completed", // pending / completed / delayed / cancelled
    "inspectionConducted": true,
    "itemsVerified": true,
    "documentsChecked": true,
    "remarks": "All items verified and packed as per PO. Quality certificates attached."
  },
  {
    "checkpointId": "CHK-002",
    "shipmentId": "SHIP-WO-N25-001-001",
    "checkpointName": "En Route Checkpoint",
    "checkpointLocation": "KR Puram Bypass, Bengaluru",
    "checkpointType": "Transit",
    "scheduledTime": "2025-10-02T10:00:00Z",
    "actualTime": "2025-10-02T10:15:00Z",
    "status": "completed",
    "remarks": "Vehicle condition good, no issues reported. Continuing to destination."
  },
  {
    "checkpointId": "CHK-003",
    "shipmentId": "SHIP-WO-N25-001-001",
    "checkpointName": "Warehouse Receipt",
    "checkpointLocation": "Peenya, Bengaluru",
    "checkpointType": "Destination",
    "scheduledTime": "2025-10-02T14:00:00Z",
    "actualTime": null,
    "status": "pending",
    "remarks": "Awaiting delivery and inspection"
  }
];

// Site Management - Simplified & Normalized for Database
// Just 3 main tables: siteBranches, materialDeliveries, weeklyUsageLogs

export const siteBranches = [
  {
    "siteId": "SITE-DLH-001",
    "siteName": "Delhi Branch",
    "city": "Delhi",
    "address": "Plot No. 45, Industrial Area, Okhla, New Delhi, Delhi 110020",
    "siteManager": "Vikram Singh",
    "siteManagerMobile": "+91 9876543400",
    "siteManagerEmail": "vikram.singh@nlfsolutions.com",
    "supervisor": "Rajesh Kumar",
    "supervisorMobile": "+91 9876543401",
    "supervisorEmail": "rajesh.kumar@nlfsolutions.com",
    "warehouseCapacity": 2000, // sq.ft
    "siteStatus": "active", // active / awaiting-setup / completed
    "siteStartDate": "2025-10-06",
    "plannedCompletionDate": "2025-12-15",
    "createdDate": "2025-10-01"
  },
  {
    "siteId": "SITE-MUM-001",
    "siteName": "Mumbai Branch",
    "city": "Mumbai",
    "address": "Survey No. 12, Phase 2, Industrial Hub, Navi Mumbai, Maharashtra 400706",
    "siteManager": "Priya Desai",
    "siteManagerMobile": "+91 9876543402",
    "siteManagerEmail": "priya.desai@nlfsolutions.com",
    "supervisor": "Amit Verma",
    "supervisorMobile": "+91 9876543403",
    "supervisorEmail": "amit.verma@nlfsolutions.com",
    "warehouseCapacity": 1500,
    "siteStatus": "active",
    "siteStartDate": "2025-10-12",
    "plannedCompletionDate": "2025-12-20",
    "createdDate": "2025-10-05"
  },
  {
    "siteId": "SITE-IDR-001",
    "siteName": "Indore Branch",
    "city": "Indore",
    "address": "Plot 78, Sector-7, Industrial Area, Indore, Madhya Pradesh 452010",
    "siteManager": "Suresh Patel",
    "siteManagerMobile": "+91 9876543404",
    "siteManagerEmail": "suresh.patel@nlfsolutions.com",
    "supervisor": "Harish Malhotra",
    "supervisorMobile": "+91 9876543405",
    "supervisorEmail": "harish.malhotra@nlfsolutions.com",
    "warehouseCapacity": 1800,
    "siteStatus": "to be set",
    "siteStartDate": null,
    "plannedCompletionDate": "2025-12-25",
    "createdDate": "2025-10-01"
  },
  {
    "siteId": "SITE-KOL-001",
    "siteName": "Kolkata Branch",
    "city": "Kolkata",
    "address": "Block-A, Sector-3, Tech Park, Kolkata, West Bengal 700091",
    "siteManager": "Deepa Mukherjee",
    "siteManagerMobile": "+91 9876543406",
    "siteManagerEmail": "deepa.mukherjee@nlfsolutions.com",
    "supervisor": "Arun Sharma",
    "supervisorMobile": "+91 9876543407",
    "supervisorEmail": "arun.sharma@nlfsolutions.com",
    "warehouseCapacity": 2000,
    "siteStatus": "to be set",
    "siteStartDate": null,
    "plannedCompletionDate": "2026-01-10",
    "createdDate": "2025-10-01"
  },
  {
    "siteId": "SITE-PUN-001",
    "siteName": "Pune Branch",
    "city": "Pune",
    "address": "Survey 145, Hinjewadi Phase-2, Pune, Maharashtra 411057",
    "siteManager": "Neha Bhat",
    "siteManagerMobile": "+91 9876543408",
    "siteManagerEmail": "neha.bhat@nlfsolutions.com",
    "supervisor": "Rohan Patil",
    "supervisorMobile": "+91 9876543409",
    "supervisorEmail": "rohan.patil@nlfsolutions.com",
    "warehouseCapacity": 1600,
    "siteStatus": "to be set",
    "siteStartDate": null,
    "plannedCompletionDate": "2025-12-30",
    "createdDate": "2025-10-01"
  },
  {
    "siteId": "SITE-NGP-001",
    "siteName": "Nagpur Branch",
    "city": "Nagpur",
    "address": "Plot 234, Industrial Complex, Nagpur, Maharashtra 440015",
    "siteManager": "Vishal Deshmukh",
    "siteManagerMobile": "+91 9876543410",
    "siteManagerEmail": "vishal.deshmukh@nlfsolutions.com",
    "supervisor": "Sandeep Gupta",
    "supervisorMobile": "+91 9876543411",
    "supervisorEmail": "sandeep.gupta@nlfsolutions.com",
    "warehouseCapacity": 1400,
    "siteStatus": "to be set",
    "siteStartDate": null,
    "plannedCompletionDate": "2026-01-05",
    "createdDate": "2025-10-01"
  },
  {
    "siteId": "SITE-RAI-001",
    "siteName": "Raipur Branch",
    "city": "Raipur",
    "address": "Zone-1, CSEZ, Raipur, Chhattisgarh 492001",
    "siteManager": "Pradeep Rao",
    "siteManagerMobile": "+91 9876543412",
    "siteManagerEmail": "pradeep.rao@nlfsolutions.com",
    "supervisor": "Ashok Nayak",
    "supervisorMobile": "+91 9876543413",
    "supervisorEmail": "ashok.nayak@nlfsolutions.com",
    "warehouseCapacity": 1700,
    "siteStatus": "to be set",
    "siteStartDate": null,
    "plannedCompletionDate": "2026-01-15",
    "createdDate": "2025-10-01"
  }
];

// ===== MATERIAL DELIVERIES - Supervisor logs delivery on arrival =====
export const materialDeliveries = [
  {
    "deliveryId": "DEL-001",
    "siteId": "SITE-DLH-001",
    "shipmentId": "SHIP-WO-N25-001-SITE-001",
    "deliveryDate": "2025-10-10",
    "expectedDeliveryDate": "2025-10-10",
    "deliveryTime": "09:30",
    "status": "received", // received / in-transit / delayed / cancelled
    "onTimeStatus": "on-time", // on-time / early / delayed
    "delayMinutes": 0,
    
    "supervisorName": "Rajesh Kumar",
    "receivedTime": "09:30",
    "receivedBy": "Rajesh Kumar",
    
    "vehicleNumber": "KA-01-EF-9012",
    "driverName": "Arjun Patel",
    "driverMobile": "+91 9876543345",
    
    "items": [
      {
        "itemId": "DEL-001-ITEM-1",
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "orderQuantity": 80,
        "receivedQuantity": 80,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "rate": 650,
        "totalAmount": 52000,
        "storageLocation": "Warehouse-A, Rack-1",
        "condition": "Good"
      },
      {
        "itemId": "DEL-001-ITEM-2",
        "material": "Ergonomic Chairs",
        "description": "Ergonomic Chair (Final Model)",
        "unit": "nos",
        "orderQuantity": 10,
        "receivedQuantity": 10,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "rate": 4750,
        "totalAmount": 47500,
        "storageLocation": "Warehouse-A, Section-B",
        "condition": "Good"
      }
    ],
    
    "totalAmount": 99500,
    "documentsReceived": true,
    "photoEvidence": ["DEL-001-PHOTO-1.jpg", "DEL-001-PHOTO-2.jpg"],
    "notes": "All materials verified and stored as per procedure",
    "issues": "None",
    "createdDate": "2025-10-10",
    "createdBy": "Rajesh Kumar"
  },
  {
    "deliveryId": "DEL-002",
    "siteId": "SITE-DLH-001",
    "shipmentId": "SHIP-WO-N25-001-SITE-002",
    "deliveryDate": "2025-10-15",
    "expectedDeliveryDate": "2025-10-15",
    "deliveryTime": "10:15",
    "status": "received",
    "onTimeStatus": "delayed",
    "delayMinutes": 45,
    
    "supervisorName": "Rajesh Kumar",
    "receivedTime": "10:15",
    "receivedBy": "Rajesh Kumar",
    
    "vehicleNumber": "KA-01-GH-3456",
    "driverName": "Suresh Menon",
    "driverMobile": "+91 9876543346",
    
    "items": [
      {
        "itemId": "DEL-002-ITEM-1",
        "material": "Executive Desks",
        "description": "Executive Desk - Walnut Finish",
        "unit": "nos",
        "orderQuantity": 5,
        "receivedQuantity": 5,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "rate": 19000,
        "totalAmount": 95000,
        "storageLocation": "Warehouse-B, Section-A",
        "condition": "Good"
      },
      {
        "itemId": "DEL-002-ITEM-2",
        "material": "Lounge Seating",
        "description": "3-Seater Sofa Set - Navy Blue",
        "unit": "set",
        "orderQuantity": 2,
        "receivedQuantity": 2,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "rate": 24000,
        "totalAmount": 48000,
        "storageLocation": "Warehouse-B, Section-C",
        "condition": "Good"
      }
    ],
    
    "totalAmount": 143000,
    "documentsReceived": true,
    "photoEvidence": ["DEL-002-PHOTO-1.jpg"],
    "notes": "Traffic delay due to Ring Road congestion",
    "issues": "45 minute delay",
    "createdDate": "2025-10-15",
    "createdBy": "Rajesh Kumar"
  },
  {
    "deliveryId": "DEL-003",
    "siteId": "SITE-MUM-001",
    "shipmentId": "SHIP-WO-N25-002-SITE-001",
    "deliveryDate": "2025-10-12",
    "expectedDeliveryDate": "2025-10-12",
    "deliveryTime": "08:45",
    "status": "received",
    "onTimeStatus": "on-time",
    "delayMinutes": 0,
    
    "supervisorName": "Amit Verma",
    "receivedTime": "08:45",
    "receivedBy": "Amit Verma",
    
    "vehicleNumber": "MH-02-AB-5678",
    "driverName": "Manoj Kumar",
    "driverMobile": "+91 9876543347",
    
    "items": [
      {
        "itemId": "DEL-003-ITEM-1",
        "material": "Bamboo Desks",
        "description": "Bamboo Workstation Desks - Eco-Friendly",
        "unit": "nos",
        "orderQuantity": 15,
        "receivedQuantity": 15,
        "damagedQuantity": 0,
        "shortageQuantity": 0,
        "rate": 22000,
        "totalAmount": 330000,
        "storageLocation": "Warehouse-Main, Section-D",
        "condition": "Good"
      }
    ],
    
    "totalAmount": 330000,
    "documentsReceived": true,
    "photoEvidence": ["DEL-003-PHOTO-1.jpg"],
    "notes": "Perfect delivery. All items certified.",
    "issues": "None",
    "createdDate": "2025-10-12",
    "createdBy": "Amit Verma"
  }
];

// ===== WEEKLY USAGE LOGS - Supervisor logs material usage weekly =====
export const weeklyUsageLogs = [
  {
    "usageLogId": "WUL-001",
    "siteId": "SITE-DLH-001",
    "weekStartDate": "2025-10-06",
    "weekEndDate": "2025-10-12",
    "weekNumber": "W1",
    "month": "Oct-2025",
    
    "supervisorName": "Rajesh Kumar",
    "loggedDate": "2025-10-13",
    "loggedTime": "16:30",
    "approvedBy": "Vikram Singh",
    "approvalDate": "2025-10-13",
    "approvalStatus": "approved", // pending / approved / rejected
    
    "materials": [
      {
        "materialId": "WUL-001-M1",
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "openingStock": 80,
        "receipts": 0,
        "used": 30,
        "damaged": 2,
        "waste": 3,
        "closingStock": 45,
        "unitRate": 650,
        "usageCost": 19500,
        "damageValue": 1300,
        "wasteValue": 1950,
        "usagePurpose": "Executive Desk assembly (25 sheets), Lounge base (5 sheets)",
        "storageLocation": "Warehouse-A, Rack-1"
      },
      {
        "materialId": "WUL-001-M2",
        "material": "Ergonomic Chairs",
        "description": "Ergonomic Chair (Final Model)",
        "unit": "nos",
        "openingStock": 10,
        "receipts": 0,
        "used": 8,
        "damaged": 0,
        "waste": 0,
        "closingStock": 2,
        "unitRate": 4750,
        "usageCost": 38000,
        "damageValue": 0,
        "wasteValue": 0,
        "usagePurpose": "Installed in conference room",
        "storageLocation": "Warehouse-A, Section-B"
      },
      {
        "materialId": "WUL-001-M3",
        "material": "Wood Screws",
        "description": "Industrial Wood Screws (1.5 inch)",
        "unit": "boxes",
        "openingStock": 10,
        "receipts": 0,
        "used": 4,
        "damaged": 0,
        "waste": 0,
        "closingStock": 6,
        "unitRate": 280,
        "usageCost": 1120,
        "damageValue": 0,
        "wasteValue": 0,
        "usagePurpose": "Desk assembly (2 boxes), Sofa frame (2 boxes)",
        "storageLocation": "Hardware Store"
      }
    ],
    
    "weekSummary": {
      "totalMaterialTypes": 3,
      "totalUsageCost": 58620,
      "totalDamageValue": 1300,
      "totalWasteValue": 1950,
      "usageEfficiency": 96.5, // %
      "workersDeployed": 8,
      "manHoursWorked": 64
    },
    
    "safetyIncidents": "None",
    "qualityIssues": "2 sheets damaged during handling - addressed with team",
    "nextWeekRequirements": "50 sheets plywood, 20 chairs, 2 lounge sets",
    "notes": "Good progress. Material consumption as expected.",
    "attachments": ["Weekly_Report_W1.pdf"],
    "createdDate": "2025-10-13"
  },
  {
    "usageLogId": "WUL-002",
    "siteId": "SITE-DLH-001",
    "weekStartDate": "2025-10-13",
    "weekEndDate": "2025-10-19",
    "weekNumber": "W2",
    "month": "Oct-2025",
    
    "supervisorName": "Rajesh Kumar",
    "loggedDate": "2025-10-20",
    "loggedTime": "15:45",
    "approvedBy": "Vikram Singh",
    "approvalDate": "2025-10-20",
    "approvalStatus": "approved",
    
    "materials": [
      {
        "materialId": "WUL-002-M1",
        "material": "Plywood",
        "description": "18mm Commercial Ply Sheets (Birch)",
        "unit": "sheets",
        "openingStock": 45,
        "receipts": 50,
        "used": 35,
        "damaged": 1,
        "waste": 4,
        "closingStock": 55,
        "unitRate": 650,
        "usageCost": 22750,
        "damageValue": 650,
        "wasteValue": 2600,
        "usagePurpose": "Additional desk panels (25), Storage cabinet (10)",
        "storageLocation": "Warehouse-A, Rack-1 & Rack-2"
      },
      {
        "materialId": "WUL-002-M2",
        "material": "Laminate Rolls",
        "description": "Walnut Matte Laminate Roll",
        "unit": "roll",
        "openingStock": 0,
        "receipts": 25,
        "used": 15,
        "damaged": 0,
        "waste": 2,
        "closingStock": 8,
        "unitRate": 4200,
        "usageCost": 63000,
        "damageValue": 0,
        "wasteValue": 8400,
        "usagePurpose": "Desk surface finishing (13), Cabinet doors (2)",
        "storageLocation": "Warehouse-C, Vertical Racks"
      },
      {
        "materialId": "WUL-002-M3",
        "material": "Wood Polish",
        "description": "Protective Wood Finish Coating",
        "unit": "liters",
        "openingStock": 5,
        "receipts": 0,
        "used": 3,
        "damaged": 0,
        "waste": 0,
        "closingStock": 2,
        "unitRate": 450,
        "usageCost": 1350,
        "damageValue": 0,
        "wasteValue": 0,
        "usagePurpose": "Final coating on finished desks",
        "storageLocation": "Finishing Area"
      }
    ],
    
    "weekSummary": {
      "totalMaterialTypes": 3,
      "totalUsageCost": 87100,
      "totalDamageValue": 650,
      "totalWasteValue": 11000,
      "usageEfficiency": 94.2,
      "workersDeployed": 10,
      "manHoursWorked": 80
    },
    
    "safetyIncidents": "Minor cut during laminate cutting - first aid provided, OSHA reported",
    "qualityIssues": "Laminate waste slightly higher - 2 rolls. Quality acceptable.",
    "nextWeekRequirements": "30 sheets plywood, 15 laminate rolls, wood polish refill",
    "notes": "Second week smooth. Minor safety incident managed properly.",
    "attachments": ["Weekly_Report_W2.pdf", "Safety_Report_W2.pdf"],
    "createdDate": "2025-10-20"
  },
  {
    "usageLogId": "WUL-003",
    "siteId": "SITE-MUM-001",
    "weekStartDate": "2025-10-13",
    "weekEndDate": "2025-10-19",
    "weekNumber": "W1",
    "month": "Oct-2025",
    
    "supervisorName": "Amit Verma",
    "loggedDate": "2025-10-20",
    "loggedTime": "14:20",
    "approvedBy": "Priya Desai",
    "approvalDate": "2025-10-20",
    "approvalStatus": "approved",
    
    "materials": [
      {
        "materialId": "WUL-003-M1",
        "material": "Bamboo Desks",
        "description": "Bamboo Workstation Desks - Eco-Friendly",
        "unit": "nos",
        "openingStock": 15,
        "receipts": 0,
        "used": 10,
        "damaged": 0,
        "waste": 0,
        "closingStock": 5,
        "unitRate": 22000,
        "usageCost": 220000,
        "damageValue": 0,
        "wasteValue": 0,
        "usagePurpose": "Main office area workstations installation",
        "storageLocation": "Warehouse-Main, Section-D"
      }
    ],
    
    "weekSummary": {
      "totalMaterialTypes": 1,
      "totalUsageCost": 220000,
      "totalDamageValue": 0,
      "totalWasteValue": 0,
      "usageEfficiency": 100,
      "workersDeployed": 5,
      "manHoursWorked": 40
    },
    
    "safetyIncidents": "None",
    "qualityIssues": "None",
    "nextWeekRequirements": "10 recycled chairs, 5 bamboo desks",
    "notes": "Perfect execution. Eco materials performing excellently.",
    "attachments": ["Weekly_Report_MUM_W1.pdf"],
    "createdDate": "2025-10-20"
  }
];

// ===== EXPORT DATA =====
export const allSiteData = {
  siteBranches,
  materialDeliveries,
  weeklyUsageLogs
};

export const allData = {
  salespersons,
  customerInteractions,
  leads,
  quotations,
  clients,
  tenders,
  po,
  workOrders,
  godownInventory,
  officeBranches,
  Productchecklist,
  poVendor,
  annextures,
  shipments,
  shipmentUpdates,
  dispatchCheckpoints
};