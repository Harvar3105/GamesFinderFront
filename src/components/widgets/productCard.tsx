import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { Chip, Thumb, panelClass } from "@/components/ui";
import { NavPages } from "@/domain/navPages";

// TODO: Check the fields against the backend product contract.
export interface ProductCardData {
  id: string;
  name: string;
  imageUrl?: string | null;
  lowestPrice: number;
  /** ISO 4217 code, e.g. "EUR". */
  currency: string;
  sourcesCount: number;
  updatedAt: Date | string;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={NavPages.product(product.id)}
      className={panelClass("related", "flex flex-col gap-related-md no-underline")}
    >
      <Thumb
        src={product.imageUrl}
        alt=""
        className="aspect-video w-full"
        sizes="(min-width: 600px) 25vw, 100vw"
      />
      <div className="flex flex-col gap-related-xs">
        <span className="font-semibold">{product.name}</span>
        <span className="font-code">from {formatPrice(product.lowestPrice, product.currency)}</span>
      </div>
      <div className="flex flex-wrap justify-between gap-related-sm">
        <Chip>
          {product.sourcesCount} {product.sourcesCount === 1 ? "source" : "sources"}
        </Chip>
        <span className="typo-small">{formatTimeAgo(product.updatedAt)}</span>
      </div>
    </Link>
  );
}
