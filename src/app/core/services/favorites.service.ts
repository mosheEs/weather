import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly LS_KEY = 'favorites';

  private _favorites = new BehaviorSubject<string[]>(this.getDataFromLocalStorage());
  public favorites$ = this._favorites.asObservable();

  constructor() {
    this.favorites$.subscribe(() => {
      this.saveDataToLocalStorage();
    });
  }

  isFavorite(key: string): Observable<boolean> {
    return this.favorites$.pipe(
      map(list => list.includes(key))
    );
  }

  addFavorite(key: string) {
    const list = this._favorites.value;
    list.push(key);
    this._favorites.next(list);
  }

  removeFavorite(key: string) {
    const list = this._favorites.value;
    const idx = list.indexOf(key);
    list.splice(idx, 1);
    this._favorites.next(list);
  }

  private getDataFromLocalStorage() {
    const json = localStorage.getItem(this.LS_KEY);
    if (json) {
      const list = JSON.parse(json);
      if (Array.isArray(list)) {
        return list.filter(item => typeof item === "string") as string[];
      }
    }
    return [];
  }

  private saveDataToLocalStorage() {
    const json = JSON.stringify(this._favorites.value);
    localStorage.setItem(this.LS_KEY, json);
  }

}
