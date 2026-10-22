/**
 * Educational content for the species pages linked from conservation alerts —
 * Issue #1657.
 *
 * Alerts link to `/species/[slug]`, which renders this content alongside the
 * live IUCN assessment cached by the quarterly checker. Copy is written to be
 * accurate about ecology and planting practice; IUCN categories are never
 * hard-coded here because they change — always read them from
 * `species_iucn_status`.
 */

import { TREE_SPECIES, type SpeciesInfo } from '@/lib/constants/species';

/**
 * Scientific names for the catalogue species. Kept here rather than in
 * `lib/constants/species` so the education pages stay self-contained; the
 * authoritative source for IUCN lookups remains `species_catalogue`.
 */
export const SPECIES_SCIENTIFIC_NAMES: Record<string, string> = {
  teak: 'Tectona grandis',
  moringa: 'Moringa oleifera',
  eucalyptus: 'Eucalyptus globulus',
  mangrove: 'Rhizophora mucronata',
  acacia: 'Vachellia nilotica',
  neem: 'Azadirachta indica',
  mahogany: 'Khaya senegalensis',
  baobab: 'Adansonia digitata',
  bamboo: 'Phyllostachys edulis',
  cedar: 'Cedrela odorata',
  pine: 'Pinus caribaea',
  iroko: 'Milicia excelsa',
  shea: 'Vitellaria paradoxa',
  cashew: 'Anacardium occidentale',
  locust_bean: 'Parkia biglobosa',
};

export function scientificNameFor(slug: string): string {
  return SPECIES_SCIENTIFIC_NAMES[slug] ?? slug;
}

export interface SpeciesEducation {
  slug: string;
  commonName: string;
  scientificName: string;
  /** One-paragraph overview of the species and why it is planted. */
  overview: string;
  /** How the species contributes to the ecosystem it is planted in. */
  ecologicalRole: string;
  /** What sponsors should know about threats and recovery work. */
  conservationNote: string;
  /** Practical planting/harvesting notes for the sponsor audience. */
  stewardship: string;
}

const EDUCATION: Record<
  string,
  Omit<SpeciesEducation, 'slug' | 'commonName' | 'scientificName'>
