import { Farm, Product, Project, NewsArticle, Service, JobPosition, GalleryItem, FAQItem } from '../types';

export const COMPANY_INFO = {
  name: 'Napoleon Steadings Ltd.',
  shortName: 'Napoleon Steadings',
  founderCeo: 'Julian Tsikata',
  tagline: 'Growing Today. Building Tomorrow.',
  subtitle: 'Modern agricultural enterprise rooted in Volta Region, Ghana, with a vision for sustainable growth and global impact under the leadership of Founder & CEO Julian Tsikata.',
  headquarters: {
    address: 'No. 1 Street, Barracks New Town',
    city: 'Ho',
    region: 'Volta Region',
    country: 'Ghana',
    fullAddress: 'No. 1 Street, Barracks New Town, Ho, Volta Region, Ghana',
    coordinates: [6.6001, 0.4703] as [number, number],
    phone: '+233 (0) 36 219 4088',
    email: 'info@napoleonsteadings.com',
    supportEmail: 'contact@napoleonsteadings.com'
  },
  stats: [
    { label: 'Operational Farmland', value: 3500, suffix: '+ Acres', number: 3500 },
    { label: 'Crop Yield Capacity', value: 18500, suffix: ' Metric Tons/Yr', number: 18500 },
    { label: 'Active Farm Sites', value: 5, suffix: ' Locations', number: 5 },
    { label: 'Agro-Processing Efficiency', value: 98, suffix: '% Precision', number: 98 },
    { label: 'Local Outgrowers Partnered', value: 420, suffix: ' Farmers', number: 420 },
    { label: 'Volta Water Conservation', value: 45, suffix: '% Saved/Yr', number: 45 }
  ]
};

