import "./App.css";
import TiltedCard from "./components/TiltedCard";
import { useState } from "react";

function App() {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          카드 플립 효과
        </h1>
        <p className="text-gray-600 mb-8">
          카드를 클릭하여 뒤집어보세요!
          <br />
          <span className="text-sm text-gray-500">
            앞면: 왼쪽 클릭 = 시계방향, 오른쪽 클릭 = 반시계방향
            <br />
            뒷면: 왼쪽 클릭 = 반시계방향, 오른쪽 클릭 = 시계방향
          </span>
        </p>

        {/* 외부 제어 버튼들 */}
        <div className="mb-6 space-x-4">
          <button
            onClick={() => setIsCardFlipped(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !isCardFlipped
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            앞면으로
          </button>
          <button
            onClick={() => setIsCardFlipped(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isCardFlipped
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            뒷면으로
          </button>
        </div>

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
          isFlipped={isCardFlipped}
        />
      </div>
    </div>
  );
}

export default App;
