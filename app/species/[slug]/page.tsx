import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Leaf, ShieldAlert, Sprout, HeartHandshake } from 'lucide-react';
import { getPool } from '@/lib/db/client';
import { getSpeciesEducation, scientificNameFor } from '@/lib/species/education';
import {
  categoryLabel,
  iucnRecordUrl,
  isIucnCategoryCode,
  speciesEducationPath,
  type IucnCategoryCode,
  type PopulationTrend,
} from '@/lib/species/conservation';
import { TREE_SPECIES } from '@/lib/constants/species';
import { SpeciesConservationPanel } from '@/components/organisms/SpeciesEducation/SpeciesConservationPanel';

interface SpeciesPageProps {
  params: Promise<{ slug: string }>;
}

interface CachedStatus {
  statusCode: IucnCategoryCode | null;
  statusLabel: string | null;
  populationTrend: PopulationTrend | null;
  isThreatened: boolean;
  assessedAt: string | null;
  taxonId: number | null;
  lastCheckedAt: string | null;
  lastCheckQuarter: string | null;
}

async function loadConservationStatus(slug: string): Promise<CachedStatus | null> {
  try {
    const { rows } = await getPool().query(
      `SELECT status_code, status_label, population_trend, is_threatened,
              assessed_at, iucn_taxon_id, last_checked_at, last_check_quarter
         FROM species_iucn_status
        WHERE species_slug = $1`,
      [slug]
    );
    const row = rows[0];
    if (!row) return null;

    return {
      statusCode: isIucnCategoryCode(row.status_code) ? row.status_code : null,
      statusLabel: row.status_label ?? null,
      populationTrend: (row.population_trend as PopulationTrend | null) ?? null,
      isThreatened: Boolean(row.is_threatened),
      assessedAt: row.assessed_at ? new Date(row.assessed_at).toISOString() : null,
      taxonId: row.iucn_taxon_id ?? null,
      lastCheckedAt: row.last_checked_at ? new Date(row.last_checked_at).toISOString() : null,
      lastCheckQuarter: row.last_check_quarter ?? null,
    };
  } catch {
    // DATABASE_URL may be unavailable (local preview). The education content
    // still renders — only the live conservation panel is omitted.
    return null;
  }
}

export async function generateMetadata({ params }: SpeciesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const education = getSpeciesEducation(slug);
  if (!education) return { title: 'Species not found' };

  return {
    title: `${education.commonName} (${education.scientificName}) — Conservation & Planting Guide`,
    description: `${education.overview} Learn about the conservation status of ${education.commonName} and how sponsored plantings support it.`,
    alternates: { canonical: speciesEducationPath(slug) },
  };
}

export default async function SpeciesEducationPage({ params }: SpeciesPageProps) {
  const { slug } = await params;
  const education = getSpeciesEducation(slug);
  if (!education) notFound();

  const [status, sponsored] = await Promise.all([
    loadConservationStatus(slug),
    Promise.resolve(TREE_SPECIES.some((entry) => entry.slug === slug)),
  ]);

  const conservationStatus = status
    ? {
        statusCode: status.statusCode,
        statusLabel:
          status.statusLabel ?? (status.statusCode ? categoryLabel(status.statusCode) : null),
        populationTrend: status.populationTrend,
        isThreatened: status.isThreatened,
        assessedAt: status.assessedAt,
        iucnUrl: iucnRecordUrl(status.taxonId, scientificNameFor(slug)),
        lastCheckQuarter: status.lastCheckQuarter,
      }
    : null;

  const facts = [
    {
      icon: Sprout,
      label: 'Est. CO₂ per year',
      value: `${education.species.co2KgPerYear} kg`,
    },
    {
      icon: Leaf,
      label: 'Years to maturity',
      value: `${education.species.maturityYears} years`,
    },
    {
      icon: HeartHandshake,
      label: 'Available to sponsor',
      value: sponsored ? 'Yes' : 'Not currently',
    },
  ];

  return (
    <div className="min-h-[calc(100dvh-var(--header-height,0px))] bg-muted/30">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{education.commonName}</span>
        </nav>

        <header className="mb-6 space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-stellar-green">
            Species guide
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{education.commonName}</h1>
          <p className="text-base italic text-muted-foreground">{education.scientificName}</p>
        </header>

        <SpeciesConservationPanel status={conservationStatus} commonName={education.commonName} />

        <dl className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-border bg-background p-4">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                <fact.icon className="size-4" aria-hidden="true" />
                {fact.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="space-y-6">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="mb-2 text-lg font-semibold">
              About this species
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {education.overview}
            </p>
          </section>

          <section aria-labelledby="ecology-heading">
            <h2 id="ecology-heading" className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <Leaf className="size-5 text-stellar-green" aria-hidden="true" />
              Ecological role
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {education.ecologicalRole}
            </p>
          </section>

          <section aria-labelledby="conservation-heading">
            <h2
              id="conservation-heading"
              className="mb-2 flex items-center gap-2 text-lg font-semibold"
            >
              <ShieldAlert className="size-5 text-stellar-green" aria-hidden="true" />
              Conservation
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {education.conservationNote}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              We check this species against the IUCN Red List every quarter. If its status changes
              to a threatened or endangered category — or is upgraded to a more severe one — every
              sponsor holding trees of this species is notified in-app and by email, with a link
              back to this page.
            </p>
          </section>

          <section aria-labelledby="stewardship-heading">
            <h2
              id="stewardship-heading"
              className="mb-2 flex items-center gap-2 text-lg font-semibold"
            >
              <Sprout className="size-5 text-stellar-green" aria-hidden="true" />
              Growing &amp; stewardship
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {education.stewardship}
            </p>
          </section>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-background p-5">
          <h2 className="text-base font-semibold">Sponsor this species</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sponsoring a {education.commonName} tree funds a planter to grow and care for it, with
            photo and GPS updates through to maturity.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/planting-locations"
              className="rounded-lg bg-stellar-green px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sponsor a {education.commonName} tree
            </Link>
            <Link
              href="/dashboard/trees"
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
            >
              View my trees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
