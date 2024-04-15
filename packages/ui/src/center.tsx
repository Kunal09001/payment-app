export function Center({children} : {children : React.ReactNode}) : JSX.Element {
    return (
        <div className="flex-col justify-center h-full items-center">
            {children}
        </div>
    )
}