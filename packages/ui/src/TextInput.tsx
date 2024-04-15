'use client'

export function TextInput(
    { placeholder,onChange,label } : {
        placeholder : string,
        onChange : (value : string) => void,
        label : string
    }
) : JSX.Element {
    return (
        <div className="flex flex-col pt-2 pb-2">
            <label className="text-gray-900 font-bold">{label}</label>
            <input className="mt-2 w-[98%] p-3 rounded-md h-4/5 border-gray-300 border bg-gray-50" placeholder={placeholder} onChange={(e) => onChange(e.target.value)} type="text" />
        </div>
    )
}