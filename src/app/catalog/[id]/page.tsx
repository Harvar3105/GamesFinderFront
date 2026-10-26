import { formatPrice } from "@/components/helpers/format";
import PageContainer from "@/components/layouts/pageContainer";
import { ButtonLink, Chip, Icon, Panel, SectionHeading, Thumb } from "@/components/ui";
import OffersTable from "@/components/widgets/product/offersTable";
import { NavPages } from "@/config/navPages";
import type { ProductDetails } from "@/domain/entities/product";

// FIX: Placeholder product. Load the product by id from the BFF once the endpoint exists
// (and call notFound() when it does not exist).
function getPlaceholderProduct(id: string): ProductDetails {
  return {
    id,
    name: "[Product name]",
    description: "[Product description from the original store]",
    imageUrl: null,
    originalPrice: 0,
    lowestPrice: 0,
    currency: "EUR",
    sources: [],
    updatedAt: new Date(),
    storeId: "[store-id]",
    storeUrl: "#",
    offers: [1, 2, 3, 4, 5].map((n) => ({
      id: `placeholder-offer-${n}`,
      vendor: `[Vendor ${n}]`,
      price: 0,
      currency: "EUR",
      url: "#",
      updatedAt: new Date(),
    })),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getPlaceholderProduct(id);
  const offersCount = product.offers.length;

  return (
    <PageContainer>
      <ButtonLink
        href={NavPages.catalog}
        variant="ghost"
        size="compact"
        className="-ml-related-sm self-start"
      >
        <Icon name="arrow_back" />
        Back to catalog
      </ButtonLink>

      <Panel
        as="section"
        padding="attention"
        aria-labelledby="product-title"
        className="flex flex-wrap gap-attention-sm"
      >
        <Thumb
          src={product.imageUrl}
          alt={product.name}
          placeholder="Product image"
          sizes="(min-width: 840px) 640px, 100vw"
          className="aspect-video max-w-[640px] flex-[1_1_420px]"
        />

        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-attention-sm">
          <div className="flex flex-col gap-related-sm">
            <h1 id="product-title" className="typo-h1">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-related-sm">
              <span className="typo-small">Store ID:</span>
              <Chip mono>{product.storeId}</Chip>
            </div>
          </div>

          <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-related-lg">
            <div className="flex flex-col gap-related-xs">
              <dt className="typo-small">Original price</dt>
              <dd className="typo-price-lg">
                {product.originalPrice === null
                  ? "—"
                  : formatPrice(product.originalPrice, product.currency)}
              </dd>
            </div>
            <div className="flex flex-col gap-related-xs">
              <dt className="typo-small">Original store</dt>
              <dd>
                <ButtonLink
                  href={product.storeUrl}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in store
                  <Icon name="arrow_forward" />
                </ButtonLink>
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-related-sm">
            <h2 className="typo-h2">Description</h2>
            <p className="max-w-[72ch]">{product.description}</p>
          </div>
        </div>
      </Panel>

      <section aria-labelledby="offers-title" className="flex flex-col gap-related-lg">
        <SectionHeading
          id="offers-title"
          title="Offers"
          aside={
            <Chip>
              {offersCount} {offersCount === 1 ? "offer" : "offers"} · lowest price first
            </Chip>
          }
        />
        <Panel padding="none">
          <OffersTable offers={product.offers} />
        </Panel>
      </section>
    </PageContainer>
  );
}
