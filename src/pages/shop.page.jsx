import { useGetShopProductsQuery, useGetAllColorsQuery } from "@/lib/api";
import { useParams } from "react-router";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link } from "react-router";
import { Plus, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItemToDB } from "@/lib/features/cartSlice";

function ShopPage() {
  const { category } = useParams();
  // Local state for filters
  const [selectedColor, setSelectedColor] = useState("");
  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetShopProductsQuery({
    categorySlug: category,
    color: selectedColor || undefined,
    sort: sortOption || undefined,
    page: 1,
    limit: 24,
  });

  const { data: colorsData } = useGetAllColorsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="px-4 lg:px-16 min-h-screen py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Filters */}
        <aside className="w-full lg:w-64 p-4">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </h3>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color</h3>

              <ul className="flex flex-wrap gap-3">
                {colorsData?.map((color) => (
                  <li key={color._id}>
                    <button
                      onClick={() => setSelectedColor(color.slug)}
                      className={`w-8 h-8 rounded-full border transition 
            ${
              selectedColor === color.slug
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  </li>
                ))}
                <li>
                  <button
                    className="mt-2 text-sm text-gray-600 underline"
                    onClick={() => setSelectedColor("")}
                  >
                    Clear Color
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Sort by Price</h2>

              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-[222px] rounded-4xl">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price_asc">Low to High</SelectItem>
                  <SelectItem value="price_desc">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full rounded-full">
              Clear All Filters
            </Button>
          </div>
        </aside>

        {/* Right: Products Grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.products?.map((product) => (
            <Link
              key={product._id}
              to={`/shop/products/${product._id}`}
              className="border p-4 rounded"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col gap-1 px-4 pt-2">
                <div className="w-full">
                  <h3 className="font-semibold">{product.name}</h3>
                </div>

                <div className="flex items-center justify-between w-full">
                  <p>${product.price}</p>
                  <Button
                    size="icon"
                    className="rounded-full bg-gray-900/90 hover:bg-[#41e0e0] transition-colors shadow-md"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addItemToDB(product._id));
                    }}
                  >
                    <Plus className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

export default ShopPage;
