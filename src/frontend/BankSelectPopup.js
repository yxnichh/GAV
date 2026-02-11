import React from "react";
import "../css/BankSelectPopup.css";
import { RxCross2 } from "react-icons/rx";

export default function BankSelectPopup({ closePopup, onSelect }) {
    
    const banks = [
        { name: "ธนาคารกสิกรไทย", short: "KBank", logo: "/banks/kbank.png" },
        { name: "ธนาคารกรุงไทย", short: "KTB", logo: "/banks/ktb.png" },
        { name: "ธนาคารไทยพาณิชย์", short: "SCB", logo: "/banks/scb.png" },
        { name: "ธนาคารกรุงเทพ", short: "BBL", logo: "/banks/bbl.png" },
        { name: "ธนาคารกรุงศรีอยุธยา", short: "BAY", logo: "/banks/bay.png" },
        { name: "ธนาคารออมสิน", short: "GSB", logo: "/banks/gsb.png" },
        { name: "TMBThanachart (TTB)", short: "TTB", logo: "/banks/ttb.png" }
    ];

    return (
        
        <div className="bank-modal-overlay">
            <div className="bank-container">

                <div className="bank-header">
                    <h2>เลือกธนาคารผู้ว่าจ้าง</h2>
                    <button className="bank-close-btn" onClick={closePopup}>
                        <RxCross2 size={26} />
                    </button>
                </div>

                {/* GRID */}
                <div className="bank-grid">
                    {banks.map((bank, i) => (
                        <div 
                            key={i}
                            className="bank-card"
                            onClick={() => onSelect(bank.name)}
                        >
                            <img src={bank.logo} className="bank-logo" alt={bank.name} />
                            <p className="bank-name">{bank.name}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
