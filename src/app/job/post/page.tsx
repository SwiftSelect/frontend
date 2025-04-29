'use client';

import Nav from "@/components/nav/nav";
import { useState } from "react";
import { departments, benefits } from "@/constants/job";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { usePostJob } from './usePostJob';
import { PostJobFormData, Skill, ExperienceRequirement } from '@/app/api/job/types';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const { createJob, loading, error: apiError, success } = usePostJob();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(['Health Insurance', '401(k)', 'Stock Options', 'Remote Work']);
  const [showBenefitsPopup, setShowBenefitsPopup] = useState(false);
  const [tempSelectedBenefits, setTempSelectedBenefits] = useState<string[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [experienceRequirements, setExperienceRequirements] = useState<ExperienceRequirement[]>([]);
  const [newExperience, setNewExperience] = useState('');
  const [formData, setFormData] = useState<PostJobFormData>({
    title: '',
    overview: '',
    description: '',
    company: '',
    skills: [],
    experience: '',
    location: '',
    salaryFrom: 0,
    salaryTo: 0,
    benefitsAndPerks: []
  });

  const handleBasicInfoChange = (field: keyof PostJobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalaryChange = (field: 'salaryFrom' | 'salaryTo', value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: numValue ? parseInt(numValue) : 0
    }));
  };

  const handleAddSkill = () => {
    if (newSkill) {
      const newSkills = [...skills, { id: Date.now().toString(), name: newSkill }];
      setSkills(newSkills);
      setFormData(prev => ({
        ...prev,
        skills: newSkills.map(skill => skill.name)
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (id: string) => {
    const newSkills = skills.filter(skill => skill.id !== id);
    setSkills(newSkills);
    setFormData(prev => ({
      ...prev,
      skills: newSkills.map(skill => skill.name)
    }));
  };

  const handleAddExperience = () => {
    if (newExperience) {
      const newRequirements = [...experienceRequirements, { 
        id: Date.now().toString(), 
        description: newExperience 
      }];
      setExperienceRequirements(newRequirements);
      setFormData(prev => ({
        ...prev,
        experience: newRequirements.map(req => req.description).join(", ")
      }));
      setNewExperience('');
    }
  };

  const handleRemoveExperience = (id: string) => {
    const newRequirements = experienceRequirements.filter(req => req.id !== id);
    setExperienceRequirements(newRequirements);
    setFormData(prev => ({
      ...prev,
      experience: newRequirements.map(req => req.description).join(", ")
    }));
  };

  const handleBenefitClick = (benefit: string) => {
    setSelectedBenefits(prev => {
      const newBenefits = prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit];
      setFormData(prev => ({
        ...prev,
        benefitsAndPerks: newBenefits
      }));
      return newBenefits;
    });
  };

  const handleAddMoreClick = () => {
    setTempSelectedBenefits(selectedBenefits);
    setShowBenefitsPopup(true);
  };

  const handleSaveBenefits = () => {
    setSelectedBenefits(tempSelectedBenefits);
    setFormData(prev => ({
      ...prev,
      benefitsAndPerks: tempSelectedBenefits
    }));
    setShowBenefitsPopup(false);
  };

  const handleCancelBenefits = () => {
    setShowBenefitsPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Validate required fields
    if (!formData.title || !formData.company || !formData.location) {
      setFormError('Please fill in all basic information fields');
      return;
    }

    if (!formData.overview || !formData.description) {
      setFormError('Please fill in all job details');
      return;
    }

    if (!formData.skills.length || !formData.experience) {
      setFormError('Please add at least one skill and experience requirement');
      return;
    }

    if (!formData.salaryFrom || !formData.salaryTo) {
      setFormError('Please specify the salary range');
      return;
    }

    try {
      const res = await createJob(formData);
      router.push(`/job/${res.ID}/details`);
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  // Prevent form submission on enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100">
      <Nav /> 
      <div id="post-job" className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            {(formError || apiError) && (
              <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg">
                {formError || apiError}
              </div>
            )}
            <div id="post-job-header" className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <button 
                    type="button"
                    className="text-purple-500 hover:text-purple-400 mr-4"
                    onClick={() => router.back()}
                  >
                    <i className="fa-solid fa-arrow-left text-xl"></i>
                  </button>
                  <h1 className="text-3xl font-bold">Post New Job</h1>
                </div>
                <button 
                  type="button"
                  className="px-6 py-2.5 bg-purple-600/50 hover:bg-purple-700/50 rounded-lg flex items-center cursor-not-allowed group relative" 
                  disabled
                >
                  <i className="fa-solid fa-eye mr-2"></i>
                  Preview
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    This feature is coming soon!
                  </span>
                </button>
              </div>
            </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div id="job-form" className="lg:col-span-2 space-y-6">
                <CollapsibleSection title="Basic Information">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Title</label>
                      <input 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none cursor-text" 
                        placeholder="e.g. Senior Full Stack Developer" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <select 
                          value={formData.company}
                          onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none cursor-pointer"
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <select 
                          value={formData.location}
                          onChange={(e) => handleBasicInfoChange('location', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none cursor-pointer"
                        >
                          <option value="">Select Location</option>
                          <option value="remote">Remote</option>
                          <option value="hybrid">Hybrid</option>
                          <option value="onsite">On-site</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
          
                <CollapsibleSection title="Job Details">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Overview</label>
                      <textarea 
                        value={formData.overview}
                        onChange={(e) => handleBasicInfoChange('overview', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none h-32 cursor-text" 
                        placeholder="Provide a high level overview..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Description</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none h-32 cursor-text" 
                        placeholder="Describe the role and responsibilities..."
                      ></textarea>
                    </div>
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="Job Requirements">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Required Skills</h3>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span 
                              key={skill.id}
                              className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2"
                            >
                              {skill.name}
                              <button 
                                type="button"
                                onClick={() => handleRemoveSkill(skill.id)}
                                className="text-gray-400 hover:text-gray-300"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add skill (e.g. React, Python)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none cursor-text"
                          />
                          <button
                            type="button"
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Experience Requirements</h3>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {experienceRequirements.map((req) => (
                            <span 
                              key={req.id}
                              className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2"
                            >
                              {req.description}
                              <button 
                                type="button"
                                onClick={() => handleRemoveExperience(req.id)}
                                className="text-gray-400 hover:text-gray-300"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={newExperience}
                            onChange={(e) => setNewExperience(e.target.value)}
                            placeholder="Add experience requirement (e.g. 3+ years in cloud infrastructure)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none cursor-text"
                          />
                          <button
                            type="button"
                            onClick={handleAddExperience}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
          
                <CollapsibleSection title="Compensation">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Salary Range in USD (From)</label>
                        <input 
                          type="text" 
                          value={formData.salaryFrom?.toString() || ''}
                          onChange={(e) => handleSalaryChange('salaryFrom', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 cursor-text" 
                          placeholder="e.g. 80000" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Salary Range in USD (To)</label>
                        <input 
                          type="text" 
                          value={formData.salaryTo?.toString() || ''}
                          onChange={(e) => handleSalaryChange('salaryTo', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 cursor-text" 
                          placeholder="e.g. 120000" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Benefits</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedBenefits.map((benefit) => (
                          <span 
                            key={benefit}
                            onClick={() => handleBenefitClick(benefit)}
                            className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-sm cursor-pointer hover:bg-purple-500/30"
                          >
                            {benefit}
                          </span>
                        ))}
                        <span 
                          onClick={handleAddMoreClick}
                          className="px-3 py-1.5 bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-600"
                        >
                          + Add More
                        </span>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>
          
              <div id="sidebar" className="space-y-6">
                <CollapsibleSection title="Publishing Settings">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Visibility</span>
                      <label className="relative inline-flex items-center cursor-not-allowed group">
                        <input type="checkbox" className="sr-only peer" disabled />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 opacity-50"></div>
                        <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          This feature is coming soon!
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Featured Job</span>
                      <label className="relative inline-flex items-center cursor-not-allowed group">
                        <input type="checkbox" className="sr-only peer" disabled />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 opacity-50"></div>
                        <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          This feature is coming soon!
                        </span>
                      </label>
                    </div>
                  </div>
                </CollapsibleSection>
          
                <div id="actions" className="bg-gray-800 rounded-xl p-6">
                  <div className="space-y-3">
                    <button 
                      type="submit"
                      className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center"
                      disabled={loading}
                    >
                      <i className="fa-solid fa-paper-plane mr-2"></i>
                      {loading ? 'Publishing...' : 'Publish Job'}
                    </button>
                    <button 
                      type="button"
                      className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center cursor-not-allowed group relative" 
                      disabled
                    >
                      <i className="fa-solid fa-floppy-disk mr-2"></i>
                      Save as Draft
                      <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        This feature is coming soon!
                      </span>
                    </button>
                  </div>
                </div>
          
                <div id="tips" className="bg-purple-500/10 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <i className="fa-solid fa-lightbulb text-purple-400 text-xl mt-1"></i>
                    <div>
                      <h3 className="text-purple-400 font-medium mb-2">Pro Tips</h3>
                      <ul className="text-sm space-y-2 text-gray-300">
                        <li>• Be specific about requirements</li>
                        <li>• Include salary range for better matches</li>
                        <li>• Highlight unique benefits</li>
                        <li>• Use clear, inclusive language</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showBenefitsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Select Benefits</h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
                  <div className="flex flex-wrap gap-2 pb-2">
                    {benefits.map((benefit) => (
                      <span
                        key={benefit.value}
                        onClick={() => {
                          setTempSelectedBenefits(prev => {
                            if (prev.includes(benefit.label)) {
                              return prev.filter(b => b !== benefit.label);
                            } else {
                              return [...prev, benefit.label];
                            }
                          });
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                          tempSelectedBenefits.includes(benefit.label)
                            ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {benefit.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
              </div>
              <div className="flex justify-end space-x-3 mt-2">
                <button
                  type="button"
                  onClick={handleCancelBenefits}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBenefits}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}