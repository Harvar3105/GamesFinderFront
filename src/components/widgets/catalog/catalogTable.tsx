import Link from "next/link";
import { formatPrice, formatTimeAgo } from "@/components/helpers/format";
import { Chip, Table, TableCell, TableHeader, ZoomThumb } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { Product } from "@/domain/entities/product";

const VISIBLE_SOURCES = 2;

function SourceChips({ sources }: { sources: string[] }) {
  const hidden = sources.length - VISIBLE_SOURCES;

  return (
    <div className="flex flex-wrap gap-related-xs">
      {sources.slice(0, VISIBLE_SOURCES).map((source) => (
        <Chip key={source}>{source}</Chip>
      ))}
      {hidden > 0 && <Chip>+{hidden}</Chip>}
    </div>
  );
}

export default function CatalogTable({ products }: { products: Product[] }) {
  return (
    <Table highlightHover>
      <thead>
        <tr>
          <TableHeader className="w-30">Photo</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader align="right">Original price</TableHeader>
          <TableHeader align="right">Lowest price</TableHeader>
          <TableHeader>Sources</TableHeader>
          <TableHeader>Updated</TableHeader>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <TableCell>
              <ZoomThumb
                src={product.imageUrl}
                alt=""
                placeholder="Photo"
                sizes="96px"
                className="aspect-video w-24"
              />
            </TableCell>
            <TableCell>
              <Link href={NavPages.product(product.id)} className="font-semibold">
                {product.name}
              </Link>
            </TableCell>
            <TableCell className="max-w-[360px]">{product.description}</TableCell>
            <TableCell className="text-right font-code whitespace-nowrap">
              {product.originalPrice === null
                ? "—"
                : formatPrice(product.originalPrice, product.currency)}
            </TableCell>
            <TableCell className="text-right font-code font-semibold whitespace-nowrap">
              {formatPrice(product.lowestPrice, product.currency)}
            </TableCell>
            <TableCell>
              <SourceChips sources={product.sources} />
            </TableCell>
            <TableCell className="whitespace-nowrap">{formatTimeAgo(product.updatedAt)}</TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
