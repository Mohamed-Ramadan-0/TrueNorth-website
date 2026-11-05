import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

/** The same pages for each language; English at the root, Arabic under /ar. */
const pages: Routes = [
  { path: '', component: HomeComponent },
  { path: 'solutions', loadComponent: () => import('./pages/solutions/solutions.component').then((m) => m.SolutionsComponent) },
  { path: 'solutions/:slug', loadComponent: () => import('./pages/solutions/solution.component').then((m) => m.SolutionComponent) },
  { path: 'platform', loadComponent: () => import('./pages/platform/platform.component').then((m) => m.PlatformComponent) },
  { path: 'company', loadComponent: () => import('./pages/company/company.component').then((m) => m.CompanyComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog-list.component').then((m) => m.BlogListComponent) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/blog-post.component').then((m) => m.BlogPostComponent) },
  // Old v1 URL.
  { path: 'book-demo', redirectTo: 'contact' },
];

export const routes: Routes = [
  { path: 'ar', children: pages },
  ...pages,
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
