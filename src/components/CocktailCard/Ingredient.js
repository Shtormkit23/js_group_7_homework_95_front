import React from 'react';
import "./style.css";

const Ingredient = ({name, qty}) => {
        return (
            <div className="ingredient">
                <p className="name">{name}</p>
                <p className="qty">{qty}</p>
            </div>
        );
}

export default Ingredient;