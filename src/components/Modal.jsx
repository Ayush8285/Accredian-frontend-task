/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, TextField, Button, CircularProgress, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";
import "../components/Modal.css";

const ReferralModal = ({ open, handleClose }) => {
    const [form, setForm] = useState({
        referrerName: "",
        referrerEmail: "",
        refereeName: "",
        refereeEmail: "",
        courseName: "",
    });

    const [loading, setLoading] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const maxCharLimit = 50;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === "courseName") setCharCount(value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/refer`
            , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (response.ok) {
                alert("🎉 Referral submitted successfully!");
                handleClose();
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("Failed to submit referral");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <motion.div 
                className="modal-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
            >
                {/* Close Button */}
                <IconButton className="close-btn" onClick={handleClose}>
                    <Close />
                </IconButton>

                <h2 className="modal-title">🎁 Refer & Earn</h2>
                <p className="modal-subtitle">Refer a friend & earn rewards! 🚀</p>

                <form onSubmit={handleSubmit} className="modal-form">
                    <TextField 
                        label="Your Name" 
                        name="referrerName" 
                        fullWidth 
                        onChange={handleChange} 
                        required 
                        variant="outlined"
                        className="neon-input"
                        slotProps={{ shrink: true }}
                    />
                    
                    <TextField 
                        label="Your Email" 
                        name="referrerEmail" 
                        type="email" 
                        fullWidth 
                        onChange={handleChange} 
                        required 
                        variant="outlined"
                        className="neon-input"
                        slotProps={{ shrink: true }}
                    />

                    <TextField 
                        label="Friend's Name" 
                        name="refereeName" 
                        fullWidth 
                        onChange={handleChange} 
                        required 
                        variant="outlined"
                        className="neon-input"
                        slotProps={{ shrink: true }}
                    />

                    <TextField 
                        label="Friend's Email" 
                        name="refereeEmail" 
                        type="email" 
                        fullWidth 
                        onChange={handleChange} 
                        required 
                        variant="outlined"
                        className="neon-input"
                        slotProps={{ shrink: true }}
                    />
                    
                    <div className="relative">
                        <TextField 
                            label="Course Name" 
                            name="courseName" 
                            fullWidth 
                            onChange={handleChange} 
                            required 
                            variant="outlined"
                            className="neon-input"
                            slotProps={{ shrink: true ,maxLength: maxCharLimit }}
                        />
                        <p className={`char-count ${charCount === maxCharLimit ? "text-red-500" : ""}`}>
                            {charCount}/{maxCharLimit}
                        </p>
                    </div>

                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        disabled={loading} 
                        className="submit-btn"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "🚀 Submit Referral"}
                    </Button>
                </form>
            </motion.div>
        </Modal>
    );
};

export default ReferralModal;
