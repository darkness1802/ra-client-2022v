import React from 'react'
import { useHistory } from 'react-router-dom'

type Props = {
  sale?: number
  data: any
}

// https://static.unica.vn/uploads/tran-duy-thanh/November122020201pm_tran-duy-thanh_thumb.png

export default function Card({ sale, data }: Props) {

  const history = useHistory()

  return <div onClick={()=>history.push(`/view=${data._id}`)} style={{ backgroundImage: `url(https://picsum.photos/350/180)` }}
    className="cursor-pointer bg-cover rounded-lg w-full h-[180px] relative flex items-end hover:scale-105 duration-300">
    <div className="flex items-center w-full p-2 bg-lightdark bg-opacity-40 gap-4">
      <img src="/images/user.png"
        className="w-[77px] h-[77px] rounded-full border-darkgreen border-solid border-[5px]" alt="" />

      <div className="txt-group">
        <h3 className="text-gray-100 text-xl font-bold uppercase">{data.title}</h3>
        <h4 className="text-gray-100 text-base">Mô tả sơ lược về khóa học</h4>
        <h5 className="text-gray-100 text-base">Giảng viên: <span>{data.token}</span></h5>
      </div>
    </div>
    <p className="flex items-center gap-1 text-base font-semibold text-gray-100 left-2 top-2 bg-amber-500 bg-opacity-80 px-2 py-1 rounded-xl absolute">
      Sale 20%
    </p>
    <p className="flex items-center gap-1 text-base font-semibold text-gray-100 right-2 top-2 bg-lightgreen bg-opacity-80 px-2 py-1 rounded-xl absolute">200
      <img className="w-[20px] h-[20px]" src="https://img.icons8.com/flat-round/64/000000/crown--v1.png" />
    </p>
  </div>
}