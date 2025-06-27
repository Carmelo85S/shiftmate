

type CardProps = {
  icon?: React.ElementType;
  title: string;
  info: string;
};

const Card: React.FC<CardProps> = ({ icon: Icon, title, info }) => {
  return (
    <div className="w-72 p-6 bg-white rounded-2xl shadow-2xl transition-all">
      <h3 className="text-xl font-bold text-pink-600 mb-2 flex items-center gap-2">
        {Icon && <Icon className="w-6 h-6 text-indigo-700" />}
        {title}
      </h3>
      <p className="text-gray-700 text-sm">{info}</p>
    </div>
  );
};


export default Card;
