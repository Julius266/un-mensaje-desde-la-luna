import { useState } from "react";
import { useConfig } from "../config-storage";
import { motion } from "framer-motion"; // Para animaciones
import confetti from "canvas-confetti"; 

interface QuestionCardProps {
  openQuest: boolean;
  AcceptQuest?: () => void;
  CancelQuest?: () => void;
}

// 🔹 Imágenes y audios de rechazo
const rejectionMedia = [
  { image: "/images/sus.jpg", sound: "/audio/sus.mp3" },
  { image: "/images/peo.jpg", sound: "/audio/fart.mp3" },
  { image: "/images/mike.jpg", sound: "/audio/bruh.mp3" },
  { image: "/images/pepe.jpg", sound: "/audio/bob.mp3" },
];

// 🔹 Sonido de aceptación
const acceptSound = "/audio/yeah.mp3";

function QuestionCard({
  openQuest,
  AcceptQuest,
  CancelQuest,
}: QuestionCardProps) {
  const { config } = useConfig();
  const [rejectionCount, setRejectionCount] = useState(0);
  const [showRejection, setShowRejection] = useState(false);
  const [showBrokenHeart, setShowBrokenHeart] = useState(false);

  const handleRejection = () => {
    if (rejectionCount < rejectionMedia.length) {
      setShowRejection(true);

      // Obtener la imagen y el sonido actual
      const currentMedia = rejectionMedia[rejectionCount];

      // Reproducir el sonido de rechazo
      const audio = new Audio(currentMedia.sound);
      audio.play();

      // Ocultar la imagen después de 2 segundos
      setTimeout(() => {
        setShowRejection(false);
        setRejectionCount(rejectionCount + 1);
      }, 2000);
    } else {
      // Mostrar animación de corazón roto en lugar de alerta
      setShowBrokenHeart(true);

      setTimeout(() => {
        setShowBrokenHeart(false);
        if (CancelQuest) CancelQuest();
      }, 3000); // Ocultar animación después de 3 segundos
    }
  };

  const handleAccept = () => {
    const audio = new Audio(acceptSound);
    audio.play();
    
    // 🎉 Lanzar confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  
    if (AcceptQuest) AcceptQuest();
  };

  return (
    <div
      className={`bg-gray-600/30 border flex gap-4 flex-col border-white/10 rounded-2xl w-auto h-fit transition-all transform duration-1000 delay-700 p-4 ${
        openQuest ? "visible" : "invisible"
      }`}
    >
      <h2 className="text-4xl font-bold w-auto text-center text-red-700">
        {config!.pregunta}
      </h2>
      <img
        src={config!.imagenPregunta}
        alt="archivo pregunta"
        className="self-center object-cover w-52 h-52 rounded-2xl"
      />
      <div className="flex items-center gap-4 justify-evenly flex-col md:flex-row">
        <button
          type="button"
          onClick={handleAccept}
          className="w-40 px-4 py-1 border rounded cursor-pointer bg-green-500/50 hover:bg-green-500/70"
        >
          {config!.botonAceptar}
        </button>
        <button
          type="button"
          onClick={handleRejection}
          className="w-40 px-4 py-1 border rounded cursor-pointer bg-red-500/50 hover:bg-red-500/70"
        >
          {config!.botonRechazar}
        </button>
      </div>

      {/* Mostrar imagen y reproducir sonido en cada rechazo */}
      {showRejection && rejectionCount < rejectionMedia.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <img
            src={rejectionMedia[rejectionCount].image}
            alt="Rechazo"
            className="w-40 h-40 rounded-lg"
          />
        </div>
      )}

      {/* 🔹 Animación de corazón roto */}
      {showBrokenHeart && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60"
        >
          <motion.img
            src="/images/coraz.png" // Usa una imagen de un corazón normal
            alt="Corazón"
            className="w-40 h-40"
            animate={{
              rotate: [0, -15, 15, -15, 0],
              opacity: [1, 0.5, 1, 0.5, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </div>
  );
}

export default QuestionCard;
