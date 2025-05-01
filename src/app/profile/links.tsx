import { FormikProps } from "formik";
import { onChange, Links, CandidateProfile } from "./useProfile";

interface LinksComponentProps {
    values: Links | undefined;
    onChange: onChange;
    profileFormik: FormikProps<CandidateProfile>;
}

const LinksComponent = ({ values, onChange, profileFormik }: LinksComponentProps) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">Professional Links</h3>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">LinkedIn Profile URL</label>
                <input
                    type="url"
                    value={values?.linkedin || ''}
                    name="links.linkedin"
                    onBlur={profileFormik.handleBlur}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('linkedin', e.target.value)}
                />
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as Record<string, string>)["links.linkedin"] || ''}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">GitHub Profile URL</label>
                <input
                    type="url"
                    value={values?.github || ''}
                    name="links.github"
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('github', e.target.value)}
                />
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as Record<string, string>)["links.github"] || ''}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Personal Website URL</label>
                <input
                    type="url"
                    value={values?.website || ''}
                    name="links.website"
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('website', e.target.value)}
                />
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as Record<string, string>)["links.website"] || ''}
                </div>
            </div>
        </div>
    );
};

export default LinksComponent;
