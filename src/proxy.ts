import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // ดักจับเฉพาะ Path ที่ไม่ใช่ API, รูปภาพ หรือไฟล์ระบบของ Next.js
  matcher: ['/', '/(th|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};