import React from "react";

interface ButtonOptions {
    children: React.ReactNode | string;
}

export const PrimaryButton = (options : ButtonOptions) => (
    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">{options.children}</button>
);

export const IconButton = (options : ButtonOptions) => (
    <button className="text-purple-500">
        {options.children}
    </button>
)