export const FARMS_DATA: Farm[] = [
  {
    id: 'farm-1',
    slug: 'ho-central-commercial-estate',
    name: 'Ho Central Commercial Estate',
    location: 'Ho - Adaklu Plains',
    district: 'Ho Municipal / Adaklu District',
    region: 'Volta Region, Ghana',
    coordinates: [6.5612, 0.4912],
    sizeAcres: 1250,
    farmType: 'Commercial Crop',
    status: 'Fully Operational',
    mainCrops: ['Maize (Corn)', 'Soybeans', 'Yellow Cassava', 'Sesame'],
    description: 'Our flagship commercial crop hub situated on the fertile soils of the Adaklu plains just outside Ho. Features mechanized land preparation, center-pivot drip irrigation systems, and automated soil nutrient sensors.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800'
    ],
    infrastructure: ['12,000 MT Automated Silo Complex', 'Tractor Fleet & Harvester Depot', 'Soil Moisture Sensor Mesh', 'Solar Water Pumping Station'],
    irrigationSource: 'Adaklu Aquifer Sub-surface Drip & Solar Pivot Systems'
  },
  {
    id: 'farm-2',
    slug: 'kpando-lakeside-horticulture-hub',
    name: 'Kpando Lakeside Horticulture Hub',
    location: 'Kpando / Lake Volta Basin',
    district: 'Kpando Municipal',
    region: 'Volta Region, Ghana',
    coordinates: [7.0012, 0.2988],
    sizeAcres: 750,
    farmType: 'Horticulture & Greenhouse',
    status: 'Fully Operational',
    mainCrops: ['Smooth Cayenne Pineapple', 'Vegetable Varieties (Tomatoes, Bell Peppers)', 'Papaya', 'Mangoes'],
    description: 'Harnessing the micro-climate and water security of Lake Volta, this facility features climate-controlled shade-net greenhouses and drip-irrigated fruit orchards producing premium export-grade produce.',
    heroImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&q=80&w=800'
    ],
    infrastructure: ['20-Hectare Netted Greenhouse Complex', 'Solar Cold-Storage Room (2°C - 8°C)', 'Drip Fertigation System'],
    irrigationSource: 'Direct Lake Volta Micro-Filtered Pumping System'
  },
  {
    id: 'farm-3',
    slug: 'tongu-integrated-livestock-ranch',
    name: 'Tongu Integrated Livestock Ranch',
    location: 'Sogakope - South Tongu',
    district: 'South Tongu District',
    region: 'Volta Region, Ghana',
    coordinates: [5.9981, 0.5982],
    sizeAcres: 900,
    farmType: 'Livestock & Poultry',
    status: 'Expanding',
    mainCrops: ['Sanga & White Fulani Cattle', 'Layer & Broiler Poultry', 'Boer Goats'],
    description: 'An eco-friendly, pastured livestock ranch prioritizing humane animal husbandry, rotational grazing, biogas energy recovery from organic farm waste, and high-protein fodder production.',
    heroImage: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800'
    ],
    infrastructure: ['Biogas Digester & Renewable Power Plant', 'Climate-Ventilated Poultry Pens', 'Veterinary Testing Lab', 'Organic Feed Mill'],
    irrigationSource: 'Volta River Intake & Recycled Bio-water'
  },
  {
    id: 'farm-4',
    slug: 'hohoe-agro-processing-and-logistics-depot',
    name: 'Hohoe Agro-Processing & Logistics Depot',
    location: 'Hohoe Industrial Zone',
    district: 'Hohoe Municipal',
    region: 'Volta Region, Ghana',
    coordinates: [7.1511, 0.4731],
    sizeAcres: 400,
    farmType: 'Agro-Processing & Logistics',
    status: 'Fully Operational',
    mainCrops: ['Cassava Starch & Flour', 'Refined Grains', 'Packaged Juices', 'Dehydrated Spices'],
    description: 'The central industrial nexus for cleaning, grading, processing, and packaging raw agricultural yields into shelf-stable commercial products for national distribution and export.',
    heroImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800'
    ],
    infrastructure: ['Cassava High-Grade Flour Line', 'Grain Grading & Optical Sorting Plant', 'Refrigerated Transport Logistics Fleet'],
    irrigationSource: 'Municipal Clean Supply & Rainwater Recovery'
  },
  {
    id: 'farm-5',
    slug: 'ave-dakpa-seedling-and-research-center',
    name: 'Ave-Dakpa Seedling & Research Center',
    location: 'Ave-Dakpa',
    district: 'Akatsi North',
    region: 'Volta Region, Ghana',
    coordinates: [6.4211, 0.8122],
    sizeAcres: 200,
    farmType: 'Horticulture & Greenhouse',
    status: 'In Development',
    mainCrops: ['High-Yield Hybrid Maize Seeds', 'Drought-Resilient Cassava Cuttings', 'Vegetable Seedlings'],
    description: 'Dedicated agricultural innovation and biotechnology site focused on propagating high-yielding, pest-resistant seeds and supplying certified disease-free planting materials to smallholder outgrowers.',
    heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1600',
    galleryImages: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800'
    ],
    infrastructure: ['Agronomy Testing Laboratory', 'Tissue Culture Propagation Nursery', 'Soil Micro-biome Analysis Bench'],
    irrigationSource: 'Solar Borehole Micro-drip Network'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    slug: 'premium-golden-maize-grain',
    name: 'Premium Golden Maize Grain',
    category: 'Grains & Cereals',
    tagline: 'Sun-dried, triple-cleaned yellow and white maize grains for commercial milling and poultry feed.',
    description: 'Cultivated under precision farming methods in our Ho Central Estate. Machine harvested and optically sorted to ensure uniform moisture (<12.5%), high starch density, and zero aflatoxin contamination.',
    harvestSeason: 'Bi-Annual (July & December)',
    packagingOptions: ['50kg Woven Polypropylene Bags', '1 Ton Jumbo Bulk Bags', 'Bulk Grain Truckloads'],
    minOrderQuantity: '5 Metric Tons',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800'
    ],
    nutritionalHighlights: ['100% Non-GMO', 'Moisture <12.5%', 'Protein content: 9.2%'],
    isFeatured: true
  },
  {
    id: 'prod-2',
    slug: 'fresh-smooth-cayenne-pineapples',
    name: 'Volta Gold Smooth Cayenne Pineapples',
    category: 'Fruits & Vegetables',
    tagline: 'Sweet, low-acid export quality pineapples grown along Lake Volta.',
    description: 'Hand-picked at peak brix level (14°+). Renowned for succulent golden flesh, rich fragrance, and extended shelf life suitable for air freight or sea container logistics.',
    harvestSeason: 'Year-Round Continuous Production',
    packagingOptions: ['Standard 12kg Export Cartons (6-8 pieces)', 'Bulk Processing Crates'],
    minOrderQuantity: '1 Metric Ton',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=800'
    ],
    nutritionalHighlights: ['Brix Sugar Level: >14°', 'High Vitamin C', 'Zero Artificial Ripeners'],
    isFeatured: true
  },
  {
    id: 'prod-3',
    slug: 'high-grade-cassava-flour-and-starch',
    name: 'High-Grade Industrial Cassava Flour (HQCF)',
    category: 'Processed Goods',
    tagline: 'Unmodified, odorless white cassava flour engineered for food bakery and industrial adhesive applications.',
    description: 'Milled within 24 hours of root harvest at our Hohoe depot to retain high starch purity and pristine natural whiteness. An ideal gluten-free alternative for commercial breadmaking and snack manufacturing.',
    harvestSeason: 'Continuous',
    packagingOptions: ['25kg Multi-layer Kraft Paper Bags', '50kg Poly Bags'],
    minOrderQuantity: '2 Metric Tons',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    nutritionalHighlights: ['100% Gluten-Free', 'Fine mesh size: 100 microns', 'White index >92%'],
    isFeatured: true
  },
  {
    id: 'prod-4',
    slug: 'greenhouse-bell-peppers-and-tomatoes',
    name: 'Greenhouse Tomatoes & Bell Peppers',
    category: 'Fresh Produce',
    tagline: 'Crisp, pesticide-conscious greenhouse peppers and firm vine-ripe tomatoes.',
    description: 'Grown inside protected shade-net structures with biological pest controls. Uniform sizing, vibrant color saturation, and thick skin integrity for reduced transport loss.',
    harvestSeason: 'Weekly Harvests',
    packagingOptions: ['10kg Ventilated Plastic Crates', 'Custom Retail Trays'],
    minOrderQuantity: '500 kg',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&q=80&w=800'
    ],
    nutritionalHighlights: ['Rich in Lycopene', 'Pesticide-Residue Certified Free', 'Extended Shelf-life'],
    isFeatured: false
  },
  {
    id: 'prod-5',
    slug: 'pasture-raised-poultry-and-farm-eggs',
    name: 'Fresh Pasture-Raised Eggs & Broilers',
    category: 'Livestock & Poultry',
    tagline: 'Farm-fresh eggs with rich golden yolks and grain-fed pastured broilers.',
    description: 'Produced at the Tongu Integrated Livestock Ranch. Hens are free to forage on open grass pastures and fed a fortified 100% natural grain ration produced from our own farm harvests.',
    harvestSeason: 'Daily Harvest',
    packagingOptions: ['30-Egg Trays (Carton Boxes of 12 Trays)', 'Dressed Frozen Whole Birds'],
    minOrderQuantity: '50 Trays / 100 Dressed Birds',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800'
    ],
    nutritionalHighlights: ['Rich in Omega-3', 'Hormone-Free', 'Grade-A Freshness'],
    isFeatured: true
  },
  {
    id: 'prod-6',
    slug: 'certified-hybrid-seedlings',
    name: 'Certified Hybrid Crop Seedlings & Cuttings',
    category: 'Seeds & Inputs',
    tagline: 'Disease-free, high-potency planting materials engineered for African soil conditions.',
    description: 'Nurtured in our Ave-Dakpa nursery. Includes drought-hardy cassava cuttings, disease-resistant tomato plugs, and high-germination hybrid maize seed stocks.',
    harvestSeason: 'Pre-Planting Season Delivery',
    packagingOptions: ['Nursery Plug Trays', 'Bundled Seedling Crated Stocks'],
    minOrderQuantity: '1,000 Seedlings',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800'
    ],
    nutritionalHighlights: ['>95% Germination Rate', 'Mosaic-Virus Resistant', 'Fast Establish Growth'],
    isFeatured: false
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    slug: 'volta-smart-solar-irrigation-expansion',
    title: 'Volta Smart Solar Irrigation Expansion',
    category: 'Irrigation & Smart Ag',
    status: 'Ongoing',
    location: 'Ho & Kpando Agricultural Zones',
    startDate: 'Q1 2025',
    completionTarget: 'Q4 2026',
    summary: 'Deploying solar-powered sub-surface drip irrigation across 1,500 additional acres to eliminate seasonal rainfall dependence and enable triple-crop harvests.',
    fullDescription: 'The Volta Smart Solar Irrigation Initiative transitions our commercial farm holdings from rainfed vulnerability to climate-resilient precision watering. Powered by a 450kW floating solar array on Lake Volta and Adaklu solar wells, water application is calculated dynamically using satellite ET (evapotranspiration) data.',
    objectives: [
      'Transition 1,500 acres from rain-fed to precision drip fertigation',
      'Reduce water pumping energy footprint by 100% via solar photovoltaics',
      'Increase annual grain yields by 2.4x per acre'
    ],
    impactMetrics: [
      { label: 'Farmland Covered', value: '1,500 Acres' },
      { label: 'CO2 Offset/Yr', value: '820 Tons' },
      { label: 'Yield Multiplier', value: '+240%' }
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'proj-2',
    slug: 'kpando-cold-chain-and-processing-depot',
    title: 'Kpando Solar-Powered Cold-Chain Hub',
    category: 'Processing & Storage',
    status: 'Completed',
    location: 'Kpando Municipal',
    startDate: 'Q2 2024',
    completionTarget: 'Q1 2025',
    summary: 'Construction of a 500-ton zero-emission refrigerated packhouse to drastically eliminate post-harvest losses for fruit and vegetable farmers in the Volta Region.',
    fullDescription: 'Post-harvest decay historically damages up to 40% of perishable horticultural crops in West Africa. Napoleon Steadings Ltd. constructed a state-of-the-art cold packhouse powered by thermal solar storage, giving fresh pineapples and tomatoes up to 28 days of preserved freshness.',
    objectives: [
      'Eliminate local post-harvest spoilage for regional fruit growers',
      'Enable direct cold-chain transport from Volta farms to Tema Port for international export',
      'Provide local outgrowers with pay-per-use cold room access'
    ],
    impactMetrics: [
      { label: 'Storage Capacity', value: '500 Tons' },
      { label: 'Spoilage Reduction', value: '88%' },
      { label: 'Outgrowers Served', value: '320 Farmers' }
    ],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'proj-3',
    slug: 'volta-basin-outgrower-empowerment-program',
    title: 'Volta Basin Smallholder Outgrower Scheme',
    category: 'Community & Training',
    status: 'Ongoing',
    location: 'Across 6 Districts in Volta Region',
    startDate: 'Q3 2023',
    completionTarget: 'Continuous',
    summary: 'Providing 500+ local farming families with certified high-yield seeds, tractor land preparation services, agronomic training, and guaranteed market off-take agreements.',
    fullDescription: 'By combining corporate scale with community partnership, Napoleon Steadings Ltd. provides local farmers with credit-based farm inputs, tractor mechanization, and a guaranteed off-take price for their harvest, elevating household incomes while expanding raw material supply for our processing lines.',
    objectives: [
      'Empower 500+ smallholder farming households with commercial access',
      'Train farmers in sustainable soil conservation and zero-burning land clearing',
      'Guaranteed buyback pricing to hedge market price volatility'
    ],
    impactMetrics: [
      { label: 'Farmers Enrolled', value: '420+' },
      { label: 'Avg Income Growth', value: '+165%' },
      { label: 'Hectares Mechanized', value: '1,200 Ha' }
    ],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200'
  }
];

