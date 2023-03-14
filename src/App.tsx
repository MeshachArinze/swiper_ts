import Swiper from "./components/Swiper"

function App() {
  const items = [
    {
      imageSrc: "./assets/food1.jpg",
      imageAlt: "cup cake",
    },
    {
      imageSrc: "./assets/food2.jpg",
      imageAlt: "foodie",
    },
    {
      imageSrc: "./assets/food3.jpg",
      imageAlt: "cake",
    },
    {
      imageSrc: "./assets/food4.jpg",
      imageAlt: "spag",
    },
    {
      imageSrc: "./assets/food5.jpg",
      imageAlt: "macaronni",
    },
  ];
  return (
    <div className="App">
      <Swiper items={[]} />
    </div>
  )
}

export default App
