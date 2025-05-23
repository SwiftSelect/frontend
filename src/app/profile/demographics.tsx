import { FormikProps } from "formik";
import { onChange, Demographics, CandidateProfile, ProfileFormErrors } from "./useProfile";


const DemographicsComponent = ({ values, onChange, profileFormik }: DemographicsComponentProps) => {
    return(
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">Additional Information</h3>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Do you need work authorization now or in the future?</label>
                <select
                    value={values?.authorization}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('authorization',e?.target.value)}
                    onBlur={profileFormik.handleBlur}
                    name="demographics.authorization"
                >
                    <option value=""> Select an option </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as ProfileFormErrors).demographics?.authorization || ''}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Which gender do you identify with?</label>
                <select
                    value={values?.gender}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('gender',e?.target.value)}
                    onBlur={profileFormik.handleBlur}
                    name="demographics.gender"
                >
                    <option value=""> Select an option </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="deny">Decline to Self Identify</option>
                </select>
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as ProfileFormErrors).demographics?.gender || ''}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Are you hispanic or Latino?</label>
                <select
                    value={values?.isHispanic}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('isHispanic',e?.target.value)}
                    onBlur={profileFormik.handleBlur}
                    name="demographics.isHispanic"
                >
                    <option value=""> Select an option </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="deny">Decline to Self Identify</option>
                </select>
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as ProfileFormErrors).demographics?.isHispanic || ''}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Please identify your ethnicity</label>
                <select
                    value={values?.ethnicity}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('ethnicity',e?.target.value)}
                    onBlur={profileFormik.handleBlur}
                    name="demographics.ethnicity"
                >
                    <option value=""> Select an option </option>
                    <option value="asian">Asian</option>
                    <option value="us">American Indian or Alaskan Native</option>
                    <option value="black">Black / African American</option>
                    <option value="white">White</option>
                    <option value="pacific">Native Hawaiin / Other Pacific Islander</option>
                    <option value="twoormore">Two or More Races</option>
                    <option value="deny">Decline to Self Identify</option>
                </select>
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as ProfileFormErrors).demographics?.ethnicity || ''}
                </div>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Are you a person of disability?</label>
                <select
                    value={values?.disability}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('disability',e?.target.value)}
                    onBlur={profileFormik.handleBlur}
                    name="demographics.disability"
                >
                    <option value=""> Select an option </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="deny">Decline to answer</option>
                </select>
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as ProfileFormErrors).demographics?.disability || ''}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Veteran Status</label>
                <select
                    value={values?.veteran}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => onChange('veteran',e?.target.value)}
                    onBlur={profileFormik.handleBlur}
                    name="demographics.veteran"
                >
                    <option value=""> Select an option </option>
                    <option value="not">I am not a protected Veteran</option>
                    <option value="veteran">I identify as one or more of the classifications of protected veteran</option>
                    <option value="deny">I do not wish to answer</option>
                </select>
                <div className="text-red-500 text-sm mt-1">
                    {(profileFormik.errors as ProfileFormErrors).demographics?.veteran || ''}
                </div>
            </div>
        </div>
    )
};

interface DemographicsComponentProps {
    values: Demographics | undefined;
    onChange: onChange;
    profileFormik: FormikProps<CandidateProfile>
}

export default DemographicsComponent;