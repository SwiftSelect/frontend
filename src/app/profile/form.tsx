import useProfile  from "./useProfile";
import ResumeComponent from "./resume";
import SkillsComponent from "./skills";
import DemographicsComponent from "./demographics";
import LinksComponent from "./links";

const ProfileForm = () => {
    const { 
        profileFormik, 
        handleResumeUploadComplete, 
        addSkill, 
        removeSkill, 
        isRecruiter 
    } = useProfile();

    return (
        <form 
            id="profile-form" 
            className="bg-gray-800 rounded-xl p-6"
            onSubmit={profileFormik.handleSubmit}
        >
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-6">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Current Position</label>
                        <input
                            name="currentPosition"
                            type="text"
                            onChange={profileFormik.handleChange}
                            onBlur={profileFormik.handleBlur}
                            value={profileFormik.values.currentPosition}
                            className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="text-red-500 text-sm mt-1">
                            {profileFormik.touched.currentPosition && profileFormik.errors.currentPosition}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Location</label>
                        <input
                            name="location"
                            type="text"
                            onChange={profileFormik.handleChange}
                            onBlur={profileFormik.handleBlur}
                            value={profileFormik.values.location}
                            className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="text-red-500 text-sm mt-1">
                            {profileFormik.touched.location && profileFormik.errors.location}
                        </div>
                    </div>
                </div>
            </div>
            {!isRecruiter && (
                <>
                    <ResumeComponent 
                        onUploadComplete={handleResumeUploadComplete}
                        currentFile={profileFormik.values.resume}
                    />
                    <SkillsComponent 
                        skills={profileFormik.values.skills}
                        onAdd={addSkill}
                        onRemove={removeSkill}
                    />
                    <LinksComponent 
                        values={profileFormik.values.links}
                        onChange={(field: string, value: string) => profileFormik.setFieldValue(`links.${field}`, value)}
                    />
                    <DemographicsComponent 
                        values={profileFormik.values.demographics}
                        onChange={(field: string, value: string) => 
                            profileFormik.setFieldValue(`demographics.${field}`, value)
                        }
                    />
                </>
            )}
            <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-end gap-4">
                    <button 
                        type="button"
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={profileFormik.isSubmitting || !profileFormik.isValid}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ProfileForm;
