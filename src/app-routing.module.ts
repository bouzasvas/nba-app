import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {GamesComponent} from './components/games/games.component';
import {StandingsComponent} from './components/standings/standings.component';
import {GameDetailsComponent} from './components/game-details/game-details.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'games', component: GamesComponent},
  {path: 'standings', component: StandingsComponent},
  {path: 'gamedetails/:id', component: GameDetailsComponent},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
