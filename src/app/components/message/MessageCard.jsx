import Link from "next/link";

export default function MessageCard({ msg }) {
  const previewLength = 30;
  const words = msg.message.split(" ");
  const previewText = words.slice(0, previewLength).join(" ");

  return (
    <Link
      href={`/message/${msg.id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition w-full p-4"
    >
      <div className="mb-3">
        <span className="text-md font-bold">To: {msg.to}</span>
        <p className="text-sm text-gray-700 fade-text-mask mt-1">
          {previewText}
        </p>
      </div>

      <div className="flex items-center">
        <img
          src={msg.track.image}
          alt={msg.track.name}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-md text-gray-800">
            {msg.track.name}
          </span>
          <span className="text-sm text-gray-600">{msg.track.artists}</span>
        </div>
      </div>
    </Link>
  );
}
