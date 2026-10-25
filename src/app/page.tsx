import PageContainer from "@/components/layouts/pageContainer";
import { ButtonLink, Icon, Panel, SectionHeading } from "@/components/ui";
import GuestOnly from "@/components/widgets/guestOnly";
import ProductCard, { type ProductCardData } from "@/components/widgets/productCard";
import { NavPages } from "@/config/navPages";

const STEPS = [
  {
    title: "Collect",
    text: "Offers are collected from connected sources on a regular schedule.",
  },
  {
    title: "Compare",
    text: "Every product shows all offers, the lowest price and how recently it was updated.",
  },
  {
    title: "Go to the seller",
    text: "The purchase happens on the chosen seller’s page.",
  },
];

// FIX: Placeholder products. Replace with recently updated products from the BFF once the endpoint exists.
const RECENT_PRODUCTS: ProductCardData[] = [1, 2, 3, 4].map((n) => ({
  id: `placeholder-${n}`,
  name: `[Product name ${n}]`,
  imageUrl: null,
  lowestPrice: 0,
  currency: "EUR",
  sourcesCount: 0,
  updatedAt: new Date(),
}));

export default function HomePage() {
  return (
    <PageContainer spacing="wide">
      <Panel as="section" padding="none" aria-labelledby="hero-title" className="flex flex-wrap">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col justify-center gap-attention-sm p-attention-md">
          <h1 id="hero-title" className="typo-display">
            Every digital product offer in one place
          </h1>
          <p className="max-w-[60ch] text-lg leading-normal">
            GamesFinder collects offers for digital products from multiple sources and shows the
            lowest price and the time of the last update for every product.
          </p>
          <div className="flex flex-wrap gap-related-sm">
            <ButtonLink href={NavPages.catalog} variant="primary">
              Open catalog
              <Icon name="arrow_forward" />
            </ButtonLink>
            <GuestOnly>
              <ButtonLink href={NavPages.registration} variant="secondary">
                Create account
              </ButtonLink>
            </GuestOnly>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="min-h-80 flex-[1_1_360px] bg-element bg-[radial-gradient(var(--primary)_3px,transparent_3.5px)] bg-size-[16px_16px] bg-position-[8px_8px]"
        />
      </Panel>

      <section aria-labelledby="how-title" className="flex flex-col gap-attention-sm">
        <SectionHeading id="how-title" title="How it works" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-related-lg">
          {STEPS.map((step, index) => (
            <Panel as="article" key={step.title} className="flex flex-col gap-related-sm">
              <span className="font-doto text-[40px] leading-none font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="typo-h2">{step.title}</h3>
              <p>{step.text}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-title" className="flex flex-col gap-attention-sm">
        <SectionHeading
          id="recent-title"
          title="Recently updated"
          aside={
            <ButtonLink href={NavPages.catalog} variant="ghost">
              Full catalog
              <Icon name="arrow_forward" />
            </ButtonLink>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-related-lg">
          {RECENT_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
