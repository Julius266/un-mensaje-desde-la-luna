import Atropos from "atropos/react";
import "atropos/atropos.css";
import { useState } from "react";
import Hoja from "./hoja";
import { useConfig } from "../config-storage";

function Carta() {
  const [flipped, setFlipped] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const { config } = useConfig();

  return (
    <>
      <Atropos
        rotateXMax={10}
        rotateYMax={10}
        highlight={false}
        rotateXInvert={false}
        rotateYInvert={false}
        shadow={false}
        className="relative w-full max-w-[90vw] max-h-[90vh] min-w-[300px] min-h-[400px] md:w-[950px] md:h-[500px] z-30"
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            flipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setFlipped(!flipped)}
        >
          {!flipped ? (
            <div className="absolute flex items-center justify-center w-full h-full bg-[#EEE2BD] border-4 border-black/20 rounded-lg frontface-hidden">
              {!openCard && (
                <button
                  title="Abrir carta"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCard(!openCard);
                  }}
                  className="relative z-50 w-16 h-16 md:w-20 md:h-20"
                >
                  <img src="Sello.png" className="drop-shadow-2xl w-full h-full" alt="Abrir Carta" />
                </button>
              )}
            </div>
          ) : (
            <div className="absolute flex flex-col w-full h-full p-3 md:p-5 bg-[#EEE2BD] border-4 border-black/20 rounded-lg -rotate-y-180">
              <div className="flex flex-col items-end font-medium justify-end w-full h-full text-sm md:text-base">
                <p>Para: {config!.nombrePara}</p>
                <p>De: {config!.nombreDe}</p>
              </div>
            </div>
          )}
        </div>
      </Atropos>

      {openCard && (
        <div className="absolute z-50 flex justify-center items-center w-full h-[90%]">
          <Hoja closeHoja={() => setOpenCard(false)} />
        </div>
      )}
    </>
  );
}

export default Carta;
