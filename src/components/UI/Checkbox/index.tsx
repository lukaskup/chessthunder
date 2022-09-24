interface CheckboxProps {
  id: string;
  label: string;
  containerClass?: string;
}

export const Checkbox = ({ id, label, containerClass }: CheckboxProps) => {
  return (
    <div className={`flex items-start ${containerClass}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          value=""
          className="w-4 h-4"
          placeholder="checkbox"
        />
      </div>
      <label
        htmlFor="remember"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
    </div>
  );
};
