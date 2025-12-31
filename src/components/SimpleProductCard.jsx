import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItemToDB } from "@/lib/features/cartSlice";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

function SimpleProductCard(props) {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <Link
      to={`/shop/products/${props.product._id}`}
      className="no-underline text-inherit"
    >
      <div
        key={props.product._id}
        className="group rounded-3xl bg-muted/40 p-4 transition hover:shadow-lg"
      >
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-white">
          <img
            src={props.product.images[0]}
            alt={props.product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="mt-4 space-y-1">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Category
            </span>
            <h3 className="font-semibold block">{props.product.name}</h3>
            <span className="font-semibold text-sm">
              ${props.product.price}
            </span>
          </div>
          <div>
            <Button
              size="icon"
              className="rounded-full bg-gray-900/90 hover:bg-[#41e0e0] transition-colors shadow-md"
              onClick={(e) => {
                e.preventDefault();
                if (!isSignedIn) {
                  navigate("/sign-in");
                  return;
                }

                dispatch(addItemToDB(props.product._id));
              }}
            >
              <Plus className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SimpleProductCard;
