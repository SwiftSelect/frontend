import { onChange, Links } from "./useProfile";

interface LinksComponentProps {
    values: Links | undefined;
    onChange: onChange;
}

const LinksComponent = ({ values, onChange }: LinksComponentProps) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">Professional Links</h3>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">LinkedIn Profile URL</label>
                <input
                    type="url"
                    value={values?.linkedin || ''}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('linkedin', e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">GitHub Profile URL</label>
                <input
                    type="url"
                    value={values?.github || ''}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('github', e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Personal Website URL</label>
                <input
                    type="url"
                    value={values?.website || ''}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('website', e.target.value)}
                />
            </div>
        </div>
    );
};

export default LinksComponent;