> = {
  teak: {
    overview:
      'Teak is a large deciduous hardwood prized for its weather-resistant timber. Slow-growing and long-lived, a single teak tree can sequester carbon for many decades while providing high-value timber that lets smallholders earn from a standing tree rather than clearing forest.',
    ecologicalRole:
      'Mature teak develops a broad canopy that shades soil, reduces erosion on sloping farmland and provides nesting sites for cavity-dwelling birds. Leaf litter builds soil organic matter on degraded agricultural land.',
    conservationNote:
      'Wild teak populations have declined through logging and habitat conversion, so plantation stock is essential to take pressure off natural forests. Sourcing seed from documented provenance keeps wild stands recoverable.',
    stewardship:
      'Teak reaches commercial maturity in roughly 20 years. It thrives in tropical and subtropical climates with a distinct dry season and responds well to thinning.',
  },
  moringa: {
    overview:
      'Moringa is a fast-growing multipurpose tree whose leaves, pods and seeds are all usable. It is planted across the tropics for food, fodder and soil improvement, and reaches maturity in as little as three years.',
    ecologicalRole:
      'Its deep roots bring subsoil nutrients to the surface, and its nitrogen-rich leaves make excellent green mulch. Windbreak plantings of moringa shelter neighbouring crops and livestock.',
    conservationNote:
      'Moringa is cultivated widely and is not considered threatened, but genetic diversity in farmed stands is narrowing as a handful of clones dominate planting programmes.',
    stewardship:
      'Moringa tolerates arid conditions and poor soils. Regular pruning keeps the canopy productive and makes leaf harvest easier.',
  },
  eucalyptus: {
    overview:
      'Eucalyptus is a fast-growing genus planted worldwide for timber, fibre and firewood. Several species reach harvestable size within a decade, making them a common choice for community woodlots.',
    ecologicalRole:
      'Eucalyptus stabilises degraded hillsides and produces shelterbelt cover quickly. Its flowers are a major nectar source for bees and other pollinators.',
    conservationNote:
      'Many eucalyptus species are of least concern, though some restricted-range endemics are threatened. Monoculture plantings can displace native vegetation, so mixed planting is preferred on restoration sites.',
    stewardship:
      'Eucalyptus grows in tropical, subtropical and temperate zones. It is thirsty relative to most species, so avoid planting it near waterways or in water-scarce catchments.',
  },
  mangrove: {
    overview:
      'Mangroves are salt-tolerant trees of tropical and subtropical coastlines. Planted along shorelines, they trap sediment, buffer storm surge and store carbon in their soils at rates far above most terrestrial forests.',
    ecologicalRole:
      'Mangrove roots form nursery habitat for fish, crabs and shrimp, and roosting structure for coastal birds. A healthy fringe can reduce wave energy reaching the shore by a large margin.',
    conservationNote:
      'Mangroves are among the most threatened ecosystems on earth, lost mainly to aquaculture, coastal development and fuelwood cutting. Every hectare restored reopens a fishery nursery and rebuilds a carbon sink.',
    stewardship:
      'Planting must match species to tidal zone and salinity. Survival depends on getting the inundation regime right, so sites are surveyed before planting.',
  },
  acacia: {
    overview:
      'Acacia is a hardy leguminous tree of African and Australian savannas. It is planted for soil fertility, fodder, charcoal and shade, and establishes quickly even on degraded land.',
    ecologicalRole:
      'Acacias fix atmospheric nitrogen through root nodule bacteria, fertilising the soil for neighbouring plants. Their thorny canopies give livestock and wildlife crucial shade in open savanna.',
    conservationNote:
      'Some acacia relatives are threatened by land conversion and unsustainable harvesting, and several species were split into new genera in recent taxonomy, complicating conservation assessments.',
    stewardship:
      'Acacia is well suited to arid and semi-arid zones. Coppicing after cutting extends the productive life of each planting.',
  },
  neem: {
    overview:
      'Neem is a fast-growing tropical tree whose leaves, bark and seed oil have been used for centuries as natural pest control and medicine. It is one of the most widely planted utility trees in the tropics.',
    ecologicalRole:
      'Neem suppresses soil-borne pests and termites without synthetic chemicals, reducing pesticide pressure on neighbouring crops. Its dense evergreen canopy provides year-round shade.',
    conservationNote:
      'Neem is not threatened and is planted aggressively across Africa and Asia. Its value to restoration lies in protecting other plantings from pest damage during establishment.',
    stewardship:
      'Neem tolerates drought and poor soils, maturing in around 10 years. It should be kept clear of waterways, where its leaf litter can slow flow.',
  },
  mahogany: {
    overview:
      'African mahogany (Khaya) is a large canopy tree of West and Central African forests, related to the American mahoganies. Its timber is among the most valuable in the world, which is precisely why wild populations are under pressure.',
    ecologicalRole:
      'As a emergent canopy tree, mahogany shapes the forest structure beneath it and produces fruit that feeds forest birds and primates. Old specimens are significant long-term carbon stores.',
    conservationNote:
      'African mahogany is listed as vulnerable on the IUCN Red List, driven by selective logging and conversion of its forest habitat. Planting documented, provenance-traced stock is one of the few ways to relieve pressure on the remaining wild trees.',
    stewardship:
      'Mahogany is slow to establish and reaches maturity in about 25 years. It needs deep, well-drained soils and a genuinely tropical climate.',
  },
  baobab: {
    overview:
      'The baobab is an iconic long-lived tree of African savannas, storing water in its swollen trunk and producing nutrient-dense fruit. Some individuals live for more than a thousand years.',
    ecologicalRole:
      'Baobabs are keystone resources: their flowers feed fruit bats, their hollow trunks shelter communities of animals, and their fruit sustains wildlife and people through the dry season.',
    conservationNote:
      'African baobab is assessed as least concern overall, but recruitment is failing in parts of its range as savanna is converted to farmland and mature trees are harvested. Young plantings help rebuild a population that is otherwise aging in place.',
    stewardship:
      'Baobabs are extremely drought tolerant but slow, taking decades to reach full size. Plant them where they will have room to spread and where livestock cannot ring-bark young trunks.',
  },
  bamboo: {
    overview:
      'Moso bamboo is a giant grass planted for timber, fibre and shoot production. It grows faster than any tree, can be harvested sustainably for decades without replanting, and builds biomass rapidly.',
    ecologicalRole:
      'Bamboo stands hold soil on steep slopes, filter runoff and provide continuous canopy cover. Because culms can be selectively harvested, the stand keeps sequestering carbon while producing yield.',
    conservationNote:
      'Moso bamboo is not threatened in cultivation, but wild stands are shrinking where land is converted. Well-managed plantations reduce the incentive to harvest from natural forests.',
    stewardship:
      'Bamboo reaches harvestable size in around five years and needs ample water during establishment. Containment barriers are advisable because running rhizomes spread aggressively.',
  },
  cedar: {
    overview:
      'West African cedar (Cedrela odorata, Spanish cedar) is a valuable aromatic hardwood of seasonal tropical forest. Its lightweight, insect-resistant timber makes it prized for joinery and cigar boxes.',
    ecologicalRole:
      'Cedar is a canopy tree whose leaf fall enriches forest soils, and whose flowers support a range of pollinators. Mature trees are substantial carbon reservoirs.',
    conservationNote:
      'Spanish cedar is listed as vulnerable on the IUCN Red List. Decades of overexploitation for timber have reduced natural regeneration, and restoring planted stock is a core part of recovery.',
    stewardship:
      'Cedar needs a pronounced dry season and well-drained soil, maturing in around 30 years. It resprouts after cutting, which makes careful selective harvesting viable.',
  },
  pine: {
    overview:
      'Caribbean pine is a fast-growing conifer planted across tropical America for timber and resin. It is one of the few pines that thrives in warm, humid lowland conditions.',
    ecologicalRole:
      'Pine stands stabilise nutrient-poor sandy soils and rebuild cover on land abandoned after farming. Their needle litter creates a fire-adapted ground layer that excludes many weeds.',
    conservationNote:
      'Caribbean pine is of least concern, but its native Caribbean island populations are small and fragmented. Plantation programmes help meet timber demand that would otherwise come from those wild stands.',
    stewardship:
      'Pine reaches useful size in about 15 years and tolerates coastal conditions. It prefers acidic, well-drained soils and does not waterlog well.',
  },
  iroko: {
    overview:
      'Iroko is a large hardwood of West and Central African forest, sometimes called "African teak". It is long-lived, extremely durable and highly valued for construction and furniture.',
    ecologicalRole:
      'Iroko is a canopy tree that produces fruit eaten by hornbills and other forest fauna. Its roots mycorrhizal networks help seedlings of other species establish beneath it.',
    conservationNote:
      'Iroko is listed as vulnerable on the IUCN Red List. Heavy logging pressure combined with slow natural regeneration means planted trees are an important part of keeping the species in the landscape.',
    stewardship:
      'Iroko is slow growing, taking around 35 years to mature. It needs deep tropical soils and is sensitive to frost and prolonged waterlogging.',
  },
  shea: {
    overview:
      'Shea is a savanna tree grown for the fat extracted from its nuts, the basis of shea butter. Trees are typically not planted but protected in farmland, making every retained tree economically valuable to its owner.',
    ecologicalRole:
      'Shea marks farmland across the Sahel, holding soil, shading crops during establishment and supporting pollinators. Its nuts provide a seasonal income that makes standing tree cover worth protecting.',
    conservationNote:
      'Shea is listed as vulnerable on the IUCN Red List, largely because young trees are not being replaced as older ones die. Protecting and planting seedlings secures a resource that millions of rural households depend on.',
    stewardship:
      'Shea matures in around 20 years and tolerates drought and poor soils. It should be left to flower undisturbed, as fruit set depends on healthy pollinator populations.',
  },
  cashew: {
    overview:
      'Cashew is a tropical tree grown for its edible nut and apple. It is planted widely across coastal West Africa and the tropics, often as a boundary and soil-stabilisation tree as much as a crop.',
    ecologicalRole:
      'Cashew windbreaks protect soils and neighbouring crops, and its flowers are a major nectar source. Its root system holds sandy coastal soils against erosion.',
    conservationNote:
      'Cashew is not threatened, but wild relatives of the cultivated species are increasingly rare. Maintaining genetic diversity in plantings keeps future breeding options open.',
    stewardship:
      'Cashew matures in about 10 years, tolerating salt spray and poor sandy soils. It prefers a distinct dry season for reliable nut set.',
  },
  locust_bean: {
    overview:
      'The African locust bean tree produces protein-rich fermented seeds used as a traditional seasoning across West Africa. It is a long-lived parkland tree that farmers protect and plant alongside crops.',
    ecologicalRole:
      'Locust bean fixes nitrogen and cycles nutrients from deep soil layers, raising fertility under the canopy. Its pods and foliage provide fodder, and its shade supports cocoa and coffee seedlings.',
    conservationNote:
      'African locust bean is listed as vulnerable on the IUCN Red List. Loss of parkland trees to agriculture and urban expansion, with little regeneration, is steadily shrinking the population.',
    stewardship:
      'The tree takes around 25 years to reach full production and is highly drought tolerant once established. Planting in agroforestry mixtures gives the best survival rates.',
  },
};

