import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'solutions/ecommerce', loadComponent: () => import('./pages/ecommerce/ecommerce.component').then((m) => m.EcommerceComponent) },
  { path: 'book-demo', loadComponent: () => import('./pages/book-demo/book-demo.component').then((m) => m.BookDemoComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog-list.component').then((m) => m.BlogListComponent) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/blog-post.component').then((m) => m.BlogPostComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
