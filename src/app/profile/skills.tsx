'use client';

import { useState } from "react";
import { onAddOrRemove } from "./useProfile";

const SkillsComponent = ({skills, onAdd, onRemove}: SkillsComponentProps) => {
    const [skill, setSkill] = useState<string>('');
    return(
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {
                    skills?.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-purple-600/20 text-purple-500 rounded-full"> <i onClick={() => onRemove(skill)} className="fa-solid fa-close mr-1"></i>{skill}</span>
                    ))
                }
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    name="skills"
                    value={skill}
                    placeholder="Add a skill"
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setSkill(e?.target?.value)}
                />
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                    <i onClick={() => onAdd(skill)} className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    );
}

interface SkillsComponentProps {
    skills: string[] | undefined
    onAdd: onAddOrRemove
    onRemove: onAddOrRemove
}
export default SkillsComponent;