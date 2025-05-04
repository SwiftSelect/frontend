import { useRef } from "react";
import { ApplicationFormValues } from "./useApplication";
import { FormikProps } from "formik";

export default function JobApplicationForm({ formik, handleResumeUpload }: { formik: FormikProps<ApplicationFormValues>, handleResumeUpload: (file: File) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleResumeUpload(file);
        }
    };
    return (
        <form onSubmit={formik.handleSubmit} className="space-y-8">
              <div id="personal-info" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''
                      }`}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''
                      }`}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
                      }`}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Location</label>
                    <input
                      type="tel"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      className={`w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formik.touched.location && formik.errors.location ? 'border-red-500' : ''
                      }`}
                    />
                    {formik.touched.location && formik.errors.location && (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
                    )}
                  </div>
                </div>
              </div>
              <div id="resume-section" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Resume/CV</h2>
                {formik.values.resume ? (
                  <div className="border-2 border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className="fa-solid fa-file-pdf text-2xl text-purple-500 mr-4"></i>
                        <div>
                          <p className="text-gray-300 font-medium">{formik.values.resume?.split('/').pop()}</p>
                          <p className="text-gray-500 text-sm">Your resume has been successfully uploaded</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
                      >
                        Upload New Resume
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-700 rounded-lg p-8"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <div className="text-center">
                      <i className="fa-solid fa-cloud-arrow-up text-4xl text-purple-500 mb-4"></i>
                      <p className="text-gray-400 mb-4">Drag and drop your resume here or</p>
                      <button 
                        type="button"
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                      >
                        Browse Files
                      </button>
                      <p className="text-sm text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </div>
                )}
              </div>
              <div id="additional-info" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Additional Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      name="links.linkedin"
                      value={formik.values.links?.linkedin || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Portfolio Website</label>
                    <input
                      type="url"
                      name="links.website"
                      value={formik.values.links?.website || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Cover Letter</label>
                    <textarea
                      name="coverLetter"
                      value={formik.values.coverLetter}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div id="submit-section" className="flex items-center justify-between bg-gray-800 rounded-xl p-6">
                <div className="text-gray-400">
                  <i className="fa-solid fa-shield-halved mr-2"></i>
                  Your information is secure and encrypted
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  >
                    Save Draft
                  </button>
                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center"
                    disabled={formik.isSubmitting}
                  >
                    <i className="fa-solid fa-paper-plane mr-2"></i>
                    {formik.isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </form>
    )
}
