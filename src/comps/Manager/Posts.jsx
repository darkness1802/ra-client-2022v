import React, { useState } from "react"
import ReactPlayer from "react-player"
import { SiReact, SiTailwindcss, SiNodedotjs, SiWebrtc } from "react-icons/si"
import Post from "./Post"

function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

export default function Posts() {
    return <div>
        <Post title={<p className="text-gray-300 text-base">Mục tiêu nghề nghiệp</p>}>
            <div className="body">
                <div className="px-4 py-2">
                    <p className="text-white text-base">Đem công nghệ đến với toàn bộ người dân trên mọi miền tổ quốc. Nghiên cứu và phát triển các công nghệ mới nhất và độc đáo nhất tại Việt Nam</p>
                </div>
                <img className="w-full h-[50vh]" src="https://i0.wp.com/reglobal.co/wp-content/uploads/2020/12/vietnam-CEIA.jpg?resize=1000%2C640&ssl=1" alt="" />
            </div>
        </Post>

        <Post title={<p className="text-gray-300 text-base flex items-center">
            <a className="cursor-pointer text-base text-green-400" onClick={() => openInNewTab(`https://beta-bomhub.web.app`)}>Dự án: [Full stack] Bomhub</a>
            <div className="flex mx-2 bg-sky-600 py-1 px-1 rounded-xl">
                <SiReact className="text-xl mx-1" />
                <SiTailwindcss className="text-xl mx-1" />
                <SiNodedotjs className="text-xl mx-1" />
            </div>
        </p>}>
            <div className="body">
                <div className="px-4 py-2">
                    <p className="text-white text-base">Xem miễn phí các phim đang chiếu ở các nền tảng trả phí với tốc độ cực cao và sắc nét</p>
                    <ul className="text-white text-base my-2"> Một vài tính năng nổi bật:
                        <li>-  Play video on Background</li>
                        <li>-  Minimize player</li>
                        <li>-  Play video every where</li>
                        <li>-  HTTP Live Streaming nhằm nâng cao tốc độ và tính bảo mật dữ liệu</li>
                    </ul>
                </div>
                <ReactPlayer controls={true} url='https://www.youtube.com/watch?v=B-yGsSmoPG4' width={'100%'} />
            </div>
        </Post>

        <Post title={<p className="text-gray-300 text-base flex items-center">
            <a className="cursor-pointer text-base text-green-400" onClick={() => openInNewTab(`https://soundboxx.web.app`)}>Dự án: [Full stack] Soundboxx</a>
            <div className="flex mx-2 bg-sky-600 py-1 px-1 rounded-xl">
                <SiReact className="text-xl mx-1" />
                <SiTailwindcss className="text-xl mx-1" />
                <SiNodedotjs className="text-xl mx-1" />
            </div>
        </p>}>
            <div className="body">
                <div className="px-4 py-2">
                    <p className="text-white text-base">Chuyển đổi dữ liệu video của Youtube sang dạng audio và phát trực tuyến. Tính đến nay Soundboxx đang sở hữu các tính năng lần đầu xuất hiện tại Việt Nam đối với 1 ứng dụng nghe nhạc</p>
                    <ul className="text-white text-base my-2"> Các tính năng nổi bật:
                        <li>-  Play audio from Youtube</li>
                        <li>-  Tìm kiếm bằng giọng nói</li>
                        <li>-  Điều khiển trình phát giữa các thiết bị (lấy ý tưởng từ Youtube)</li>
                        <li>-  Đăng ký, đăng nhập và thư viện cá nhân</li>
                    </ul>
                </div>
                <ReactPlayer controls={true} url='https://www.youtube.com/watch?v=CThZ4AhS4gY' width={'100%'} />
            </div>
        </Post>

        <Post title={<p className="text-gray-300 text-base flex items-center">
            <a className="cursor-pointer text-base text-green-400" onClick={() => openInNewTab(`https://racademind.web.app`)}>Dự án: [Full stack] Royal Academy</a>
            <div className="flex mx-2 bg-sky-600 py-1 px-1 rounded-xl">
                <SiReact className="text-xl mx-1" />
                <SiTailwindcss className="text-xl mx-1" />
                <SiNodedotjs className="text-xl mx-1" />
                <SiWebrtc className="text-xl mx-1" />
            </div>
        </p>}>
            <div className="body">
                <div className="px-4 py-2">
                    <p className="text-white text-base">Ứng dụng học tập và giảng dạy đúng nghĩa nhất tại Việt Nam.
                        Lấy nguồn cảm hứng từ Google Class và Google Meet, nay được hòa làm 1 trong Royal Academy.
                        Royal Academy được phát triển dựa trên công nghệ WRTC làm cốt lõi - thứ mà hầu hết các website e learning tại Việt Nam chưa làm tốt hoặc chưa hoàn chỉnh.
                        Ngoài ra Royal Academy còn mang trong mình công nghệ Block chain, đồng Royal Token là đơn vị tiền tệ để người dùng có thể mua, bán khóa học,
                        ... Ứng dụng vẫn đang trong thời gian tìm nhà đầu tư để phát triển và cho ra mắt vào năm sau</p>
                    <ul className="text-white text-base my-2"> Các tính năng nổi bật:
                        <li>-  Gọi video giữa nhiều thiết bị, đầy đủ các tính năng như chat, chia sẻ màn hình, ...</li>
                        <li>-  Tạo và quản lý khóc học, phân chia khóc học thành các phần nhỏ, quản lý bài tập và bài kiểm tra</li>
                        <li>-  Ứng dụng công nghệ Block chain, ra mắt đồng Royal Token dành cho các giao dịch trên Royal Academy</li>
                        <li>-  Học nhóm, học realtime, gia sư online(duo learning), giảng viên có thể kiếm tiền thông qua việc dạy học</li>
                        <li>-  Từ việc hoạt động tích cực, chăm chỉ làm bài tập, học viên có thể nhận được Royal Token</li>
                    </ul>
                </div>
                <ReactPlayer controls={true} url='https://www.youtube.com/watch?v=bHWQcOwO3r0' width={'100%'} />
            </div>
        </Post>

        <Post title={<p className="text-gray-300 text-base flex items-center">
            <a className="cursor-pointer text-base text-green-400" onClick={() => openInNewTab(`https://www.npmjs.com/package/rsoftvn-state`)}>Thư viện cá nhân: Use Global State Hook</a>
            <div className="flex mx-2 bg-sky-600 py-1 px-1 rounded-xl">
                <SiReact className="text-xl mx-1" />
                <SiNodedotjs className="text-xl mx-1" />
            </div>
        </p>}>
        <div className="body">
                <div className="px-4 py-2">
                    <p className="text-white text-base">
                        Một thư viện quản lý dành cho React JS, phục vụ cho việc quản lý các global state một cách nhanh chóng, tiện lợi
                    </p>
                </div>
                <img className="w-full h-[50vh]" src="/images/reactstate.png" alt="" />
            </div>
        </Post>
    </div>
}