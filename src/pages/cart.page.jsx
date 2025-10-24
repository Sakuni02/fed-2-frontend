import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "@/components/CartItem";
import { Card } from "@/components/ui/card";

function CartPage() {
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  return (
    <main className="lg:px-16 min-h-screen py-8 px-5">
      <h2 className="text-4xl font-bold">Shopping Cart</h2>
      {/* <div className="mt-4 grid grid-cols-2 w-1/2 gap-x-4">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>

      <div className="mt-4">
        {cart.length > 0 ? (
          <Button asChild>
            <Link to="/shop/checkout">Proceed to Checkout</Link>
          </Button>
        ) : (
          <p>No items in cart</p>
        )}
      </div> */}

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-8 justify-center">
        <div className="col-span-2">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}

          <Link to="/">
            <Button
              variant="ghost"
              className="rounded-full mt-4 hover:bg-cyan-300"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="col-span-1 mt-6 sticky">
          <Card className={"p-4"}>
            <h1 className="text-xl font-bold">Order Summary</h1>

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>$139.97</p>
            </div>

            <div className="flex justify-between">
              <p>Shipping</p>
              <p>$10.00</p>
            </div>

            <div className="flex justify-between border-t">
              <p className="text-xl font-bold mt-3">Total</p>
              <p className="text-xl font-bold mt-3">$149.97</p>
            </div>

            {cart.length > 0 ? (
              <Link to="/shop/checkout">
                <Button size={"lg"} className={"w-full rounded-full"}>
                  Proceed to Checkout
                </Button>
              </Link>
            ) : (
              <p>No items in cart</p>
            )}

            <div className="bg-gray-200 text-center p-3 rounded-xl">
              <p className="text-muted-foreground">
                Free shipping on orders over $100
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
