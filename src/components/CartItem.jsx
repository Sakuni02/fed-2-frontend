import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "./ui/button";

function CartItem({ item }) {
  return (
    // <Card className="p-4">
    //   <div className="flex items-center space-x-4">
    //     <img
    //       src={item.product.image || "/placeholder.svg"}
    //       alt={item.product.name}
    //       className="w-16 h-16 object-cover rounded"
    //     />
    //     <div className="flex-1">
    //       <p className="font-medium">{item.product.name}</p>
    //       <p className="text-muted-foreground">${item.product.price}</p>
    //       <p className="text-sm">Quantity: {item.quantity}</p>
    //     </div>
    //   </div>
    // </Card>

    <div className="mt-5">
      <Card className={"p-4"}>
        <div className=" flex gap-4">
          <div className="w-26 h-26 rounded-xl overflow-hidden shrink-0">
            <img
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.product.price}
                </p>
              </div>

              <div>
                <button
                  className={
                    "text-muted-foreground hover:cursor-pointer hover:text-foreground transition-smooth"
                  }
                >
                  {" "}
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CartItem;
