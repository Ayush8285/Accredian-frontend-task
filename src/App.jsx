/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReferralModal from "./components/Modal";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-blue-900 to-black animate-gradient-x">
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ✨ Refer & Earn ✨
      </motion.h1>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-2xl"
        >
          Refer Now
        </Button>
      </motion.div>

      <ReferralModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default App;
