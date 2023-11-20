import { useFormContext } from "react-hook-form";
interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

export const FormField = ({
  labelName,
  name,
  placeholder,
  isSurpriseMe,
  handleSurpriseMe,
}: FormFieldProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <div className="flex items-canter gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        placeholder={placeholder}
        className="bg-gray-50 border bored-gray-300 text-gray-900  text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        {...register(name, { required: "This field is required" })}
      />
    </div>
  );
};
