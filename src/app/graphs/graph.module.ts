import { NgModule } from '@angular/core';
import { GraphLayoutComponent } from './shared/components/graph-layout/graph-layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [GraphLayoutComponent],
	imports: [CommonModule,
		RouterModule.forChild([
			{path: '', component: GraphLayoutComponent},
		])],
	exports: [RouterModule]
})

export class GraphModule {
}
