'use client';
import { useState } from "react";
import {useSearchMessage} from "../hooks/useSearchSong"
import { useSendMessage } from "../hooks/useSendMessage";
import { useUploadImage } from "../hooks/useUploadImage";
export default function Receipt() {
  const {
    query,
    setQuery,
    results,
    selected,
    handleSelect,
    isLoading,
    setIsLoading,
    isSearching,
  } = useSearchMessage();
  const {isSending,sendMessage} = useSendMessage();
  const [to, setTo] = useState("");
  const {uploadImage,isUploading} = useUploadImage();
  const [message, setMessage] = useState("");
  const [imageFile,setImageFile] = useState(null);

  const handleSend = async () => {
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    sendMessage({ to, message, selected, imageUrl });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);                         
  };
  

  return (
    <section className="flex justify-center min-h-screen ">
      <div className="pt-10 pb-10 w-full h-full max-w-[25rem] px-4 space-y-10">
        <h1 className="text-center text-2xl font-bold">Make Ur Receipt For They</h1>
        <div className="text-center bg-[#2D2D2D] text-white rounded-xl mx-4 p-2">
            Remember, this message cannot be deleted or recreated. The sender of the message will be kept confidential from both the message recipient and the developer.
        </div>
        {/* input nama */}
        <div className="flex flex-row items-center gap-13">
          <div className="text-xl w-[30px]">To:</div>
          <input 
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)} 
          spellCheck={false} 
          className="border-2 px-2 w-full h-10 rounded-xl" style={{fontFamily:'Caveat'}}/>
        </div>

        {/* pesan */}
        <div className="flex flex-row gap-4">
          <div className="text-xl">Message:</div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="p-2 border-2 border-black rounded-xl"
            rows="5"
            cols="70"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-row gap-4">
          <div>Image:</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded-xl p-2 w-full"
          />
        </div>
        {/* song choosed */}
        <div className="flex flex-row gap-3">
          <div className="text-xl mb-1 w-[100px]">The Song:</div>
          {selected && (
            <div className="w-full relative">
              {/* {isLoading && (
                <div className="absolute inset-0 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                </div>
              )} */}
              {selected && (
                <div className="w-full">
                  <div className="flex items-center gap-3 border-2 rounded-xl p-3">
                    <img
                      src={selected.album.images[0].url}
                      className="w-16 h-16 rounded-md"
                    />
                    <div>
                      <p className="font-bold">{selected.name}</p>
                      <p className="text-sm text-gray-500">
                        {selected.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  {/* Preview 30 detik */}
                  {selected.previewUrl && (
                    <audio controls src={selected.previewUrl} className="w-full mt-2" />
                  )}
                </div>
              )}
            </div>
          )}
        </div> 
        {/* search lagu */}
        <div className="flex flex-row gap-7">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search The Song..."
            className="border-2 px-2 py-1 w-full rounded-xl"
            spellCheck={false}
          />
        </div>
        {/* hasil pencarian atau lagu terpilih */}
        <h1 className="text-xl">Result :</h1>
          <div className="pb-5 mt-2 space-y-2">
            {isSearching ? (
              <div className="flex justify-center items-center space-x-2">
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
              </div>
            ) : (
              results.map((r) => (
                <div
                  key={r.id}
                  className="flex border-2 p-2 space-x-3 items-center cursor-pointer bg-[#F5F5F5] text-black rounded-xl hover:bg-[#EEEEEE]"
                  onClick={() => handleSelect(r)}
                >
                  <img
                    src={r.album.images[0].url}
                    alt={r.name}
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <strong className="mr-1">{r.name}</strong> -{" "}
                  {r.artists.map((a) => a.name).join(", ")}
                </div>
              ))
            )}

            <button
              onClick={handleSend}
              disabled={isSending || isUploading}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-[#383737] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending || isUploading ? (
                <>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
      </div>
    </section>
  )
}
