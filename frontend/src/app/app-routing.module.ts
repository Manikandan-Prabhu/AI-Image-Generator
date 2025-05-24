import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'generate',
    pathMatch: 'full',
    data: { title: 'Generate Image' },
  },
  { path: 'generate', component: ImageGeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
