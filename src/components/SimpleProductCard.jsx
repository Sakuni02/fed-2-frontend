import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

function SimpleProductCard(props) {
  const dispatch = useDispatch();

  return (
    <div key={props.product._id}>
      <div className="h-64 sm:h-72 md:h-80 lg:h-96">
        <img
          src={props.product.image}
          alt={props.product.name}
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <span className="text-xs block">Category</span>
        <h3 className="font-semibold block">{props.product.name}</h3>
        <span className="block">${props.product.price}</span>
      </div>
      <div>
        <Button
          className={
            "w-full mt-2 bg-gray-900/90 rounded-2xl hover:cursor-pointer"
          }
          onClick={() =>
            dispatch(
              addToCart({
                _id: props.product._id,
                name: props.product.name,
                price: props.product.price,
                image: props.product.image,
              })
            )
          }
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default SimpleProductCard;