function fallbackEducation(
  species: SpeciesInfo
): Omit<SpeciesEducation, 'slug' | 'commonName' | 'scientificName'> {
  return {
    overview: `${species.name} is one of the species available for sponsorship on Harvesta. Sponsoring a ${species.name.toLowerCase()} tree funds a planter to grow and care for it, with photo and GPS updates through to maturity.`,
    ecologicalRole: `A mature ${species.name.toLowerCase()} contributes canopy cover, soil stability and carbon sequestration to the site where it is planted.`,
    conservationNote:
      'Conservation status is published by the IUCN Red List and refreshed on this platform every quarter. When a species is newly listed or upgraded to a threatened category, sponsors are notified directly.',
    stewardship: `Typical time to maturity for ${species.name.toLowerCase()} is ${species.maturityYears} years, at an estimated ${species.co2KgPerYear} kg of CO₂ sequestered per tree per year.`,
  };
}

/** Looks up the educational content for a species slug (falls back to a generic page). */
export function getSpeciesEducation(
  slug: string
): (SpeciesEducation & { species: SpeciesInfo }) | null {
  const species = TREE_SPECIES.find((entry) => entry.slug === slug);
  if (!species) return null;

  const content = EDUCATION[slug] ?? fallbackEducation(species);
  return {
    slug: species.slug,
    commonName: species.name,
    scientificName: scientificNameFor(species.slug),
    ...content,
    species,
  };
}

/** Every species with educational content, for sitemap / listing pages. */
export function listSpeciesEducation(): SpeciesEducation[] {
  return TREE_SPECIES.map((species) => {
    const content = EDUCATION[species.slug] ?? fallbackEducation(species);
    return {
      slug: species.slug,
      commonName: species.name,
      scientificName: scientificNameFor(species.slug),
      ...content,
    };
  });
}
