const UserProfileCard = () => {
    return (
    <div className="w-56 bg-gray-100/90 backdrop-blur-lg rounded-xl shadow-2xl border border-white/50 p-6 text-gray-800 z-50">
        <div className="flex flex-col items-center w-full">
          <div className="w-26 h-26 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm">
            <img src="/images/my-pic.jpg" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Salman</h3>
          <p className="text-sm text-gray-500">slmn.k634@gmail.com</p>
        </div>
      </div>
    );
  };
  
  export default UserProfileCard;
