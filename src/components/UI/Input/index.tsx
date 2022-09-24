interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  containerClass?: string;
  value: string;
  onChange: (e: any) => void;
}

export const Input = ({
  id,
  label,
  placeholder,
  type,
  containerClass,
  onChange,
}: InputProps) => {
  return (
    <div className={`${containerClass}`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`bg-slate-300/10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
