import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery, useGetShopProductsQuery } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItemToDB } from "@/lib/features/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, RefreshCw, Shield, Star, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SimpleProductCard from "@/components/SimpleProductCard";
import { useAuth } from "@clerk/clerk-react";

function ProductPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const categorySlug = product?.categoryId?.slug;
  const excludeId = product?._id;
  const { data: similarData, isLoading: similarLoading } =
    useGetShopProductsQuery(
      {
        categorySlug,
        exclude: excludeId,
        limit: 4,
        sort: "newest",
      },
      {
        skip: !categorySlug || !excludeId,
      }
    );

  const similarProducts = similarData?.products || [];

  if (isLoading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (isError || !product) {
    return <div className="p-6 text-red-500">Product not found.</div>;
  }

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="py-8 px-18">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        {/* Product Image */}
        <div className="relative">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="w-full max-h-[75vh] flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={selectedImage || images[0]}
                alt={product.name}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {images.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-lg border-2 p-1 transition
            ${
              selectedImage === img
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
                >
                  <img
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h4 className="uppercase text-sm text-gray-500 mb-1">
            {product.categoryId?.name || "Product"}
          </h4>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {/* Reviews (placeholder since you don’t have rating yet) */}
          {/* <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(128 reviews)</span>
          </div> */}

          {/* Price */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl font-bold">${product.price}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full border-black border-2"
                style={{ backgroundColor: product.colorId?.hex }}
              />
            </div>
          </div>

          {/* <div className="mb-6">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center">
              <div className="flex items-center border rounded-full">
                <button className="px-4 py-2 hover:bg-muted transition-smooth rounded-full">
                  -
                </button>
                <button className="px-4 py-2">1</button>
                <button className="px-4 py-2 hover:bg-muted transition-smooth rounded-full">
                  +
                </button>
              </div>
            </div>
          </div> */}

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              className="flex-1 rounded-full"
              size="lg"
              onClick={() => {
                if (!isSignedIn) {
                  navigate("/sign-in");
                  return;
                }
                dispatch(addItemToDB(product._id));
              }}
            >
              <Plus className="h-5 w-5 text-white" />
              Add to Cart
            </Button>
            <Button className="flex-1 rounded-full" size="lg" variant="outline">
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t mb-6">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Free Shipping</p>
            </div>

            <div className="text-center">
              <RefreshCw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">30 Day Returns</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Secure Checkout</p>
            </div>
          </div>

          {/* Product Features */}
          {product.features?.length > 0 && (
            <Card>
              <CardContent className="ps-4">
                <h3 className="font-semibold mb-2">Product Features</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* <div className="grid grid-cols-1 mt-12">
        <Tabs defaultValue="description" className="mb-20">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="description"
              className="rounded-none border-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="Reviews"
              className="rounded-none border-transparent"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-transparent"
            >
              Shipping Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <p>ddddddddddd</p>
          </TabsContent>
          <TabsContent value="Reviews">
            <p>ddddddddddddddd</p>
          </TabsContent>
        </Tabs>
      </div> */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>

        {similarLoading && (
          <p className="text-gray-500">Loading similar products...</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map((item) => (
            <SimpleProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
