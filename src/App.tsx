import "./App.css";
import TiltedCard from "./components/TiltedCard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          카드 플립 효과
        </h1>
        <p className="text-gray-600 mb-8">카드를 클릭하여 뒤집어보세요!</p>

        <TiltedCard
          frontImageSrc={"/poppy.jpg"}
          backImageSrc={"/poppy.jpg"}
          frontAltText="Poppy flower front"
          backAltText="Poppy flower back"
          frontOverlayContent={
            <div className="bg-blue-500 w-[100px] h-[100px] rounded-lg flex items-center justify-center text-white font-bold">
              앞면
            </div>
          }
          backOverlayContent={
            <div className="bg-red-500 w-[100px] h-[100px] rounded-lg flex items-center justify-center text-white font-bold">
              뒷면
            </div>
          }
          imageHeight={300}
          imageWidth={250}
          containerHeight={350}
          containerWidth={300}
          showTooltip={false}
          displayOverlayContent={true}
        />
      </div>
    </div>
  );
}

export default App;
