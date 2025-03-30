import LinkCustom from "./link";

export default function Footer() {
  return (
    <footer className="px-6 py-12 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Logo + Thông tin đơn vị */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold">PRO1014 Mobile</h2>
          <p className="text-sm">
            Hệ thống bán lẻ điện thoại chính hãng. Dự án thực hiện bởi nhóm
            PRO1014 - FPOLY.
          </p>
          <p className="text-sm">&copy; 2025 PRO1014. ledaian22@gmail.com.</p>
        </div>

        {/* Hỗ trợ khách hàng */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold mb-1">Hỗ trợ khách hàng</h3>
          <LinkCustom href="#">Hướng dẫn mua hàng</LinkCustom>
          <LinkCustom href="#">Chính sách bảo hành</LinkCustom>
          <LinkCustom href="#">Chính sách đổi trả</LinkCustom>
          <LinkCustom href="#">Thanh toán & Giao hàng</LinkCustom>
        </div>

        {/* Về cửa hàng */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold mb-1">Về chúng tôi</h3>
          <LinkCustom href="#">Giới thiệu</LinkCustom>
          <LinkCustom href="#">Tin tức</LinkCustom>
          <LinkCustom href="#">Liên hệ</LinkCustom>
          <LinkCustom href="#">Hệ thống cửa hàng</LinkCustom>
        </div>

        {/* Chính sách */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-semibold mb-1">Chính sách</h3>
          <LinkCustom href="#">Chính sách bảo mật</LinkCustom>
          <LinkCustom href="#">Điều khoản sử dụng</LinkCustom>
        </div>
      </div>
    </footer>
  );
}