export const NEWS_DATA: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'napoleon-steadings-launches-smart-agri-hub-in-ho',
    title: 'Napoleon Steadings Ltd. Inaugurates State-of-the-Art Agricultural Complex in Ho, Volta Region',
    category: 'Company News',
    date: 'August 1, 2026',
    readTime: '4 min read',
    summary: 'With corporate headquarters situated at No. 1 Street, Barracks New Town, Ho, the company expands its commercial farming footprint with automated grain storage and IoT soil monitoring.',
    content: [
      'HO, VOLTA REGION — Napoleon Steadings Ltd., a leading Ghanaian agricultural enterprise, officially commissioned its upgraded operational headquarters and commercial grain storage complex in Ho.',
      'The modern facility serves as the command center for over 3,500 acres of commercial crop estates, livestock ranches, and fruit orchards spanning the Volta Region.',
      '"Our vision is to demonstrate that modern technology, commercial scale, and deep respect for African soil can transform the agricultural landscape," stated Founder & CEO Julian Tsikata during the unveiling ceremony.',
      'The facility integrates automated grain testing labs, tractor maintenance bays, and digital farm management software linked directly to field agronomists.'
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    author: 'Corporate Communications',
    authorRole: 'Napoleon Steadings Ltd.'
  },
  {
    id: 'news-2',
    slug: 'sustainable-precision-farming-in-volta-basin',
    title: 'How Precision Agriculture & Drip Fertigation Are Elevating Yields in West Africa',
    category: 'Agricultural Tech',
    date: 'July 18, 2026',
    readTime: '6 min read',
    summary: 'Exploring how real-time soil moisture telemetry and targeted fertigation allow commercial estates to achieve record harvests while conserving 45% more water.',
    content: [
      'In traditional rain-fed farming across West Africa, dry spells during key flowering stages can diminish crop yields by up to 60%.',
      'At Napoleon Steadings Ltd., field agronomists deploy sub-surface moisture telemetry probes across Adaklu and Kpando fields, delivering water and micro-nutrients directly to root zones.',
      'Results show a 240% increase in maize density per acre with a 45% reduction in total water consumption per ton produced.',
      'This technology forms the blueprint for sustainable, climate-smart food production across the continent.'
    ],
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=1000',
    author: 'Dr. Kwame Mensah',
    authorRole: 'Head Agronomist'
  },
  {
    id: 'news-3',
    slug: 'expanding-ghana-horticulture-exports',
    title: 'Unlocking Global Markets: Volta Region Fruit Orchards Enter International Supply Chains',
    category: 'Market Trends',
    date: 'June 28, 2026',
    readTime: '5 min read',
    summary: 'With GlobalG.A.P standard compliance and solar cold-chain facilities, Smooth Cayenne pineapples from Kpando are reaching premium international distributors.',
    content: [
      'The Volta Lake basin offers exceptional climatic conditions for high-brix pineapple, papaya, and mango cultivation.',
      'Napoleon Steadings Ltd. has completed its international certification audit, unlocking direct commercial shipment routes to European and Middle Eastern buyers.',
      'By maintaining an unbroken solar cold-chain from harvest to Tema port, fruit shelf life is extended naturally without synthetic chemical treatments.'
    ],
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=1000',
    author: 'Esi Dzifa',
    authorRole: 'Export & Commercial Director'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-1',
    slug: 'commercial-crop-farming',
    title: 'Large-Scale Commercial Crop Farming',
    shortDesc: 'Turnkey mechanized crop cultivation, land management, and yield maximization for staples and grains.',
    fullDesc: 'We operate large-scale mechanized crop production specializing in maize, soybeans, cassava, sesame, and sorghum using modern land preparation equipment, precision planting, and automated harvesting.',
    capabilities: ['Mechanized Tillage & Precision Planting', 'Drip & Pivot Fertigation Management', 'Optical Sorting & Moisture-Controlled Silo Storage'],
    iconName: 'Sprout',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-2',
    slug: 'farm-development-and-management',
    title: 'Agricultural Farm Development & Management',
    shortDesc: 'Transforming greenfield land into high-yield commercial farm estates with complete infrastructure setup.',
    fullDesc: 'From topographical land surveys, soil chemistry testing, and irrigation borehole drilling to tractor fleet deployment and staff management, we convert raw acreage into productive farming operations.',
    capabilities: ['Topographical & Soil Microbiome Audits', 'Irrigation Infrastructure Engineering', 'Operational Staffing & Field Management'],
    iconName: 'Tractor',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-3',
    slug: 'agro-processing-and-value-addition',
    title: 'Agro-Processing & Value Addition',
    shortDesc: 'Converting raw agricultural harvests into shelf-stable industrial and consumer products.',
    fullDesc: 'Operating specialized milling, starch extraction, fruit washing, dehydration, and packaging facilities designed to maximize market value and remove post-harvest losses.',
    capabilities: ['High-Grade Cassava Starch Extraction', 'Fruit Sorting, Washing & Solar Cold Storage', 'Bulk Custom Industrial Packaging'],
    iconName: 'Factory',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'srv-4',
    slug: 'agricultural-logistics-and-cold-chain',
    title: 'Agricultural Logistics & Cold-Chain Supply',
    shortDesc: 'End-to-end refrigerated transport and bulk haulage across Ghana and regional port hubs.',
    fullDesc: 'Ensuring farm produce reaches processors, supermarkets, and export ports in peak condition with GPS-monitored refrigerated trucking and temperature-controlled storage warehouses.',
    capabilities: ['Multi-Temperature Refrigerated Haulage', 'Real-time Cargo Telemetry', 'Port Logistics & Customs Clearance Support'],
    iconName: 'Truck',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Green Field Maize Canopy at Dawn',
    category: 'Crops',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
    caption: 'Verdant commercial maize field in Adaklu Plains catching the first morning sun.',
    location: 'Ho Central Commercial Estate, Ghana'
  },
  {
    id: 'gal-2',
    title: 'Mechanized Harvester Operations',
    category: 'Machinery',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=1200',
    caption: 'Modern combine harvester clearing grain acreage during the main harvest season.',
    location: 'Ho Municipal District'
  },
  {
    id: 'gal-3',
    title: 'Shade-Net Horticulture Greenhouse',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200',
    caption: 'Climate-controlled greenhouse cultivation producing export-grade bell peppers.',
    location: 'Kpando Lakeside Hub'
  },
  {
    id: 'gal-4',
    title: 'Pasture-Raised Cattle Grazing',
    category: 'Farms',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=1200',
    caption: 'Healthy pastured cattle under rotational pasture management.',
    location: 'Tongu Integrated Ranch'
  },
  {
    id: 'gal-5',
    title: 'Volta Region Agricultural Landscape',
    category: 'Volta Region',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200',
    caption: 'Panoramic view of rich volcanic soils and rolling hills in the Volta Region.',
    location: 'Volta Region, Ghana'
  },
  {
    id: 'gal-6',
    title: 'Industrial Grain Sorting Depot',
    category: 'Processing',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200',
    caption: 'Optical sorting and high-capacity automated grain cleaning equipment.',
    location: 'Hohoe Processing Depot'
  },
  {
    id: 'gal-7',
    title: 'Organic Fruit Harvest Sorting',
    category: 'People',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&q=80&w=1200',
    caption: 'Skilled agricultural team hand-selecting fresh pineapples for cold packhouse storage.',
    location: 'Kpando, Volta Region'
  },
  {
    id: 'gal-8',
    title: 'Nursery Hybrid Seedling Propagation',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200',
    caption: 'Disease-resistant vegetable plugs grown under precision misting systems.',
    location: 'Ave-Dakpa Research Center'
  }
];

