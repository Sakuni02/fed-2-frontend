import { Card } from "@/components/ui/card";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeItemFromDB, updateQuantityInDB } from "@/lib/features/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Card className="p-4 rounded-2xl mt-5">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
          <img
            src={item.product.images[0] || "/placeholder.svg"}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle Content */}
        <div className="flex-1">
          <h3 className="font-semibold leading-tight">{item.product.name}</h3>

          <p className="text-sm text-muted-foreground">
            Size: {item.size} | Color: {item.color}
          </p>

          {/* Quantity Controls */}
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center rounded-full border px-2 py-1">
              <button
                className="p-1 text-muted-foreground hover:text-foreground"
                onClick={() =>
                  dispatch(
                    updateQuantityInDB({
                      productId: item.product._id,
                      quantity: item.quantity - 1,
                    })
                  )
                }
                disabled={item.quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="px-3 text-sm font-medium">{item.quantity}</span>

              <button
                className="p-1 text-muted-foreground hover:text-foreground"
                onClick={() =>
                  dispatch(
                    updateQuantityInDB({
                      productId: item.product._id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end justify-between h-full">
          <Button
            variant="ghost"
            onClick={() => dispatch(removeItemFromDB(item.product._id))}
          >
            <X className="h-5 w-5" />
          </Button>

          <p className="font-semibold text-lg mt-auto">
            ${item.product.price * item.quantity}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
