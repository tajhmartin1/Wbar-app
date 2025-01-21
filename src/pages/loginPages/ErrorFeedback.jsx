export function ErrorFeedback({message}) {
    return (
        <div className={'flex items-center gap-1 text-red-600 motion-preset-slide-down'}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>{message}</div>
        </div>)
}