'use client'

export function Select (
    {options, onSelect} : {
        onSelect : (value : string) => void,
        options : {
            key : string,
            value : string
        }[];
    }
): JSX.Element{
    return (
        <div className="flex flex-col pt-2 pb-2">
            <select  onChange={(e) => onSelect(e.target.value)} className="bg-gray-50 mt-2 w-[98%] p-3 rounded-md h-4/5 border-gray-300 border focus:border-blue-500">
                {options.map((option) => <option key={option.key} value={option.key}>{option.value}</option>)}
            </select>
        </div>
    )
}