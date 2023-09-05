import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {DataService} from "../../services/data.service";
import {Post} from "../../intefaces/post.interface";

interface PostsState {
  items: Post[];
  loading: boolean;
}

@Injectable()
export class PostStore extends ComponentStore<PostsState> {
  constructor(private dataService: DataService) {
    super({ items: [], loading: false });
  }

  readonly items$ = this.select((state) => state.items);
  readonly titles$ = this.select((state) => state.items.map(item => item.title));
  readonly loading$ = this.select((state) => state.loading);

  readonly setPosts = this.updater((state, posts: Post[]) => {
    console.log('setting posts')
    return { ...state, items: posts };
  });

  readonly setLoading = this.updater((state, loading: boolean) => {
    console.log('setting loading to ', loading);
    return { ...state, loading };
  });

  readonly loadPosts = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.dataService.getPosts().pipe(
          tapResponse(
            (posts) => {
              console.log('got posts, their length is ', posts.length)
              this.setPosts(posts);
              this.setLoading(false);
            },
            (error) => {
              console.log('error getting posts')
              this.setPosts([]);
              this.setLoading(false);
              console.error(error)
            }
          )
        )
      )
    );
  });
}
