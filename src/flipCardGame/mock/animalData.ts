import type { CardData } from "../types/card";

const BASE_URL = import.meta.env.BASE_URL;

const animalData: CardData[] = [
  {
    title: "Rat",
    image: `${BASE_URL}rat.png`,
  },
  {
    title: "Ox",
    image: `${BASE_URL}ox.png`,
  },
  {
    title: "Tiger",
    image: `${BASE_URL}tiger.png`,
  },
  {
    title: "Rabbit",
    image: `${BASE_URL}rabbit.png`,
  },
  {
    title: "Dragon",
    image: `${BASE_URL}dragon.png`,
  },
  {
    title: "Snake",
    image: `${BASE_URL}snake.png`,
  },
  {
    title: "Horse",
    image: `${BASE_URL}horse.png`,
  },
  {
    title: "Sheep",
    image: `${BASE_URL}sheep.png`,
  },
  {
    title: "Monkey",
    image: `${BASE_URL}monkey.png`,
  },
  {
    title: "Chicken",
    image: `${BASE_URL}chicken.png`,
  },
  {
    title: "Dog",
    image: `${BASE_URL}dog.png`,
  },
  {
    title: "Pig",
    image: `${BASE_URL}pig.png`,
  },
];

export default animalData;
