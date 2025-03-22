import React from "react";

interface ButtonOptions {
    children: React.ReactNode | string;
    onClick?(): void;
}

export const PrimaryButton = (options : ButtonOptions) => (
    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg" onClick={options?.onClick}>{options.children}</button>
);

export const IconButton = (options : ButtonOptions) => (
    <button className="text-purple-500" onClick={options?.onClick}>
        {options.children}
    </button>
)