export const CAREERS_DATA: JobPosition[] = [
  {
    id: 'job-1',
    slug: 'senior-agronomist-crop-production',
    title: 'Senior Agronomist — Commercial Crop Operations',
    department: 'Agronomy & Farm Ops',
    location: 'Ho / Adaklu, Volta Region, Ghana',
    employmentType: 'Full-time',
    experienceLevel: '5+ Years Experience',
    description: 'We are seeking an experienced Agronomist to lead crop nutrition, soil health protocols, and integrated pest management across 2,000+ acres of commercial grain farmland.',
    responsibilities: [
      'Manage seasonal crop rotation schedules for maize, soybeans, and cassava.',
      'Supervise soil sampling, nutrient fertigation regimes, and plant pathology audits.',
      'Operate digital farm management software and analyze satellite biomass imagery.',
      'Train field supervisors and outgrower farm extension agents.'
    ],
    requirements: [
      'B.Sc. or M.Sc. in Agronomy, Crop Science, or Agricultural Technology.',
      'Minimum 5 years leading large-scale mechanized crop production in Sub-Saharan Africa.',
      'Strong command of modern drip/pivot irrigation and soil moisture telemetry.',
      'Fluency in English; knowledge of Ewe is an advantage.'
    ]
  },
  {
    id: 'job-2',
    slug: 'smart-ag-and-iot-systems-specialist',
    title: 'Smart Ag & IoT Systems Engineer',
    department: 'Smart Ag & Tech',
    location: 'Ho Headquarters, Volta Region, Ghana',
    employmentType: 'Full-time',
    experienceLevel: '3+ Years Experience',
    description: 'Lead the installation, monitoring, and maintenance of soil sensors, weather stations, solar water pumps, and automated telemetry networks.',
    responsibilities: [
      'Maintain field IoT telemetry networks connecting soil moisture probes to central dashboard.',
      'Configure automated solar fertigation controllers and drone mapping workflows.',
      'Troubleshoot hardware sensor nodes and optimize LoRaWAN/cellular connectivity.'
    ],
    requirements: [
      'B.Sc. in Agricultural Engineering, Electrical Engineering, or Mechatronics.',
      'Hands-on experience with IoT sensors, solar PV power systems, and microcontrollers.',
      'Passion for field-deployed technology solutions in rural agricultural environments.'
    ]
  },
  {
    id: 'job-3',
    slug: 'agro-processing-plant-supervisor',
    title: 'Agro-Processing Facility Supervisor',
    department: 'Agro-Processing',
    location: 'Hohoe Industrial Zone, Volta Region, Ghana',
    employmentType: 'Full-time',
    experienceLevel: '4+ Years Experience',
    description: 'Oversee daily operations at our cassava starch extraction and grain milling facility, ensuring high throughput, ISO/HACCP food safety, and equipment uptime.',
    responsibilities: [
      'Direct daily processing shifts for cassava flour and grain grading lines.',
      'Enforce HACCP and ISO food safety and quality control standards.',
      'Manage preventive maintenance schedules for heavy mechanical processing machinery.'
    ],
    requirements: [
      'Degree in Food Science, Chemical Engineering, or Industrial Machinery.',
      'Proven supervisory experience in food processing or grain milling plants.',
      'Strong leadership and safety protocol management.'
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Company',
    question: 'Where is Napoleon Steadings Ltd. headquartered?',
    answer: 'Napoleon Steadings Ltd. is headquartered in Ho, Volta Region, Ghana, at No. 1 Street, Barracks New Town. Our commercial farm holdings, greenhouses, and processing depots are distributed across key agricultural districts in the Volta Region.'
  },
  {
    category: 'Company',
    question: 'What is the corporate mission of Napoleon Steadings Ltd.?',
    answer: 'Our mission is to lead modern, highly efficient, and sustainable agricultural production in West Africa through technology integration, mechanized farming, community outgrower partnerships, and value-add processing.'
  },
  {
    category: 'Agriculture',
    question: 'What types of crops and livestock do you produce?',
    answer: 'Our operations cover commercial grain crops (maize, soybeans), root tubers (cassava), fresh horticulture (Smooth Cayenne pineapples, greenhouse tomatoes, bell peppers), and pasture-raised livestock (cattle, laying hens, broilers).'
  },
  {
    category: 'Agriculture',
    question: 'How does Napoleon Steadings incorporate sustainable farming practices?',
    answer: 'We utilize precision drip irrigation powered by solar energy, rotational grazing to regenerate pasture soils, organic biogas energy recovery from farm waste, zero-burning land clearance, and biological pest controls inside greenhouses.'
  },
  {
    category: 'Products',
    question: 'How can commercial buyers purchase bulk farm produce or processed goods?',
    answer: 'Commercial buyers, food manufacturers, feed mills, and exporters can submit a direct product inquiry through our website, or contact our commercial desk at commercial@napoleonsteadings.com. We handle bulk packaging and supply contracts.'
  },
  {
    category: 'Partnerships',
    question: 'Does Napoleon Steadings Ltd. work with local smallholder farmers?',
    answer: 'Yes! Through our Volta Basin Outgrower Scheme, we partner with over 400 local farming households, providing tractor mechanization, certified seeds, agronomic training, and guaranteed market buyback contracts.'
  },
  {
    category: 'Partnerships',
    question: 'How can investors or commercial partners collaborate with Napoleon Steadings Ltd.?',
    answer: 'We welcome institutional, commercial, and technical partnerships to expand farm infrastructure, processing capacity, and export trade routes. Please visit our Partnerships or Investment page to initiate a discussion.'
  }
];
