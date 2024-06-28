import React, { useEffect, useState } from "react";
import CardProduct from "./Card";
import { GetAllBrand, getAllWatches, getByIdBrand } from "../../api/ApiConfig";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";

const GetAllCard = () => {
  const [cards, setCards] = useState([]);
  const [cardsAll, setCardsAll] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getAllWatches();
        setCardsAll(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await GetAllBrand();
        setBrand(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getByIdBrand(selectedBrand);
        setCards(response.data);
      } catch (error) {
        setCards([]);
        console.error(error);
      }
    };

    fetchCards();
  }, [selectedBrand]);
  const handleBrandChange = (brandValue) => {
    setSelectedBrand(brandValue);
  };
  useEffect(() => {
    const filterCards = () => {
      const allCards = selectedBrand === "all" ? cardsAll : cards;
      const filtered = allCards.filter((card) =>
        card.name
          ? card.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      );
      setFilteredCards(filtered);
    };

    filterCards();
  }, [searchTerm, selectedBrand, cardsAll, cards]);

  return (
    <div className="container mx-auto px-4 flex">
      <div className=" w-1/6 pr-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="category"
        >
          <AccordionItem value="category">
            <AccordionTrigger className="text-base">Lọc</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-normal">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="mt-4 p-2 border rounded"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedBrand === "all"}
                    onCheckedChange={() => handleBrandChange("all")}
                  />
                  Tất cả
                </Label>
                {brand.map((brand) => (
                  <Label
                    className="flex items-center gap-2 font-normal"
                    key={brand._id}
                  >
                    <Checkbox
                      checked={selectedBrand === brand._id}
                      onCheckedChange={() => handleBrandChange(brand._id)}
                    />
                    {brand.brandName}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-6/6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedBrand === "all" ? (
            cardsAll.map((card) => <CardProduct key={card._id} data={card} />)
          ) : cards.length > 0 ? (
            cards.map((card) => <CardProduct key={card._id} data={card} />)
          ) : (
            <p className="text-3xl font-bold ">
              Không có sản phẩm của thương hiệu này
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllCard;
