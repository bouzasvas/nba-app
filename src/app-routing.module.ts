import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {GamesComponent} from './components/games/games.component';
import {StandingsComponent} from './components/standings/standings.component';

const routes: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'standings', component: StandingsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
