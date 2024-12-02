import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router: Router,
    private snackBar: MatSnackBar,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401){
          //handle error status 401 globally
          console.error('Unauthorized request - redirecting to login page');
          //reditect to login page
          this.snackBar.open(`Invalid credentials.`, '', { duration: 3000, verticalPosition: 'top' })
          this.router.navigate(['/login']);
        }

        return throwError(() => new Error(error.message));
      })
    )
  }
  
}
