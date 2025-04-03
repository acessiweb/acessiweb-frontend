"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePush } from "./push";

type GuidelineType = { id: string; name: string };

type CartType = {
  name: string;
  description: string;
  guidelines: GuidelineType[];
};

type CartContextType = {
  cart: CartType;
  guidelinesTotal: number;
  addGuidelinesToCart: (_guides: GuidelineType) => void;
  removeGuidelineOfCart: (_guideId: string) => void;
  addNameToCart: (_name: string) => void;
  addDescriptionToCart: (_desc: string) => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartType>({
    name: "",
    description: "",
    guidelines: [],
  });
  const [guidelinesTotal, setGuidelinesTotal] = useState(0);
  const { setPushMsg, setShowPush } = usePush();

  useEffect(() => {
    const c = localStorage.getItem("acessibiweb-cart");

    if (c) {
      const cParsed: CartType = JSON.parse(c);
      const guides = [...cParsed.guidelines];

      setCart(cParsed);
      setGuidelinesTotal(guides.length);
    }
  }, []);

  const addGuidelinesToCart = (guideline: GuidelineType) => {
    const cartGuides = [...cart.guidelines];

    const alreadyExists = cartGuides.find((guide) => guide.id === guideline.id);

    if (!alreadyExists) {
      setGuidelinesTotal((prevTotal: number) => prevTotal + 1);
    } else {
      setShowPush(true);
      setPushMsg(
        "Essa diretriz já foi adicionada ao seu projeto. Acesse ele pelo ícone de carrinho no menu"
      );
    }

    setCart((prevCart: CartType) => {
      const guides = [...prevCart.guidelines];

      if (!alreadyExists) {
        guides.push(guideline);
      }

      return { ...prevCart, guidelines: guides };
    });
  };

  const removeGuidelineOfCart = (guidelineId: string) => {
    setGuidelinesTotal((prevTotal: number) => prevTotal - 1);
    setCart((prevCart: CartType) => {
      const guides = [...prevCart.guidelines];

      const newGuides = guides.filter(
        (guideline: GuidelineType) => guideline.id !== guidelineId
      );

      return { ...prevCart, guidelines: newGuides };
    });
  };

  const addNameToCart = (name: string) => {
    setCart((prevCart: CartType) => ({
      ...prevCart,
      name,
    }));
  };

  const addDescriptionToCart = (desc: string) => {
    setCart((prevCart: CartType) => ({
      ...prevCart,
      description: desc,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        guidelinesTotal,
        addGuidelinesToCart,
        removeGuidelineOfCart,
        addDescriptionToCart,
        addNameToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
