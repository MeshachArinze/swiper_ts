import Swiper from "./components/Swiper";

function App() {
  const items = [
    {
      imageSrc: "../src/assets/food1.jpg",
      imageAlt: "cup cake",
    },
    {
      imageSrc: "../src/assets/food2.jpg",
      imageAlt: "foodie",
    },
    {
      imageSrc: "../src/assets/food3.jpg",
      imageAlt: "cake",
    },
    {
      imageSrc: "../src/assets/food4.jpg",
      imageAlt: "spag",
    },
    {
      imageSrc: "../src/assets/food5.jpg",
      imageAlt: "macaronni",
    },
  ];
  return (
    <div className="App">
      <Swiper items={items} />
    </div>
  )
}

export default App
