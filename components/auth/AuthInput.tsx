type AuthInputProps = {
  label: string;
  name: string;
  type: "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function AuthInput({ label, name, type, placeholder, autoComplete, value, onChange }: AuthInputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-bold text-[var(--text)]">
      {label}
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
        className="field rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}
