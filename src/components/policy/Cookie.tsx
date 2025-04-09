import React from 'react';

const Cookie: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Chính sách Cookie</h1>

      <p className="text-lg mb-4">
        Chúng tôi, tại <strong>TWITTER</strong> "của chúng tôi", cam kết bảo vệ quyền riêng tư của bạn. Chính sách cookie này mô tả cách chúng tôi sử dụng các cookie và công nghệ theo dõi khác trên trang web của chúng tôi.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Cookie là gì?</h2>
        <p className="text-lg">
          Cookie là các tệp tin nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập vào trang web của chúng tôi. Cookie giúp chúng tôi nhận diện bạn khi bạn quay lại trang web, lưu trữ các lựa chọn của bạn và cải thiện trải nghiệm của bạn khi sử dụng dịch vụ của chúng tôi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Các loại cookie chúng tôi sử dụng</h2>
        <p className="text-lg">
          Chúng tôi sử dụng các loại cookie sau trên trang web của mình:
        </p>
        <ul className="list-disc pl-6 mt-2 text-lg">
          <li><strong>Cookie cần thiết</strong>: Những cookie này là bắt buộc để đảm bảo chức năng cơ bản của trang web, như việc duy trì phiên đăng nhập hoặc giỏ hàng.</li>
          <li><strong>Cookie chức năng</strong>: Cookie này giúp cải thiện trải nghiệm người dùng, chẳng hạn như ghi nhớ các lựa chọn và sở thích của bạn trên trang web.</li>
          <li><strong>Cookie phân tích</strong>: Chúng tôi sử dụng các cookie này để thu thập thông tin về cách người dùng tương tác với trang web, giúp chúng tôi hiểu rõ hơn về các xu hướng và cải thiện dịch vụ của mình.</li>
          <li><strong>Cookie quảng cáo</strong>: Những cookie này giúp chúng tôi hiển thị quảng cáo phù hợp với sở thích của bạn và theo dõi hiệu quả của các chiến dịch quảng cáo.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Cách chúng tôi sử dụng cookie</h2>
        <p className="text-lg">
          Chúng tôi sử dụng cookie cho các mục đích sau:
        </p>
        <ul className="list-disc pl-6 mt-2 text-lg">
          <li>Cải thiện hiệu suất và chức năng của trang web.</li>
          <li>Phân tích hành vi người dùng để tối ưu hóa trải nghiệm người dùng.</li>
          <li>Đảm bảo tính bảo mật cho trang web.</li>
          <li>Hiển thị quảng cáo tùy chỉnh phù hợp với sở thích của bạn.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Quản lý cookie</h2>
        <p className="text-lg">
          Bạn có thể quản lý và kiểm soát cookie theo các cách sau:
        </p>
        <ul className="list-disc pl-6 mt-2 text-lg">
          <li><strong>Điều chỉnh cài đặt trình duyệt</strong>: Bạn có thể điều chỉnh cài đặt trình duyệt của mình để từ chối tất cả hoặc chỉ một số cookie. Tuy nhiên, việc từ chối cookie có thể ảnh hưởng đến khả năng sử dụng một số tính năng của trang web.</li>
          <li><strong>Cookie của bên thứ ba</strong>: Bạn cũng có thể từ chối các cookie của bên thứ ba, như cookie quảng cáo, thông qua các công cụ được cung cấp bởi các bên quảng cáo.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Thông tin thêm về cookie</h2>
        <p className="text-lg">
          Nếu bạn muốn tìm hiểu thêm về cookie và cách chúng hoạt động, bạn có thể tham khảo các trang web như:
          <a href="https://www.allaboutcookies.org/" className="text-blue-600"> All About Cookies</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Thay đổi chính sách cookie</h2>
        <p className="text-lg">
          Chúng tôi có thể cập nhật Chính sách cookie này bất kỳ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay lập tức khi được đăng tải trên trang web của chúng tôi. Chúng tôi khuyến nghị bạn thường xuyên kiểm tra trang này để cập nhật các thay đổi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Liên hệ với chúng tôi</h2>
        <p className="text-lg">
          Nếu bạn có bất kỳ câu hỏi nào về Chính sách cookie này hoặc cách chúng tôi sử dụng cookie, vui lòng liên hệ với chúng tôi qua email:
          <a className="text-blue-600"> 21036141.linh@student.iuh.edu.vn</a>.
        </p>
      </section>
    </div>
  );
};

export default Cookie;
