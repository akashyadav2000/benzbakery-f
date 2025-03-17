import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductDetailsContainer() {
  const productDetailsItems = useSelector((state) => state.productDetails);
  const productDetailsCategories = [
    "cakeItems",
    "pastryItems",
    "cupCakeItems",
    "weddingCakeItems",
  ];

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productDetailsItems.length === 0) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [productDetailsItems, navigate]);

  const productDetailsFinalItems = productDetailsCategories.flatMap(
    (category) => {
      const items = useSelector((state) => state[category]);
      return items.filter((item) => productDetailsItems.includes(item.id));
    }
  );

  if (isLoading) {
    return null;
  }

  return (
    <>
      {productDetailsFinalItems.map((item) => (
        <ProductDetails key={item.id} item={item} />
      ))}
    </>
  );
}

export default ProductDetailsContainer;
