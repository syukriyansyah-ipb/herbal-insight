export default function Input({
  type,
  placeholder,
  label,
  style,
  error,
  Icon,
  value,
  name,
  onChange,
  onKeyDown,
  onBlur,
  handleButton,
}) {
  return (
    <div className="w-full">
      <label>
        {label && <span className="pb-3">{label}</span>}
        <div className="flex relative items-center w-full">
          <input
            type={type ? type : "text"}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            placeholder={
              placeholder ? placeholder : "type your placeholder here"
            }
            className={`${
              style && style
            } w-full rounded-full text-sm md:text-base py-2 md:py-3 px-4 md:px-6 shadow-md border ${error && "border-red-400"} border-gray-100 focus:outline-none focus:border-green-700`}
          />
          {Icon && (
            <Icon onClick={handleButton} className="absolute right-0 w-6 h-6 md:w-8 md:h-8 mr-4 md:mr-6 text-gray-900 cursor-pointer" />
          )}
        </div>
      </label>
      {error && (
        <div className="text-[11px] md:text-sm text-red-400 pt-1">{error}</div>
      )}
    </div>
  );
}
