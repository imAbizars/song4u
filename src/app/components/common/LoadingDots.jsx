export default function LoadingDots(){
    return(
        <div className="absolute inset-0 flex justify-center items-center space-x-2">
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
        </div>
    )
}