// import {NextResponse} from 'next/server'
// import {getCookie} from './helpers/authUser'

// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
// //no1
    // const token = getCookie('token')
    // const role = getCookie('role')

    //1
    // if(((!token || role !== 'admin' ) && request.nextUrl.pathname.startsWith("/management")) && ((!token || role !== 'contributor' ) && request.nextUrl.pathname.startsWith("/contributor")) ) {
    // return NextResponse.redirect(new URL('/auth/login', request.url))
    // }}
    // if() {
    //     return NextResponse.redirect(new URL('/auth/login', request.url))
    //     }
    // }
  // See "Matching Paths" below to learn more
  
//1  
//   if(request.nextUrl.pathname.startsWith("/management")){
//         if(!token || role !== 'admin' ) {
//             return NextResponse.redirect(new URL('/auth/login', request.url))
//         }
//     }
//     if(request.nextUrl.pathname.startsWith("/contributor")){
//         if(!token || role !== 'contributor' ) {
//             return NextResponse.redirect(new URL('/auth/login', request.url))
//         }
//     }    
// }
//   export const config = {
//     matcher: ['/management/:path*', '/contributor/:path*'],
  // }


  import { NextResponse } from 'next/server';
  import { getToken } from 'next-auth/jwt';
  import * as jose from 'jose';
  import { cookies } from 'next/headers'
  
  export async function middleware(req) {
    // Ambil token dari cookies atau header
    const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_AUTH_SECRET });
  
    // Jika token tidak ada, arahkan ke halaman login 
    if (!token) {
      return NextResponse.redirect(new URL('/authenticate/login', req.url));
    }
  
    try {
      // Decode JWT tanpa verifikasi tanda tangan
      const decodedToken = jose.decodeJwt(token.accessToken);
      const { role, exp } = decodedToken;
  
      // Cek expired time
      const currentTime = Math.floor(Date.now() / 1000);
  
      if (exp < currentTime) {
        // cookies().set('next-auth.callback-url', '', { maxAge: 0 })
        // cookies().set('next-auth.csrf-token', '', { maxAge: 0 })
        // cookies().set('next-auth.session-token', '', { maxAge: 0 })
  
        // Jika token expired, hapus semua cookies (ini)
        const response = NextResponse.redirect(new URL('/authenticate/login', req.url)); 
        
  
        return response;
      }
  
      // Arahkan ke halaman berdasarkan role
      if (role === 'superadmin' || role === 'admin') {
        if (!req.nextUrl.pathname.startsWith('/management')) {
          url.pathname = '/management';
          return NextResponse.redirect(url);
        }
      } else if (role === 'contributor') {
        if (!req.nextUrl.pathname.startsWith('/contributor')) {
          url.pathname = '/contributor';
          return NextResponse.redirect(url);
        }
      } else {
        // Jika role tidak valid, arahkan ke unauthorized
        return NextResponse.redirect(new URL('pages/unauthorized', req.url));
      }
  
      // Lanjutkan permintaan jika token valid
      return NextResponse.next();
  
    } catch (error) {
      console.error('JWT decoding failed:', error);
      // Jika ada error saat decoding token, arahkan ke login dan hapus semua cookies
      // cookies().set('next-auth.callback-url', '', { maxAge: 0 })
      //   cookies().set('next-auth.csrf-token', '', { maxAge: 0 })
      //   cookies().set('next-auth.session-token', '', { maxAge: 0 })
  
        // Jika token expired, hapus semua cookies
        const response = NextResponse.redirect(new URL('/authenticate/login', req.url));
        
  
      
      // return response;
    }
  }
  
  // Tentukan path mana yang akan ditangani oleh middleware
  export const config = {
    matcher: ['/management/:path*', '/contributor/:path*']
  };
  
