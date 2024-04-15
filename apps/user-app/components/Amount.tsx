export default function Amount({title,amount} : {
    title : string,
    amount : number
}): JSX.Element{
    return (
        <div className="flex justify-between border-b border-gray-500 pt-2 pb-2">
            <div>{title}</div>
            <div>{amount} INR</div>
        </div>
    )
}