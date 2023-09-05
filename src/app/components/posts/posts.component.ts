import {Component, OnInit} from '@angular/core';
import {PostStore} from "./posts.store";
import {map} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostStore]
})
export class PostsComponent implements OnInit{
    constructor(private postStore: PostStore) {}

    itemsLength$ = this.postStore.items$.pipe(map(items => items.length));
    titles$ = this.postStore.titles$;
    loading$ = this.postStore.loading$;

    ngOnInit(): void {
        this.postStore.loadPosts();
    }
}
