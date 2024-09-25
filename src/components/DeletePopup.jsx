const DeletePopup = ({toggleDeletePopup, title}) => {
    return (
        <div className="modal">
            <div className="bg-white rounded-lg shadow-lg flex-col flex p-8 gap-8 w-full max-w-md">
                <div className="flex flex-row-reverse">
                    <button className="right-0" onClick={() => toggleDeletePopup(false)}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                    <div className="font-inter text-2xl font-bold pr-28">
                        Xác nhận
                    </div>
                </div>
                <div className="flex justify-center font-inter text-xl text-center">
                    Bạn muốn xóa "{title}" ?
                </div>
                    
                    <div className="flex flex-row justify-center gap-5">
                        <button
                            className="text-xl border py-2 rounded-lg w-1/3"
                            style={{background: "rgb(0, 255, 72)"}}
                            onClick={() => toggleDeletePopup(false)}
                        >
                            Hủy
                        </button>
                        <button
                            className="text-xl border py-2 rounded-lg w-1/3"
                            style={{background: "rgba(255, 0, 0, 0.8)"}}
                            onClick={() => toggleDeletePopup(true)}
                        >
                            Xóa
                        </button>
                    </div>

            </div>
        </div>
    )
}

export default DeletePopup