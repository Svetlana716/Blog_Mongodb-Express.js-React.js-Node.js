const Modal = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center transition-colors z-50 visible bg-black/70 h-full w-full">
      <div
        className="bg-secondary text-primary w-1/2 h-1/2 rounded-xl  p-6  opacity-100 flex flex-col justify-center items-center gap-5
      "
      >
        <h1 className="font-semibold text-primary text-lg">
          Нужно подтвердить почту
        </h1>
        <p className="text-primary text-lg">
          Ссылка для подтверждения отправлена на вашу почту
        </p>
      </div>
    </div>
  );
};

export default Modal;
